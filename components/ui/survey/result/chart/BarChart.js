import * as React from 'react';
import { ResponsiveBar } from '@nivo/bar';

import { useEffect, useRef, useState } from "react";
import { ResponsivePie } from '@nivo/pie';
import axios from "axios";
import { useRecoilState } from "recoil";
import { accToken } from "../../../../../atoms/accToken";
import { subjAnsState } from '../../../../../atoms/subjAns';
import checkAccessToken from '../../../../func/checkAccessToken';

export default function BarChart(props) {
    //Access Token
    const [acctoken, setAcctoken] = useRecoilState(accToken);
    const [subjAns, setSubjAns] = useRecoilState(subjAnsState);

    const svyCont = useRef(); // Question 정보
    let svyAnsval = {};
    let subjAnsval = {};

    //객관식, checkbox, drop box
    //설문 전체 form 받기
    async function getSurvey(){
        checkAccessToken(acctoken).then(async r=>{
            setAcctoken(r)
            try{
                let resData = new Object();
                const response = await fetch('/api/survey/surveys/' + props.resContents[0].svyId, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'accessToken' : r,
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    svyCont.current = data.svyContent
                }).then(()=>{
                    setSvyAnsval()
                    setSubjAnsval()
                }).then(() => {
                    ansCount()
                }).then(() => {
                    setSubjAns(JSON.stringify(subjAnsval))
                }).then(() => {
                    setAnaData()
                }).then(()=>{
                    setReady(false)
                });
            }catch(e){
                console.log("## error : ");
                console.log(e);
            }
        })
    }

    function setSvyAnsval(){
        svyCont.current.map((svyQ)=>{
            svyAnsval[svyQ.qId] = []
            if (svyQ.contentYn && svyQ.qContents !== undefined) {
                // console.log("Ana##qCont : " + JSON.stringify(svyQ))
                const qCont = svyQ.qContents
                // console.log("Ana##qCont : " + JSON.stringify(qCont))
                qCont.map((contents) => {
                    let contValue = contents.qContentVal
                    svyAnsval[svyQ.qId] = [...svyAnsval[svyQ.qId], { key: contValue, value: 0 }]
                })
            }
        })
    }

    function setSubjAnsval() {
        svyCont.current.map((svyQ) => {
            subjAnsval[svyQ.qId] = []
        })
    }

    function ansCount(){
        props.resContents.map((resC)=>{
            resC.svyRespContent.map((respCont)=>{
                if(respCont.qType !== "Subjective"){
                    respCont.ansVal.map((ans)=>{
                        svyAnsval[respCont.qId].map((res, idx)=>{
                            if(res.key === ans.resp){
                                // console.log("Ana##respCont : " + svyAnsval[respCont.qId][idx].key + "   " + ans.resp + "    " + res.key)
                                svyAnsval[respCont.qId][idx].value++;
                            }
                        })
                    })
                }
                else {
                    // console.log("###### subjective answer")
                    respCont.ansVal.map((ans) => {
                        // console.log("## qId: " + respCont.qId + ", recentResp: " + ans.resp);
                        subjAnsval[respCont.qId].unshift(ans.resp);
                        // console.log("## AllResp: " + subjAnsval[respCont.qId]);     // TODO: qId별 최근 3개의 답변 출력하기
                    })
                }
            })
        })
    }

    const anaData = useRef([])
    const keys = useRef([])
    const [ready, setReady] = useState(true)

    // console.log("Ana##00Question : " + JSON.stringify(svyAnsval))
    function setAnaData() {
        // console.log("ANA### : " + anaData.current.length + "   " + Object.values(svyAnsval).length)
        if (anaData.current.length < Object.values(svyAnsval).length) {

            anaData.current = []
            // console.log("Ana##11Question : " + JSON.stringify(svyAnsval))
            Object.values(svyAnsval).map((question, idx) => {
                if (question.length > 0) {
                    // console.log("Ana##22Question : " + JSON.stringify(question))
                    if (ready)
                        anaData.current = [...anaData.current, setqData(question, idx)]
                }
            })
        }

    }
    function setqData(question, idx) {
        // console.log("Ana##33Question : " + JSON.stringify(question))
        let q_data = {}
        q_data["index"] = idx + 1
        for (var i = 0; i <= question.length; i++) {
            if (i == question.length) {
                return q_data
            }
            // q_data[i] = {}
            keys.current = [...keys.current, question[i].key]
            // console.log("Ana##ITEM : " + question[i].key)
            q_data[question[i].key] = question[i].value

        }
    }

    getSurvey().then((r) => {
        //     svyCont.current = r.data.svyContent;
        //     // console.log("Ana##svyContents : "+JSON.stringify(svyCont.current))
        // }).then(()=>{
        //     setSvyAnsval()
        // }).then(()=>{
        //     ansCount()
        // }).then(()=>{
        //     setAnaData()
        //     // console.log("Ana##setting SvyAnsVal : "+ JSON.stringify(svyAnsval))
        // }).then(()=>{
        //     anaData.current.map((ana)=>{
        //         console.log("Ana##SSSSETTING : "+ JSON.stringify(ana))
        //     })
        //     console.log("keys : "+ anaData.current.length)
        // }).then(()=>{
        //     setReady(false)
    })

    const handle = {
        barClick: (data) => {
            // console.log(data);
        },

        legendClick: (data) => {
            // console.log(data);
        },
    };

    return (
        <div>
            {/* chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정 */}
            <div style={{ width: '1000px', height: '600px', margin: '0 auto' }}>
                <ResponsiveBar
                    /**
                     * chart에 사용될 데이터
                     */
                    data={anaData.current}
                    /**
                     * chart에 보여질 데이터 key (측정되는 값)
                     */
                    keys={keys.current}
                    /**
                     * keys들을 그룹화하는 index key (분류하는 값)
                     */
                    indexBy="index"
                    /**
                     * chart margin
                     */
                    margin={{ top: 50, right: 60, bottom: 60, left: 60 }}
                    /**
                     * chart padding (bar간 간격)
                     */
                    padding={0.3}
                    /**
                     * chart 색상
                     */
                    // colors={['olive', 'brown', 'orange']} // 커스터하여 사용할 때
                    colors={{ scheme: 'pastel2' }} // nivo에서 제공해주는 색상 조합 사용할 때
                    /**
                     * color 적용 방식
                     */
                    colorBy="id" // 색상을 keys 요소들에 각각 적용
                    // colorBy="indexValue" // indexBy로 묵인 인덱스별로 각각 적용
                    theme={{
                        /**
                         * label style (bar에 표현되는 글씨)
                         */
                        labels: {
                            text: {
                                fontSize: 14,
                                fill: '#000000',
                            },
                        },
                        /**
                         * legend style (default로 우측 하단에 있는 색상별 key 표시)
                         */
                        legends: {
                            text: {
                                fontSize: 12,
                                fill: '#000000',
                            },
                        },
                        axis: {
                            /**
                             * axis legend style (bottom, left에 있는 글씨)
                             */
                            legend: {
                                text: {
                                    fontSize: 20,
                                    fill: '#000000',
                                },
                            },
                            /**
                             * axis ticks style (bottom, left에 있는 값)
                             */
                            ticks: {
                                text: {
                                    fontSize: 16,
                                    fill: '#000000',
                                },
                            },
                        },
                    }}
                    /**
                     * axis bottom 설정
                     */
                    axisBottom={{
                        tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
                        tickPadding: 5, // tick padding
                        tickRotation: 0, // tick 기울기
                        legend: '문항 번호', // bottom 글씨
                        legendPosition: 'middle', // 글씨 위치
                        legendOffset: 40, // 글씨와 chart간 간격
                    }}
                    /**
                     * axis left 설정
                     */
                    axisLeft={{
                        tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
                        tickPadding: 5, // tick padding
                        tickRotation: 0, // tick 기울기
                        legend: '응답 수', // left 글씨
                        legendPosition: 'middle', // 글씨 위치
                        legendOffset: -50, // 글씨와 chart간 간격
                    }}
                    /**
                     * label 안보이게 할 기준 width
                     */
                    labelSkipWidth={36}
                    /**
                     * label 안보이게 할 기준 height
                     */
                    labelSkipHeight={12}
                    /**
                     * bar 클릭 이벤트
                     */
                    onClick={handle.barClick}
                    /**
                     * legend 설정 (default로 우측 하단에 있는 색상별 key 표시)
                     */
                    legends={[
                        {
                            dataFrom: 'keys', // 보일 데이터 형태
                            anchor: 'bottom-right', // 위치
                            direction: 'column', // item 그려지는 방향
                            justify: false, // 글씨, 색상간 간격 justify 적용 여부
                            translateX: 100, // chart와 X 간격
                            translateY: 0, // chart와 Y 간격
                            itemsSpacing: 2, // item간 간격
                            itemWidth: 100, // item width
                            itemHeight: 20, // item height
                            itemDirection: 'left-to-right', // item 내부에 그려지는 방향
                            itemOpacity: 0.85, // item opacity
                            symbolSize: 20, // symbol (색상 표기) 크기
                            effects: [
                                {
                                    // 추가 효과 설정 (hover하면 item opacity 1로 변경)
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                            onClick: handle.legendClick, // legend 클릭 이벤트
                        },
                    ]}
                />
            </div>
        </div>
    );
}
