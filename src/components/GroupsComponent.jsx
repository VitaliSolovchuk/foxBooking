import React from 'react';
import { groupColumnNames } from "../constants";
import EnhancedTable from "./CustomTableComponent";
import { useFetching } from "../hooks/useFetching";
import { useEffect, useState } from "react";

const GroupsComponent = ({ lessonConfig, records, setRecords, setIsLoad, controller}) => {

  const tableLabel = lessonConfig.lessonType;
  const handleSetRecordSkills = async (recordSkills) => {
    setIsLoad(true);
    if (recordSkills) {
      const group = groups.find(group => group.id === recordSkills)
      await controller.saveToGroup(group, lessonConfig.lessonType)
      setRecords({ ...records, [lessonConfig.lessonType]: {id: recordSkills, label: group.labelStr} })
    } else {
      if(records[lessonConfig.lessonType].isOld){
        await controller.deleteFromGroupWithoutGroupId(records[lessonConfig.lessonType].name, lessonConfig.lessonType, groups)
        setRecords({ ...records, [lessonConfig.lessonType]: {} })
      }else{
        await controller.deleteFromGroup(records[lessonConfig.lessonType].id, lessonConfig.lessonType)
        setRecords({ ...records, [lessonConfig.lessonType]: {} })
      }

    }

    // if (recordSkills) {
    //   console.log(await controller.getAllGroupsTest())
    // }
    setIsLoad(false)

  }


  const [groups, setGroups] = useState([]); //groupLessons
  const [fetchGroups, isGroupsLoading, groupsErr] = useFetching(async (level) => {

    const groups = await controller.getGroups(level)

    if(records[lessonConfig.lessonType].isOld){
      const groupCustomer = groups
        .filter( gr => gr.name === records[lessonConfig.lessonType].name)
      if(groupCustomer.length === 1){
        setRecords({ ...records, [lessonConfig.lessonType]: {...records[lessonConfig.lessonType], id: groupCustomer[0].id} })
      }
    }

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
