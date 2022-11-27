import { useRouter } from 'next/router'
import SurveyResults from "../../../components/ui/survey/result/SurveyResults";
import { Box, Button } from '@mui/material';
import SurveyAnalysis from "../../../components/ui/survey/result/SurveyAnalysis";
import { useEffect, useState } from "react";
import axios from "axios";
import { Slider } from "../../../components/ui/survey/result/chart/Slider";
import { accToken } from "../../../atoms/accToken";
import { useRecoilState } from "recoil";
import { Tab } from '@headlessui/react'
import Conversation from '../../../components/ui/survey/emotion/Conversation';
import checkAccessToken from '../../../components/func/checkAccessToken';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const SurveyResult = () => {

    const router = useRouter();
    // const { surveyId } = router.query;
    const [surveyId, setSurveyId] = useState(null);
    const [surveyType, setSurveyType] = useState(null);
    // 설문 전체 데이터
    const [data, setData] = useState(null);
    // 설문 응답자
    const [isLoading, setLoading] = useState(false)
    const [viewChart, setViewChart] = useState(true);
    //Access Token
    const [acctoken, setAcctoken] = useRecoilState(accToken);

    // if (!isLoading) getContents(Object.values(router.query))

    let [categories] = useState({
        "설문 데이터 분석": [],
        "개별 응답 조회": [],
    })


    useEffect(() => {
        //
        if (!router.isReady) return;
        else {
            setSurveyId(Object.values(router.query)[0]);
            // getContents(surveyId).then(r => setLoading(false));
            setSurveyType(Object.values(router.query)[1]);
        }
    }, [router.isReady]);
    // alert(message + " " + surveyId);

    useEffect(() => {
        if (surveyId) getContents(surveyId).then(r => { });
    }, [surveyId])


    async function getContents(surveyId) {
        checkAccessToken(acctoken).then(async r=>{
            setAcctoken(r)
            try{
                let resData = new Object();
                const response = await fetch('/api/response/'+ surveyId, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'accessToken' : r,
                    }
                })
                .then((response) => response.json())
                .then((res) =>
                    setData(res)
                );

            }catch(e){
                console.log("## error : ");
                console.log(e);
            }
        })
    }

    if (!surveyId) return <p> Loading ...</p>
    if (isLoading) return <p> Loading...</p>
    if (!data || data.length === 0) return (
        <div>
            <div className="max-w-2xl px-4 py-8 mx-auto sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">

                <div align="center">
                    <h3> 아직 응답이 없구만유👐</h3>
                </div>
            </div>
        </div>

    )

    else {
        if (surveyType === "duo") return (
            <div>
                <div className="px-10 mt-1 overflow-auto rounded-md max-h-30 focus:outline-none ">
                    <div className='flex justify-between'>
                        <div className='font-semibold'>설문 참여율</div>
                        <div className='font-semibold'>{data.length} / {data[0].svyRespsMax}</div>
                    </div>
                    <Slider data={parseInt((data.length / data[0].svyRespsMax * 100).toString())} />
                </div>
                <div className="max-w-2xl px-4 mx-60 py-8 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="mt-5 mb-7">
                        <Tab.Group>
                            <Tab.List className="flex p-1 space-x-1 bg-blue-900/5 rounded-xl">
                                <Tab
                                    key={"개별 응답 조회"}
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full rounded-lg py-2.5 text-sm font-bold leading-5',
                                            'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
                                            selected
                                                ? 'text-white bg-blue-900/40 dark:bg-fdyellowlight dark:text-neutral-600'
                                                : 'text-neutral-500 hover:bg-blue-900/20 hover:text-fdbluedark dark:bg-neutral-500/40 dark:hover:bg-amber-300/80 dark:hover:text-neutral-100 dark:text-neutral-200'
                                        )
                                    }
                                >
                                    개별 응답 조회
                                </Tab>
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel>
                                    <br />
                                    <SurveyResults svyType={surveyType} resPeople={data.length} maxResPeople={data[0].svyRespsMax} resContents={Object.values(data)} />
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
        )

        return (
            <div>
                <div className="px-10 mt-1 overflow-auto rounded-md max-h-30 focus:outline-none ">
                    <div className='flex justify-between'>
                        <div className='font-semibold'>설문 참여율</div>
                        <div className='font-semibold'>{data.length} / {data[0].svyRespsMax}</div>
                    </div>
                    <Slider data={parseInt((data.length / data[0].svyRespsMax * 100).toString())} />
                </div>
                <div className="max-w-2xl px-4 py-8 mx-auto sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="mt-5 mb-7">
                        <Tab.Group>
                            <Tab.List className="flex p-1 space-x-1 bg-blue-900/5 rounded-xl">
                                {Object.keys(categories).map((category) => (
                                    <Tab
                                        key={category}
                                        className={({ selected }) =>
                                            classNames(
                                                'w-full rounded-lg py-2.5 text-sm font-bold leading-5',
                                                'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
                                                selected
                                                    ? 'text-white bg-blue-900/40 dark:bg-fdyellowlight dark:text-neutral-600'
                                                    : 'text-neutral-500 hover:bg-blue-900/20 hover:text-fdbluedark dark:bg-neutral-500/40 dark:hover:bg-amber-300/80 dark:hover:text-neutral-100 dark:text-neutral-200'
                                            )
                                        }
                                    >
                                        {category}
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel>
                                    {(surveyType === "basic") ?
                                        <SurveyAnalysis resPeople={data.length} maxResPeople={data[0].svyRespsMax} resContents={Object.values(data)} />
                                        :
                                        <Conversation cvId = {router.query.svyId}/>
                                    }
                                </Tab.Panel>
                                <Tab.Panel>
                                    <br />
                                    <SurveyResults svyType={surveyType} resPeople={data.length} maxResPeople={data[0].svyRespsMax} resContents={Object.values(data)} />
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
        );
    }
}

export default SurveyResult;

