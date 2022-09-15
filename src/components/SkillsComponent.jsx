import React from 'react';
import { groupColumnNames } from "../constants";
import EnhancedTable from "./UI/CustomTableComponent";
import { useFetching } from "../hooks/useFetching";
import { useEffect, useState } from "react";
import { useGroups } from "../hooks/userMemoFiltration";

const SkillsComponent = ({ lessonType, lessonFormat, records, setRecords, setIsLoad, controller}) => {

  const tableLabel = lessonType;
  const handleSetRecordSkills = async (recordSkills) => {
    setIsLoad(true);
    if (recordSkills) {
      // TODO push data=
      const group = groups.find(group => group.id === recordSkills)
      await controller.saveToGroup(group, lessonType)
      setRecords({ ...records, [lessonType]: {id: recordSkills, label: group.labelStr} })
    } else {
        await controller.deleteFromGroup(records[lessonType].id, lessonType)
        setRecords({ ...records, [lessonType]: {} })
      }

    setIsLoad(false)

  }


  const [groups, setGroups] = useState([]); //groupLessons
  const [fetchGroups, isGroupsLoading, groupsErr] = useFetching(async () => {

    setIsLoad(true)
    const groups = await controller.getSkillGroups()
    setGroups(groups);
    controller.setListCustomersInGroups(groups)
      .then(newGroups => setGroups(newGroups))
    setIsLoad(false)
  })

  useEffect(() => {
    fetchGroups()
  }, [])


  const memoizedValue = useGroups(groups, lessonFormat)

  if(!memoizedValue || memoizedValue.length === 0){
    return <div>ПУСТО</div>
  }

  if(isGroupsLoading){
    return <div>Загрузка</div>
  }

  return (<div>
    <EnhancedTable
      recordObj={records?.[lessonType]}
      setRecord={handleSetRecordSkills}
      columns={groupColumnNames}
      rows={memoizedValue}
      tableLabel={tableLabel}
    />
  </div>);
}


export default SkillsComponent;
