import PageTitle from "../../../components/ui/PageTitle";
import React from "react";
import Link from "next/link";
import LazyShow from "../../../components/common/LazyShow"

const Basic = () => {
    return (
        <div>
            <LazyShow>
                <div className="mx-8 my-44">
                    <div className="lg:text-center">
                        <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-neutral-900 sm:text-4xl">
                            설문 제작이 완료되었습니다
                        </p>
                        <p className="max-w-2xl mt-4 text-xl text-neutral-500 lg:mx-auto">
                            설문을 공유하여 응답을 받고, 설문 분석 결과를 확인할 수 있습니다👍
                        </p>

                        <div className="flex justify-center mt-8 md:mt-14 lg:flex-shrink-0">
                            <div className="inline-flex rounded-md shadow">
                                <Link 
                                    href={{
                                    pathname: '/'
                                    }} 
                                > 
                                <div
                                    className="inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-md bg-fdblue hover:bg-fdbluedark"
                                    >
                                    메인 화면으로 이동
                                </div>
                                </Link>
                            </div>
                            <div className="inline-flex ml-3 rounded-md shadow">
                                {/* <a
                                    href="/survey/list/mySurvey"
                                    className="inline-flex items-center justify-center px-3 py-2 text-sm font-semibold bg-white border rounded-md border-fdbluelight border-opacity-60 text-fdblue hover:bg-indigo-50"
                                    >
                                    설문 목록 페이지로 이동
                                </a> */}
                                <Link 
                                    href="/survey/list/mySurvey"
                                    scroll={true}
                                    > 
                                    <div
                                    className="inline-flex items-center justify-center px-3 py-2 text-sm font-semibold bg-white border rounded-md border-fdbluelight border-opacity-60 text-fdblue hover:bg-indigo-50"
                                    >
                                    설문 목록 페이지로 이동
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </LazyShow>
        </div>
    );
};

export default Basic;
