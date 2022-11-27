import Link from "next/link"
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Dialog, Menu, Transition } from "@headlessui/react"
import { Fragment, useState, useEffect } from "react"
import svyThumbnail1 from '../../../public/img/svyThumbnail1.png'
import svyThumbnail2 from '../../../public/img/svyThumbnail2.png'
import axios from "axios"
import Image from "next/image"
import Router, { useRouter } from "next/router"
import ReactDOM from 'react-dom';
import QR from "qrcode.react";
import { getCookie, getCookies } from "cookies-next"
import Loading from "../../common/Loading"
import { Tab } from '@headlessui/react'
import {accToken} from "../../../atoms/accToken";
import {useRecoilState} from "recoil";
import checkAccessToken from "../../func/checkAccessToken"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// 진행중 설문 세부 메뉴
const activeSurveyMenu = [
  { name: '설문 수정', href: '/survey/modify/' },
  { name: '설문 분석', href: '/survey/result/' },
  { name: '설문 삭제', href: 'deleteSvy' },
  { name: '설문 공유', href: 'shareSvy' },
  { name: '설문 미리보기', href: '/survey/preview/' },
  // { name: '설문 옵션 설정', href: '#' },
]

// 마감 설문 세부 메뉴
const closedSurveyMenu = [
  { name: '설문 분석', href: '/survey/result/' },
  { name: '설문 삭제', href: '#' },
  { name: '설문 미리보기', href: '/survey/preview/' },
]

function SurveyGridList() {
  const router = useRouter(); 
  const currentURL = router.asPath;
  const dateToday = new Date();
  const [svyList, setSvyList] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isFailModalOpen, setIsFailModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [selectedSvyId, setSelectedSvyId] = useState()
  const [shareUrl, setShareUrl] = useState("")
  const [showQr, setShowQr] = useState(false)
  const [showCopyMsg, setShowCopyMsg] = useState(false)
  const [isTokenExist, setIsTokenExist] =useState("")
  const [isLoading, setLoading] = useState(false)
  const [today, setToday] = useState(dateToday.toISOString())
  // 설문 전체 데이터
  const [data, setData] = useState(null);

  const [acctoken,setAcctoken] = useRecoilState(accToken);
  
  let [categories] = useState({
    "전체 설문": [],
    "일반 설문": [],
    "듀오 설문": [],
    "발화 분석 설문" : []
  })

  let imgNum = 1;

  useEffect(() => {
      setLoading(true)
      //setIsTokenExist(getCookies("isLogin"))
      setIsTokenExist(sessionStorage.getItem("isLogin"))
      getSvyList().then(r => {})
   }, []);

   
  async function getSvyList(){    
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
            .then((data) => 
                resData = data
            );
            
            if(resData == undefined){
                setData(null)
            } else {
                setSvyList(resData)
                setData(resData)
            }

            setLoading(false)
        }catch(e){
            console.log("## error : ");
            console.log(e);
        }
    })
  } 

  async function getSvyListByType(type){
    checkAccessToken(acctoken).then(async r=>{
        setAcctoken(r)
        try{
            let resData = new Object();
            const response = await fetch('/api/survey/surveys/type?type=' + type, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'accessToken' : r,
                }
            })
            .then((response) => response.json())
            .then((data) => 
                resData = data
            );

            if(resData == undefined){
                setData(null)
            } else {
                setSvyList(resData)
                setData(resData)
            }

            setLoading(false)
        }catch(e){
            console.log("## error : ");
            console.log(e);
        }
    })
  } 
   
   if (!data || data.length === 0) return (
    <div>
      <div className="max-w-2xl px-4 py-8 mx-auto sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-5 mb-7">
                <Tab.Group
                    onChange={(index) => {
                        if(index == 0) {
                            getSvyList().then(r => {});
                        }
                        if(index == 1) {
                            getSvyListByType("basic").then(r => {
                                if(r == undefined){
                                    setData(null)
                                } else {
                                    setSvyList(r.data)
                                    setData(r.data)
                                }
                            });
                        }
                        if(index == 2) {
                            getSvyListByType("duo").then(r => {
                                if(r == undefined){
                                    setData(null)
                                } else {
                                    setSvyList(r.data)
                                    setData(r.data)
                                }
                            });
                        }
                        if(index == 3) {
                            getSvyListByType("emotion").then(r => {
                                if(r == undefined){
                                    setData(null)
                                } else {
                                    setSvyList(r.data)
                                    setData(r.data)
                                }
                            });
                        }
                    }}>
                    <Tab.List className="flex p-1 space-x-1 bg-blue-900/5 rounded-xl">
                    {Object.keys(categories).map((category) => (
                        <Tab
                        key={category}
                        className={({ selected }) =>
                            classNames(
                            'w-full rounded-lg py-2.5 text-sm font-bold leading-5',
                            'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
                            selected
                                ? 'text-white bg-blue-900/40 dark:bg-fdyellowlight dark:text-neutral-600'
                                : 'text-neutral-500 hover:bg-blue-900/20 hover:text-fdbluedark dark:bg-neutral-500/40 dark:hover:bg-amber-300/80 dark:hover:text-neutral-100 dark:text-neutral-200'
                            )
                        }
                        >
                        {category}
                        </Tab>
                    ))}
                    </Tab.List>
                </Tab.Group>
            </div>
            <div align="center" className="mt-10">
                <h3>등록된 설문이 없습니다</h3>
            </div>
        </div>
    </div>
)
   
  function openDeleteModal() {
    setIsDeleteModalOpen(true)
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false)
  }

  function openShareModal() {
    setIsShareModalOpen(true)
  }

  function closeShareModal() {
    setIsShareModalOpen(false)
  }

  function openFailModal() {
      setIsFailModalOpen(true)
  }

  function closeFailModal() {
      setIsFailModalOpen(false)
      location.reload();
  }

  function openSuccessModal() {
      setIsSuccessModalOpen(true)
  }

  function closeSuccessModal() {
      setIsSuccessModalOpen(false)
      location.reload();
  }

  function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
  }

  function showModal(type, svyId) {
    setSelectedSvyId(svyId);

    if(type == "설문 삭제") {
      openDeleteModal();
    }
    else if (type == "설문 공유"){
      // 수정 필요 - table 에 svy 타입 (duo / basic) 구분하는 column 가져오기
      setShareUrl(process.env.NEXT_PUBLIC_BASE_URL+"/survey/share/"+svyId)
      openShareModal();
    }
  }

  function deleteSvy(svyId){
    deleteSelected(svyId).then(r => {
    //   console.log(r);
      closeDeleteModal();
      openSuccessModal();
    });
  } 
  
  async function deleteSelected(svyId){
    checkAccessToken(acctoken).then(async r=>{
        setAcctoken(r)
        try{
            const response = await fetch('/api/survey/surveys/'+svyId, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'accessToken' : r,
                }
            })
        }catch(e){
            closeDeleteModal();
            openFailModal();
            console.log("## error : ");
            console.log(e);
        }
    })
  } 

  const downloadQr = (svyId) => {
    // console.log(svyId)
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(shareUrl)
    setShowCopyMsg(showCopyMsg => !showCopyMsg)
  }
  
  return (
    <div>
      <div className="max-w-2xl px-4 py-8 mx-auto sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="sm:mt-5 mb-7">
            <Tab.Group
                onChange={(index) => {
                    if(index == 0) {
                        getSvyList().then(r => {});
                    }
                    if(index == 1) {
                        console.log("Type basic")
                        getSvyListByType("basic").then(r => {
                            if(r == undefined){
                                setData(null)
                            } else {
                                setSvyList(r.data)
                                setData(r.data)
                            }
                          });
                    }
                    if(index == 2) {
                        console.log("Type duo")
                        getSvyListByType("duo").then(r => {
                            if(r == undefined){
                                setData(null)
                            } else {
                                setSvyList(r.data)
                                setData(r.data)
                            }
                          });
                    }
                    if(index == 3) {
                        getSvyListByType("emotion").then(r => {
                            if(r == undefined){
                                setData(null)
                            } else {
                                setSvyList(r.data)
                                setData(r.data)
                            }
                        });
                    }

                    console.log(data);
                }}>
                <Tab.List className="flex p-1 space-x-1 bg-blue-900/5 rounded-xl">
                {Object.keys(categories).map((category) => (
                    <Tab
                    key={category}
                    className={({ selected }) =>
                        classNames(
                        'w-full rounded-lg py-2.5 text-xs sm:text-sm font-bold leading-5',
                        'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
                        selected
                            ? 'text-white bg-blue-900/40'
                            : 'text-neutral-500 hover:bg-blue-900/20 hover:text-fdbluedark'
                        )
                    }
                    >
                    {category}
                    </Tab>
                ))}
                </Tab.List>
            </Tab.Group>
        </div>
        
        <h2 className="sr-only">surveys</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {svyList.map((survey) => (
              <div key={survey.id} className="duration-200 rounded-2xl bg-neutral-100 dark:bg-neutral-500">
                  <div>
                      <div className="w-full overflow-hidden rounded-t-lg bg-neutral-200 aspect-w-16 aspect-h-9 xl:aspect-w-16 xl:aspect-h-9">
                          <Link
                              href={{
                                  pathname: '/survey/result/'+survey.id,
                                  query: { svyId: survey.id, svyType: survey.svyType, preURL: currentURL }
                                  }} 
                              className="group"
                              >
                              <div>                          
                                {/* <Image
                                  className="object-cover object-center w-full h-full"
                                  src={svyThumbnail}
                                  alt="Form Duo"
                                /> */}
                                {
                                    (imgNum++)%2 == 0
                                    ? 
                                    <Image
                                    layout="fill"
                                    className="object-cover object-center w-full h-full"
                                    src={svyThumbnail1}
                                    alt="Form Duo"
                                    />
                                    : 
                                    <Image
                                    layout="fill"
                                    className="object-cover object-center w-full h-full"
                                    src={svyThumbnail2}
                                    alt="Form Duo"
                                    />
                                }
                              </div>
                          </Link>
                      </div>
                      <div className="flex justify-between m-4">
                          <div className="w-3/4">
                              <p className="text-base font-bold truncate text-neutral-900 dark:text-fdyellowbright">{survey.svyTitle}</p>
                              <div className="mt-2">
                                <span className={( survey.svyEndDt < today ? "text-red-800 bg-red-100 dark:bg-red-200 dark:text-red-800" : "text-blue-800 bg-blue-100 dark:bg-blue-200 dark:text-blue-800") + " text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-lg"}>
                                    {survey.svyEndDt < today
                                        ? "마감"
                                        : "진행중"
                                    }
                                </span>
                                <span className="text-xs text-neutral-700 dark:text-neutral-200">{(survey.svyRegDt).substr(0, 10)} 생성됨</span>
                              </div>
                          </div>
                          <div>
                              <Menu as="div" className="relative ml-3">
                                  <div>
                                      <Menu.Button className="flex max-w-xs text-sm focus:outline-none">
                                          <EllipsisVerticalIcon className="block w-6 h-6 dark:text-neutral-300"/>
                                      </Menu.Button>
                                  </div>
                                  <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                  >
                                      <Menu.Items className="absolute right-0 z-10 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-700">
                                          {(survey.svyEndDt < today ? closedSurveyMenu : activeSurveyMenu).map((item) => (
                                              <Menu.Item key={item.name}>
                                                  {
                                                      item.href.includes('/')
                                                          ?
                                                          ({ active }) => (
                                                              <Link
                                                                //   href={{ pathname: item.href === '/survey/preview/' ? item.href + "basic" : item.href + survey.id, query: { svyId: survey.id, svyType: survey.type, preURL: currentURL } }}     // TODO: survey.type 구분 추가 후 변경하기
                                                                  href={{ pathname: item.href === '/survey/preview/' ? item.href + survey.svyType : item.href + survey.id, query: { svyId: survey.id, svyType: survey.svyType, preURL: currentURL } }}
                                                              >
                                                                  <div className={classNames(
                                                                      active ? 'bg-neutral-100' : '',
                                                                      'block px-4 py-2 text-sm  text-neutral-700 border-b-2 border-gray-100 hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-600'
                                                                  )}>
                                                                      {item.name}
                                                                  </div>
                                                              </Link>
                                                          )
                                                          :
                                                          <a
                                                              onClick={() => showModal(item.name, survey.id)}
                                                              className='block px-4 py-2 text-sm border-b-2 border-gray-100 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-600'
                                                          >
                                                              {item.name}
                                                          </a>
                                                  }
                                              </Menu.Item>
                                          ))}
                                      </Menu.Items>
                                  </Transition>
                              </Menu>
                          </div>
                      </div>
                  </div>
              </div>
          ))}
        </div>
        
                    
        <Transition appear show={isDeleteModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
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
                     설문 삭제
                  </Dialog.Title>
                  <div className="mt-3">
                      <p className="text-sm text-neutral-500">
                      설문을 삭제하시겠습니까?
                      </p>
                      <p className="mt-1 text-xs text-red-500">
                      🚨 삭제한 설문은 다시 복구할 수 없습니다.
                      </p>
                  </div>

                  <div className="flex justify-center mt-4">
                      <button
                          type="button"
                          className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                          onClick={closeDeleteModal}
                          >
                          닫기
                      </button>

                      <button
                          type="button"
                          className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none "
                          onClick={() => deleteSvy(selectedSvyId)}
                          >
                          설문 삭제하기
                      </button>
                  </div>
                  </Dialog.Panel>
              </Transition.Child>
              </div>
          </div>
          </Dialog>
        </Transition>

               
        <Transition appear show={isShareModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeShareModal}>
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
                     설문 공유
                  </Dialog.Title>

                  <div className="mt-2">
                      <p className="text-sm text-neutral-500">
                        QR코드나 링크를 통해 설문을 공유할 수 있습니다.
                      </p>

                      <div className="flex mt-2 rounded-md shadow-sm">
                        <input
                          type="text"
                          className="flex-1 block w-full text-xs border-gray-300 rounded-none text-neutral-600 rounded-l-md focus:border-gray-300 focus:ring-0"
                          placeholder="경로"
                          value={shareUrl}
                          readOnly
                        />
                        <span className="inline-flex items-center px-3 text-sm border border-l-0 border-gray-300 text-neutral-500 rounded-r-md bg-gray-50 hover:bg-gray-100 hover:text-neutral-600" onClick={() => copyUrl()}>
                          복사
                        </span>
                      </div>
                      {/* <p className="m-1 text-xs text-fdblue">
                        복사되었습니다.
                      </p> */}
                      { showCopyMsg 
                        ? 
                        <p className="m-1 text-xs text-fdblue">
                          복사되었습니다.
                        </p>
                        : 
                        null 
                      }
                  </div>

                  <div className="flex justify-center mt-4">
                      <button
                          type="button"
                          className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                          onClick={closeShareModal}
                          >
                          닫기
                      </button>

                      <button
                        type="button"
                        className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none " onClick={() => setShowQr(showQr => !showQr)}
                        >
                        QR코드 보기
                      </button>
                        
                  </div>
                  <div className="mx-5 mt-10 mb-5 w-100">
                    { showQr 
                      ? 
                      // <div className="flex place-content-between">
                      //   <QR
                      //       id="qr-gen"
                      //       value={shareUrl}
                      //       size={200}
                      //       imageSettings={{ src: shareUrl, width: 100, height: 100 }} //사이즈
                      //       level={"H"}
                      //       includeMargin={false} //QR 테두리 여부
                      //       bgColor={"#FFFFFF"} //배경색
                      //       fgColor={"#575757"} //QR색
                      //   />
                        
                      //   <div className="flex items-center h-100">
                      //     <button
                      //       type="button"
                      //       className="px-2 py-2 mx-2 text-xs font-semibold text-green-900 bg-green-100 border border-transparent rounded-md h-fit hover:bg-green-200 focus:outline-none " onClick={() => downloadQr(selectedSvyId)}
                      //       >
                      //       QR코드 다운로드
                      //     </button>
                      //   </div>
                      // </div>
                      <div className="flex justify-center">
                        <QR
                          id="qr-gen"
                          value={shareUrl}
                          size={200}
                          imageSettings={{ src: shareUrl, width: 100, height: 100 }} //사이즈
                          level={"H"}
                          includeMargin={false} //QR 테두리 여부
                          bgColor={"#FFFFFF"} //배경색
                          fgColor={"#575757"} //QR색
                          className="p-0 m-0"
                        />
                      </div>
                      
                      : 
                      null 
                    }
                  </div>
                  </Dialog.Panel>
              </Transition.Child>
              </div>
          </div>
          </Dialog>
        </Transition>

        
        
        <Transition appear show={isSuccessModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeSuccessModal}>
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
                        설문 삭제 성공
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-neutral-500">
                        설문이 성공적으로 삭제되었습니다 
                        </p>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold text-green-700 bg-green-200 border border-transparent rounded-md hover:bg-green-300 focus:outline-none "
                            onClick={closeSuccessModal}
                            >
                            확인
                        </button>
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>

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
                        오류 발생
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-neutral-500">
                        오류가 발생하였습니다. 잠시후 다시 시도해주세요
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
  )
}
export default SurveyGridList
