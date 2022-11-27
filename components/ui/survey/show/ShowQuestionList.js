import ShowQuestionListItem from "./ShowQuestionListItem";
import {useState} from "react";

const ShowQuestionList = (props) => {

    // 설문지에 매겨질 질문 번호
    // const [questionNum,setNum] = useState(1);

    return (
        <div>
            {props.svyContents.svyContent && props.svyContents.svyContent.map((question, idx) => (
                <ShowQuestionListItem key={question.qId}
                    qId={question.qId}
                    qTitle={question.qTitle}
                    qInfo={question.qInfo}
                    qType={question.qType}
                    qImage={question.qImage}
                    qVideo={question.qVideo}
                    qIsMulti={question.isMulti}
                    qContents={question.qContents}
                    svyRespContents={props.svyRespContents}
                    setSvyRespContents={props.setSvyRespContents}
                    qNumber={idx+1}
                    isModify = {props.isModify}/>
            ))}
        </div>
    );
};
export default ShowQuestionList;