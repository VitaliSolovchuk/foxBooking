import React from 'react';
import { trialColumnNames } from "../constants";
import EnhancedTable from "./UI/CustomTableComponent";
import { useFetching } from "../hooks/useFetching";
import { useEffect, useState } from "react";
import StaticDatePickerDemo from "./UI/StaticDatePickerDemo";
import { useLessons } from "../hooks/userMemoFiltration";

const TrialLessensComponent = ({ lessonType, lessonFormat, lessonAge, records, setRecords, setIsLoad, controller}) => {

  const tableLabel = lessonType;
  const handleSetRecordSkills = async (recordSkills) => {
    setIsLoad(true);
    if (recordSkills) {
      const group = groups.find(group => group.id === recordSkills)
      await controller.saveToLessen(recordSkills)
      setRecords({ ...records, [lessonType]: {id: recordSkills, label: group.label} })
    } else {
        await controller.deleteFromLessen(records[lessonType].id)
        setRecords({ ...records, [lessonType]: {} })
      }

    setIsLoad(false)

  }

  const [date, setDate] = useState(Date());
  const [groups, setGroups] = useState([]); //groupLessons
  const [fetchGroups, isGroupsLoading, groupsErr] = useFetching(async () => {

    setIsLoad(true)
    const lessons = await controller.getLessons()
    setGroups(lessons);
    setIsLoad(false)
  })

  useEffect(() => {
    fetchGroups()
  }, [])


  const lessons = useLessons(groups, lessonFormat, 'formatStr', lessonAge)

  if(isGroupsLoading){
    return <div>Загрузка</div>
  }

  if(!lessons || lessons.length === 0){
    return <div>ПУСТО</div>
  }


  return (<div style={{display: "flex"}}>
    <EnhancedTable
      recordObj={records?.[lessonType]}
      setRecord={handleSetRecordSkills}
      columns={trialColumnNames}
      rows={lessons.filter(ls => equalDay(ls.date, date))}
      tableLabel={tableLabel}
    />
    <div style={{'paddingLeft': "1.4%"}}>
      <StaticDatePickerDemo lessons={lessons} setDate={setDate}/>
    </div>
  </div>);
}
const equalDay = (day1, day2) => {
  return new Date(day1).toISOString().split('T')[0] === new Date(day2).toISOString().split('T')[0]
}

export default TrialLessensComponent;
