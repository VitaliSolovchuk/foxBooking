import React, { useState } from 'react';
import AlfaService from "../api/AlfaService";
import SkillsComponent from "./SkillsComponent";
import HeaderComponent from "./HeaderComponent";

const ModuleWithInstance = ({Controller, setIsLoad}) => {


  const [lessonConfig, setLessonConfig] = useState({ lessonFormat: "", lessonType: "" });

  const [records, setRecords] = useState({ skills: 1018 });


  async function fetch() {
    const response = await AlfaService.getToken()
    console.log(response.data)
  }


  return (<div className="App">
    <HeaderComponent
      lessonConfig={lessonConfig}
      setLessonConfig={setLessonConfig}
    ></HeaderComponent>

    {/*lessonConfig.lessonType === 'skills' && lessonConfig.lessonFormat &&  groups.length &&*/}
    <div style={{ padding: '1%' }}>
      {lessonConfig.lessonType === 'skills' && lessonConfig.lessonFormat && <SkillsComponent
        lessonType={lessonConfig.lessonType}
        lessonFormat={lessonConfig.lessonFormat}
        records={records}
        setRecords={setRecords}
        Controller={Controller}
        setIsLoad={setIsLoad}
        // groups={[...groups].filter(item => item.lessonFormat === lessonConfig.lessonFormat)}
      />}

        {lessonConfig.lessonType === 'skills' && "SKILS"
        }

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
