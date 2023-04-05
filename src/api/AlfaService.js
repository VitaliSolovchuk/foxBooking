import axios from "axios";
import { ALFA_DAMAIN, ALFA_EMAIL } from "../constants";



const headers = (token) => {
    return {
      'X-ALFACRM-TOKEN':token,
      'Accept': "application/json",
      'Content-Type':"application/json"
    }
}

// TODO page listing
// TODO https://sirfox.s20.online/v2api/1/regular-lesson/index?
export default class AlfaService {

  constructor(token, regulars, alfaRooms) {
    this.token = token
    this.regulars = regulars
    this.alfaRooms = alfaRooms
  }

  static async getToken(ALFA_API_KEY) {
    const response = await axios.post('https://sirfox.s20.online/v2api/auth/login', {email: ALFA_EMAIL, api_key: ALFA_API_KEY}, {
      headers: headers(''),
    })

    return response.data.token
  }
  static async getRegularLesson(token) {
      const response = await axios.post(ALFA_DAMAIN + 'regular-lesson/index?', {}, {
        headers: headers(token),
      })

      return response.data.items
  }
  static async getRooms(token) {
    const response = await axios.post(ALFA_DAMAIN + 'room/index', {}, {
      headers: headers(token),
    })

    return response.data.items
}
  static getGroupLabel(group) {
    return `${group.name} с расписанием ${group.timetableStr}`

  }
  getGroupTimetable(group) {

    group.timetable = this.regulars.filter(reg => reg.related_id === group.id)

    let timetableStr = ''
    group.timetable.forEach(tm => {
      timetableStr += '(' + _getWeekDay(tm['day']) + ')' + tm['time_from_v'] + '-' + tm['time_to_v'] + ' '
    })

    if (!timetableStr){
      timetableStr = "не установлено"
    }

    group.timetableStr = timetableStr
    return
    function _getWeekDay(day) {
      let days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

      return days[day - 1];
    }
  }
  injectionRoomToLesson(lesson){

    lesson['labelStr'] = "Пробное занятие"

    // injection timetable from alfa_regulars
    let options = {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }
    lesson.timeFromStr = new Date(lesson?.time_from).toLocaleString("ru", options)

    // injection roomStr
    const roomId = lesson?.['room_id']
    if (roomId) {
      const room = this.alfaRooms.find(el => el.id === roomId)
      lesson.roomStr = room?.note
      lesson.formatStr = room?.location_id === 3 ? "online" : "offline"
      // TODO get room from id
    }else {
      lesson.formatStr = "online"
    }

    // TODO freeSeats
    const places = {
      online: 6,
      offline: 15,
    }
    lesson.freeSeats = `${places[lesson.formatStr] - lesson.customer_ids.length }/${places[lesson.formatStr]}`

    let options2 = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    }
    lesson.label = `Запись на занятие \t${new Date(lesson.time_from).toLocaleString("ru", options2)} (${lesson.formatStr || ""})`
  }



  async getRooms() {
    return await axios.post(ALFA_DAMAIN + 'room/index', {}, {
      headers: headers(this.token),
    })
  }

  async getGroups(data) {
    const res = []
    const params = {page: 1}

    let total, count, page;
    do {
      const response = await axios.post(ALFA_DAMAIN + 'group/index', data, {
        headers: headers(this.token),
        params
      })
      res.push(...response.data.items)
      total = response.data.total
      count = response.data.count
      page = response.data.page
      ++params.page
    } while (total > (page + 1) * (data?.pageSize || params?.pageSize || 20) );
    return res
  }

  async getListCustomersInGroup (groupId) {
    return await axios.post(ALFA_DAMAIN + 'cgi/index?' + `group_id=${groupId}`, {}, {
      headers: headers(this.token),
    })
  }
  async addCustomerToGroup(groupId, customerId) {
    const data = {
      customer_id: customerId,
    }
    return await axios.post(ALFA_DAMAIN + 'cgi/create?' + `group_id=${groupId}`, data, {
      headers: headers(this.token),
    })
  }
  async deleteCustomerFromGroup(cgiId, groupId) {
    const option = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }
    const data = {
      "e_date": new Date().toLocaleString("ru", option) // dd.mm.yyyy
    }
    return await axios.post(ALFA_DAMAIN + 'cgi/update?' + `id=${cgiId}&` + `group_id=${groupId}`, data, {
      headers: headers(this.token),
    })
  }
  async updateCustomerFromGroup(cgiId, groupId) {
    const data = {
      "e_date": null
    }
    return await axios.post(ALFA_DAMAIN + 'cgi/update?' + `id=${cgiId}&` + `group_id=${groupId}`, data, {
      headers: headers(this.token),
    })
  }

  // LESSONS
  async getLessons(data) {

    const res = []
    const params = {page: 1}
    data.pageSize = 50;

    let total, count, page;
    do {
      const response = await axios.post(ALFA_DAMAIN + 'lesson/index?', data, {
        headers: headers(this.token),
        params
      })
      res.push(...response.data.items)
      total = response.data.total
      count = response.data.count
      page = response.data.page
      ++params.page
    } while (total > (page + 1) * (data?.pageSize || params?.pageSize || 20) );
    return res
  }
  async updateLessons(data) {
    const params = {id: data.id}
    const response = await axios.post(ALFA_DAMAIN + 'lesson/update?', data, {
       headers: headers(this.token),
      params
    })

    // console.log(response, 'updateLessons')
    return response.data
  }

  //CUSTOMER
  async updateCustomer(data) {
    const params = {id: data.id}
    const response = await axios.post(ALFA_DAMAIN + 'customer/update?', data, {
      headers: headers(this.token),
      params
    })

    // console.log(response, 'updateCustomer')
    return response.data
  }

}

function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
