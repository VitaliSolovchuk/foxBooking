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

  static async getRooms(token) {
    return await axios.post(ALFA_DAMAIN + 'room/index', {}, {
      headers: headers(token),
    })
  }

  static async getGroups(token, data) {
    return await axios.post(ALFA_DAMAIN + 'group/index', data, {
      headers: headers(token),
    })
  }

  // todo get all cgi https://sirfox.s20.online/v2api/1/cgi/index?group_id=1000
  static async getListCustomersInGroup (token, groupId) {
    return await axios.post(ALFA_DAMAIN + 'cgi/index?' + `group_id=${groupId}`, {}, {
      headers: headers(token),
    })
  }
  static async addCustomerToGroup(token, groupId, customerId) {
    const data = {
      customer_id: customerId,
    }
    return await axios.post(ALFA_DAMAIN + 'cgi/create?' + `group_id=${groupId}`, data, {
      headers: headers(token),
    })
  }
  static async deleteCustomerFromGroup(token, cgiId, groupId) {
    const option = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }
    const data = {
      "b_date": "",
      "e_date": new Date().toLocaleString("ru", option) // dd.mm.yyyy
    }
    return await axios.post(ALFA_DAMAIN + 'cgi/update?' + `id=${cgiId}&` + `group_id=${groupId}`, data, {
      headers: headers(token),
    })
  }

  static async getLessons(token, data) {
    return await axios.post(ALFA_DAMAIN + 'lesson/index', data, {
      headers: headers(token),
    })
  }


  async getRooms() {
    return await axios.post(ALFA_DAMAIN + 'room/index', {}, {
      headers: headers(this.token),
    })
  }

  async getGroups(data) {
    return await axios.post(ALFA_DAMAIN + 'group/index', data, {
      headers: headers(this.token),
    })
  }

  // todo get all cgi https://sirfox.s20.online/v2api/1/cgi/index?group_id=1000
  async getListCustomersInGroup (token, groupId) {
    return await axios.post(ALFA_DAMAIN + 'cgi/index?' + `group_id=${groupId}`, {}, {
      headers: headers(this.token),
    })
  }
  async addCustomerToGroup(token, groupId, customerId) {
    const data = {
      customer_id: customerId,
    }
    return await axios.post(ALFA_DAMAIN + 'cgi/create?' + `group_id=${groupId}`, data, {
      headers: headers(this.token),
    })
  }
  async deleteCustomerFromGroup(token, cgiId, groupId) {
    const option = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }
    const data = {
      "b_date": "",
      "e_date": new Date().toLocaleString("ru", option) // dd.mm.yyyy
    }
    return await axios.post(ALFA_DAMAIN + 'cgi/update?' + `id=${cgiId}&` + `group_id=${groupId}`, data, {
      headers: headers(this.token),
    })
  }

  async getLessons(token, data) {
    return await axios.post(ALFA_DAMAIN + 'lesson/index', data, {
      headers: headers(this.token),
    })
  }

}
