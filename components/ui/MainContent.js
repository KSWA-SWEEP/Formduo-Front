import Link from "next/link";
import SurveySvg from "./icon/SurveySvg";
import {useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import {useRecoilState} from "recoil";
import {accToken} from "../../atoms/accToken";

export default function MainContent() {
    const [acctoken,setAcctoken] = useRecoilState(accToken);
    let [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        // console.log("Check Token : " + acctoken)
        if(sessionStorage.getItem("isLogin") == "true"){
        //if(getCookie("isLogin")){
            setIsLogin(true);
        }
        else setIsLogin(false);
    });
  return (
    <div>
      <div className="grid grid-cols-4 my-14 md:grid-cols-11 md:my-28">
        <div className="flex items-center col-span-4 md:col-span-5 place-self-center md:place-content-start">
          <div className="text-3xl font-bold tracking-tight text-neutral-900">
            <span className="block text-2xl leading-relaxed text-center text-neutral-600 dark:text-fdyellowbright lg:text-3xl md:text-left">새로운 차원의 설문 조사,</span>
            <span className="block text-3xl leading-relaxed text-center text-fdblue dark:text-fdyellowlight lg:text-4xl lg:mt-3 md:text-left"><span className="text-fdbluedark dark:text-fdyellowdark">폼듀</span>와 함께 경험해보세요</span>
            <div className="flex justify-center mt-5 md:mt-5 lg:flex-shrink-0 md:justify-start">
              <div className="inline-flex rounded-md shadow">
                  {isLogin?<Link
                      href={{
                          pathname: '/survey/create/basic'
                      }}
                  >
                      <div
                          className="inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-md bg-fdblue hover:bg-fdbluedark dark:bg-fdyellowlight dark:hover:bg-fdyellow dark:text-neutral-600"
                      >
                          설문 제작하기
                      </div>
                  </Link> : <Link
                      href={{
                          pathname: '/account/signIn'
                      }}
                  >
                      <div
                          className="inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-md bg-fdblue hover:bg-fdbluedark dark:bg-fdyellowlight dark:hover:bg-fdyellow dark:text-neutral-600"
                      >
                          설문 제작하기
                      </div>
                  </Link>

                  }

              </div>
              <div className="inline-flex ml-3 rounded-md shadow">
                  <Link 
                      href={{
                          pathname: '/survey/tutorial'
                      }} 
                    > 
                    <div
                      className="inline-flex items-center justify-center px-3 py-2 text-sm font-semibold bg-white border rounded-md border-fdbluelight border-opacity-60 text-fdblue hover:bg-indigo-50 dark:border-l-fdyellowlight dark:bg-neutral-700 dark:border-fdyellowbright dark:text-fdyellowlight dark:hover:bg-neutral-800"
                    >
                      튜토리얼 보기
                    </div>
                  </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 md:col-span-6">
          <SurveySvg className="w-full"/>
        </div>
      </div>
    </div>
  )
}
  