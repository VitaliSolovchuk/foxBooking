import axios from "axios";
import { ALFA_DAMAIN, ALFA_EMAIL, ALFA_API_KEY } from "../constants";



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

  constructor(token) {
    this.token = token
  }

  static async getToken() {
    const response = await axios.post('https://sirfox.s20.online/v2api/auth/login', {email: ALFA_EMAIL, api_key: ALFA_API_KEY}, {
      headers: headers(''),
    })

    return response.data.token
  }
  static getGroupLabel(group) {
    return `${group.name} с расписанием ${group.timetableStr}`

  }
  static getGroupTimetable(timetable) {
    let timetableStr = ''
    timetable.forEach(tm => {
      timetableStr += '(' + _getWeekDay(tm['day']) + ')' + tm['time_from_v'] + '-' + tm['time_to_v'] + ' '
    })

    if (!timetableStr){
      timetableStr = "не установлено"
    }

    return timetableStr
    function _getWeekDay(day) {
      let days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

      return days[day - 1];
    }
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

  // todo get all cgi https://sirfox.s20.online/v2api/1/cgi/index?group_id=1000
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

  async getLessons(data) {
    return await axios.post(ALFA_DAMAIN + 'lesson/index', data, {
      headers: headers(this.token),
    })
  }

}

function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
