import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Loading from "../../common/Loading";
import userBasicImg from "../../../public/img/userBasicImg.png"
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { accToken } from "../../../atoms/accToken";
import { useRecoilState } from "recoil";
import checkAccessToken from "../../func/checkAccessToken";
import {getCookie} from "cookies-next";


export default function UserInfo() {

  const [acctoken,setAcctoken] = useRecoilState(accToken);
  
  const [userData, setUserData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const [userPwd, setUserPwd] = useState("")
  const [userPwdCheck, setUserPwdCheck] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  
  const [isFailModalOpen, setIsFailModalOpen] = useState(false)
  const [isUserInfoChgModalOpen, setIsUserInfoChgModalOpen] = useState(false)

  const [btnState, setBtnState] = useState(true);


  const [isPassword, setIsPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    setLoading(true)
    getUserInfo()
  }, [])

  useEffect(() => {
    // console.log((userName.length > 0)+" / "+(userEmail.length > 0)+" / "+(!pwdCheckState))
    if(userName.length > 0)
    {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [userEmail, userName])

  useEffect(() => {
    pwdCheck();
  }, [userPwd, userPwdCheck])

  function openUserInfoChgModal() {
    setIsUserInfoChgModalOpen(true)
  }

  function closeUserInfoChgModal() {
    setBtnState(false)
    setIsUserInfoChgModalOpen(false)
  }

  function openFailModal() {
      setIsFailModalOpen(true)
  }

  function closeFailModal() {
      setIsFailModalOpen(false)
  }

  function updateUserInfo() {
      closeUserInfoChgModal();

      const data = new Object();
      data.email = userEmail;
      data.username = userName;
      data.password = userPwd;
      updateUser(data);
  }

  async function updateUser(data){
    checkAccessToken(acctoken).then(async r=>{
        setAcctoken(r)
        try{
            data.accessToken = r;
            const response = await fetch('/api/auth/members', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json',
                }
            });
            setIsUserInfoChgModalOpen(false)
            location.reload();
        }catch(e){
            console.log(">> error")
            console.log(JSON.stringify(e));
        openFailModal();
        }
    })
  }

  if (isLoading) return <Loading/>
  if (!userData) return <div className="flex justify-center mt-20"><p>유저 정보가 없습니다.</p></div>

  async function getUserInfo(){
    // token 정보 확인
    checkAccessToken(acctoken).then(async r=>{
        setAcctoken(r)
        // 유저 정보 가져오기
        try{
            let resData = new Object();
            const response = await fetch('/api/auth/members', {
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

            let jsonData = JSON.parse(resData);

            setUserData(jsonData)
            setLoading(false)
            setUserEmail(jsonData.email)
            setUserName(jsonData.username)
        }catch(e){
            console.log(">> error")
            console.log(JSON.stringify(e));
        }
    })
  }

  function pwdCheck() {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/

      if (!passwordRegex.test(userPwd)) {
          setPasswordMessage('‼️숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요‼️')
          setIsPassword(false)
      } else if(userPwd !== userPwdCheck){
          setPasswordMessage('비밀번호가 달라요. 다시 확인해주세요😢')
          setIsPassword(false)
      } else {
          setPasswordMessage('안전한 비밀번호에요 ✅')
          setIsPassword(true)
      }

  }  

  return (
    <div className="items-center justify-center sm:flex mt-28">
    <div className="flex justify-center mb-7 sm:mb-0">
      <div className="flex overflow-hidden rounded-full h-36 w-36 sm:custom-profile-position bg-neutral-300">
        <Image
          src={userBasicImg}
          className="w-100 h-100"/>
        </div>
      </div>
      <div className="flex items-center place-content-center sm:justify-start sm:w-1/3 sm:ml-14 sm:h-56">
        <div className="text-center sm:text-left">
          <h1 className="text-xl font-extrabold tracking-tight text-neutral-900 sm:text-2xl dark:text-white" data-testid="name">
            {userData.username}
          </h1>
          <p className="mt-2 text-base text-neutral-500 sm:mt-2 sm:max-w-xl sm:text-lg sm:mx-0">
            {userData.email}
          </p>
          <div className="flex justify-center mt-5 sm:justify-start">
            <div className="rounded-md shadow">
              <a
                onClick={openUserInfoChgModal}
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white border border-transparent rounded-md bg-neutral-400 hover:bg-neutral-500 sm:py-2 sm:px-3 sm:text-sm"
              >
                개인정보 수정
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Transition appear show={isUserInfoChgModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeUserInfoChgModal}>
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
                      data-testid="modify"
                  >
                      개인정보 수정
                  </Dialog.Title>
                  <div className="px-2 py-5">
                      <div className="grid grid-cols-6 gap-2">
                          <div className="col-span-6">
                          <label htmlFor="userName" className="block text-xs font-medium text-neutral-500">
                              이름 
                          </label>
                          <input
                              type="text"
                              name="userName"
                              id="userName"
                              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-fdyellow focus:ring-fdyellow sm:text-sm"
                              onChange={(e) => setUserName(e.target.value)}
                              defaultValue={userName}
                              data-testid="nameModify"
                          />
                          </div>

                          <div className="col-span-6 mt-2">
                          <label htmlFor="userEmail" className="block text-xs font-medium text-neutral-500">
                              이메일
                          </label>
                          <input
                              type="text"
                              name="userEmail"
                              id="userEmail"
                              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-fdyellow focus:ring-fdyellow sm:text-sm"
                              onChange={(e) => setUserEmail(e.target.value)}
                              value={userEmail}
                              readOnly
                          />
                          </div>

                          <div className="col-span-3 mt-2">
                          <label htmlFor="userPwd" className="block text-xs font-medium text-neutral-500">
                              비밀번호
                          </label>
                          <input
                              type="password"
                              name="userPwd"
                              id="userPwd"
                              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-fdyellow focus:ring-fdyellow sm:text-sm"
                              onChange={(e) => setUserPwd(e.target.value)}
                          />
                          </div>
                          
                          <div className="col-span-3 mt-2">
                          <label htmlFor="userPwdCheck" className="block text-xs font-medium text-neutral-500">
                              비밀번호 확인
                          </label>
                          <input
                              type="password"
                              name="userPwdCheck"
                              id="userPwdCheck"
                              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-fdyellow focus:ring-fdyellow sm:text-sm"
                              onChange={(e) => setUserPwdCheck(e.target.value)}
                          />
                          </div>
                      </div>
                      {userPwd.length > 0 && (
                          <span className={`message ${isPassword ? 'success text-xs' : 'error text-xs text-red-500'}`}>{passwordMessage}</span>
                      )}
                  </div>

                  <div className="flex justify-center mt-4">
                      <button
                          type="button"
                          className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                          onClick={closeUserInfoChgModal}
                          >
                          닫기
                      </button>

                      <button
                          type="button"
                          className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold text-blue-900 bg-blue-100 border border-transparent rounded-md disabled:bg-neutral-200 disabled:text-neutral-300 hover:bg-blue-200 focus:outline-none "
                          onClick={updateUserInfo}
                          disabled={!(btnState && isPassword)}
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
                      사용자 정보 수정 실패
                  </Dialog.Title>
                  <div className="mt-2">
                      <p className="text-sm text-neutral-500">
                      사용자 정보 수정에 실패하였습니다. 잠시후 다시 시도해주세요
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
  )
}
  