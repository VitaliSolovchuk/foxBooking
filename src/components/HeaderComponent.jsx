import React, { useState } from 'react';
import SelectComponent from "./SelectComponent";
import { lessonFormatValues, lessonTypeValues } from "../constants";
import { Button, Checkbox, TextField } from "@mui/material";

const HeaderComponent = ({lessonConfig, setLessonConfig}) => {

  const [isCustomize, setIsCustomize] = useState(false);

  const handleLessonFormat = (value) => {
    setLessonConfig({ ...lessonConfig, lessonFormat: value });
  };
  const handleLessonType = (value) => {
    setLessonConfig({ ...lessonConfig, lessonType: value });
  };

  const handleGetTimetable = (event) => {
    event.preventDefault();
    // useFetching
    // TODO loader
    // TODO check config
    // делаем запрос по параметрам
    // fetchGroups().then(console.log)
  };

  const handlesCustomize = () => {
    setIsCustomize(!isCustomize)
  };


  return (
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
  );
};

export default HeaderComponent;
