import PageTitle from "../../../components/ui/PageTitle";
import React from "react";
import BasicSurveyCreate from "../../../components/ui/survey/BasicSurveyCreate";


const Basic = () => {
    return (
        <div>
            <PageTitle title="Basic 설문 제작"/>
            <div className="mx-3 sm:mx-8">
                <BasicSurveyCreate/>
            </div>
        </div>
    );
};

export default Basic;
