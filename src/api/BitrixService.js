import axios from "axios";
import { bitrix_formats } from "../constants";

export default class BitrixService {
  constructor(BITRIX_AUTH, DEAL, bitrixLevels) {
    this.bitrixLevels = bitrixLevels
    this.BITRIX_AUTH = BITRIX_AUTH
    this.DEAL = DEAL
    this.customerId = +DEAL['UF_CRM_1594835958403']
    this.customerLevelId = DEAL['UF_CRM_1593865305969']
    this.age = DEAL['UF_CRM_1595188876144']
    this.customerLevel = (bitrixLevels.find(level => level.ID === this.customerLevelId))?.VALUE || "Error"
  }

  getRecords() {
    let options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    }

    const _groupSkillId = 'UF_CRM_1662131538432'
    const _groupSkillName = 'UF_CRM_1662131583057'
    const _groupSkillTime = 'UF_CRM_1662131620612'
    const _groupSkillDate = 'UF_CRM_1662131715079'


    const _groupId = 'UF_CRM_1662134713595'
    const _groupName = 'UF_CRM_1612747156'
    const _groupTime = 'UF_CRM_1595213756897'
    const _groupData = 'UF_CRM_1624022986'

    const _lessonId = 'UF_CRM_1594848275149'
    const _lessonData = 'UF_CRM_1594925394614'
    const _lessonFormat = 'UF_CRM_1601465549030'
    const lessonFormat = (bitrix_formats.find(level => +level.value === +this.DEAL[_lessonFormat])).label

    return {
      skills: {
        id: +this.DEAL[_groupSkillId] || null ,
        label: this.DEAL[_groupSkillName] ? this.DEAL[_groupSkillName] + ' с расписанием '+ this.DEAL[_groupSkillTime] : null,
        isOld: false
      },
      group: {
        id: +this.DEAL[_groupId] || this.DEAL[_groupName] || null ,
        name: this.DEAL[_groupName],
        label: this.DEAL[_groupName] ? this.DEAL[_groupName] + ' с расписанием '+ this.DEAL[_groupTime] : null,
        isOld: !+this.DEAL[_groupName]
      },
      trial: {
        id: +this.DEAL[_lessonId] || null ,
        label: this.DEAL[_lessonData]
          ? `Запись на занятие \t${new Date(this.DEAL[_lessonData]).toLocaleString("ru", options)} (${lessonFormat || ""})`
          : null,
        format: lessonFormat,
      }
    }
  }

  getDealConfig() {
    const categiry = this.DEAL.CATEGORY_ID
    const stage = this.DEAL.STAGE_ID
    const levelId = this.customerLevelId
    const level = this.customerLevel
    const age = getAgeFromBirthday(this.age)
    const customerId = this.customerId
    
    if (!this.customerId){
      alert('не указан id лида из альфы, модуль не будет сохранять запись')
    }

    const type = (categiry === '7')
    ? 'skills'
    : (stage === 'C1:PREPAYMENT_INVOICE') ? "trial" : 'group'
    const format = (type === 'skills')
    ? 'offline'
    : ''

    // const type = "trial"
    // const format = ''
    return {
      bitrixLevels: this.bitrixLevels,
      lessonType: type,
      lessonFormat: format,
      levelId,
      level,
      age,
      customerId
    }
  }

  static async getDeal(BITRIX_AUTH, dealId) {

    const method = 'crm.deal.get'
    const data = {
      ID: dealId
    }
    const response = await axios.post(`${BITRIX_AUTH}/${method}/`, data)
    return response.data.result

  }

  static async getDealUserfildById(BITRIX_AUTH, fildId = 427) {

    const method = 'crm.deal.userfield.get'
    const data = {
      ID: fildId
    }
    const response = await axios.post(`${BITRIX_AUTH}/${method}/`, data)
    return response.data.result.LIST

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

    return await axios.post(`${this.BITRIX_AUTH}/${method}/`, data)
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

    return await axios.post(`${this.BITRIX_AUTH}/${method}/`, data)
  }
  async writeInLesson(lessonId, lessonData, lessonFormat) {
    const method = 'crm.deal.update'

    const _lessonId = 'UF_CRM_1594848275149'
    const _lessonData = 'UF_CRM_1594925394614'
    const _lessonFormat = 'UF_CRM_1601465549030'
    const format = (bitrix_formats.find(form => form.label === lessonFormat))?.value || ''

    const data = {
      id: this.DEAL.ID, fields: {
        [_lessonId]: lessonId, [_lessonData]: lessonData, [_lessonFormat]: format,
      }, params: {
        "REGISTER_SONET_EVENT": "Y"
      }
    }

    return await axios.post(`${this.BITRIX_AUTH}/${method}/`, data)
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
