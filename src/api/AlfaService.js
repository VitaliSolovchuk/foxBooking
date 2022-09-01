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

  static async getToken() {
    const response = await axios.post('https://sirfox.s20.online/v2api/auth/login', {email: ALFA_EMAIL, api_key: ALFA_API_KEY}, {
      headers: headers(''),
    })

    return response.data.token;
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

  static async getLessons(token, data) {
    return await axios.post(ALFA_DAMAIN + 'lesson/index', data, {
      headers: headers(token),
    })
  }
}
