import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import {getCookie} from "cookies-next";
import Piechart from "./PieChart";
import {useRecoilState} from "recoil";
import {accToken} from "../../../../atoms/accToken";
import checkAccessToken from "../../../func/checkAccessToken";

export default function Conversation(props) {
    
    const [good_motion, setGood_motion] = useState(0);
    const [bad_motion, setBad_motion] = useState(0);
    const [normal_motion, setNormal_motion] = useState(0);
    const [conv_end, setConv_end] = useState("!@!");
    var msg_Arr = [];

    //Access Token
    const [acctoken,setAcctoken] = useRecoilState(accToken);

    const data = new Object();

    useEffect(()=>{
        init().then(r => {});
        getConversation().then(r=>{})
        // .then(r=>{
        //     if(conv_end != "!@!"){
        //         getEmotion2().then(r => {});
        //     }
        // })
    }, [conv_end])

    useEffect(() => {
        
    }, [good_motion, normal_motion, bad_motion])

    async function init(){
        setBad_motion(0);
        setGood_motion(0);
        setNormal_motion(0);
    }

    async function getConversation() {
        checkAccessToken(acctoken).then(async r=>{
            setAcctoken(r)
            try{
                let resData = new Object();
                const response = await fetch('/api/response/' + props.cvId, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'accessToken' : r,
                    }
                })
                .then((response) => response.json())
                .then((data) =>
                    resData = data
                ).then(r=>{
                    msg_Arr = [];
                    resData.map(function(element){
                        let messages = "";
                        for ( let j = 0; j < element.svyRespContent.length; j++){
                            messages = messages + element.svyRespContent[j].ansVal[0].resp + '|'
                        }
                        msg_Arr.push(messages)
                    })
                    setConv_end("Conv Done");
                }).then(r=>{
                    // console.log("Message : "+ msg_Arr)
                    setConv_end("Conv Done");
                }).then(r=>{
                    if(conv_end != "!@!"){
                        getEmotion2().then(r => {});
                    }
                });
            }catch(e){
                console.log("## error : ");
                console.log(e);
            }
        })
    }

    async function getEmotion2 () {
        checkAccessToken(acctoken).then(async r=>{
            for (let i = 0; i < msg_Arr.length; i++){
                setAcctoken(r)
                data.accessToken = r;
                try{
                    data.msg=msg_Arr[i];
                    let resData = new Object();
                    const response = await fetch('/api/response/conv', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-type': 'application/json',
                        }
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        resData = JSON.parse(data)
                        switch(resData.emotion){
                            case "감정없음" : setNormal_motion((prevState) => prevState+1); break;
                            case "놀람" : setGood_motion((prevState) => prevState+1); break;
                            case "두려움" : setBad_motion((prevState) => prevState+1); break;
                            case "불확실" : setNormal_motion((prevState) => prevState+1); break;
                            case "슬픔" : setBad_motion((prevState) => prevState+1); break;
                            case "싫음" : setBad_motion((prevState) => prevState+1); break;
                            case "좋음" : setGood_motion((prevState) => prevState+1); break;
                            case "지루함" : setBad_motion((prevState) => prevState+1); break;
                            case "창피함" : setNormal_motion((prevState) => prevState+1); break;
                            default : console.log("Switch Error")
                        }
                    });

                }catch(e){
                    console.log("## error : ");
                    console.log(e);
                }
            }
        })
    }

    return (
        <div>
            {/* <p className="lg:text-center mt-3 text-3xl font-bold leading-normal tracking-tight text-neutral-900 sm:text-4xl">
                    응답 발화 분석 차트
                </p> */}
            <Piechart 
            good_motion = {good_motion}
            bad_motion = {bad_motion}
            normal_motion = {normal_motion}
            />
        </div>    
    )
}
