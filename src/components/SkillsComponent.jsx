import React from 'react';
import { groupColumnNames } from "../constants";
import EnhancedTable from "./CustomTableComponent";
import { useFetching } from "../hooks/useFetching";
import { useEffect, useState } from "react";

const SkillsComponent = ({ lessonType, lessonFormat, records, setRecords, setIsLoad, controller}) => {

  const tableLabel = lessonType;
  const handleSetRecordSkills = async (recordSkills) => {
    setIsLoad(true);
    if (recordSkills) {
      // TODO push data=
      await controller.saveToGroup(groups.find(group => group.id === recordSkills))
      setRecords({ ...records, [lessonType]: recordSkills })
    } else {
      // TODO push data
      await controller.deleteFromGroup(groups.find(group => group.id === records[lessonType]))
      setRecords({ ...records, [lessonType]: null })
    }
    setIsLoad(false)

  }


  const [groups, setGroups] = useState([]); //groupLessons
  const [fetchGroups, isGroupsLoading, groupsErr] = useFetching(async () => {

    const groups = await controller.getSkillGroups()
    setGroups(groups);
  })

  useEffect(() => {
    fetchGroups()
  }, [])

  // useEffect(() => {
  //  if(isGroupsLoading){
  //    setIsLoad(true)
  //  }else{
  //    setIsLoad(false)
  //  }
  // }, [isGroupsLoading])

  if(!groups || groups.length === 0){
    return <div></div>
  }

  return (<div>
    <EnhancedTable
      record={records?.[lessonType]}
      setRecord={handleSetRecordSkills}
      columns={groupColumnNames}
      rows={[...groups.filter(item => item?.custom_typeoflessons_ === (lessonFormat === "online" ? "Онлайн" : "Офлайн"))]}
      tableLabel={tableLabel}
    />

    {groupsErr && <div>ОШИБКА</div>}
    {isGroupsLoading && <div>ОШИБКА</div>}
  </div>);
}


export default SkillsComponent;
