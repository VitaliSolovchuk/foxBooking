import { alfa_regulars, alfa_rooms } from "../constants";
import AlfaService from "../api/AlfaService";
import BitrixService from "../api/BitrixService";

// TODO listing
class Controller {

  constructor(async_params) {
    if (typeof async_params === 'undefined') {
      throw new Error('Cannot be called directly');
    }

    console.log("Controller, constructor", async_params)
    this.ALFA_TOKEN = async_params.ALFA_TOKEN
    this.alfaService = new AlfaService(this.ALFA_TOKEN)
    this.bitrixService = new BitrixService(async_params.BITRIX_DEAL)
  }

  static async build(dealId = '119243') {
    // await delay(2000)

    if (!this.instance) {

      // const ALFA_TOKEN = (await AlfaService.getToken()).data.token;
      // const BITRIX_DEAL = (await BitrixService.getDeal(dealId)).data.result;
      const ALFA_TOKEN = await AlfaService.getToken()
      const BITRIX_DEAL = await BitrixService.getDeal(dealId)
      const controller = new Controller({ ALFA_TOKEN, BITRIX_DEAL });
      this.instance = controller;

    }

    return this.instance;
  }
  getRecords() {
    const record = this.bitrixService.getRecords()
    return record
  }

  async getSkillGroups(dealType = 'skills', format) {
    console.log("Controller, getSkillGroups")
    const note = `${format || ""}-${dealType || ""}`

    const filter = {
      name: 'Apollo',
      "status_id": 1,   // идет набор
      "note": note,     // вид сделки и формат занятий
      "pageSize": 50
    }
    const result = await this.alfaService.getGroups(filter)

    const allGroups = result.data.items
    allGroups.forEach(group => {
      // injection timetable from alfa_regulars
      // TODO get regulars
      group.timetable = alfa_regulars.filter(reg => reg.related_id === group.id)

      group.timetableStr = AlfaService.getGroupTimetable(group.timetable)
      group.labelStr = AlfaService.getGroupLabel(group)

      // injection roomStr
      const roomId = group.timetable?.[0]['room_id']
      if (roomId) {
        const room = alfa_rooms.find(el => el.id === roomId)
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
  async setListCustomersInGroups(groups) {
    // participants
    const newGroups = []
    for (const group of groups) {
      if(newGroups.length > 1){
        // ограничение на 5 запросов в alfaCrm на стороне альфы
        await delay(200)
      }

    const customersInGroupResponse = await this.alfaService.getListCustomersInGroup(group.id)
    const customersInGroup = customersInGroupResponse.data.items
      group.participants = customersInGroup
      group.freeSeats = `${customersInGroup.length}/${group.limit}`
      newGroups.push(group)
    }
    return newGroups
  }

  async saveToGroup(group) { //customerId
    console.log("Controller, saveToGroup")
    const customerId = this.bitrixService.customerId

    const promiseAlfa = this.alfaService.addCustomerToGroup(group.id, customerId)
    const promiseBitrix = this.bitrixService.writeInGroup(group.id, group.name + ' с расписанием: ' + group.timetableStr, group.b_date)

    await Promise.all([promiseAlfa, promiseBitrix])
    // TODO check
  }

  async deleteFromGroup(groupId) { //customerId
    console.log("Controller, deleteFromGroup")
    const customerId = this.bitrixService.customerId

    const customersInGroupResponse = await this.alfaService.getListCustomersInGroup(groupId)
    const customersInGroup = customersInGroupResponse.data.items
    const customerRec = customersInGroup.find(customerRec => customerRec.customer_id === customerId)

    const promiseAlfa = this.alfaService.deleteCustomerFromGroup(customerRec.id, groupId)
    const promiseBitrix = this.bitrixService.writeInGroup('', '', '')

    const [res, res2] = await Promise.all([promiseAlfa, promiseBitrix])
    console.log(res, res2)
  }

  async getLongTermGroups(dealType, format, level) {
    const note = `${format || ""} ${dealType || ""}`
    const result = await this.alfaService.getGroups({
      "status_id": 1,   // идет набор
      // "note": note,  // вид сделки и формат занятий
      ...(level) && { "name": level }
    })
  }


}

export default Controller.build();


function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
