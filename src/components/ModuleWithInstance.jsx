import React, { useState } from 'react';
import SkillsComponent from "./SkillsComponent";
import HeaderComponent from "./HeaderComponent";

const ModuleWithInstance = ({controller, setIsLoad}) => {


  const [lessonConfig, setLessonConfig] = useState({ lessonFormat: "", lessonType: "" });

  const records2 = controller.getRecords()
  const [records, setRecords] = useState(records2); //{ skills: {id: "", name: ""} }

  return (<div className="App">
    <HeaderComponent
      lessonConfig={lessonConfig}
      setLessonConfig={setLessonConfig}
    />

    <div className="App-body">
      <div style={{ padding: '2%' }}>
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
    </div>

  </div>)
};

export default ModuleWithInstance;
