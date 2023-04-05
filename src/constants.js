export const ALFA_DAMAIN = 'https://sirfox.s20.online/v2api/1/'
export const ALFA_EMAIL = 'hello@bizbricks.by';

export const lessonFormatValues = [{ ID: "", VALUE: 'none' }, { ID: "online", VALUE: "online" }, { ID: "offline", VALUE: "offline" },]
export const lessonTypeValues = [{ ID: "trial", VALUE: "trial" }, { ID: "group", VALUE: "group" }, {
  ID: "skills", VALUE: "skills"
},
{
  ID: "vocational", VALUE: "vocational"
}]

export const lessonTypeArr = lessonTypeValues.map(el => el.VALUE)

export const trialColumnNames = [
  {
    label: "Имя", id: "labelStr", value: "labelStr", numeric: false, disablePadding: false,
  }, {
    label: "Дата", id: "timeFromStr", value: "timeFromStr", numeric: true, disablePadding: false,
  }, {
    label: "Описание", id: "note", value: "note", numeric: true, disablePadding: false,
  }, {
    label: "Места", id: "freeSeats", value: "freeSeats", numeric: true, disablePadding: false
  }, {
    label: "Локация", id: "roomStr", value: "roomStr", numeric: false, disablePadding: false

  },]
// TODO delete id: "ageRange"
export const groupColumnNames = [
  {
    label: "Имя", id: "name", value: "name", numeric: false, disablePadding: false,
  }, {
    label: "Дата старта", value: "startDateStr", id: "startDateStr", numeric: false, disablePadding: false,
  }, {
    label: "Возрастная группа", value: "custom_groupage_", id: "custom_groupage_", numeric: true, disablePadding: true,
  }, {
    label: "Описание", value: "custom_comment_", id: "custom_comment_", numeric: false, disablePadding: false,
  }, {
    label: "Расписание", value: "timetableStr", id: "timetableStr", numeric: true, disablePadding: true,
  }, {
    label: "Места", value: "freeSeats", id: "freeSeats", numeric: true, disablePadding: false,
  }, {
    label: "Учителя", value: "teacher_ids", id: "teacher_ids", numeric: false, disablePadding: true,
  }, {
    label: "Локация", value: "roomStr", id: "roomStr", numeric: false, disablePadding: false,
  },]

export const bitrix_formats = [{
  "NAME": "online",
  "ID": "601",
  "IS_SELECTED": false
}, { "NAME": "offline", "ID": "603", "IS_SELECTED": true }, { "NAME": "не выбрано", "ID": "", "IS_SELECTED": false }]
  .map(level => {
    level.label = level["NAME"]
    level.value = level["ID"]
    level.VALUE = level["NAME"]
    return level
  });
