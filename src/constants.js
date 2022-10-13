export const ALFA_DAMAIN = 'https://sirfox.s20.online/v2api/1/'
export const ALFA_API_KEY = 'f2b9ed0b-b788-11ea-9333-0cc47a6ca50e';
export const ALFA_EMAIL = 'hello@bizbricks.by';


export const BITRIX_AUTH = "https://sirfox.bitrix24.by/rest/147/q286xn32y3t8s3br/";

export const lessonFormatValues = [{ value: "", label: 'none' }, { value: "online", label: "online" }, { value: "offline", label: "offline" },]
export const lessonTypeValues = [{ value: "trial", label: "trial" }, { value: "group", label: "group" }, {
  value: "skills", label: "skills"
},]

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


export const alfa_rooms = [
  {
  "id": 11, "branch_id": 1, "location_id": 3, // isOnline
  "streaming_id": null, "color_id": 8, "name": "Онлайн", "note": "Онлайн аудитория", "is_enabled": 1, "weight": 0
}, {
  "id": 29,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 10",
  "note": "Онлайн аудитория 10",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 30,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 11",
  "note": "Онлайн аудитория 11",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 31,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 12",
  "note": "Онлайн аудитория 12",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 32,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 13",
  "note": "Онлайн аудитория 13",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 33,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 14",
  "note": "Онлайн аудитория 14",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 34,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 15",
  "note": "Онлайн аудитория 15",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 35,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 16",
  "note": "Онлайн аудитория 16",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 36,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 17",
  "note": "Онлайн аудитория 17",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 37,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 18",
  "note": "Онлайн аудитория 18",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 38,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 19",
  "note": "Онлайн аудитория 19",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 12,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 2",
  "note": "Онлайн аудитория 2",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 39,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 20",
  "note": "Онлайн аудитория 20",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 40,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 21",
  "note": "Онлайн аудитория 21",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 41,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 22",
  "note": "Онлайн аудитория 22",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 42,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 23",
  "note": "Онлайн аудитория 23",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 43,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 24",
  "note": "Онлайн аудитория 24",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 44,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 25",
  "note": "Онлайн аудитория 25",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 45,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 26",
  "note": "Онлайн аудитория 26",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 46,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 27",
  "note": "Онлайн аудитория 27",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 47,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 28",
  "note": "Онлайн аудитория 28",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 48,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 29",
  "note": "Онлайн аудитория 29",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 13,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 3",
  "note": "Онлайн аудитория 3",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 56,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 30",
  "note": "Онлайн аудитория 30",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 50,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 31",
  "note": "Онлайн аудитория 31",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 51,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 32",
  "note": "Онлайн аудитория 32",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 52,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 33",
  "note": "Онлайн аудитория 33",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 53,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 34",
  "note": "Онлайн аудитория 34",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 54,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 35",
  "note": "Онлайн аудитория 35",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 55,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 36",
  "note": "Онлайн аудитория 36",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 49,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 37",
  "note": "Онлайн аудитория 37",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 57,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 38",
  "note": "Онлайн аудитория 38",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 58,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 39",
  "note": "Онлайн аудитория 39",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 20,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 4",
  "note": "Онлайн аудитория 4",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 59,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 40",
  "note": "Онлайн аудитория 40",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 21,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 5",
  "note": "Онлайн аудитория 5",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 22,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 6",
  "note": "Онлайн аудитория 6",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 26,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 7",
  "note": "Онлайн аудитория 7",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 27,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 8",
  "note": "Онлайн аудитория 8",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 28,
  "branch_id": 1,
  "location_id": 3,
  "streaming_id": null,
  "color_id": 11,
  "name": "Онлайн 9",
  "note": "Онлайн аудитория 9",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 3,
  "branch_id": 1,
  "location_id": 1,
  "streaming_id": null,
  "color_id": 1,
  "name": "Голубая",
  "note": "Голубая Центр",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 5,
  "branch_id": 1,
  "location_id": 1,
  "streaming_id": null,
  "color_id": 10,
  "name": "Желтая",
  "note": "Желтая Центр",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 2,
  "branch_id": 1,
  "location_id": 1,
  "streaming_id": null,
  "color_id": 2,
  "name": "Зеленая",
  "note": "Зеленая Центр",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 4,
  "branch_id": 1,
  "location_id": 1,
  "streaming_id": null,
  "color_id": 14,
  "name": "Оранжевая",
  "note": "Оранжевая Центр",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 23,
  "branch_id": 1,
  "location_id": 1,
  "streaming_id": null,
  "color_id": 11,
  "name": "Пробные",
  "note": "Пробные занятия",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 1,
  "branch_id": 1,
  "location_id": 1,
  "streaming_id": null,
  "color_id": 7,
  "name": "Фуксия",
  "note": "Фуксия Центр",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 6,
  "branch_id": 1,
  "location_id": 2,
  "streaming_id": null,
  "color_id": 1,
  "name": "Голубая",
  "note": "Голубая Восток",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 7,
  "branch_id": 1,
  "location_id": 2,
  "streaming_id": null,
  "color_id": 10,
  "name": "Желтая",
  "note": "Желтая Восток",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 8,
  "branch_id": 1,
  "location_id": 2,
  "streaming_id": null,
  "color_id": 2,
  "name": "Зеленая",
  "note": "Зеленая Восток",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 10,
  "branch_id": 1,
  "location_id": 2,
  "streaming_id": null,
  "color_id": 14,
  "name": "Оранжевая",
  "note": "Оранжевая Восток",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 24,
  "branch_id": 1,
  "location_id": 2,
  "streaming_id": null,
  "color_id": 11,
  "name": "Пробные",
  "note": "Пробные занятия",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 9,
  "branch_id": 1,
  "location_id": 2,
  "streaming_id": null,
  "color_id": 7,
  "name": "Фуксия",
  "note": "Фуксия Восток",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 14,
  "branch_id": 1,
  "location_id": 4,
  "streaming_id": null,
  "color_id": 1,
  "name": "Голубая",
  "note": "",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 15,
  "branch_id": 1,
  "location_id": 4,
  "streaming_id": null,
  "color_id": 10,
  "name": "Желтая",
  "note": "",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 17,
  "branch_id": 1,
  "location_id": 4,
  "streaming_id": null,
  "color_id": 2,
  "name": "Зеленая",
  "note": "",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 18,
  "branch_id": 1,
  "location_id": 4,
  "streaming_id": null,
  "color_id": 14,
  "name": "Оранжевая",
  "note": "",
  "is_enabled": 0,
  "weight": 0
}, {
  "id": 25,
  "branch_id": 1,
  "location_id": 4,
  "streaming_id": null,
  "color_id": 11,
  "name": "Пробные",
  "note": "Пробные занятия",
  "is_enabled": 1,
  "weight": 0
}, {
  "id": 19,
  "branch_id": 1,
  "location_id": 4,
  "streaming_id": null,
  "color_id": 7,
  "name": "Фуксия",
  "note": "",
  "is_enabled": 1,
  "weight": 0
}]

export const bitrix_levels = [
  { "NAME": "не выбрано", "VALUE": "", "IS_SELECTED": false }, {
  "NAME": "Jupiter",
  "VALUE": "287",
  "IS_SELECTED": false
}, { "NAME": "Marsik", "VALUE": "289", "IS_SELECTED": false }, {
  "NAME": "Mars",
  "VALUE": "291",
  "IS_SELECTED": false
}, { "NAME": "Jerusalem", "VALUE": "295", "IS_SELECTED": false }, {
  "NAME": "Madrid",
  "VALUE": "299",
  "IS_SELECTED": false
}, { "NAME": "Seoulchik", "VALUE": "301", "IS_SELECTED": true }, {
  "NAME": "Seoul",
  "VALUE": "303",
  "IS_SELECTED": false
}, { "NAME": "Japan", "VALUE": "305", "IS_SELECTED": false }, {
  "NAME": "Japan Plus",
  "VALUE": "307",
  "IS_SELECTED": false
}, { "NAME": "Thailand", "VALUE": "309", "IS_SELECTED": false }, {
  "NAME": "Madagascar",
  "VALUE": "311",
  "IS_SELECTED": false
}, { "NAME": "Spain", "VALUE": "313", "IS_SELECTED": false }, {
  "NAME": "Seoulchik Start",
  "VALUE": "433",
  "IS_SELECTED": false
}, { "NAME": "Seoul Master", "VALUE": "435", "IS_SELECTED": false }, {
  "NAME": "Madagascar Plus",
  "VALUE": "437",
  "IS_SELECTED": false
}, { "NAME": "Spain Plus", "VALUE": "439", "IS_SELECTED": false }, {
  "NAME": "Error",
  "VALUE": "441",
  "IS_SELECTED": false
}, { "NAME": "Japan Young", "VALUE": "489", "IS_SELECTED": false }, {
  "NAME": "Mega Seoul",
  "VALUE": "519",
  "IS_SELECTED": false
}, { "NAME": "Twain", "VALUE": "621", "IS_SELECTED": false }, {
  "NAME": "J. Verne",
  "VALUE": "623",
  "IS_SELECTED": false
}, { "NAME": "J. Austine", "VALUE": "625", "IS_SELECTED": false }, {
  "NAME": "Orwell",
  "VALUE": "627",
  "IS_SELECTED": false
}, { "NAME": "Marquez", "VALUE": "629", "IS_SELECTED": false }, {
  "NAME": "Steven King",
  "VALUE": "631",
  "IS_SELECTED": false
}, { "NAME": "Saturn", "VALUE": "633", "IS_SELECTED": false }, {
  "NAME": "Jerusalem Plus",
  "VALUE": "893",
  "IS_SELECTED": false
}, { "NAME": "Madrid Plus", "VALUE": "895", "IS_SELECTED": false }, {
  "NAME": "Seoulchik Plus",
  "VALUE": "897",
  "IS_SELECTED": false
}, { "NAME": "Seoul Plus", "VALUE": "899", "IS_SELECTED": false }, {
  "NAME": "Zeus",
  "VALUE": "983",
  "IS_SELECTED": false
}, { "NAME": "Poseidon", "VALUE": "985", "IS_SELECTED": false }, {
  "NAME": "Artemis",
  "VALUE": "987",
  "IS_SELECTED": false
}, { "NAME": "Apollo", "VALUE": "989", "IS_SELECTED": false }, {
  "NAME": "Athens",
  "VALUE": "991",
  "IS_SELECTED": false
}, { "NAME": "Hermes", "VALUE": "993", "IS_SELECTED": false }, {
  "NAME": "Hephaestus",
  "VALUE": "995",
  "IS_SELECTED": false
}, { "NAME": "Heracles", "VALUE": "997", "IS_SELECTED": false }]
  .map(level => {
    level.label = level["NAME"]
    level.value = level["VALUE"]
    return level
  });
export const bitrix_formats = [{
  "NAME": "online",
  "VALUE": "601",
  "IS_SELECTED": false
}, { "NAME": "offline", "VALUE": "603", "IS_SELECTED": true }, { "NAME": "не выбрано", "VALUE": "", "IS_SELECTED": false }]
  .map(level => {
    level.label = level["NAME"]
    level.value = level["VALUE"]
    return level
  });
