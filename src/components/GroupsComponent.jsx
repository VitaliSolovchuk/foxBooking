import React from 'react';
import { groupColumnNames } from "../constants";
import EnhancedTable from "./UI/CustomTableComponent";
import { useFetching } from "../hooks/useFetching";
import { useEffect, useState } from "react";
import { useGroups } from "../hooks/userMemoFiltration";

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
    setIsLoad(false)

  }


  const [groups, setGroups] = useState([]); //groupLessons
  const [fetchGroups, isGroupsLoading, groupsErr] = useFetching(async (level) => {

    const groups = await controller.getGroups(level)

    setIsLoad(true)
    setGroups(groups);
    controller.setListCustomersInGroups(groups)
      .then(newGroups => setGroups(newGroups))
    setIsLoad(false)
  })

  useEffect(() => {
    fetchGroups(lessonConfig.level)

  }, [lessonConfig.level])

  const memoizedValue = useGroups(groups, lessonConfig.lessonFormat)

  if(isGroupsLoading){
    return <div>Загрузка</div>
  }

  if(!memoizedValue || memoizedValue.length === 0){
    return <div>ПУСТО</div>
  }


  return (<div>
    <EnhancedTable
      recordObj={records?.[lessonConfig.lessonType]}
      setRecord={handleSetRecordSkills}
      columns={groupColumnNames}
      rows={memoizedValue}
      tableLabel={tableLabel}
    />

  </div>);
}


export default GroupsComponent;
