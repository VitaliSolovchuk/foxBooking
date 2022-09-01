import AlfaService from "../api/AlfaService";
import { alfa_regulars, alfa_rooms } from "../constants";


class Controller {

  constructor (async_params) {
    if (typeof async_params === 'undefined') {
      throw new Error('Cannot be called directly');
    }

    this.ALFA_TOKEN = async_params.ALFA_TOKEN
    console.log("Controller, constructor")
  }

  static async build () {

    if (!this.instance) {

      const ALFA_TOKEN = await AlfaService.getToken()
      const controller = new Controller({ALFA_TOKEN});
      this.instance = controller;

      console.log("Controller, !this.instance", ALFA_TOKEN)
    }

    console.log("Controller, build", this.instance)
    return this.instance;
  }

  async getSkillGroups (dealType, format) {
    console.log("Controller, getSkillGroups")
    const note = `${format || ""} ${dealType || ""}`
    // TODO listing
    const result = await AlfaService.getGroups(this.ALFA_TOKEN,
      {
        "status_id": 1,   // идет набор
        // "note": note,     // вид сделки и формат занятий
        "pageSize": 50
      })

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
      if(roomId){
        const room = alfa_rooms.find(el => el.id === roomId)
        group.roomStr = room.note
      }

      // injection startDateStr
      let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      group.startDateStr = new Date(group['b_date'].split('.').reverse().join(',')).toLocaleString("ru", options)

      // TODO freeSeats
      group.freeSeats = `*/${group.limit}`

    })
    return allGroups;

  }

  async getLongTermGroups (dealType, format, level) {
    const note = `${format || ""} ${dealType || ""}`
    const result = await AlfaService.getGroups(this.ALFA_TOKEN,
      {
        "status_id": 1,   // идет набор
        // "note": note,  // вид сделки и формат занятий
        ...(level) && {"name": level}
      })
  }

  static _getWeekDay(day) {
    let days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

    return days[day - 1];
  }

}

export default Controller.build();;
