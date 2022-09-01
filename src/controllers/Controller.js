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

  async getSkillGroups(dealType = 'skills', format) {
    console.log("Controller, getSkillGroups")
    const note = `${format || ""}-${dealType || ""}`

    const filter = {
      "status_id": 1,   // идет набор
      "note": note,     // вид сделки и формат занятий
      "pageSize": 50
    }
    const result = await this.alfaService.getGroups()

    const allGroups = result.data.items
    allGroups.forEach(group => {
      // injection timetable from alfa_regulars
      group.timetable = alfa_regulars.filter(reg => reg.related_id === group.id)

      group.timetableStr = ''
      group.timetable.forEach(tm => {
        group.timetableStr += '(' + Controller._getWeekDay(tm['day']) + ')' + tm['time_from_v'] + '-' + tm['time_to_v'] + ' '
      })

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

  async saveToGroup(group) { //customerId
    console.log("Controller, saveToGroup")
    const customerId = this.bitrixService.customerId

    await this.alfaService.addCustomerToGroup(this.ALFA_TOKEN, group.id, customerId)
    await this.bitrixService.writeInGroup(group.id, group.name + ' с расписанием: ' + group.timetableStr, group.b_date)
    // TODO check
  }

  async deleteFromGroup(group) { //customerId
    console.log("Controller, deleteFromGroup")
    const customerId = this.bitrixService.customerId

    const customersInGroupResponse = await this.alfaService.getListCustomersInGroup(this.ALFA_TOKEN, group.id)
    const customersInGroup = customersInGroupResponse.data.items
    const customerRec = customersInGroup.find(customerRec => customerRec.customer_id === customerId)

    const res = await this.alfaService.deleteCustomerFromGroup(this.ALFA_TOKEN, customerRec.id, group.id)
    const res2 = await this.bitrixService.writeInGroup('', '', '')
    console.log(res, res2)
  }

  async getLongTermGroups(dealType, format, level) {
    const note = `${format || ""} ${dealType || ""}`
    const result = await this.alfaService.getGroups(this.ALFA_TOKEN, {
      "status_id": 1,   // идет набор
      // "note": note,  // вид сделки и формат занятий
      ...(level) && { "name": level }
    })
  }

  static _getWeekDay(day) {
    let days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

    return days[day - 1];
  }

}

export default Controller.build();


function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("done")
      resolve(2);
    }, delayInms);
  });
}
