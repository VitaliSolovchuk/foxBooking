import { useMemo } from "react";

export const useGroups = (groups, format, fieldName = 'custom_typeoflessons_') => {
  return useMemo(() =>
    {
      if(!format || format === 'all'){
        return [...groups]
      }

      if(format === "offline"){
        return [...groups
          .filter(item => item[fieldName] === 'Офлайн' || item[fieldName] === "offline")];
      }

      return [...groups
        .filter(item => item[fieldName] !== 'Офлайн' && item[fieldName] !== "offline")];
    },
    [format, groups]);
}

export const useLessons = (groups, format, fieldName, lessonAge) => {
  const byFormat = useGroups(groups, format, fieldName)

  return useMemo(() => {
      return byFormat.filter(item => {
        const lessonNote = item.note

        if (lessonNote.includes('+') && lessonAge === 0) {
          return true
        }

        if (lessonNote.includes('-')) {
          let [start, finish] = lessonNote.split('-').map(item => parseInt(item))
          return lessonAge >= start && (lessonAge <= finish || finish === undefined);
        }
      })
    },
    [byFormat, lessonAge]);
}

// TODO lessonConfig.lessonFormat === "online" ? "online" : "offline")
