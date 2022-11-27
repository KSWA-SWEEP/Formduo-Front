import {Fragment, useEffect} from 'react'
import {Dialog, Disclosure, Menu, Transition} from '@headlessui/react'
import Image from 'next/future/image';
import logoMixed from '../../public/img/mixed@3x.png'
import logoIcon from '../../public/img/icon@3x.png'
import Link from 'next/link';
import {getCookie, getCookies, setCookie} from "cookies-next";
import { Bars3Icon, DocumentTextIcon, MicrophoneIcon, XMarkIcon, ChartPieIcon } from '@heroicons/react/24/outline'
import {useRecoilState} from "recoil";
// import {refToken} from "../../atoms/refToken";
import {accToken} from "../../atoms/accToken";
import {useState} from "react";
import {useRouter} from "next/router";
import checkAccessToken from '../func/checkAccessToken';

// 임시 사용자 id
const userId = 'user001';
const navigation = [
  { name: '폼듀란?', href: '/about/formduo', current: false },
  { name: '튜토리얼', href: '/survey/tutorial', current: false },
  { name: '설문 목록', href: '/survey/list/mySurvey', current: false },
  { name: '설문 제작', href: '/', current: false },
  // { name: '설문 분석', href: '/survey/result/list', current: false },
  // { name: '고객 지원', href: '/', current: false },
]

const navigationBeforeLogin = [
  { name: '폼듀란?', href: '/about/formduo', current: false },
  { name: '튜토리얼', href: '/survey/tutorial', current: false },
  // { name: '고객 지원', href: '/', current: false },
]

const svyType = [
  { name: '일반 설문', href: '/survey/create/basic', icon: 'DocumentTextIcon' },
  { name: '듀오 설문', href: '/survey/create/duo', icon: 'MicrophoneIcon' },
  { name: '발화분석 설문', href: '/survey/create/emotion', icon: 'ChartPieIcon'}
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header () {

  let [isLogin, setIsLogin] = useState(false)
  let [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    //if(getCookie("isLogin") == true){
    if(sessionStorage.getItem("isLogin") == "true"){
      setIsLogin(true);
    }
    else setIsLogin(false);
  });


  const [acctoken,setAcctoken] = useRecoilState(accToken);
  const router = useRouter();

  async function checkAccToken(){
    const result = checkAccessToken(acctoken);
    // console.log("##ACC : " + result)
    setAcctoken(result)
    return result
  }

  //로그아웃 함수
  async function logOut() {

    checkAccToken().then(async (result)=>{
      setAcctoken(result)
      const reqBody = { accessToken : result }
      const r = await fetch('/api/auth/logout', {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
            'Content-type': 'application/json',
        }
      })
    }).then(() => {
      setAcctoken("");
      sessionStorage.setItem("isLogin","false")
      sessionStorage.setItem("expTime","")
    });
    closeModal();
    await router.push('/');
  };

  return (
      <>
        <div className="min-h-full mt-5">
          <Disclosure as="nav">
            {({ open }) => (
                <>
                  <div className="px-4 mx-auto border-b-2 border-gray-200 dark:border-neutral-700 max-w-7xl sm:px-6 lg:px-5">
                    <div className="flex items-center justify-between h-20 md:h-24">

                      {/* logo */}
                      <div className="flex items-center duration-50 hover:scale-105">
                        <div className="flex-grow-0">
                          <Link
                              href={{
                                pathname: '/'
                              }}
                          >
                            <div className="flex items-center">
                              <Image
                                  className="w-auto h-8 mr-3 md:h-12"
                                  src={logoIcon}
                                  alt="Form Duo logoIcon"
                              />
                              <Image
                                  className="w-auto h-8 md:h-10"
                                  src={logoMixed}
                                  alt="Form Duo logoMixed"
                              />
                            </div>
                          </Link>
                        </div>
                      </div>

                      {/* menu */}
                      <div className="flex items-center">
                        <div className="hidden md:block">
                          <div className="flex items-baseline space-x-6">
                            {/*로그인 여부에 따라 메뉴 버튼 설정*/}
                            {isLogin ?
                                navigation.map((item) => (
                                    (
                                        item.name == "설문 제작"
                                            ?
                                            // 설문 제작의 경우 바로 페이지로 넘어가지 않고 일반/듀오 선택
                                            <Menu as="div" className="relative ml-3" key={item.name}>
                                              <div>
                                                <Menu.Button>
                                                  <a
                                                      className={classNames(
                                                          item.current
                                                              ? 'text-fdblue'
                                                              : 'text-neutral-700 hover:bg-fdbluelight hover:text-white',
                                                          'px-3 py-2 rounded-lg text-base font-semibold hover:scale-105 duration-200 dark:text-fdyellowbright dark:hover:text-fdyellowlight dark:hover:bg-neutral-600'
                                                      )}
                                                      aria-current={item.current ? 'page' : undefined}
                                                  >
                                                    {item.name}
                                                  </a>
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
                                                <Menu.Items className="absolute z-10 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-neutral-700 w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                  {svyType.map((item) => (
                                                      <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <a
                                                                href={item.href}
                                                                className={classNames(
                                                                    active ? 'bg-neutral-100' : '',
                                                                    'content-center block px-4 py-2 text-sm font-bold text-neutral-700 border-b-2 border-gray-100 dark:border-neutral-500 dark:hover:bg-neutral-800 dark:text-fdyellowbright dark:hover:text-fdyellowlight'
                                                                )}
                                                            >
                                                              <div className='flex items-center'>
                                                                {/* 타입에 따라 icon 변경 */}
                                                                {
                                                                  {
                                                                    'DocumentTextIcon': <DocumentTextIcon className='w-4 h-4 mr-2'/>,
                                                                    'MicrophoneIcon': <MicrophoneIcon className='w-4 h-4 mr-2'/>,
                                                                    'ChartPieIcon': <ChartPieIcon className='w-4 h-4 mr-2'/>,
                                                                  }[item.icon]
                                                                }
                                                                {item.name}
                                                              </div>
                                                            </a>
                                                        )}
                                                      </Menu.Item>
                                                  ))}
                                                </Menu.Items>
                                              </Transition>
                                            </Menu>
                                            :
                                            <Link
                                                key={item.name}
                                                href={{
                                                  pathname: item.href
                                                }}
                                                className={classNames(
                                                    item.current
                                                        ? 'text-fdblue'
                                                        : 'text-neutral-700 hover:bg-fdbluelight hover:text-white',
                                                    'px-3 py-2 rounded-lg text-base font-semibold hover:scale-105 duration-200 dark:text-fdyellowbright dark:hover:text-fdyellowlight dark:hover:bg-neutral-600'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                              <div
                                                  className={classNames(
                                                      item.current
                                                          ? 'text-fdblue'
                                                          : 'text-neutral-700 hover:bg-fdbluelight hover:text-white',
                                                      'px-3 py-2 rounded-lg text-base font-semibold hover:scale-105 duration-200 dark:text-fdyellowbright dark:hover:text-fdyellowlight dark:hover:bg-neutral-600'
                                                  )}>
                                                {item.name}
                                              </div>
                                            </Link>
                                    )
                                )):
                                navigationBeforeLogin.map((item) => (
                                    (
                                        <Link
                                            key={item.name}
                                            href={{
                                              pathname: item.href
                                            }}
                                        >
                                          <div
                                              className={classNames(
                                                  item.current
                                                      ? 'text-fdblue'
                                                      : 'text-neutral-700 hover:bg-fdbluelight hover:text-white',
                                                  'px-3 py-2 rounded-lg text-base font-semibold hover:scale-105 duration-200 dark:text-fdyellowbright dark:hover:text-fdyellowlight dark:hover:bg-neutral-600'
                                              )}>
                                            {item.name}
                                          </div>
                                        </Link>
                                    )
                                ))}
                          </div>
                        </div>
                      </div>
                      <>
                        {/*로그인 여부에 따라 login 버튼 설정*/}
                        {isLogin
                            ?
                            <div className="hidden md:block">
                              <div className="flex items-center ml-4 md:ml-6">
                                <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
                                  <Link href='/account/myPage'>
                                    <button className="text-sm font-normal duration-200 text-neutral-500 dark:text-fdyellowbright whitespace-nowrap hover:text-fdbluedark hover:scale-105 dark:hover:text-fdyellow">
                                      마이페이지
                                    </button>
                                  </Link>
                                  <button onClick={openModal}  className="inline-flex items-center justify-center px-3 py-2 ml-8 text-sm font-normal text-white duration-200 border border-transparent rounded-md shadow-sm whitespace-nowrap bg-fdblue hover:bg-fdbluedark hover:scale-105 dark:bg-fdyellowlight dark:hover:bg-fdyellow dark:text-neutral-800">
                                    로그아웃
                                  </button>
                                </div>
                              </div>
                            </div>
                            :
                            <div className="hidden md:block">
                              <div className="flex items-center ml-4 md:ml-6">
                                <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
                                  <Link href='/account/signIn'>
                                    {/*<button onClick={() => signIn("kakao")} className="text-sm font-normal duration-200 text-neutral-500 whitespace-nowrap hover:text-fdbluedark hover:scale-105">*/}
                                    <button className="text-sm font-normal duration-200 text-neutral-500 whitespace-nowrap hover:text-fdbluedark hover:scale-105 dark:text-fdyellowbright dark:hover:text-fdyellow">
                                      {/*Sign In with Kakao*/}
                                      로그인
                                    </button>
                                  </Link>
                                  <Link href='/account/signUp'>
                                    <div className="inline-flex items-center justify-center px-3 py-2 ml-8 text-sm font-normal text-white duration-200 border border-transparent rounded-md shadow-sm whitespace-nowrap bg-fdblue hover:bg-fdbluedark hover:scale-105 dark:bg-fdyellowlight dark:hover:bg-fdyellow dark:text-neutral-800">
                                      회원가입
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>}
                      </>

                      <div className="flex -mr-2 md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-fdblue hover:bg-fdbluelight hover:text-fdblue focus:outline-none focus:ring-2 focus:ring-white">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                              <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                          ) : (
                              <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>

                  <Disclosure.Panel className="md:hidden">
                    <div className="px-3 pt-2 pb-3 m-2 space-y-1 sm:px-3 bg-neutral-100 rounded-2xl">
                      {/*로그인 여부에 따라 메뉴 버튼 설정*/}
                      { isLogin ? navigation.map((item) => (
                          item.name == "설문 제작"
                              ?
                              // 설문 제작의 경우 바로 페이지로 넘어가지 않고 일반/듀오 선택
                              
                              <Disclosure.Button
                                  key={item.name}
                                  as="a"
                                  href={item.href}
                                  className={classNames(
                                      item.current ? 'bg-fdblue text-white' : 'text-neutral-500 hover:bg-fdblue hover:text-white',
                                      'block px-3 py-2 rounded-md text-sm font-medium'
                                  )}
                                  aria-current={item.current ? 'page' : undefined}
                              >
                                <Menu as="div" className="relative" key={item.name}>
                                  <div>
                                    <Menu.Button>
                                      <a
                                          aria-current={item.current ? 'page' : undefined}
                                      >
                                        {item.name}
                                      </a>
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
                                    <Menu.Items className="absolute z-10 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-neutral-700 w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                      {svyType.map((item) => (
                                          <Menu.Item key={item.name}>
                                            {({ active }) => (
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                        active ? 'bg-neutral-100' : '',
                                                        'content-center block px-4 py-2 text-sm font-bold text-neutral-700 border-b-2 border-gray-100 dark:border-neutral-500 dark:hover:bg-neutral-800 dark:text-fdyellowbright dark:hover:text-fdyellowlight'
                                                    )}
                                                >
                                                  <div className='flex items-center'>
                                                    {/* 타입에 따라 icon 변경 */}
                                                    {
                                                      {
                                                        'DocumentTextIcon': <DocumentTextIcon className='w-4 h-4 mr-2'/>,
                                                        'MicrophoneIcon': <MicrophoneIcon className='w-4 h-4 mr-2'/>,
                                                        'ChartPieIcon': <ChartPieIcon className='w-4 h-4 mr-2'/>,
                                                      }[item.icon]
                                                    }
                                                    {item.name}
                                                  </div>
                                                </a>
                                            )}
                                          </Menu.Item>
                                      ))}
                                    </Menu.Items>
                                  </Transition>
                                </Menu>
                              </Disclosure.Button>
                              
                              
                              :
                              <Disclosure.Button
                                  key={item.name}
                                  as="a"
                                  href={item.href}
                                  className={classNames(
                                      item.current ? 'bg-fdblue text-white' : 'text-neutral-500 hover:bg-fdblue hover:text-white',
                                      'block px-3 py-2 rounded-md text-sm font-medium'
                                  )}
                                  aria-current={item.current ? 'page' : undefined}
                              >
                                {item.name}
                              </Disclosure.Button>
                      )) 
                      : navigationBeforeLogin.map((item) => (
                          <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className={classNames(
                                  item.current ? 'bg-fdblue text-white' : 'text-neutral-500 hover:bg-fdblue hover:text-white',
                                  'block px-3 py-2 rounded-md text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Disclosure.Button>
                      ))}
                      <hr/>
                      { isLogin ?
                          <div>
                            <Disclosure.Button
                                key="mypage"
                                as="a"
                                href='/account/myPage'
                                className={classNames('text-neutral-500 hover:bg-fdblue hover:text-white',
                                    'block px-3 py-2 rounded-md text-sm font-medium dark:text-fdyellowdark')}
                            >
                              마이페이지
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                onClick={openModal}
                                className={classNames('text-neutral-500 hover:bg-fdblue hover:text-white',
                                    'block px-3 py-2 rounded-md text-sm font-medium dark:text-fdyellowdark')}
                            >
                              로그아웃
                            </Disclosure.Button>
                          </div>
                          : <div>
                            <Disclosure.Button
                                key="login"
                                as="a"
                                href='/account/signIn'
                                className={classNames('text-neutral-500 hover:bg-fdblue hover:text-white',
                                    'block px-3 py-2 rounded-md text-sm font-medium dark:text-fdyellowdark')}
                            >
                              로그인
                            </Disclosure.Button>
                            <Disclosure.Button
                                key="login"
                                as="a"
                                href='/account/signUp'
                                className={classNames('text-neutral-500 hover:bg-fdblue hover:text-white', 'block px-3 py-2 rounded-md text-sm font-medium')}
                            >
                              회원가입
                            </Disclosure.Button>
                          </div>
                      }
                    </div>
                  </Disclosure.Panel>
                </>
            )}
          </Disclosure>
        </div>
        {/*  logout Modal */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                      로그아웃
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-neutral-500">
                        로그아웃 하시겠습니까🥺?
                      </p>
                    </div>

                    <div className="flex justify-center mt-4">
                      <button
                          type="button"
                          className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                          onClick={closeModal}
                      >
                        취소
                      </button>
                      <button
                          type="button"
                          className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none "
                          onClick={()=>logOut()}
                      >
                        로그아웃
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
  )
};
