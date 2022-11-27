import PageTitle from "../../../components/ui/PageTitle";
import React from "react"
import SurveyResponse from "../../../components/ui/survey/SurveyResponse";

const Basic = () => {
    return (
        <div>
            <PageTitle title="Basic 설문 응답"/>
            <div className="mx-8">
                <SurveyResponse/>
            </div>
        </div>
    );
};

export default Basic;
