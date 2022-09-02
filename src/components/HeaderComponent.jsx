import React, { useState } from 'react';
import SelectComponent from "./SelectComponent";
import { bitrix_levels, lessonFormatValues, lessonTypeValues } from "../constants";
import { Button, Checkbox, TextField } from "@mui/material";

const HeaderComponent = ({lessonConfig, setLessonConfig}) => {

  const [isCustomize, setIsCustomize] = useState(false);

  const handleLessonFormat = (value) => {
    setLessonConfig({ ...lessonConfig, lessonFormat: value });
  };
  const handleLessonType = (value) => {
    setLessonConfig({ ...lessonConfig, lessonType: value });
  };

  const handleLessonAge = (value) => {
    setLessonConfig({ ...lessonConfig, age: value });
  };

  const handleLessonLevel = (value) => {
    setLessonConfig({ ...lessonConfig, levelId: value, level: (bitrix_levels.find(lv => lv.value === value)).label});
  };

  const handleGetTimetable = (event) => {
    event.preventDefault();
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
          defaultValue={lessonConfig.age || "Возраст"}
          variant="standard"
          onChange={handleLessonAge}
        />
      </div>
      <div style={{ paddingInline: '1%' }}>
        <SelectComponent
          disabled={!isCustomize}
          name="Уровень знаний"
          value={lessonConfig.levelId}
          setValue={handleLessonLevel}
          values={bitrix_levels}
        />
      </div>

      {/*<Button variant="contained" onClick={handleGetTimetable}>Get timetable</Button>*/}
      <Checkbox onChange={handlesCustomize} name="Label" checked={isCustomize}/>

    </header>
  );
};

export default HeaderComponent;
