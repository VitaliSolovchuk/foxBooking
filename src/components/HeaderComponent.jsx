import React, { useState } from 'react';
import SelectComponent from "./SelectComponent";
import { lessonFormatValues, lessonTypeValues } from "../constants";
import { Checkbox, TextField } from "@mui/material";

const HeaderComponent = ({lessonConfig, setLessonConfig}) => {

  const [isCustomize, setIsCustomize] = useState(false);

  const handleLessonFormat = (value) => {
    setLessonConfig({ ...lessonConfig, lessonFormat: value });
  };
  const handleLessonType = (value) => {
    setLessonConfig({ ...lessonConfig, lessonType: value });
  };

  const handleLessonAge = (event) => {
    setLessonConfig({ ...lessonConfig, age: +event.target.value });
  };

  const handleLessonLevel = (value) => {
    setLessonConfig({ ...lessonConfig, levelId: value, level: lessonConfig.bitrixLevels.find(lv => lv.ID === value).VALUE});
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
          defaultValue={lessonConfig.age || 0}
          variant="standard"
          type="number"
          onChange={handleLessonAge}
        />
      </div>
      <div style={{ paddingInline: '1%' }}>
        <SelectComponent
          disabled={!isCustomize}
          name="Уровень знаний"
          value={lessonConfig.levelId}
          setValue={handleLessonLevel}
          values={lessonConfig.bitrixLevels}
        />
      </div>

      {/*<Button variant="contained" onClick={handleGetTimetable}>Get timetable</Button>*/}
      <Checkbox onChange={handlesCustomize} name="Label" checked={isCustomize}/>

    </header>
  );
};

export default HeaderComponent;
