import axios from "axios";

const DAMAIN = 'https://sirfox.s20.online/v2api/1/'
const TOKEN = '8d5c1d965b8a370a1c45cb23ab1955aa'

export default class AlfaService {

  static async getGroups(data){
    const result = await axios.post(
      DAMAIN + 'group/index',
      data,
      { headers: {
        'X-ALFACRM-TOKEN': TOKEN,
        'Accept': "application/json",
        'Content-Type': "application/json",
      },
    })
    return result
  }

  static async getLessons(data){
    const result = await axios.post(
      DAMAIN + 'lesson/index',
      data,
      { headers: {
          'X-ALFACRM-TOKEN': TOKEN,
          'Accept': "application/json",
          'Content-Type': "application/json",
        },
      })
    return result
  }
}
