import React, { useState, useRef, useCallback, useEffect } from 'react';
import ContentList from './ContentList';

import { CheckIcon, ChevronDoubleDownIcon, MicrophoneIcon, VideoCameraIcon } from '@heroicons/react/20/solid';
import { PencilSquareIcon, StarIcon, ListBulletIcon, DocumentIcon, CalendarDaysIcon, TrashIcon } from "@heroicons/react/24/outline";


const Question = ({onRemoveQuestion, qId, name, qType, contentYn, svyContents, setSvyContents, qbContents, qbTitle, qbInfo, qNextId}) => {

    //Qbox check
    // console.log("QB : " + qbTitle + " " + qbInfo)
    const [qTitle, setQTitle] = useState(qbTitle?qbTitle:"");
    const [qInfo, setQInfo] = useState(qbInfo?qbInfo:"");
    const index = svyContents.findIndex((svyContent) => svyContent.qId === qId);
    //Qbox check
    // console.log("QBconts" + JSON.stringify(qbContents))
    // qContentId 값으로 사용 될 id - ref 를 사용하여 변수 담기
    const nextId = useRef(qNextId);
    const [qContents, setQContents] = useState(
        qbContents?qbContents:[
        {
            qContentId: 1,
            qContentVal: ""
        }
    ]);

    useEffect(() => {
        updateSvyContents();
    },
    [qContents]
    );

    useEffect(() => {
        onChangeTitle();
    }, [qTitle]);

    useEffect(() => {
        onChangeInfo();
    }, [qInfo]);

    const onInsert = useCallback(
        e => {
            // console.log("Q next Id : "+ nextId.current)
            nextId.current += 1; // nextId 1 씩 더하기
            const qContent = {
                qContentId: nextId.current,
                qContentVal: "",
            };
            setQContents(qContents.concat(qContent));
            e.preventDefault();
        },
        [qContents],
    );

    const updateSvyContents = () => {
        const newList = replaceItemAtIndex(svyContents, index, {
            ...svyContents[index],
            qContents: qContents,
        });
        setSvyContents(newList);
    }
        
    function replaceItemAtIndex(arr, index, newValue){
        return [...arr.slice(0, index), newValue, ...arr.slice(index+1)];
    }
    
    const onUpdate = qContentId => e => {
        const idx = qContents.findIndex((qContent) => qContent.qContentId === qContentId);
        let tempContents = [...qContents];
        tempContents[idx].qContentVal = e.target.value;

        setQContents(tempContents);
    }
    
    const onRemoveContent = useCallback(
        qContentId => {
        setQContents(qContents.filter(qContent => qContent.qContentId !== qContentId));
        },
        [qContents],
    );

    const onChangeTitle = () => { 
        const newList = replaceItemAtIndex(svyContents, index, {
            ...svyContents[index],
            qTitle: qTitle,
        });
        setSvyContents(newList);
    };

    const onChangeInfo = () => { 
        const newList = replaceItemAtIndex(svyContents, index, {
            ...svyContents[index],
            qInfo: qInfo,
        });
        setSvyContents(newList);
    };

    return (
        <div className="mt-3 border-2 border-gray-100 shadow-lg rounded-2xl dark:border-neutral-600">
            <div className="overflow-hidden shadow rounded-2xl">
                <div className="px-4 py-5 bg-white sm:px-6 sm:pb-5 dark:bg-neutral-700">
                    <div className='flex items-center mx-2 mb-4 place-content-between'>
                        <div className='flex items-center text-fdblue dark:text-fdyellowlight'>
                            {/* 타입에 따라 icon 변경 */}
                            {
                                {
                                'Objective': <ListBulletIcon className='w-4 h-4'/>,
                                'Subjective': <PencilSquareIcon className='w-4 h-4'/>,
                                'Checkbox': <CheckIcon className='w-4 h-4'/>,
                                'Dropbox': <ChevronDoubleDownIcon className='w-4 h-4'/>,
                                'Date': <CalendarDaysIcon className='w-4 h-4'/>,
                                'Rating': <StarIcon className='w-4 h-4'/>,
                                'File': <DocumentIcon className='w-4 h-4'/>,
                                'Voice': <MicrophoneIcon className='w-4 h-4'/>,
                                'Video': <VideoCameraIcon className='w-4 h-4'/>
                                }[qType]
                            }
                            <p className='ml-2 text-xs'>
                                {name}
                            </p>
                        </div>
                        <div className='p-2 bg-red-100 rounded-md hover:bg-red-200 dark:bg-red-600 dark:hover:bg-red-500'>
                            <TrashIcon className='w-4 h-4 text-red-700 dark:text-red-200'  onClick={() => onRemoveQuestion(qId)}/>
                        </div>
                                                
                    </div>

                    {/* 질문 입력 */}
                    <input
                        type="text"
                        id="qTitle"
                        placeholder="질문을 입력하세요"
                        defaultValue={qTitle}
                        className="block w-full font-semibold border-gray-300 rounded-md shadow-sm focus:border-gray-300 focus:ring-gray-300 sm:text-md dark:bg-neutral-500 dark:text-fdyellowbright dark:placeholder:text-fdyellowlight"
                        onChange={(e) => {
                            setQTitle(e.target.value);
                        }}
                    />

                    {/* 설명 입력 */}
                    <textarea
                        id="qInfo"
                        rows={2}
                        className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-gray-300 focus:ring-gray-300 sm:text-sm dark:bg-neutral-500 dark:text-fdyellowbright dark:placeholder:text-fdyellowlight"
                        placeholder="문항에 대한 설명을 입력하세요 (생략 가능)"
                        defaultValue={qInfo}
                        onChange={(e) => {
                            setQInfo(e.target.value);
                        }}
                    />
                    
                    {/* content 입력 부분이 필요할 경우 */}
                    {
                        contentYn &&
                            <div>
                                <div className="mt-4 space-y-4">
                                    {/*Qbox check*/}
                                    {/*{console.log("QCONT : "+JSON.stringify(qContents))}*/}
                                <ContentList qContents={qContents} onRemoveContent={onRemoveContent} onUpdate={onUpdate}/>
                                </div>
                                <div className='flex justify-center'>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center px-3 py-2 mt-4 text-sm font-medium text-white duration-200 border border-transparent rounded-md shadow-sm sm:col-span-1 bg-neutral-400 hover:bg-neutral-500 hover:scale-105"
                                    onClick={onInsert}
                                >
                                    선택지 추가하기
                                </button>
                                </div>
                            </div>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Question;
  