import React, { Fragment, useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import SurveyTitleInput from "./SurveyTitleInput.js";
import Respond from "./input/Respond";
import Link from "next/link.js";
import axios from "axios";
import {useRouter} from 'next/router'
import DatePicker from "react-datepicker";
import { useRecoilState } from "recoil";
import { glbSvyContentsState } from "../../../atoms/glbSvyContents.js";
import Loading from "../../common/Loading.js";
import "react-datepicker/dist/react-datepicker.css";
import Qbox from "./Qbox";
import {accToken} from "../../../atoms/accToken";
import checkAccessToken from "../../func/checkAccessToken.js";


const qTypes = [
    { name: '객관식', comp: "Objective", contentYn: true },
    { name: '주관식', comp: "Subjective", contentYn: false },
    { name: '체크박스', comp: "Checkbox", contentYn: true },
    { name: '드롭박스', comp: "Dropbox", contentYn: true },
    { name: '날짜', comp: "Date", contentYn: false },
    // { name: '평점', comp: "Rating", contentYn: false },
    // { name: '파일', comp: "File", contentYn: false },
]

const qTypesDuo = [
    { name: '음성', comp: "Voice", contentYn: false },
]

export default function SurveyModify (props) {

    const router = useRouter()
    const currentURL = router.asPath;
    const [selected, setSelected] = useState(qTypes[0])
    const [selectedDuo, setSelectedDuo] = useState(qTypesDuo[0])
    const [svyContents, setSvyContents] = useState([])
    const [svyData, setSvyData] = useState([])
    const [svyId, setSvyId] = useState(props.svyId)
    const [svyType, setSvyType] = useState(null);
    const [svyTitle, setSvyTitle] = useState("")
    const [svyIntro, setSvyIntro] = useState("")
    const [svyStartDt, setSvyStartDt] = useState(new Date())
    const [svyEndDt, setSvyEndDt] = useState(new Date())
    const [svyEndMsg, setSvyEndMsg] = useState("")
    const [svyRespMax, setSvyRespMax] = useState(100)
    const [glbSvyContents, setGlbSvyContents] = useRecoilState(glbSvyContentsState)
    const [isLoading, setLoading] = useState(false)

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
    const [isFailModalOpen, setIsFailModalOpen] = useState(false)
    const [isSettingModalOpen, setIsSettingModalOpen] = useState(false)
    //Qbox
    const [isQboxOpen, setIsQboxOpen]= useState(false)
    //Access Token
    const [acctoken,setAcctoken] = useRecoilState(accToken);
    

    // qId 값으로 사용 될 id - ref 를 사용하여 변수 담기
    const questionId = useRef(1);

    useEffect(() => {
        setSvyId(props.svyId);
    }, [props]);
       
    useEffect(() => {
        if(svyId !== undefined && glbSvyContents.length == 0){
            setSvyId(props.svyId);
            getSurvey().then(r => {
                // let resultData = r.data;
                // let svyContent = resultData.svyContent;
                // let savedSvyTitle = resultData.svyTitle;
                // let savedSvyIntro = resultData.svyIntro;
                // let startDt = resultData.svyStartDt;
                // let endDt = resultData.svyEndDt;
                //
                // setSvyContents(svyContent);
                // setSvyData(resultData);
                // setSvyTitle(savedSvyTitle);
                // setSvyIntro(savedSvyIntro);
                // setSvyStartDt(new Date(startDt));
                // setSvyEndDt(new Date(endDt));
                //
                // const lastSvyContent = svyContent.slice(-1)[0];
                // const lastQId = lastSvyContent.qId;
                // questionId.current = lastQId;
            });
        }
    }, [svyId]);

    useEffect(() => {
        setLoading(true)
        reinitSvyContents();
    }, [])

    useEffect(() => {
        //
        if (!router.isReady) return;
        else {
            setSvyType(Object.values(router.query)[1]);
        }
    }, [router.isReady]);

    if (isLoading) return <Loading />;
    
    // 그럼 getSurvey 로 해당 아이디의 설문을 받고? 
    async function getSurvey(){
      checkAccessToken(acctoken).then(async r=>{
        setAcctoken(r)
        try{
            let resData = new Object();
            const response = await fetch('/api/survey/surveys/'+ props.svyId, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'accessToken' : r,
                }
            })
            .then((response) => response.json())
            .then((data) => {
                let resultData = data;
                let svyContent = resultData.svyContent;
                let savedSvyTitle = resultData.svyTitle;
                let savedSvyIntro = resultData.svyIntro;
                let startDt = resultData.svyStartDt;
                let endDt = resultData.svyEndDt;

                setSvyContents(svyContent);
                setSvyData(resultData);
                setSvyTitle(savedSvyTitle);
                setSvyIntro(savedSvyIntro);
                setSvyStartDt(new Date(startDt));
                setSvyEndDt(new Date(endDt));

                const lastSvyContent = svyContent.slice(-1)[0];
                const lastQId = lastSvyContent.qId;
                questionId.current = lastQId;
            });
        }catch(e){
            console.log("## error : ");
            console.log(e);
        }
    })
    }

    const onTitleChange = (e) => {
        setSvyTitle(e.target.value)
    };
    const onIntroChange = (e) => {
        setSvyIntro(e.target.value)
    };
    
    const onStartDtChange = (date) => {
        setSvyStartDt(date)
    };
    const onEndDtChange = (date) => {
        setSvyEndDt(date)
    };
    
    const onEndMsgChange = (e) => {
        setSvyEndMsg(e.target.value)
    };
    const onRespMaxChange = (e) => {
        setSvyRespMax(e.target.value)
    };
    function openQboxModal() {
        setIsQboxOpen(true)
    }
    function closeQboxModal() {
        setIsQboxOpen(false)
    }

    function openSaveModal() {
        setIsSaveModalOpen(true)
    }

    function closeSaveModal() {
        setIsSaveModalOpen(false)
    }

    function openFailModal() {
        setIsFailModalOpen(true)
    }

    function closeFailModal() {
        setIsFailModalOpen(false)
    }

    function openSettingModal() {
        setIsSaveModalOpen(false)
        setIsSettingModalOpen(true)
    }

    function closeSettingModal() {
        setIsSettingModalOpen(false)
    }

    function saveUpdatedSurvey() {
       
        const data = new Object();
       
        data.svyTitle = svyTitle;
        data.svyIntro = svyIntro;
        data.svyContent = svyContents;
        data.svyStartDt = svyStartDt;
        data.svyEndDt = svyEndDt;
        data.svyEndMsg = svyEndMsg;
        data.svySt = "";
        data.svyRespMax = svyRespMax;
        data.svyRespCount = 0;

        if(isSettingModalOpen) {
            closeSettingModal();
            updateSvy(data).then(r => {});
        }
        return data;
    }

    async function updateSvy(data){        
        checkAccessToken(acctoken).then(async r=>{
            setAcctoken(r)
            try{
                data.accessToken = r;
                const response = await fetch('/api/survey/surveys/' + props.svyId, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-type': 'application/json',
                    }
                });
                setIsSettingModalOpen(false)
                document.location.href = "/survey/create/finish"
            }catch(e){
                console.log(">> error")
                console.log(JSON.stringify(e));
                openFailModal();
            }
        })
    }
    
    function addSelected(e) {
        e.preventDefault();
        questionId.current += 1; // nextId 1 씩 더하기
        const svyContent = {
            key: questionId.current,
            qId: questionId.current,
            qTitle: "",
            qType: selected.comp,
            name: selected.name,
            comp: selected.comp, 
            contentYn: selected.contentYn,
        };
        setSvyContents(svyContents.concat(svyContent));
    }

    function addSelectedDuo(e) {
        e.preventDefault();
        questionId.current += 1; // nextId 1 씩 더하기
        const svyContent = {
            key: questionId.current,
            qId: questionId.current,
            qTitle: "",
            qType: selectedDuo.comp,
            name: selectedDuo.name,
            comp: selectedDuo.comp, 
            contentYn: selectedDuo.contentYn,
        };
        setSvyContents(svyContents.concat(svyContent));
    }

    function initGlbSvyContents() {

        // addSelected();
        const data = saveUpdatedSurvey();
        setGlbSvyContents(data);
        router.push({
            pathname: '/survey/preview/basic',
            query: { svyContent: JSON.stringify(data), preURL: currentURL }
        }, '/survey/preview/' + svyType);
    }

    function reinitSvyContents() {

        if(glbSvyContents.length !== 0) {
            setSvyContents(glbSvyContents.svyContent);
            setSvyTitle(glbSvyContents.svyTitle);
            setSvyIntro(glbSvyContents.svyIntro);

            const lastSvyContent = glbSvyContents.svyContent.slice(-1)[0];
            if(lastSvyContent != undefined) {
                questionId.current = lastSvyContent.qId + 1;
            }
        }
        setLoading(false);
    }

    // console.log("glbSvyContents: " + JSON.stringify(glbSvyContents));

    // props로 SurveyTitleInput에 넘겨주고 받아오면 됨.
    if (svyType === "basic")
    return (
        <div>
            <SurveyTitleInput bgColor="bg-fdyellowbright"
                    setSvyTitle={onTitleChange}
                    setSvyIntro={onIntroChange}
                    receiveIntro={svyData.svyIntro}
                    receiveTitle={svyData.svyTitle}
            />

            {/* 문항 목록 */}
            <div>
                {/* {JSON.stringify(svyContents)} */}
                {svyContents && svyContents.map(respond => (
                    <Respond 
                        svyContents={svyContents}
                        key={respond.qId} 
                        qId={respond.qId}
                        qType={respond.comp} 
                        name={respond.name}
                        comp={respond.comp} 
                        contentYn={respond.contentYn}
                        setSvyContents={setSvyContents}
                        
                        receiveqTitle={respond.qTitle}
                        receiveqInfo={respond.qInfo}
                        />
                ))}
            </div>

            {/* 문항 추가 */}
            <div className="mt-5 border-2 border-gray-100 shadow-lg rounded-2xl">
                <div className="overflow-hidden shadow bg-neutral-200 rounded-2xl">
                    <div className="px-4 py-5 space-y-6 sm:p-6">
                        <h2 className="font-bold">문항 추가</h2>
                        <div className="grid grid-cols-7 gap-4">
                            <div className="col-span-6 sm:col-span-5">
                                <Listbox value={selected} onChange={setSelected}>
                                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                            <span className="block truncate">{selected.name}</span>
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <ChevronUpDownIcon
                                                className="w-5 h-5 text-neutral-400"
                                                aria-hidden="true"
                                            />
                                            </span>
                                    </Listbox.Button>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-64 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {qTypes.map((type) => (
                                            <Listbox.Option
                                            key={type.name}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-fdyellowbright text-neutral-900' : 'text-neutral-900'
                                                }`
                                            }
                                            value={type}
                                            >
                                            {({ selected }) => (
                                                <>
                                                <span
                                                    className={`block truncate ${
                                                    selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                                >
                                                    {type.name}
                                                </span>
                                                {selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                                </>
                                            )}
                                            </Listbox.Option>
                                        ))}
                                        </Listbox.Options>
                                    </Transition>
                                </Listbox>
                            </div>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center col-span-6 text-sm font-medium text-white duration-200 border border-transparent rounded-md shadow-sm sm:col-span-1 bg-fdblue hover:bg-fdbluedark hover:scale-105"
                                onClick={addSelected}
                            >
                                추가하기
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center col-span-6 text-sm font-medium text-white duration-200 border border-transparent rounded-md shadow-sm sm:col-span-1 bg-fdblue hover:bg-fdbluedark hover:scale-105"
                                onClick={openQboxModal}
                            >
                                Q-Box
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 하단 버튼 */}
            <div className="flex justify-center m-7">
                <div className="inline-flex mx-2 ml-3 rounded-md shadow">
                    <Link 
                        href={{
                            pathname: '/'
                        }} 
                    > 
                    <div className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white border border-transparent rounded-md bg-neutral-300 hover:bg-neutral-400">
                        취소
                    </div>
                    </Link>
                </div>
                <div className="inline-flex mx-2 ml-3 rounded-md shadow">
                    <a 
                        onClick={initGlbSvyContents}
                    > 
                    <div className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold bg-white border border-gray-200 rounded-md text-neutral-500 hover:bg-neutral-200">
                        설문 미리보기
                    </div>
                    </a>
                </div>
                <div className="inline-flex mx-2 rounded-md shadow">
                    <a
                        onClick={openSaveModal}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-400 border border-transparent rounded-md hover:bg-blue-500"
                        >
                        설문 저장하기
                    </a>
                    
                    <Transition appear show={isSaveModalOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeSaveModal}>
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
                                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-extrabold leading-6 text-neutral-900"
                                >
                                    설문 저장
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-neutral-500">
                                    작성한 설문을 저장하시겠습니까?
                                    </p>
                                </div>

                                <div className="flex justify-center mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                                        onClick={closeSaveModal}
                                        >
                                        이전
                                    </button>
                                    
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none "
                                        onClick={openSettingModal}
                                        >
                                        저장하기
                                    </button>
                                </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            </div>
                        </div>
                        </Dialog>
                    </Transition>
                    <Transition appear show={isSettingModalOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={setIsSettingModalOpen}>
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
                                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-extrabold leading-6 text-neutral-900"
                                >
                                    설문 옵션 설정
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-neutral-500">
                                    잠깐만요! 설문을 내보내기 전에 간단한 설정하고 가실게요😊
                                    </p>
                                </div>
                                <div className="px-2 py-5 bg-white">
                                    <div className="grid grid-cols-7 gap-2">
                                        <div className="col-span-7 sm:col-span-3">
                                        <label htmlFor="svyStartDt" className="block text-xs font-medium text-neutral-500">
                                            설문 시작일 <span className="text-red-600">*</span>
                                        </label>
                                        {/* <input
                                            type="text"
                                            name="svyStartDt"
                                            id="svyStartDt"
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            onChange={onStartDtChange}
                                            defaultValue={svyData.svyStartDt ? svyData.svyStartDt.substring(0, 10) : svyData.svyStartDt}
                                        /> */}
                                        <DatePicker
                                            selected={svyStartDt}
                                            onChange={(date) => onStartDtChange(date)}
                                            showTimeSelect
                                            dateFormat="yyyy-MM-dd h:mm aa"
                                            defaultValue={svyData.svyStartDt ? svyData.svyStartDt.substring(0, 10) : svyData.svyStartDt}
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-fdyellow focus:ring-fdyellow sm:text-sm"
                                        />
                                        </div>
                                        <div className="col-span-1 mt-5 text-center sm:col-span-1">
                                            ~
                                        </div>

                                        <div className="col-span-7 sm:col-span-3">
                                        <label htmlFor="svyEndDt" className="block text-xs font-medium text-neutral-500">
                                            설문 마감일
                                        </label>
                                        {/* <input
                                            type="text"
                                            name="svyEndDt"
                                            id="svyEndDt"
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            onChange={onEndDtChange}
                                            defaultValue={svyData.svyEndDt ? svyData.svyEndDt.substring(0, 10) : svyData.svyEndDt}

                                        /> */}

                                        <DatePicker
                                            selected={svyEndDt}
                                            onChange={(date) => onEndDtChange(date)}
                                            showTimeSelect
                                            dateFormat="yyyy-MM-dd h:mm aa"
                                            defaultValue={svyData.svyEndDt ? svyData.svyEndDt.substring(0, 10) : svyData.svyEndDt}
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-fdyellow focus:ring-fdyellow sm:text-sm"
                                        />
                                        </div>

                                        <div className="col-span-7 mt-2">
                                        <label htmlFor="svyEndMsg" className="block text-xs font-medium text-neutral-500">
                                            설문 제출시 안내 메세지
                                        </label>
                                        <textarea
                                            id="svyEndMsg"
                                            name="svyEndMsg"
                                            rows={3}
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            onChange={onEndMsgChange}
                                            defaultValue={svyData.svyEndMsg}
                                        />
                                        </div>
                                        
                                        <div className="col-span-7 mt-2">
                                        <label htmlFor="svyRespMax" className="block text-xs font-medium text-neutral-500">
                                            설문 응답자수 제한
                                        </label>
                                        <input
                                            type="number"
                                            name="svyRespMax"
                                            id="svyRespMax"
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            onChange={onRespMaxChange}
                                            defaultValue={svyData.svyRespMax}
                                            min={1}
                                        />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                                        onClick={closeSettingModal}
                                        >
                                        이전
                                    </button>

                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none "
                                        onClick={saveUpdatedSurvey}
                                        >
                                        저장하기
                                    </button>
                                </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            </div>
                        </div>
                        </Dialog>
                    </Transition>

                    {/*Qbox*/}
                    <Qbox show={isQboxOpen} onHide={()=>{closeQboxModal()}} svyContents={svyContents} setSvyContents={setSvyContents} questionId={questionId} />

                    <Transition appear show={isFailModalOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeFailModal}>
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
                                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-extrabold leading-6 text-neutral-900"
                                >
                                    설문 저장 실패
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-neutral-500">
                                    설문 저장에 실패하였습니다. 잠시후 다시 시도해주세요
                                    </p>
                                </div>

                                <div className="flex justify-center mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                                        onClick={closeFailModal}
                                        >
                                        닫기
                                    </button>
                                </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            </div>
                        </div>
                        </Dialog>
                    </Transition>
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <SurveyTitleInput bgColor="bg-fdyellowbright"
                    setSvyTitle={onTitleChange}
                    setSvyIntro={onIntroChange}
                    receiveIntro={svyData.svyIntro}
                    receiveTitle={svyData.svyTitle}
            />

            {/* 문항 목록 */}
            <div>
                {/* {JSON.stringify(svyContents)} */}
                {svyContents && svyContents.map(respond => (
                    <Respond 
                        svyContents={svyContents}
                        key={respond.qId} 
                        qId={respond.qId}
                        qType={respond.comp} 
                        name={respond.name}
                        comp={respond.comp} 
                        contentYn={respond.contentYn}
                        setSvyContents={setSvyContents}
                        
                        receiveqTitle={respond.qTitle}
                        receiveqInfo={respond.qInfo}
                        />
                ))}
            </div>

            {/* 문항 추가 */}
            <div className="mt-5 border-2 border-gray-100 shadow-lg rounded-2xl">
                <div className="overflow-hidden shadow bg-neutral-200 rounded-2xl">
                    <div className="px-4 py-5 space-y-6 sm:p-6">
                        <h2 className="font-bold">문항 추가</h2>
                        <div className="grid grid-cols-7 gap-4">
                            <div className="col-span-6 sm:col-span-5">
                                <Listbox value={selectedDuo} onChange={setSelected}>
                                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                            <span className="block truncate">{selectedDuo.name}</span>
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <ChevronUpDownIcon
                                                className="w-5 h-5 text-neutral-400"
                                                aria-hidden="true"
                                            />
                                            </span>
                                    </Listbox.Button>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-64 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {qTypesDuo.map((type) => (
                                            <Listbox.Option
                                            key={type.name}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-fdyellowbright text-neutral-900' : 'text-neutral-900'
                                                }`
                                            }
                                            value={type}
                                            >
                                            {({ selected }) => (
                                                <>
                                                <span
                                                    className={`block truncate ${
                                                    selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                                >
                                                    {type.name}
                                                </span>
                                                {selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                                </>
                                            )}
                                            </Listbox.Option>
                                        ))}
                                        </Listbox.Options>
                                    </Transition>
                                </Listbox>
                            </div>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center col-span-6 text-sm font-medium text-white duration-200 border border-transparent rounded-md shadow-sm sm:col-span-1 bg-fdblue hover:bg-fdbluedark hover:scale-105"
                                onClick={addSelectedDuo}
                            >
                                추가하기
                            </button>
           
                        </div>
                    </div>
                </div>
            </div>

            {/* 하단 버튼 */}
            <div className="flex justify-center m-7">
                <div className="inline-flex mx-2 ml-3 rounded-md shadow">
                    <Link 
                        href={{
                            pathname: '/'
                        }} 
                    > 
                    <div className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white border border-transparent rounded-md bg-neutral-300 hover:bg-neutral-400">
                        취소
                    </div>
                    </Link>
                </div>
                <div className="inline-flex mx-2 ml-3 rounded-md shadow">
                    <a 
                        onClick={initGlbSvyContents}
                    > 
                    <div className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold bg-white border border-gray-200 rounded-md text-neutral-500 hover:bg-neutral-200">
                        설문 미리보기
                    </div>
                    </a>
                </div>
                <div className="inline-flex mx-2 rounded-md shadow">
                    <a
                        onClick={openSaveModal}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-400 border border-transparent rounded-md hover:bg-blue-500"
                        >
                        설문 저장하기
                    </a>
                    
                    <Transition appear show={isSaveModalOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeSaveModal}>
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
                                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-extrabold leading-6 text-neutral-900"
                                >
                                    설문 저장
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-neutral-500">
                                    작성한 설문을 저장하시겠습니까?
                                    </p>
                                </div>

                                <div className="flex justify-center mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                                        onClick={closeSaveModal}
                                        >
                                        이전
                                    </button>
                                    
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none "
                                        onClick={openSettingModal}
                                        >
                                        저장하기
                                    </button>
                                </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            </div>
                        </div>
                        </Dialog>
                    </Transition>
                    <Transition appear show={isSettingModalOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={setIsSettingModalOpen}>
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
                                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-extrabold leading-6 text-neutral-900"
                                >
                                    설문 옵션 설정
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-neutral-500">
                                    잠깐만요! 설문을 내보내기 전에 간단한 설정하고 가실게요😊
                                    </p>
                                </div>
                                <div className="px-2 py-5 bg-white">
                                    <div className="grid grid-cols-7 gap-2">
                                        <div className="col-span-7 sm:col-span-3">
                                        <label htmlFor="svyStartDt" className="block text-xs font-medium text-neutral-500">
                                            설문 시작일 <span className="text-red-600">*</span>
                                        </label>
                                        {/* <input
                                            type="text"
                                            name="svyStartDt"
                                            id="svyStartDt"
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            onChange={onStartDtChange}
                                            defaultValue={svyData.svyStartDt ? svyData.svyStartDt.substring(0, 10) : svyData.svyStartDt}
                                        /> */}
                                        <DatePicker
                                            selected={svyStartDt}
                                            onChange={(date) => onStartDtChange(date)}
                                            showTimeSelect
                                            dateFormat="yyyy-MM-dd h:mm aa"
                                            defaultValue={svyData.svyStartDt ? svyData.svyStartDt.substring(0, 10) : svyData.svyStartDt}
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-fdyellow focus:ring-fdyellow sm:text-sm"
                                        />
                                        </div>
                                        <div className="col-span-1 mt-5 text-center sm:col-span-1">
                                            ~
                                        </div>

                                        <div className="col-span-7 sm:col-span-3">
                                        <label htmlFor="svyEndDt" className="block text-xs font-medium text-neutral-500">
                                            설문 마감일
                                        </label>
                                        {/* <input
                                            type="text"
                                            name="svyEndDt"
                                            id="svyEndDt"
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            onChange={onEndDtChange}
                                            defaultValue={svyData.svyEndDt ? svyData.svyEndDt.substring(0, 10) : svyData.svyEndDt}

                                        /> */}

                                        <DatePicker
                                            selected={svyEndDt}
                                            onChange={(date) => onEndDtChange(date)}
                                            showTimeSelect
                                            dateFormat="yyyy-MM-dd h:mm aa"
                                            defaultValue={svyData.svyEndDt ? svyData.svyEndDt.substring(0, 10) : svyData.svyEndDt}
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-fdyellow focus:ring-fdyellow sm:text-sm"
                                        />
                                        </div>

                                        <div className="col-span-7 mt-2">
                                        <label htmlFor="svyEndMsg" className="block text-xs font-medium text-neutral-500">
                                            설문 제출시 안내 메세지
                                        </label>
                                        <textarea
                                            id="svyEndMsg"
                                            name="svyEndMsg"
                                            rows={3}
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            onChange={onEndMsgChange}
                                            defaultValue={svyData.svyEndMsg}
                                        />
                                        </div>
                                        
                                        <div className="col-span-7 mt-2">
                                        <label htmlFor="svyRespMax" className="block text-xs font-medium text-neutral-500">
                                            설문 응답자수 제한
                                        </label>
                                        <input
                                            type="number"
                                            name="svyRespMax"
                                            id="svyRespMax"
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            onChange={onRespMaxChange}
                                            defaultValue={svyData.svyRespMax}
                                            min={1}
                                        />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                                        onClick={closeSettingModal}
                                        >
                                        이전
                                    </button>

                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none "
                                        onClick={saveUpdatedSurvey}
                                        >
                                        저장하기
                                    </button>
                                </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            </div>
                        </div>
                        </Dialog>
                    </Transition>

                    {/*Qbox*/}
                    <Qbox show={isQboxOpen} onHide={()=>{closeQboxModal()}} svyContents={svyContents} setSvyContents={setSvyContents} questionId={questionId} />

                    <Transition appear show={isFailModalOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeFailModal}>
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
                                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-extrabold leading-6 text-neutral-900"
                                >
                                    설문 저장 실패
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-neutral-500">
                                    설문 저장에 실패하였습니다. 잠시후 다시 시도해주세요
                                    </p>
                                </div>

                                <div className="flex justify-center mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                                        onClick={closeFailModal}
                                        >
                                        닫기
                                    </button>
                                </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            </div>
                        </div>
                        </Dialog>
                    </Transition>
                </div>
            </div>
        </div>
    )
}