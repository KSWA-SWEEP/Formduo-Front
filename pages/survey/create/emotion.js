import PageTitle from "../../../components/ui/PageTitle";
import React from "react";
import EmotionSurveyCreate from "../../../components/ui/survey/EmotionSurveyCreate";


const Basic = () => {
    return (
        <div>
            <PageTitle title="발화 분석 설문 제작"/>
            <div className="mx-3 sm:mx-8">
                <EmotionSurveyCreate/>
            </div>
        </div>
    );
};

export default Basic;
