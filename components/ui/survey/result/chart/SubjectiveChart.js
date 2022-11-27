import { useRecoilState } from "recoil";
import { subjAnsState } from "../../../../../atoms/subjAns"
import SubjectiveList from "./SubjectiveList";

export default function SubjectiveChart() {

    const [subjAns, setSubjAns] = useRecoilState(subjAnsState);

    return (
        <div>
            {/* {JSON.stringify(subjAns)} */}
            <div className="ml-20 mr-20 mb-5">
                {typeof(JSON.parse(JSON.stringify(subjAns))) != 'object' && Object.keys(JSON.parse(JSON.parse(JSON.stringify(subjAns)))).map(key => {
                    // console.log("This is key: " + key)
                    // console.log("This is  value: " + JSON.parse(JSON.parse(JSON.stringify(subjAns)))[key])
                    return JSON.parse(JSON.parse(JSON.stringify(subjAns)))[key] != "" ?
                        <SubjectiveList num={key} value={JSON.parse(JSON.parse(JSON.stringify(subjAns)))[key]} />
                        : <></>
                    }
                )}
            </div>
        </div>
    )
}