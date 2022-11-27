import BarChart from './chart/BarChart';
import SubjectiveChart from './chart/SubjectiveChart';

export default function SurveyAnalysis(props) {

    return (
        <div>
            <div className="overflow-auto bg-white rounded-md shadow-lg max-h-500 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                 {/*{chartTypes.map((type) => {return (<Chart props={type} />)})} */}
                 <h1 className="px-4 text-xl font-extrabold mt-10 text-neutral-600 dark:text-fdyellowlight" data-testid="title">
                    선택지 답변 조회
                </h1>
                <BarChart resContents={props.resContents}/>
                <hr/>
                <h1 className="px-4 text-xl font-extrabold mt-10 text-neutral-600 dark:text-fdyellowlight" data-testid="title">
                    주관식 답변 조회
                </h1>
                <SubjectiveChart/>
            </div>

        </div>
    );
}