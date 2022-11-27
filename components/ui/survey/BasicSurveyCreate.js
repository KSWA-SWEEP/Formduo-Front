import React, {Fragment, useState, useRef, useCallback, useEffect} from "react";
import ReactDOM from "react-dom";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import SurveyTitleInput from "./SurveyTitleInput.js";
import Question from "./input/Question.js";
import Link from "next/link.js";
import axios from "axios";
import { useRouter } from 'next/router'
import Qbox from "./Qbox";
import DatePicker from "react-datepicker";
import { useRecoilState } from "recoil";
import { glbSvyContentsState } from "../../../atoms/glbSvyContents.js";
import Loading from "../../common/Loading.js";
import Respond from "./input/Respond.js";
import "react-datepicker/dist/react-datepicker.css";
import checkAccessToken from "../../func/checkAccessToken.js";
import {accToken} from "../../../atoms/accToken";

const qTypes = [
    { name: '객관식', comp: "Objective", contentYn: true },
    { name: '주관식', comp: "Subjective", contentYn: false },
    { name: '체크박스', comp: "Checkbox", contentYn: true },
    { name: '드롭박스', comp: "Dropbox", contentYn: true },
    { name: '날짜', comp: "Date", contentYn: false },
    // { name: '평점', comp: "Rating", contentYn: false },
    // { name: '파일', comp: "File", contentYn: false },
]

export default function BasicSurveyCreate() {

    const router = useRouter()
    const currentURL = router.asPath;
    const [selected, setSelected] = useState(qTypes[0])
    const [svyContents, setSvyContents] = useState([])

    const [svyTitle, setSvyTitle] = useState("")
    const [svyIntro, setSvyIntro] = useState("")
    // const [svyStartDt, setSvyStartDt] = useState("")
    const Today = new Date();
    const [svyStartDt, setSvyStartDt] = useState(Today)
    // const [svyEndDt, setSvyEndDt] = useState("")
    const [svyEndDt, setSvyEndDt] = useState(Today)
    const [svyEndMsg, setSvyEndMsg] = useState("")
    const [svyRespMax, setSvyRespMax] = useState(100)
    const [glbSvyContents, setGlbSvyContents] = useRecoilState(glbSvyContentsState)
    const [isLoading, setLoading] = useState(false)
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
    const [isFailModalOpen, setIsFailModalOpen] = useState(false)
    const [isSettingModalOpen, setIsSettingModalOpen] = useState(false)
    
    //Qbox
    const [isQboxOpen, setIsQboxOpen] = useState(false)

    //Access Token
    const [acctoken,setAcctoken] = useRecoilState(accToken);

    useEffect(() => {
        setLoading(true)
        reinitSvyContents();
    }, [])

    useEffect(() => {
        if (svyStartDt > svyEndDt) {
            setSvyStartDt(svyEndDt)
            let newEndDt = new Date();
            newEndDt.setDate(svyStartDt.getDate() + 7)
            setSvyEndDt(newEndDt)
        }
    }, [svyEndDt])

    useEffect(() => {
        if (svyStartDt > svyEndDt) {
            let newEndDt = new Date();
            newEndDt.setDate(svyStartDt.getDate() + 7)
            setSvyEndDt(newEndDt)
        }
    }, [svyStartDt])

    // qId 값으로 사용 될 id - ref 를 사용하여 변수 담기
    const questionId = useRef(1);

    if (isLoading) return <Loading />;

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

    function saveBasicSurvey() {

        const data = new Object();

        if(svyTitle != "") {
            data.svyTitle = svyTitle
        } else {
            let now = new Date();
            let tempTitle = now.toISOString().substring(0, 10) + " " + now.toISOString().substring(12, 16) + " 생성 설문";
            data.svyTitle = tempTitle
        }

        data.svyIntro = svyIntro;
        data.svyContent = svyContents;
        data.svyStartDt = svyStartDt.toISOString();
        data.svyEndDt = svyEndDt.toISOString();
        data.svyEndMsg = svyEndMsg;
        data.svySt = "";
        data.svyRespMax = svyRespMax;
        data.svyRespCount = 0;
        data.svyType= "basic";

        if (isSettingModalOpen) {
            closeSettingModal();
            makeSvy(data).then(r => {});
        }

        return data;
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

    async function makeSvy(data) {
        checkAccessToken(acctoken).then(async r=>{
            setAcctoken(r);
            try{
                data.accessToken = r;
                const response = await fetch('/api/survey/surveys', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-type': 'application/json',
                    }
                });

                console.log("### ok "+JSON.stringify(response));
                setIsSettingModalOpen(false)
                document.location.href = "/survey/create/finish"
            }catch(e){
                openFailModal();
                console.log("### error "+JSON.stringify(e));
            }
        })
    }

    function addSelected(e) {
        e.preventDefault();
        const svyContent = {
            key: questionId.current,
            qId: questionId.current,
            qTitle: "",
            qType: selected.comp,
            name: selected.name,
            comp: selected.comp,
            contentYn: selected.contentYn,
        };
        setSvyContents(Array.isArray(svyContents) ? svyContents.concat(svyContent) : null);
        questionId.current += 1; // nextId 1 씩 더하기
    }

    function onRemoveQuestion(targetQId) {
        setSvyContents(svyContents.filter(svyContent => svyContent.qId !== targetQId));
    }

    function showPreview() {
        const data = saveBasicSurvey();
        setGlbSvyContents(data);
        router.push({
            pathname: '/survey/preview/basic',
            query: { svyContent: JSON.stringify(data), preURL: currentURL }
        }, '/survey/preview/basic');
    }

    return (
        <div>
            {/* svyContents: {JSON.stringify(svyContents)}
            glbSvyContents: {JSON.stringify(glbSvyContents)} */}

            {/* 제목 입력 */}
            <SurveyTitleInput bgColor="bg-fdyellowbright"
                setSvyTitle={onTitleChange}
                setSvyIntro={onIntroChange}
                receiveIntro={glbSvyContents.svyIntro}
                receiveTitle={glbSvyContents.svyTitle}
            />

            {/* 문항 목록 */}
            {(glbSvyContents.length == 0) ?
                <div>
                {svyContents.map(question => (
                    <Question
                        svyContents={svyContents}
                        key={question.qId}
                        qId={question.qId}
                        qType={question.comp}
                        qbTitle={question.qTitle?question.qTitle:""}
                        qbInfo={question.qInfo?question.qInfo:""}
                        qbContents={question.qContents?question.qContents:""}
                        qNextId={question.nextId?question.nextId:1}
                        name={question.name}
                        comp={question.comp} 
                        
                        contentYn={question.contentYn}
                        onRemoveQuestion={onRemoveQuestion}
                        setSvyContents={setSvyContents}/>
                ))}
                </div>
             :
             <div>
                {Array.isArray(svyContents) ? svyContents.map(question => (
                    <Respond
                        svyContents={svyContents}
                        key={question.qId}
                        qId={question.qId}
                        qType={question.comp}
                        name={question.name}
                        comp={question.comp}
                        contentYn={question.contentYn}
                        onRemoveQuestion={onRemoveQuestion}
                        setSvyContents={setSvyContents}

                        receiveqTitle={question.qTitle}
                        receiveqInfo={question.qInfo}
                        />
                )): null}
                </div>
            }

            {/* 문항 추가 */}
            <div className="mt-5 border-2 border-gray-100 shadow-lg rounded-2xl dark:border-neutral-500">
                <div className="overflow-hidden shadow bg-neutral-200 rounded-2xl dark:bg-neutral-400">
                    <div className="px-4 py-5 space-y-6 sm:p-6">
                        <h2 className="font-bold">문항 추가</h2>
                        <div className="grid grid-cols-7 gap-4">
                            <div className="col-span-7 sm:col-span-5">
                                <Listbox value={selected} onChange={setSelected}>
                                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm dark:text-neutral-600">
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
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-fdyellowbright text-neutral-900' : 'text-neutral-900'
                                                        }`
                                                    }
                                                    value={type}
                                                >
                                                    {({ selected }) => (
                                                        <>
                                                            <span
                                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
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
                                className="inline-flex items-center justify-center col-span-7 text-sm font-medium text-white duration-200 border border-transparent rounded-md shadow-sm h-9 sm:col-span-1 bg-fdblue hover:bg-fdbluedark hover:scale-105 dark:bg-fdyellowlight dark:text-neutral-600 dark:hover:bg-fdyellow"
                                onClick={addSelected}
                            >
                                추가하기
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center col-span-7 text-sm font-medium text-white duration-200 border border-transparent rounded-md shadow-sm h-9 sm:col-span-1 bg-fdblue hover:bg-fdbluedark hover:scale-105 dark:bg-fdyellowlight dark:text-neutral-600 dark:hover:bg-fdyellow"
                                onClick={openQboxModal}
                            >
                                Q-Box
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 하단 버튼 */}
            <div className="justify-center sm:flex sm:m-7">
                <div className="inline-flex w-full rounded-md shadow sm:w-fit mt-7 sm:mt-0 sm:ml-3 sm:mx-2">
                    <Link 
                        href={{
                            pathname: '/'
                        }} 
                    > 
                    <div className="inline-flex items-center justify-center w-full py-2 text-sm font-semibold text-white border border-transparent rounded-md sm:w-fit sm:px-4 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-400 dark:hover:bg-neutral-500">
                        취소
                    </div>
                    </Link>
                </div>
                <div className="inline-flex w-full mt-4 rounded-md shadow sm:mx-2 sm:ml-3 sm:w-fit sm:mt-0">
                    <button onClick={showPreview} className="w-full sm:w-fit">
                        <div className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-semibold bg-white border border-gray-200 rounded-md sm:w-fit text-neutral-500 hover:bg-neutral-200">
                            설문 미리보기
                        </div>
                    </button>
                </div>
                <div className="inline-flex w-full mt-4 rounded-md shadow sm:mx-2 sm:w-fit sm:mt-0">
                    <a
                        onClick={openSaveModal}
                        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-blue-400 border border-transparent rounded-md sm:w-fit hover:bg-blue-500 dark:bg-fdyellow dark:hover:bg-fdyellowdark dark:text-neutral-700"
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
                        <Dialog as="div" className="relative z-10" onClose={closeSettingModal}>
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
                                        /> */}
                                                        <DatePicker
                                                            selected={svyStartDt}
                                                            onChange={(date) => onStartDtChange(date)}
                                                            showTimeSelect
                                                            dateFormat="yyyy-MM-dd h:mm aa"
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
                                        /> */}

                                                        <DatePicker
                                                            selected={svyEndDt}
                                                            onChange={(date) => onEndDtChange(date)}
                                                            showTimeSelect
                                                            dateFormat="yyyy-MM-dd h:mm aa"
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
                                                            min={1}
                                                            defaultValue={svyRespMax}
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
                                                    onClick={saveBasicSurvey}
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