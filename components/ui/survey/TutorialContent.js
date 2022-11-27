import LazyShow from "../../common/LazyShow"
import Image from "next/image";

import createButtons from "../../../public/img/tutorial/create-buttons.png"
import createDuoAdd from "../../../public/img/tutorial/create-duo-add.png"
import createDuo from "../../../public/img/tutorial/create-duo.png"
import createObjective from "../../../public/img/tutorial/create-objective.png"
import createQuestionTypes from "../../../public/img/tutorial/create-question-types.png"
import createSubjective from "../../../public/img/tutorial/create-subjective.png"
import menu from "../../../public/img/tutorial/menu.png"
import preview from "../../../public/img/tutorial/preview.png"
import saveChildPopupDate from "../../../public/img/tutorial/save-child-popup-date.png"
import saveChildPopup from "../../../public/img/tutorial/save-child-popup.png"
import saveParentPopup from "../../../public/img/tutorial/save-parent-popup.png"
import list from "../../../public/img/tutorial/list.png"
import listSvy from "../../../public/img/tutorial/list-svy.png"
import listShare from "../../../public/img/tutorial/list-share.png"
import listAnalyze from "../../../public/img/tutorial/list-analyze.png"
import analyze_chart from "../../../public/img/tutorial/AnalyzeChart.png"

export default function TutorialContent() {
    return (
        //   <div className="mt-5 border-2 border-gray-100 shadow-lg rounded-2xl">
        //       <div className="overflow-hidden shadow rounded-2xl">
        //           <div>

        //           </div>
        //       </div>
        //   </div>
        <div className="justify-center mx-5 sm:mx-15">
            <LazyShow>
                <div className="mt-10 mb-20 lg:text-center">
                    <h2 className="text-lg font-semibold text-fdblue dark:text-white">새로운 차원의 설문조사,</h2>
                    <p className="mt-3 text-3xl font-bold leading-normal tracking-tight text-neutral-900 sm:text-4xl dark:text-fdyellowlight">
                        폼듀 설문 제작 튜토리얼
                    </p>
                </div>
            </LazyShow>
            <LazyShow>
                <div className="grid items-center mb-20 sm:grid-cols-2">
                    <Image
                        src={menu}
                        className="col-span-1"
                        alt="Step 1" />
                    <div className='col-span-1 sm:ml-10'>
                        <p className="mt-3 mb-3 text-3xl font-bold leading-normal tracking-tight text-neutral-900 sm:text-4xl dark:text-fdyellowbright">
                            Step 1
                        </p>
                        <p className='text-xl leading-loose text-neutral-600 dark:text-white'>
                            홈페이지 상단 메뉴에서<br />제작하고자 하는 설문 유형을 선택합니다.
                        </p>
                    </div>
                </div>
            </LazyShow >
            <LazyShow>
                <div className="grid items-center mb-20 sm:grid-cols-2">

                    <div className='col-span-1 sm:ml-10'>
                        <p className="mt-3 mb-3 text-3xl font-bold leading-normal tracking-tight text-neutral-900 sm:text-4xl dark:text-fdyellowbright">
                            Step 2
                        </p>
                        <p className='text-xl leading-loose text-neutral-600 dark:text-white'>
                            설문 제목과 설문 설명을 입력한 후,<br />
                            <strong className="font-semibold text-fdblue dark:text-fdyellow">추가하기</strong> 버튼을 통해 원하는 문항 유형을 추가합니다.
                        </p>
                    </div>
                    <Image
                        src={createDuo}
                        className="col-span-1"
                        alt="Step 2" />
                </div>
            </LazyShow >
            <LazyShow>
                <div className="grid items-center mb-20 sm:grid-cols-2">

                    <div className='col-span-1 sm:ml-10'>
                        <p className="mt-3 mb-3 text-3xl font-bold leading-normal tracking-tight text-neutral-900 sm:text-4xl dark:text-fdyellowbright">

                        </p>
                        <p className='text-xl leading-loose text-neutral-600 dark:text-white'>
                            객관식 / 주관식 / 체크박스 / 드롭박스 / 날짜 <br />총 5가지의 유형이 제공됩니다.
                        </p>
                    </div>
                    <Image
                        src={createQuestionTypes}
                        className="col-span-1"
                        alt="Step 2" />
                </div>
            </LazyShow>
            <LazyShow>
                <div className="grid items-center mb-20 sm:grid-cols-2">
                    <Image
                        src={createSubjective}
                        className="col-span-1" 
                        alt="Step 3" />

                    <div className='col-span-1 sm:ml-10'>
                        <p className="mt-3 mb-3 text-3xl font-bold leading-normal tracking-tight text-neutral-900 sm:text-4xl dark:text-fdyellowbright">
                            Step 3
                        </p>
                        <p className='text-xl leading-loose text-neutral-600 dark:text-white'>
                            각 문항에 대한 질문과 부가 설명을 입력합니다.
                        </p>
                    </div>

                </div>
            </LazyShow >
            <LazyShow>
                <div className="grid items-center mb-20 sm:grid-cols-2">
                    <Image
                        src={createObjective}
                        className="col-span-1" 
                        alt="Step 3" />

                    <div className='col-span-1 sm:ml-10'>
                        <p className="mt-3 mb-3 text-3xl font-bold leading-normal tracking-tight text-neutral-900 sm:text-4xl">
                        </p>
                        <p className='text-xl leading-loose text-neutral-600 dark:text-white'>
                            객관식, 체크박스, 드롭박스 유형은<br /><strong className="font-semibold text-fdblue dark:text-fdyellow">선택지 추가하기</strong> 버튼을 통해 선택지를 입력합니다.
                        </p>
                    </div>

                </div>
            </LazyShow>
            <LazyShow>
                <div className="grid items-center mb-20 sm:grid-cols-2">

                    <div className='col-span-1 sm:ml-10'>
                        <p className="mt-3 mb-3 text-3xl font-bold leading-normal tracking-tight text-neutral-900 sm:text-4xl dark:text-fdyellowbright">
                            Step 4
                        </p>
                        <p className='text-xl leading-loose text-neutral-600 dark:text-white'>
                            설문 제작을 완료하였다면,<br />
                            <strong className="font-semibold text-fdblue dark:text-fdyellow">설문 미리보기</strong> 버튼을 통해 제작된 설문지를 확인할 수 있습니다.
                        </p>
                    </div>
                    <Image
                        src={createButtons}
                        className="col-span-1" 
                        alt="Step 4" />
                </div>
            </LazyShow >
            <LazyShow>
                <div className="grid items-center mb-20 sm:grid-cols-1">
                    <Image
                        src={preview}
                        className="col-span-1" 
                        alt="Step 4" />
                </div>
            </LazyShow >
            <LazyShow>
                <div className="grid items-center mb-20 sm:grid-cols-2">
                    <Image
                        src={createButtons}
                        className="col-span-1" 
                        alt="Step 5" />

                    <div className='col-span-1 sm:ml-10'>
                        <p className="mt-3 mb-3 text-3xl font-bold leading-normal tracking-tight text-neutral-900 sm:text-4xl dark:text-fdyellowbright">
                            Step 5
                        </p>
                        <p className='text-xl leading-loose text-neutral-600 dark:text-white'>
                            마지막으로 <strong className="font-semibold text-fdblue dark:text-fdyellow">설문 저장하기</strong> 버튼을 통해<br />제작한 설문을 저장합니다.
                        </p>
                    </div>

                </div>
            </LazyShow >
            <LazyShow>
                <div className="grid items-center mb-20 sm:grid-cols-2">
                    <Image
                        src={saveChildPopup}
                        className="col-span-1" 
                        alt="Step 5" />
                    <div className='col-span-1 sm:ml-10'>
                        <p className="mt-3 mb-3 text-3xl font-bold leading-normal tracking-tight text-neutral-900 sm:text-4xl dark:text-fdyellowbright">
                        </p>
                        <p className='text-xl leading-loose text-neutral-600 dark:text-white'>
                            <strong className="font-semibold text-fdblue dark:text-fdyellow">설문 시작일</strong>과
                            <strong className="font-semibold text-fdblue dark:text-fdyellow"> 마감일</strong>,
                            <br /> <strong className="font-semibold text-fdblue dark:text-fdyellow">제출 안내 메시지</strong>와
                            <strong className="font-semibold text-fdblue dark:text-fdyellow"> 제한 응답자 수</strong>를 설정할 수 있습니다.
                        </p>
                    </div>
                </div>
            </LazyShow>
            <LazyShow>
                <div className="grid items-center mb-20 sm:grid-cols-2">

                    <div className='col-span-1 sm:ml-10'>
                        <p className="mt-3 mb-3 text-3xl font-bold leading-normal tracking-tight text-neutral-900 sm:text-4xl dark:text-fdyellowbright">
                            Step 6
                        </p>
                        <p className='text-xl leading-loose text-neutral-600 dark:text-white'>
                            제작한 설문들은<br />
                            홈페이지 상단 메뉴 <strong className="font-semibold text-fdblue dark:text-fdyellow">설문 목록</strong>에서 확인할 수 있습니다.
                        </p>
                    </div>
                    <Image
                        src={listSvy}
                        className="col-span-1" 
                        alt="Step 6" />
                </div>
            </LazyShow >
            <LazyShow>
                <div className="grid items-center mb-20 sm:grid-cols-2">

                    <div className='col-span-1 sm:ml-10'>
                        <p className="mt-3 mb-3 text-3xl font-bold leading-normal tracking-tight text-neutral-900 sm:text-4xl dark:text-fdyellowbright">

                        </p>
                        <p className='text-xl leading-loose text-neutral-600 dark:text-white'>
                            설문별 더보기란을 클릭하면,<br />
                            <strong className="font-semibold text-fdblue dark:text-fdyellow">설문 수정 / 분석 / 삭제 / 공유 / 미리보기</strong>를 할 수 있습니다.
                        </p>
                    </div>
                    <Image
                        src={list}
                        className="col-span-1"
                        alt="Step 6" />
                </div>
            </LazyShow>
            <LazyShow>
                <div className="grid items-center mb-20 sm:grid-cols-2">
                    <Image
                        src={listShare}
                        className="col-span-1" 
                        alt="Step 7" />

                    <div className='col-span-1 sm:ml-10'>
                        <p className="mt-3 mb-3 text-3xl font-bold leading-normal tracking-tight text-neutral-900 sm:text-4xl dark:text-fdyellowbright">
                            Step 7
                        </p>
                        <p className='text-xl leading-loose text-neutral-600 dark:text-white'>
                            <strong className="font-semibold text-fdblue dark:text-fdyellow">QR코드</strong>와
                            <strong className="font-semibold text-fdblue dark:text-fdyellow"> 링크</strong>를 통해 설문을 공유할 수 있습니다.
                        </p>
                    </div>

                </div>
            </LazyShow >
            <LazyShow>
                <div className="grid items-center mb-20 sm:grid-cols-2">

                    <div className='col-span-1 sm:ml-10'>
                        <p className="mt-3 mb-3 text-3xl font-bold leading-normal tracking-tight text-neutral-900 sm:text-4xl dark:text-fdyellowbright">
                            Step 8
                        </p>
                        <p className='text-xl leading-loose text-neutral-600 dark:text-white'>
                            <strong className="font-semibold text-fdblue dark:text-fdyellow">설문 분석</strong>을 통해 피설문자들의 응답 내역을 확인할 수 있습니다.
                        </p>
                    </div>
                    <Image
                        src={listAnalyze}
                        className="col-span-1" 
                        alt="Step 8" />
                </div>
            </LazyShow >
            <LazyShow>
                <div className="grid items-center mb-20 sm:grid-cols-2">
                    <Image
                        src={analyze_chart}
                        className="col-span-1" 
                        alt="Step 9" />
                    <div className='col-span-1 sm:ml-10'>
                        <p className="mt-3 mb-3 text-3xl font-bold leading-normal tracking-tight text-neutral-900 sm:text-4xl dark:text-fdyellowbright">
                            Step 9
                        </p>
                        <p className='text-xl leading-loose text-neutral-600 dark:text-white'>
                            설문 응답에 대한 발화 분석을 통해<br />한 눈에 설문에 대한 평가를 볼 수 있습니다.
                        </p>
                    </div>
                </div>
            </LazyShow >
        </div >
    )
}
