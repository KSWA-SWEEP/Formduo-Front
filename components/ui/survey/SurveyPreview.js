import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useRouter } from 'next/router'
import ShowQuestionList from "./show/ShowQuestionList";
import SurveyTitleShow from "./SurveyTitleShow";

export default function SurveyPreview(props) {

    const [svyContents, setSvyContents] = useState(props.svyContents);
    const [svyRespContents, setSvyRespContents] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [preURL, setPreURL] = useState(props.preURL);
    const [svyType, setSvyType] = useState(props.svyType);
    const router = useRouter();

    useEffect(() => {
        if (!props.svyResContents) {
            initResContents();
            // initPreURL();
        }
        else {
            setSvyRespContents(props.svyResContents);
        }
    }, [])

    // 설문 응답 포맷 초기화
    function initResContents() {
        let resContent = [];
        let newList = [];
        svyContents.svyContent && svyContents.svyContent.map(question => {
            resContent = { qId: question.qId, qType: question.qType, ansVal: [{ qContentId: "", resp: "" }] }
            newList = [...newList, resContent];
            setSvyRespContents(newList);
        })
    }

    if (isLoading) return <div>Loading</div>;
    if (!svyContents || !svyRespContents || !preURL) return <div>Data is not exist.</div>;
    return (
        <div>
            {/* 제목 입력 */}
            <SurveyTitleShow bgColor="bg-fdyellowbright"
                svyTitle={svyContents.svyTitle}
                svyIntro={svyContents.svyIntro}
            />
            {/* 질문 목록 */}
            <ShowQuestionList svyContents={svyContents} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} isModify={props.isModify} />

            <div className="flex justify-center mx-2 rounded-md m-7 ">
                <a onClick={() => router.push({
                    pathname: preURL
                })}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-400 border border-transparent rounded-md hover:bg-blue-500"
                >
                    뒤로가기
                </a>
            </div>
        </div>
    );
};


