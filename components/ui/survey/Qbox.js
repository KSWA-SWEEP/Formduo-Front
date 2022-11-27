import React, {Fragment, useEffect, useRef, useState} from 'react'
import { Tab, Dialog, Transition, Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Question from "./input/Question";
import QboxQuestion from "./input/QboxQuestion";
import { Pagination } from "@mui/material";
import axios from "axios";
import {useRecoilState} from "recoil";
import {accToken} from "../../../atoms/accToken";
import checkAccessToken from '../../func/checkAccessToken';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Qbox = ({show, onHide, setSvyContents, svyContents, questionId}) => {
    //Test용 샘플 데이터
    let sampleQsts = useRef({
        QBox: [{
            qId: 1,
            qTitle: '본인의 직업은 무엇입니까?',
            qInfo: '',
            qType: 'Objective',
            name: '객관식',
            qImage: '',
            qVideo: '',
            qMulti: '',
            contentYn: true,
            qContents: [{
                qContentId: 1,
                qContentVal: '학생',
            },{
                qContentId: 2,
                qContentVal: '주부',
            },{
                qContentId: 3,
                qContentVal: '회사원',
            },{
                qContentId: 4,
                qContentVal: '자영업자',
            },{
                qContentId: 5,
                qContentVal: '농부',
            },{
                qContentId: 6,
                qContentVal: '공무원',
            },{
                qContentId: 7,
                qContentVal: '엔지니어',
            },{
                qContentId: 8,
                qContentVal: '무직',
            }],
        }],
        내가했던질문: [
            {
                qId: 1,
                qTitle: '오늘 내가 작성한 질문1',
                qInfo: '첫 설문 질문1',
                qType: 'Objective',
                name: '객관식',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 1,
                    qContentVal: '선택지 1번',
                },{
                    qContentId: 2,
                    qContentVal: '선택지 2번',
                }],
            }
        ],
    })
    //질문 가져오기
    //내가 했던 질문
    const svyList = useRef([]);
    const [myData,setMyData] = useState(false)
    let mySvy =[];
    const [acctoken,setAcctoken] = useRecoilState(accToken);
    //API로 질문 가져오기
    async function getMySvyList(){
        checkAccessToken(acctoken).then(async r=>{
            setAcctoken(r)
            try{
                let resData = new Object();
                const response = await fetch('/api/survey/surveys', {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'accessToken' : r,
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    //데이터 가져오기
                    svyList.current = data;
                    svyList.current.map((survey) =>{
                        mySvy = mySvy.concat(survey.svyContent)
                    })
                }).then(r=>{
                    //데이터 key값 설정
                    mySvy.map((svy,idx) => {
                        svy.key = idx;
                        svy.qId = idx;
                    })
                }).then(r => {
                    //내가 했던 질문 data Setting
                    //check log
                    // console.log("MySvy : "+ JSON.stringify(mySvy));
                    // console.log("내가한질문 : " + JSON.stringify(sampleQsts.current.내가했던질문))
                    sampleQsts.current.내가했던질문 = mySvy;
                }).then(r=>{
                    //데이터 설정 후 랜더링을 위해 useState 값 변경
                    setMyData(true)
                });
            }catch(e){
                console.log("## error : ");
                console.log(e);
            }
        })
    }
    //내가 했던 질문 Setting function
    function settingMyQuestion(){
        getMySvyList().then(r=>{})
    }

    //Qbox
    const qboxList = useRef([]);
    const [qboxQ,setQboxQ] = useState(false)
    //API로 값 불러오기
    async function getQboxList(){
        let qbox =[];
        checkAccessToken(acctoken).then(async r=>{
            setAcctoken(r)
            try{
                let resData = new Object();
                const response = await fetch('/api/survey/qbox', {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'accessToken' : r,
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    //데이터 가져오기
                    qboxList.current = JSON.parse(data);
                    qboxList.current.map((survey) =>{
                        if(survey.delYn == null && survey.name != "string" && survey.qtitle != ""){
                            survey.qId = survey.qid
                            survey.key = survey.qid
                            survey.qTitle = survey.qtitle
                            survey.qInfo = survey.qinfo
                            survey.qContents = survey.qcontents
                            switch (survey.name){
                                case "주관식" :
                                    survey.qType = "Subjective"
                                    survey.contentYn = false
                                    qbox = [...qbox, survey]
                                    break;
                                case "객관식" :
                                    survey.qType = "Objective"
                                    survey.contentYn = true
                                    qbox = [...qbox, survey]
                                    // qbox = qbox.concat(survey)
                                    break;
                                case "체크박스" :
                                    survey.qType = "Checkbox"
                                    survey.contentYn = true
                                    qbox = [...qbox, survey]
                                    // qbox = qbox.concat(survey)
                                    break;
                                case "드롭박스" :
                                    survey.qType = "Dropbox"
                                    survey.contentYn = true
                                    qbox = [...qbox, survey]
                                    // qbox = qbox.concat(survey)
                                    break;
                                case "날짜" :
                                    survey.qType = "Date"
                                    survey.contentYn = false
                                    qbox = [...qbox, survey]
                                    // qbox = qbox.concat(survey)
                                    break;
                                default :
                                    break;
                            }

                        }
                    })
                    //check log
                    // console.log("Qbox : "+ JSON.stringify(qbox));
                }).then(r => {
                    //내가 했던 질문 data Setting
                    //check log
                    // console.log("MySvy : "+ JSON.stringify(mySvy));
                    // console.log("내가한질문 : " + JSON.stringify(sampleQsts.current.내가했던질문))
                    // console.log("Qbox : "+ JSON.stringify(qbox));
                    sampleQsts.current.QBox = qbox
                    setQboxQ(true)
                });
            }catch(e){
                console.log("## error : ");
                console.log(e);
            }
        })
    }
    //Qbox 질문 Setting function
    function settingQbox(){
        getQboxList().then(r=>{})
    }

    //Qbox 질문 가져오기
    useEffect(()=>{
        settingMyQuestion()
        settingQbox()
    },[])

    //페이지 설정
    const [nowTab, setNowTab] = useState("Qbox");
    const QLAST_PAGE = sampleQsts.current.QBox.length % 5 === 0 ?
        parseInt(sampleQsts.current.QBox.length / 5) : parseInt(sampleQsts.current.QBox.length / 5 + 1); // 마지막 페이지
    const MyLAST_PAGE = sampleQsts.current.내가했던질문.length % 5 === 0 ?
        parseInt(sampleQsts.current.내가했던질문.length / 5) : parseInt(sampleQsts.current.내가했던질문.length / 5 + 1); // 마지막 페이지
    const [page, setPage] = useState(1); // 처음 페이지는 1이다.
    const [Qdata, setData] = useState(sampleQsts.current.QBox.slice(5 * (page - 1)));

    //Page 설정
    useEffect(() => {
        // setData(/* fetch(또는 전체 데이터에서 slice)로 현재 page의 데이터를 가져온다. */);
        // 한 페이지에 5개씩 보여준다.
        if(nowTab === '내가했던질문') {
            if(page === MyLAST_PAGE){ // 마지막 페이지는 데이터가 5개보다 부족할 수도 있다.
                setData(sampleQsts.current.내가했던질문.slice(5 * (page - 1)));
            } else {
                setData(sampleQsts.current.내가했던질문.slice(5 * (page - 1), 5 * (page - 1) + 5));
            }
        }else{
            if(page === QLAST_PAGE){ // 마지막 페이지는 데이터가 5개보다 부족할 수도 있다.
                setData(sampleQsts.current.QBox.slice(5 * (page - 1)));
            } else {
                setData(sampleQsts.current.QBox.slice(5 * (page - 1), 5 * (page - 1) + 5));
            }
        }
    }, [page,nowTab,qboxQ]);

    useEffect(()=>{
        setPage(1)
        setNowTab('QBox')
    },[show])

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        // console.log("Now Page : "+ event.target.getLabelText)
        // console.log("Now Page : "+nowPageInt)
        setPage(nowPageInt);
    }


    const tabChanged = (e) => {
        // console.log("tab change : " + e.target.name)
        setNowTab(e.target.name);
        setPage(1);
    }
    return (
        //Qbox 팝업
        <Transition appear show={show} onHide={onHide} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onHide}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div  className="w-full max-w-md px-2 py-16 sm:px-0">
                                <Tab.Group>
                                    {/*탭 상단 설정*/}
                                    <Tab.List className="flex p-1 space-x-1 rounded-xl bg-blue-900/20">
                                        {Object.keys(sampleQsts.current).map((questions) => (
                                            <Tab
                                                key={questions}
                                                name = {questions}
                                                onClick={(e) => tabChanged(e)}
                                                className={({ selected }) =>
                                                    classNames(
                                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-fdbluedark',
                                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-fdbluelight focus:outline-none focus:ring-2',
                                                        selected
                                                            ? 'bg-white shadow'
                                                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                                    )
                                                }
                                            >
                                                {questions}
                                            </Tab>
                                        ))}
                                    </Tab.List>
                                    {/*탭 내부 페이지 설정*/}
                                    <Tab.Panels className="mt-2">
                                        {Object.values(sampleQsts.current).map((questions, idx) => (
                                            <Tab.Panel
                                                key={idx}
                                                className={classNames(
                                                    'rounded-xl bg-white p-3',
                                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-fdbluelight focus:outline-none focus:ring-2'
                                                )}
                                            >
                                                <ul>
                                                    {
                                                        Qdata.map((question) => (
                                                            <li
                                                                key={question.qId}
                                                                className="relative p-2 rounded-md hover:bg-gray-100"
                                                            >
                                                                {/*드롭다운을 통해 Question 내용 보여주기*/}
                                                                <Disclosure>
                                                                    {({ open }) => (
                                                                        <>
                                                                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg bg-fdbluelight text-neutral-800 hover:bg-fdblue focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                                                                <h3 className="float-left text-sm font-medium leading-7">
                                                                                    {question.qTitle}
                                                                                </h3>
                                                                                <ul className="flex float-right mt-2 space-x-2 text-xs font-normal leading-4 text-neutral-500">
                                                                                    <li>{question.name}</li>
                                                                                </ul>
                                                                                <ChevronUpIcon
                                                                                    className={`${
                                                                                        open ? 'rotate-180 transform' : ''
                                                                                    } h-5 w-5 text-neutral-800`}
                                                                                />
                                                                            </Disclosure.Button>
                                                                            <Disclosure.Panel className="px-2 pt-2 pb-2 text-sm text-neutral-500">
                                                                                {/*선택 된 Question 데이터 넣어서 보여주기*/}
                                                                                <QboxQuestion
                                                                                    qId={question.qId}
                                                                                    qTitle={question.qTitle}
                                                                                    qInfo={question.qInfo}
                                                                                    qType={question.qType}
                                                                                    qImage={question.qImage}
                                                                                    qVideo={question.qVideo}
                                                                                    qMulti={question.qMulti}
                                                                                    qContents={question.qContents}
                                                                                    name={question.name}
                                                                                    comp={question.qType}
                                                                                    contentYn={question.contentYn}
                                                                                    svyContents={svyContents}
                                                                                    setSvyContents={setSvyContents}
                                                                                    questionId={questionId}
                                                                                />
                                                                            </Disclosure.Panel>
                                                                        </>
                                                                    )}
                                                                </Disclosure>
                                                            </li>
                                                        ))}
                                                    <Pagination count={nowTab==='내가했던질문'?MyLAST_PAGE:QLAST_PAGE} defaultPage={1} boundaryCount={2}
                                                                sx={{margin: 2}} onChange={(e) => handlePage(e)}
                                                                className="inline-flex items-center justify-center px-3 py-2 ml-8 text-sm font-normal text-white duration-200 border border-transparent rounded-md shadow-sm whitespace-nowrap hover:scale-105"/>
                                                    <div className="flex justify-center mt-2">
                                                        <button
                                                            type="button"
                                                            className="inline-flex justify-center w-full px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                                                            onClick={onHide}
                                                        >
                                                            닫기
                                                        </button>
                                                    </div>
                                                </ul>
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Qbox