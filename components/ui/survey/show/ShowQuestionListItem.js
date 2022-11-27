import Checkbox from "./Checkbox";
import Date from "./Date";
import Dropbox from "./Dropbox";
import File from "./File";
import Objective from "./Objective";
import Rating from "./Rating";
import Subjective from "./Subjective";
import Video from "./Video";
import Voice from "./Voice";

const ShowQuestionListItem = ({ qId, qTitle, qInfo, qType, qImage, qVideo, qisMulti, qContents, svyRespContents, setSvyRespContents, qNumber, isModify}) => {

    function questionAsType() {
        switch (qType) {
            case 'Checkbox':
                return <Checkbox qId={qId} qTitle={qTitle} qInfo={qInfo} qContents={qContents} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} qNumber={qNumber} isModify={isModify}/>
            case 'Date':
                return <Date qId={qId} qTitle={qTitle} qInfo={qInfo} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} qNumber={qNumber}  isModify={isModify}/>
            case 'Dropbox':
                return <Dropbox qId={qId} qTitle={qTitle} qInfo={qInfo} qContents={qContents} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} qNumber={qNumber} isModify={isModify}/>
            case 'File':
                return <File qId={qId} qTitle={qTitle} qInfo={qInfo} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} qNumber={qNumber} isModify={isModify}/>
            case 'Objective':
                return <Objective qId={qId} qTitle={qTitle} qInfo={qInfo} qContents={qContents} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} qNumber={qNumber} isModify={isModify}/>
            case 'Rating':
                return <Rating qId={qId} qTitle={qTitle} qInfo={qInfo} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} qNumber={qNumber} isModify={isModify}/>
            case 'Subjective':
                return <Subjective qId={qId} qTitle={qTitle} qInfo={qInfo} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} qNumber={qNumber} isModify={isModify}/>
            case 'Voice':
                return <Voice qId={qId} qTitle={qTitle} qInfo={qInfo} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} qNumber={qNumber} isModify={isModify}/>
            case 'Video':
                return <Video qId={qId} qTitle={qTitle} qInfo={qInfo} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} isModify={isModify}/>
        }
    }

    return (
        <div>
            {questionAsType()}
        </div>
    )
};
export default ShowQuestionListItem;