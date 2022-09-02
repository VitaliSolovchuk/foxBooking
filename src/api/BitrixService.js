import axios from "axios";
import { BITRIX_AUTH, bitrix_levels } from "../constants";

export default class BitrixService {
  // UF_CRM_1593865305969 level
  constructor(DEAL) {
    this.DEAL = DEAL
    this.customerId = +DEAL['UF_CRM_1594835958403']
    this.customerLevel =
      (bitrix_levels.find(level => +level.VALUE === +DEAL['UF_CRM_1593865305969'])).NAME
  }

  getRecords(){

    const _groupId = 'UF_CRM_1612747156'
    const _groupTime = 'UF_CRM_1595213756897'

    return {
      skills: {
        id: +this.DEAL[_groupId],
        label: this.DEAL[_groupTime]
      }
    }
  }
  static async getDeal(dealId) {

    const method = 'crm.deal.get'
    const data = {
      ID:dealId
    }
    const response = await axios.post(`${BITRIX_AUTH}/${method}/`, data)
    return response.data.result

  }

  static async writeInGroup(dealId, groupId, groupTime, groupData) {
    const method = 'crm.deal.update'

    const _groupId = 'UF_CRM_1612747156'
    const _groupTime = 'UF_CRM_1595213756897'
    const _groupData = 'UF_CRM_1624022986'

    const data = {
      id: dealId,
      fields: {
        [_groupId]: groupId,
        [_groupTime]: groupTime,
        [_groupData]: groupData,
      },
      params: {
        "REGISTER_SONET_EVENT": "Y"
      }
    }


    return await axios.post(`${BITRIX_AUTH}/${method}/`, data)
  }
  async writeInGroup(groupId, groupTime, groupData) {
    const method = 'crm.deal.update'

    const _groupId = 'UF_CRM_1612747156'
    const _groupTime = 'UF_CRM_1595213756897'
    const _groupData = 'UF_CRM_1624022986'

    const data = {
      id: this.DEAL.ID,
      fields: {
        [_groupId]: groupId,
        [_groupTime]: groupTime,
        [_groupData]: groupData,
      },
      params: {
        "REGISTER_SONET_EVENT": "Y"
      }
    }


    return await axios.post(`${BITRIX_AUTH}/${method}/`, data)
  }
}
