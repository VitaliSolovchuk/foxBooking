import React, { useState } from 'react';
import SkillsComponent from "./SkillsComponent";
import HeaderComponent from "./HeaderComponent";

const ModuleWithInstance = ({controller, setIsLoad}) => {


  const [lessonConfig, setLessonConfig] = useState({ lessonFormat: "", lessonType: "" });

  const [records, setRecords] = useState({ skills: '' });

  return (<div className="App">
    <HeaderComponent
      lessonConfig={lessonConfig}
      setLessonConfig={setLessonConfig}
    />

    <div style={{ padding: '1%' }}>
      {lessonConfig.lessonType === 'skills' && lessonConfig.lessonFormat && <SkillsComponent
        lessonType={lessonConfig.lessonType}
        lessonFormat={lessonConfig.lessonFormat}
        records={records}
        setRecords={setRecords}
        controller={controller}
        setIsLoad={setIsLoad}
      />}

      {/*        {lessonConfig.lessonType === 'group' &&
          <TableComponent clumns={groupColumnNames} values={groups}></TableComponent>
        }

        {lessonConfig.lessonType === 'trial' &&
          <TableComponent clumns={trialColumnNames} values={lessons}></TableComponent>
        }*/}

    </div>
  </div>)
};

export default ModuleWithInstance;
