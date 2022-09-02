import React from 'react';
import { groupColumnNames } from "../constants";
import EnhancedTable from "./CustomTableComponent";
import { useFetching } from "../hooks/useFetching";
import { useEffect, useState } from "react";

const GroupsComponent = ({ lessonConfig, records, setRecords, setIsLoad, controller}) => {

  const tableLabel = lessonConfig.lessonType;
  const handleSetRecordSkills = async (recordSkills) => {
    setIsLoad(true);
    // if (recordSkills) {
    //   // TODO push data=
    //   const group = groups.find(group => group.id === recordSkills)
    //   await controller.saveToGroup(group)
    //   setRecords({ ...records, [lessonConfig.lessonType]: {id: recordSkills, label: group.labelStr} })
    // } else {
    //   // TODO find group ID
    //   if(records[lessonConfig.lessonType].isOld){
    //     // TODO find by name
    //     alert('ещё не прикрутили')
    //   }else{
    //     await controller.deleteFromGroup(records[lessonConfig.lessonType].id)
    //     setRecords({ ...records, [lessonConfig.lessonType]: {} })
    //   }
    //
    // }
    setIsLoad(false)

  }


  const [groups, setGroups] = useState([]); //groupLessons
  const [fetchGroups, isGroupsLoading, groupsErr] = useFetching(async (level) => {

    const groups = await controller.getGroups(level)
    setGroups(groups);
    controller.setListCustomersInGroups(groups)
      .then(newGroups => setGroups(newGroups))
  })

  useEffect(() => {
    fetchGroups(lessonConfig.level)
  }, [lessonConfig.level])

  useEffect(() => {
   if(isGroupsLoading){
     setIsLoad(true)
   }else{
     setIsLoad(false)
   }
  }, [isGroupsLoading])

  if(!groups || groups.length === 0){
    return <div>ПУСТО</div>
  }

  return (<div>
    <EnhancedTable
      recordObj={records?.[lessonConfig.lessonType]}
      setRecord={handleSetRecordSkills}
      columns={groupColumnNames}
      rows={[...groups.filter(item => item?.custom_typeoflessons_ === (lessonConfig.lessonFormat === "online" ? "Онлайн" : "Офлайн"))]}
        // ...groups.filter(item => item?.custom_typeoflessons_ === (lessonConfig.lessonFormat === "online" ? "online" : "offline"))
      tableLabel={tableLabel}
    />

  </div>);
}


export default GroupsComponent;
