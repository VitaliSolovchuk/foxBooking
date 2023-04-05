import AlfaService from "../api/AlfaService";
import BitrixService from "../api/BitrixService";

class Controller {

  constructor(async_params) {
    if (typeof async_params === 'undefined') {
      throw new Error('Cannot be called directly');
    }

    this.alfaRooms = async_params.alfaRooms

    this.alfaService = new AlfaService(async_params.ALFA_TOKEN, async_params.ALFA_REGULARS, async_params.alfaRooms)
    
    this.bitrixService = new BitrixService(async_params.BITRIX_AUTH, async_params.BITRIX_DEAL, async_params.bitrixLevels)

  }

  static async build(dealId, BITRIX_AUTH, ALFA_API_KEY) { 

    if (!this.instance) {
      
      const ALFA_TOKEN = await AlfaService.getToken(ALFA_API_KEY)
      const alfaRegularsPromise = AlfaService.getRegularLesson(ALFA_TOKEN)
      const alfaRoomsPromise = AlfaService.getRooms(ALFA_TOKEN)


      const BITRIX_DEAL_PROMISE = BitrixService.getDeal(BITRIX_AUTH, dealId);
      const bitrixLevelsPromise = BitrixService.getDealUserfildById(BITRIX_AUTH);

      const [BITRIX_DEAL, bitrixLevels, ALFA_REGULARS, alfaRooms] = await Promise.all([BITRIX_DEAL_PROMISE, bitrixLevelsPromise, alfaRegularsPromise, alfaRoomsPromise])
      const controller = new Controller({ ALFA_TOKEN, ALFA_REGULARS, alfaRooms, BITRIX_DEAL, BITRIX_AUTH, bitrixLevels});
      this.instance = controller;
    }

    return this.instance;
  }
  getRecords() {
    const record = this.bitrixService.getRecords()
    return record
  }
  getDealConfig() {
    const record = this.bitrixService.getDealConfig()
    return record
  }


  async getLessons() {

    const filter = {
      "lesson_type_id": 3, // пз
      "status": 1,   // идет набор
    }
    const allLessons = await this.alfaService.getLessons(filter)
    allLessons.forEach(lesson => {
      this.alfaService.injectionRoomToLesson(lesson)
    })

    return allLessons;
  }
  async getSkillGroups(dealType = 'skills', format) {
    // console.log("Controller, getSkillGroups")
    const note = `${format || ""}-${dealType || ""}`

    const filter = {
      "status_id": 1,   // идет набор
      "note": note,     // вид сделки и формат занятий
      "pageSize": 50
    }
    const allGroups = await this.alfaService.getGroups(filter)
    allGroups.forEach(group => {
      // injection timetable from alfa_regulars
      this.alfaService.getGroupTimetable(group)
      group.labelStr = AlfaService.getGroupLabel(group)

      // injection roomStr
      const roomId = group.timetable?.[0]['room_id']
      if (roomId) {
        const room = this.alfaRooms.find(el => el.id === roomId)
        group.roomStr = room.note
      }

      // injection startDateStr
      let options = {
        year: 'numeric', month: 'long', day: 'numeric',
      }
      group.startDateStr = new Date(group['b_date'].split('.').reverse().join(',')).toLocaleString("ru", options)

      // TODO freeSeats
      group.freeSeats = `*/${group.limit}`

    })
    return allGroups;
  }
  async getGroups(dealType) {
    // console.log("getGroups")

    const filter = {
      "name": dealType,
      "status_id": 1,   // идет набор
      "pageSize": 50
    }
    const allGroups = await this.alfaService.getGroups(filter)
    allGroups.forEach(group => {
      // injection timetable from alfa_regulars
      // TODO get regulars

      this.alfaService.getGroupTimetable(group)
      group.labelStr = AlfaService.getGroupLabel(group)

      // injection roomStr
      const roomId = group?.timetable?.[0]?.['room_id']
      group.roomId = roomId
      if (roomId) {
        const room = this.alfaRooms.find(el => el.id === roomId)
        group.roomStr = room?.note
      }

      // injection startDateStr
      let options = {
        year: 'numeric', month: 'long', day: 'numeric',
      }
      group.startDateStr = new Date(group['b_date'].split('.').reverse().join(',')).toLocaleString("ru", options)

      // TODO freeSeats
      group.freeSeats = `*/${group.limit}`

    })
    return allGroups;
  }

  async setListCustomersInGroups(groups) {
    // participants
    const newGroups = []
    for (const group of groups) {
      if(newGroups.length > 1){
        // ограничение на 5 запросов в alfaCrm на стороне альфы
        await delay(150)
      }

      const customersInGroupResponse = await this.alfaService.getListCustomersInGroup(group.id)
      const customersInGroup = customersInGroupResponse.data.items
      group.participants = customersInGroup
      const actualCustomers = customersInGroup.filter(el => new Date(el.e_date |  Date) < new Date()).length
      group.freeSeats = `${group.limit - actualCustomers}/${group.limit}`
      newGroups.push(group)
    }
    return newGroups
  }
  async saveToGroup(group, groupType) { //customerId
    // console.log("Controller, saveToGroup")
    const customerId = this.bitrixService.customerId
    const userParticipant = group.participants.find(user => user.customer_id === customerId)

    let promiseAlfa;
    if(userParticipant){
      promiseAlfa = this.alfaService.updateCustomerFromGroup(userParticipant.id, group.id)
    }else{
      promiseAlfa = this.alfaService.addCustomerToGroup(group.id, customerId)
    }

    let promiseBitrix;
    if(groupType === "skills") {
      promiseBitrix = this.bitrixService.writeInGroupSkills(group.id, group.name, group.timetableStr, group.b_date)
    }
    if(groupType === "group") {
      promiseBitrix = this.bitrixService.writeInGroup(group.id, group.name, group.timetableStr, group.b_date)
    }

    await Promise.all([promiseAlfa, promiseBitrix])

  }
  async saveToLessen(lessenId) {
    // console.log("Controller, saveToLessen")
    const customerId = this.bitrixService.customerId

    // get lesson
    const filter = {id: lessenId, lesson_type_id: 3, status: 1 }
    const lesson = (await this.alfaService.getLessons(filter))[0]
    this.alfaService.injectionRoomToLesson(lesson)

    if(lesson.status !== 1) { // searching
      //TODO thow error
    }

    // updateCustomer
    const customerData = {id: customerId, is_study: 0, lead_status_id: 2, e_date: '2030-10-10'}
    const customer = await this.alfaService.updateCustomer(customerData)

    // updateLesson
    filter.customer_ids = lesson.customer_ids.concat(customerId)
    const promiseAlfa = this.alfaService.updateLessons(filter)
    const promiseBitrix = this.bitrixService.writeInLesson(lesson.id, lesson.time_from, lesson.formatStr)
    await Promise.all([promiseAlfa, promiseBitrix])

  }

  async deleteFromGroup(groupId, groupType) { //customerId
    // console.log("Controller, deleteFromGroup")
    const customerId = this.bitrixService.customerId

    const customersInGroupResponse = await this.alfaService.getListCustomersInGroup(groupId)
    const customersInGroup = customersInGroupResponse.data.items
    const customerRec = customersInGroup.find(customerRec => customerRec.customer_id === customerId)

    const promiseAlfa = this.alfaService.deleteCustomerFromGroup(customerRec.id, groupId)
    let promiseBitrix;
    if(groupType === "skills") {
      promiseBitrix = this.bitrixService.writeInGroupSkills('', '', '', '')
    }
    if(groupType === "group") {
      promiseBitrix = this.bitrixService.writeInGroup('', '', '', '')
    }

    const [res, res2] = await Promise.all([promiseAlfa, promiseBitrix])
    // console.log(res, res2)
  }
  async deleteFromGroupWithoutGroupId(groupName, groupType, groups) { //customerId
    // console.log("Controller, deleteFromGroupWithoutGroupId")
    const customerId = this.bitrixService.customerId

    // 1 search group
    // 1.1 search
    const groupCustomerRecs = groups
      .filter( gr => gr.name === groupName)
      .filter( gr => gr.participants.find(user => user.customer_id === customerId))
    // console.log('groupCustomerRecs', groupCustomerRecs)
    // 1.2 get from alfa
    if(groupCustomerRecs.length === 0){
      // достать группы в интернете
      const allGroups = await this.alfaService.getGroups({ pageSize: 50, name: groupName})
      const groups = [...allGroups]
      // подключить к группам расписание
      const groupsWithParticipants = await this.setListCustomersInGroups(groups)
      // найти в расписании пользователя
      const userGroups = groupsWithParticipants
        .filter( gr => gr.name === groupName)
        .filter( gr => gr.participants.find(user => user.customer_id === customerId))

      //положить в общий список
      groupCustomerRecs.push(...userGroups)
      // console.log('groupCustomerRecs2', groupCustomerRecs)
    }

    // 2.1 если группа нашлась одна
    if(groupCustomerRecs.length === 1){
      const group = groupCustomerRecs[0]
      const customerRec = group.participants.find(customerRec => customerRec.customer_id === customerId)

      const promiseAlfa = this.alfaService.deleteCustomerFromGroup(customerRec.id, group.id)
      let promiseBitrix;
      if(groupType === "skills") {
        promiseBitrix = this.bitrixService.writeInGroupSkills('', '', '', '')
      }
      if(groupType === "group") {
        promiseBitrix = this.bitrixService.writeInGroup('', '', '', '')
      }

      await Promise.all([promiseAlfa, promiseBitrix])
    }else {
      alert ('больше одной группы нашло - удалите вручную')
    }

  }

  async deleteFromLessen(lessenId) {
    // console.log("Controller, deleteFromLessen")
    const customerId = this.bitrixService.customerId

    // get lesson
    const filter = {id: lessenId, lesson_type_id: 3, status: 1}
    const promiseAlfa = this.alfaService.getLessons(filter)
    const promiseBitrix = this.bitrixService.writeInLesson('', '', '')
    const [resAlfa, resBitrix] = await Promise.all([promiseAlfa, promiseBitrix])
    const lesson = resAlfa[0]


    if(!lesson) {
      // alert('занятие проведено')
      return
    }

    // updateLesson
    lesson.customer_ids.pop(customerId)
    await this.alfaService.updateLessons({...filter, customer_ids: lesson.customer_ids})

  }
  // async getAllGroupsTest(){
  //   const allGroups = await this.alfaService.getGroups({ pageSize: 50 })
  //   return allGroups
  // }

  async getLongTermGroups(dealType, format, level) {
    const note = `${format || ""} ${dealType || ""}`
    const allGroups = await this.alfaService.getGroups({
      "status_id": 1,   // идет набор
      // "note": note,  // вид сделки и формат занятий
      ...(level) && { "name": level }
    })
  }


}

export default Controller;


function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
