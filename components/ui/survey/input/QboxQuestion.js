import React, { useState, useRef, useCallback, useEffect } from 'react';
import {CheckIcon, ChevronDoubleDownIcon, XMarkIcon} from '@heroicons/react/20/solid';
import { PencilSquareIcon, StarIcon, ListBulletIcon, DocumentIcon, CalendarDaysIcon, TrashIcon } from "@heroicons/react/24/outline";


const QboxQuestion = ({qId, qTitle, qInfo, name, qType, qImage, qVideo, qMulti, contentYn, qContents, setSvyContents,svyContents,questionId}) => {

    //설문 Contents에 선택 된 Question 추가
    function addQuestion() {
        const svyContent = {
            key: questionId.current,
            qId: questionId.current,
            qTitle: qTitle,
            qType: qType,
            qInfo: qInfo,
            qImage: qImage,
            qVideo: qVideo,
            qMulti: qMulti,
            name: name,
            comp: qType,
            contentYn: contentYn,
            qContents: qContents,
            nextId : qContents.length+1,
        };
        //Qbox check
        // console.log("QBox : "+ JSON.stringify(svyContent))
        questionId.current = questionId.current + 1;
        setSvyContents([...svyContents,svyContent])
    }

    return (
        <div className="mt-3 border-2 border-gray-500 shadow-lg rounded-2xl">
            <div className="overflow-hidden shadow rounded-2xl">
                <div className="px-4 py-5 bg-white sm:px-6 sm:pb-5">
                    <div className='flex justify-left mx-2 mb-4 place-content-between'>
                        <div className='flex justify-left text-left'>
                            {/* 타입에 따라 icon 변경 */}
                            {
                                {
                                    'Objective': <ListBulletIcon className='w-4 h-4'/>,
                                    'Subjective': <PencilSquareIcon className='w-4 h-4'/>,
                                    'Checkbox': <CheckIcon className='w-4 h-4'/>,
                                    'Dropbox': <ChevronDoubleDownIcon className='w-4 h-4'/>,
                                    'Date': <CalendarDaysIcon className='w-4 h-4'/>,
                                    'Rating': <StarIcon className='w-4 h-4'/>,
                                    'File': <DocumentIcon className='w-4 h-4'/>
                                }[qType]
                            }
                            <p className='ml-2 text-xs'>
                                {name}
                            </p>
                        </div>
                    </div>
                    {/* 질문 입력 */}
                    <div className="grid grid-cols-12 gap-4 my-2 place-content-between">
                        <div className="flex col-span-11 border-gray-900">
                            <p
                                className="text-left block w-full font-bold border-gray-900 rounded-md shadow-sm focus:border-gray-300 focus:ring-gray-300 sm:text-md"
                            >
                                {qTitle}
                            </p>
                        </div>
                        <div className="flex font-normal col-span-11 border-gray-700">
                            {/* 설명 입력 */}
                            <p
                                className="text-left font-normal col-span-11 border-gray-700"
                            >
                                {qInfo}
                            </p>
                        </div>
                    </div>
                    {/* content 입력 부분이 필요할 경우 */}
                    {
                        contentYn &&
                        <div className="mt-4 space-y-4">
                            <h2 className="text-left font-bold">✔️선택지</h2>
                            {qContents.map((qContent) => (
                                <div
                                    key={qContent.qContentId}
                                    className="border-b-2 border-spacing-2 border-gray-200">
                                    <div className="grid grid-cols-12 gap-2 my-2 place-content-between">
                                        <div className="flex col-span-11">
                                            <div className="w-full">
                                                <p
                                                    className="text-left font-normal col-span-11 border-gray-700"
                                                >
                                                    {qContent.qContentVal}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
                <button type="button"
                        className="inline-flex justify-center px-10 my-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                        onClick={addQuestion}
                >추가</button>
            </div>
        </div>
    );
};

export default QboxQuestion;
