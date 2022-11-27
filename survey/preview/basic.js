import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import PageTitle from '../../../components/ui/PageTitle';
import SurveyPreview from "../../../components/ui/survey/SurveyPreview";
import axios from "axios";
import { useRecoilState } from "recoil";
import { glbSvyContentsState } from "../../../atoms/glbSvyContents.js";
import {accToken} from "../../../atoms/accToken";
import checkAccessToken from '../../../components/func/checkAccessToken';

// 설문 참여 페이지
const BasicPreview = () => {
    const router = useRouter();
    const [query, setQuery] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [svyContents, setSvyContents] = useState(null);
    const [svyResContents, setSvyResContents] = useState(null);
    const [isModify, setIsModify] = useState(false);
    const [isResult, setIsResult] = useState(false);

    //Access Token
    const [acctoken,setAcctoken] = useRecoilState(accToken);



    useEffect(() => {
        setLoading(true)
        getQuery();
    }, [query])

    if (isLoading) return <div>Loading</div>;
    if (query == undefined) return <div>Loading</div>;
    if (svyContents === undefined || !svyContents) return <div>Loading</div>;

    async function getQuery(){
        try{
            setQuery(router.query);
            if(query){
                if (!query.hasOwnProperty("svyResId") && !query.hasOwnProperty("svyContent")) {
                    // 설문 목록에서 실행한 미리보기인 경우
                    await getSurvey(query.svyId);
                    // console.log("목록 미리보기인 경우");
                    setLoading(false);
                } else if (query.hasOwnProperty("svyResId")) {
                    // 설문 결과에서 실행한 미리보기인 경우
                    await getSurvey(query.svyId);
                    setSvyResContents(JSON.parse(query.svyResContents));
                    setIsResult(true);
                    setLoading(false);
                } else {
                    // 설문 생성에서 실행한 미리보기인 경우
                    setSvyContents(JSON.parse(query.svyContent));
                    // console.log("생성에서 미리보기인 경우");
                    setLoading(false);
                    setIsModify(false);
                }
            }
            setLoading(false);

        }catch (e) {
            console.log(e);
        }
      }

    async function getSurvey() {
        checkAccessToken(acctoken).then(async r=>{
            setAcctoken(r)
            try{
                const response = await fetch('/api/survey/surveys/' + query.svyId, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'accessToken' : r,
                    }
                })
                .then((response) => response.json())
                .then((data) => {                    
                    setSvyContents(data);
                    setLoading(false);
                    return r;
                });
            }catch(e){
                console.log("## error : ");
                console.log(e);
            }
        })
    }

    async function getCreateSurvey() {
        try {
            setSvyContents(JSON.parse(JSON.parse(JSON.stringify(query)).svyContent));
            setLoading(false);
            return svyContents;
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <PageTitle title={isResult ? "설문결과" : "설문 미리보기"}/>
            <SurveyPreview svyContents={svyContents} preURL={router.query.preURL} svyId={router.query.svyId} svyResContents = {svyResContents} isModify ={isModify}/>
        </>
    );
};

// export async function getServerSideProps(context) {

//     const svyContent = context.query.svyContent;
//     const preURL = context.query.preURL;

//     return {
//         props: {
//             svyContent: svyContent,
//             preURL: preURL
//         },
//     };
// }

export default BasicPreview;
