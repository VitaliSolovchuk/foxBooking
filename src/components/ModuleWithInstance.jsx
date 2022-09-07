import React, { useState } from 'react';
import SkillsComponent from "./SkillsComponent";
import HeaderComponent from "./HeaderComponent";
import GroupsComponent from "./GroupsComponent";
import TrialLessensComponent from "./TrialLessensComponent";

const ModuleWithInstance = ({controller, isLoad, setIsLoad}) => {


  const getRecords = controller.getRecords()
  const getDealConfig = controller.getDealConfig()
  const [lessonConfig, setLessonConfig] = useState(getDealConfig);//{ lessonFormat: "", lessonType: "" }
  const [records, setRecords] = useState(getRecords); //{ skills: {id: "", name: ""} }

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

        {lessonConfig.lessonType === 'group' && lessonConfig.lessonFormat && <GroupsComponent
          lessonConfig={lessonConfig}
          records={records}
          setRecords={setRecords}
          controller={controller}
          setIsLoad={setIsLoad}
        />}


        {lessonConfig.lessonType === 'trial' && <TrialLessensComponent
          lessonType={lessonConfig.lessonType}
          lessonFormat={lessonConfig.lessonFormat}
          lessonAge={lessonConfig.age}
          records={records}
          setRecords={setRecords}
          controller={controller}
          setIsLoad={setIsLoad}
        />}

      </div>
    </div>

  </div>)
};

export default ModuleWithInstance;
