import './App.css';
import SelectComponent from "./components/SelectComponent";
import React, { useState } from "react";
import { Button, Checkbox, TextField } from "@mui/material";
import TableComponent from "./components/TableComponent";
import AlfaService from "./api/AlfaService";
import EnhancedTable from "./components/CustomTableComponent";
import { groupColumnNames, groupLessons, lessonFormatValues, lessonTypeValues, trialLessons } from "./constants";

function App() {


  const [isCustomize, setIsCustomize] = useState(false);
  const handlesCustomize = () => {
    setIsCustomize(!isCustomize)
  };


  const [lessonConfig, setLessonConfig] = useState({ lessonFormat: "", lessonType: "" });
  const handleLessonFormat = (value) => {
    setLessonConfig({ ...lessonConfig, lessonFormat: value });
  };
  const handleLessonType = (value) => {
    setLessonConfig({ ...lessonConfig, lessonType: value });
  };

  const handleGetTimetable = (event) => {
    event.preventDefault();
    console.log("event");
    // TODO loader
    // TODO check config
    // делаем запрос по параметрам
    // fetchGroups().then()
  };

  const [lessons, setLessons] = useState(trialLessons);
  const [groups, setGroups] = useState(groupLessons);
  const [records, setRecords] = useState({skills: 1018});
  const handleSetRecordSkills = (event, eventType, value) => {
    console.log("event handleSetRecordSkills", eventType, event);
    if(eventType === 'delete'){
      setRecords({...records, skills: null})
    }

    if(eventType === 'set'){
      setRecords({...records, skills: value})
    }
  };

  async function fetchGroups() {
    const data = {
      "status_id": 2, "note": "long-term"
    }
    const response = await AlfaService.getGroups(data)
    console.log(response.data)

    const response2 = await AlfaService.getLessons({
      "lesson_type_id": 3, "status": 1, "lessonFormat": lessonConfig.lessonFormat
    })
    console.log(response2.data)
  }

  return (<div className="App">
    <header className="App-header">

      <SelectComponent
        name="lesson format"
        value={lessonConfig.lessonFormat}
        setValue={handleLessonFormat}
        values={lessonFormatValues}
      />

      <SelectComponent
        name="lesson type"
        value={lessonConfig.lessonType}
        setValue={handleLessonType}
        values={lessonTypeValues}
      />

      <div style={{ paddingInline: '1%' }}>
        <TextField
          disabled={!isCustomize}
          id="standard-disabled"
          label="Age"
          defaultValue="Возраст"
          variant="standard"
        />
      </div>
      <div style={{ paddingInline: '1%' }}>
        <TextField
          disabled={!isCustomize}
          id="standard-disabled"
          label="Level"
          defaultValue="Уровень знаний"
          variant="standard"
        />
      </div>

      <Button variant="contained" onClick={handleGetTimetable}>Get timetable</Button>
      <Checkbox onChange={handlesCustomize} name="Label" checked={isCustomize}/>

    </header>


    <div style={{ padding: '1%' }}>
      {lessonConfig.lessonType === 'skills' && <EnhancedTable
        record={records[lessonConfig.lessonType]}
        setRecord={handleSetRecordSkills}
        columns={groupColumnNames}
        values={groups}
        tableLabel={lessonConfig.lessonType}
      />}

      {/*        {lessonConfig.lessonType === 'group' &&
          <TableComponent clumns={groupColumnNames} values={groups}></TableComponent>
        }

        {lessonConfig.lessonType === 'trial' &&
          <TableComponent clumns={trialColumnNames} values={lessons}></TableComponent>
        }*/}

    </div>
  </div>);
}

export default App;
