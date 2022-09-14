import React from 'react';
import { trialColumnNames } from "../constants";
import EnhancedTable from "./CustomTableComponent";
import { useFetching } from "../hooks/useFetching";
import { useEffect, useState } from "react";
import StaticDatePickerDemo from "./UI/StaticDatePickerDemo";

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

    const lessons = await controller.getLessons()
    setGroups(lessons);
  })

  useEffect(() => {
    fetchGroups()
  }, [])

  useEffect(() => {
   if(isGroupsLoading){
     setIsLoad(true)
   }else{
     setIsLoad(false)
   }
  }, [isGroupsLoading])

  // useEffect(() => {
  //   if(isGroupsLoading){
  //     setIsLoad(true)
  //   }else{
  //     setIsLoad(false)
  //   }
  // }, [lessonAge])

  if(!groups || groups.length === 0){
    return <div>ПУСТО</div>
  }

  const lessons = [...groups
    .filter(item => item?.formatStr === lessonFormat)
    .filter(item => {
      const lessonNote = item.note

      if (lessonNote.includes('+') && lessonAge === 0) {
        return true
      }

      if (lessonNote.includes('-')) {
        let [start, finish] = lessonNote.split('-').map(item => parseInt(item))
        return lessonAge >= start && (lessonAge <= finish || finish === undefined);
      }
    })
  ]
  return (<div style={{display: "flex"}}>
    <EnhancedTable
      recordObj={records?.[lessonType]}
      setRecord={handleSetRecordSkills}
      columns={trialColumnNames}
      rows={lessons.filter(ls => new Date(ls.date).toISOString().split('T')[0] === new Date(date).toISOString().split('T')[0])}
      tableLabel={tableLabel}
    />
    <div style={{'paddingLeft': "1.4%"}}>
      <StaticDatePickerDemo lessons={lessons} setDate={setDate}/>
    </div>
    {/*{groupsErr && <div>ОШИБКА</div>}*/}
    {/*{isGroupsLoading && <div>ОШИБКА</div>}*/}
  </div>);
}


export default TrialLessensComponent;
