import React from 'react';
import { groupColumnNames, groupLessons } from "../constants";
import EnhancedTable from "./CustomTableComponent";
import { useFetching } from "../hooks/useFetching";
import { useEffect, useState } from "react";
import Controller from "../controllers/Controller";

const SkillsComponent = ({ lessonType, lessonFormat, records, setRecords, setIsLoad}) => {

  const tableLabel = lessonType;
  const handleSetRecordSkills = (recordSkills) => {
    if (recordSkills) {
      setRecords({ ...records, [lessonType]: recordSkills })
      // TODO push data
      // push in alfa
      // push in bitrix
    } else {
      setRecords({ ...records, [lessonType]: null })
      // TODO push data
    }

  }


  const [groups, setGroups] = useState([]); //groupLessons
  const [fetchGroups, isGroupsLoading, groupsErr] = useFetching(async () => {

    const controller = await Controller
    const groups = await controller.getSkillGroups()
    console.log('useFetching', controller.ALFA_TOKEN)
    console.log(groups)
    setGroups(groups);
    return "fetchGroups ended"
  })

  useEffect(() => {
    fetchGroups().then(console.log)
  }, [])

  useEffect(() => {
   if(isGroupsLoading){
     setIsLoad(true)
   }else{
     setIsLoad(false)
   }
  }, [isGroupsLoading])

  if(!groups || groups.length === 0){
    return <div></div>
  }

  // console.log({
  //   record: records?.lessonType,
  //   setRecord: handleSetRecordSkills,
  //   columns: groupColumnNames,
  //   values: groups,
  //   tableLabel,
  // })
  // console.log([...groups.filter(item => item?.custom_typeoflessons_ === (lessonFormat === "online" ? "Онлайн" : "Офлайн"))])
  // console.log(groups)
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
