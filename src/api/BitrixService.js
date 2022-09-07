import axios from "axios";
import { BITRIX_AUTH, bitrix_levels } from "../constants";

export default class BitrixService {
  // UF_CRM_1593865305969 level
  constructor(DEAL) {
    this.DEAL = DEAL
    this.customerId = +DEAL['UF_CRM_1594835958403']
    this.customerLevel = (bitrix_levels.find(level => +level.VALUE === +DEAL['UF_CRM_1593865305969'])).NAME
  }

  getRecords() {

    const _groupSkillId = 'UF_CRM_1662131538432'
    const _groupSkillName = 'UF_CRM_1662131583057'
    const _groupSkillTime = 'UF_CRM_1662131620612'
    const _groupSkillDate = 'UF_CRM_1662131715079'


    const _groupId = 'UF_CRM_1662134713595'
    const _groupName = 'UF_CRM_1612747156'
    const _groupTime = 'UF_CRM_1595213756897'
    const _groupData = 'UF_CRM_1624022986'

    return {
      skills: {
        id: +this.DEAL[_groupSkillId] || null ,
        label: this.DEAL[_groupSkillName] ? this.DEAL[_groupSkillName] + ' с расписанием '+ this.DEAL[_groupSkillTime] : null,
        isOld: false
      },
      group: {
        id: +this.DEAL[_groupId] || this.DEAL[_groupName],
        name: this.DEAL[_groupName],
        label: this.DEAL[_groupName] ? this.DEAL[_groupName] + ' с расписанием '+ this.DEAL[_groupTime] : null,
        isOld: !+this.DEAL[_groupName]
      }
    }
  }

  getDealConfig() {
    const categiry = this.DEAL.CATEGORY_ID
    // const stage = this.DEAL.STAGE_ID
    const levelId = this.DEAL['UF_CRM_1593865305969']
    const level = (bitrix_levels.find(lv => lv.value === levelId)).label
    const age = getAgeFromBirthday(this.DEAL['UF_CRM_1595188876144'])
    const customerId = this.customerId
    if (!this.customerId){
      alert('не указан id лида из альфы, модуль не будет сохранять запись')
    }
    // console.log('getDealConfig', this.DEAL, levelId, this.DEAL['UF_CRM_1595188876144'])

    // const type = categiry === '7' ? 'skills' : "trial"
    const type = "trial"
    const format = type === 'skills' ? 'offline' : 'online'
    return {
      lessonType: type,
      lessonFormat: format,
      levelId,
      level,
      age,
      customerId
    }
  }

  static async getDeal(dealId) {

    const method = 'crm.deal.get'
    const data = {
      ID: dealId
    }
    const response = await axios.post(`${BITRIX_AUTH}/${method}/`, data)
    return response.data.result

  }



  async writeInGroup(groupId, groupName, groupTime, groupData) {
    const method = 'crm.deal.update'

    const _groupId = 'UF_CRM_1662134713595'
    const _groupName = 'UF_CRM_1612747156'
    const _groupTime = 'UF_CRM_1595213756897'
    const _groupData = 'UF_CRM_1624022986'
    const _groupLink = 'UF_CRM_1662502554427'
    const groupLink = groupId ? createGroupLink(groupId) : null


    const data = {
      id: this.DEAL.ID, fields: {
        [_groupId]: groupId, [_groupName]: groupName, [_groupTime]: groupTime, [_groupData]: groupData,
        [_groupLink]: groupLink,
      }, params: {
        "REGISTER_SONET_EVENT": "Y"
      }
    }


    return await axios.post(`${BITRIX_AUTH}/${method}/`, data)
  }

  async writeInGroupSkills(groupId, groupName, groupTime, groupData) {
    const method = 'crm.deal.update'

    const _groupSkillId = 'UF_CRM_1662131538432'
    const _groupSkillName = 'UF_CRM_1662131583057'
    const _groupSkillTime = 'UF_CRM_1662131620612'
    const _groupSkillDate = 'UF_CRM_1662131715079'
    const _groupLink = 'UF_CRM_1662502373339'
    const groupLink = groupId ? createGroupLink(groupId) : null


    const data = {
      id: this.DEAL.ID, fields: {
        [_groupSkillId]: groupId, [_groupSkillName]: groupName, [_groupSkillTime]: groupTime, [_groupSkillDate]: groupData,
        [_groupLink]: groupLink,
      }, params: {
        "REGISTER_SONET_EVENT": "Y"
      }
    }

    return await axios.post(`${BITRIX_AUTH}/${method}/`, data)
  }

}

const getAgeFromBirthday = (dateBirthday) => {

  if (dateBirthday === '') {
    return 0;
  }

  let birthDate = new Date(dateBirthday);
  let now = new Date(),
    age = now.getFullYear() - birthDate.getFullYear();
  return now.setFullYear(1972) < birthDate.setFullYear(1972) ? age - 1 : age;
}
const createGroupLink = (groupId) => {
  return `https://sirfox.s20.online/company/1/group/view?id=${groupId}`
}
const createUserLink = (userId) => {
  return `https://sirfox.s20.online/company/1/group/view?id=${userId}`
}
