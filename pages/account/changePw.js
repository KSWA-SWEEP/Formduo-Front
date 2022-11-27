import Image from "next/future/image";
import logoIcon from "../../public/img/mixed.png";
import {LockClosedIcon} from "@heroicons/react/20/solid";
import {useRouter} from "next/router";
import {Fragment, useEffect, useRef, useState} from "react";
import axios from "axios";
import {init, send} from "emailjs-com";
import SignIn from "./signIn";
import {Dialog, Transition} from "@headlessui/react";

const ChangePw = () =>{
    let [isOpen, setIsOpen] = useState(false)
    function closeModal() {
        setIsOpen(false)
        router.push('/account/signIn');
    }
    function openModal() {
        setIsOpen(true)
    }
    //회원 오류 모달
    let [isFailOpen, setIsFailOpen] = useState(false)
    function closeFailModal() {
        setIsFailOpen(false)
    }
    function openFailModal() {
        setIsFailOpen(true)
    }

    const router = useRouter();
    const userName = useRef("");
    const userEmail = useRef("");
    const userPw = useRef("");
    const userPwChk = useRef("");
    //메일 인증
    const userAuth = useRef(""); // 인증번호 입력값
    const [authMessage, setAuthMessage] = useState('') // 인증번호 오류 메세지
    const [isAuthConfirm, setIsAuthConfirm] = useState(false) // 인증 번호가 일치하는지 확인
    let randNum = useRef("00000"); // 인증번호
    let [isAuthIng, setIsAuthIng] = useState(false) //메일 인증 중인지 확인

    //오류메시지 상태저장
    const [emailMessage, setEmailMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')
    // 유효성 검사
    const [isEmail, setIsEmail] = useState(false)
    const [isPassword, setIsPassword] = useState(false)
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)

    const onEmailChange = (e) => {
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        userEmail.current = e.target.value;
        // console.log("Email : "+userEmail.current);
        if (!emailRegex.test(userEmail.current)) {
            setEmailMessage('이메일 형식이 틀렸어요. 다시 확인해주세요😢')
            setIsEmail(false)
            //메일 변경 시 인증번호 창 다시 막고, 인증 다시하도록 인증 관련 변수 초기화
            setIsAuthConfirm(false)
            setAuthMessage('인증 번호가 틀렸습니다. 다시 확인해주세요😢')
            setIsAuthIng(false)
        } else {
            setEmailMessage('올바른 이메일 형식이에요 ✅')
            //인증번호 발급
            randNum.current = parseInt(Math.random() * 100000 + "");
            setIsEmail(true)
        }
    };

    //이메일 인증
    const onAuthChange = (e) => {
        userAuth.current = e.target.value;
        // console.log("인증번호##" + randNum.current)

        if (randNum.current != userAuth.current) {
            setAuthMessage('인증 번호가 틀렸습니다. 다시 확인해주세요😢')
            setIsAuthConfirm(false)
        } else {
            setAuthMessage('인증 번호가 확인되었습니다. ✅')
            setIsAuthConfirm(true)
        }
    };

    const onPwChange = (e) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        userPw.current = e.target.value;
        // console.log("userPw : "+userPw.current);
        if (!passwordRegex.test(userPw.current)) {
            setPasswordMessage('‼️숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요‼️')
            setIsPassword(false)
        } else {
            setPasswordMessage('안전한 비밀번호에요 ✅')
            setIsPassword(true)
        }
    };
    const onPwChkChange = (e) => {
        userPwChk.current = e.target.value;
        // console.log("userPwChk : "+userPwChk.current);
        if (userPw.current === userPwChk.current) {
            setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 ✅')
            setIsPasswordConfirm(true)
        } else {
            setPasswordConfirmMessage('비밀번호가 달라요. 다시 확인해주세요😢')
            setIsPasswordConfirm(false)
        }
    };

    //이미 가입 된 메일인지 확인
    async function isMember(){
        const data = new Object();
        console.log("userEmail : " + userEmail.current);
        // console.log("userPw : " + userPw.current);
        data.email = userEmail.current;
        // try{
        //     const result = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/v1/auth/isMember',data);
        //     userName.current = result.data.username
        //     return result;
        // }catch (e) {
        //     console.log(e);
        // }
        try{
            let resData = new Object();
            const response = await fetch('/api/auth/isMember', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((result) => {
                resData = result
                userName.current = resData.username
            });
            return resData;
        }catch (e) {
            console.log(e);
        }
    }

    async function reqChangePw(){
        //입력 창 확인
        if(!userEmail.current){
            alert("😮이메일을 입력해주세요.");
            return <ChangePw></ChangePw>;
        } else if(!userPw.current){
            alert("😮비밀번호를 입력해주세요.");
            return <ChangePw></ChangePw>;
        } else if(userPw.current !== userPwChk.current){
            alert("😮비밀번호가 일치하지 않습니다. 다시 확인해주세요!");
            return <ChangePw></ChangePw>;
        }

        //비밀번호 변경 api 호출
        console.log("Change Password Request");
        const data = new Object();
        // console.log("userName : " + userName.current);
        // console.log("userEmail : " + userEmail.current);
        // console.log("userPw : " + userPw.current);
        data.username = userName.current;
        data.email = userEmail.current;
        data.password = userPw.current;
        // try{
        //     const result = await axios.put(process.env.NEXT_PUBLIC_API_URL+"/api/v1/auth/changePw", data);
        //     //check
        //     // console.log("Result : " + JSON.stringify(result.data));
        //     // console.log("User email : "+ result.data["email"]);
        //     openModal();
        //     return <></>;
        // }catch (e) {
        //     console.log(e);
        //     openFailModal();
        // }
        
        try{
            const response = await fetch('/api/auth/changePw', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json',
                }
            });
            openModal();
            return <></>;
        }catch(e){
            console.log(">> error")
            console.log(JSON.stringify(e));
            openFailModal();
        }
    }

    //메일인증
    useEffect(()=>{
        init("cPndipwNGrbp1LMBT");
    })

    const sendAuthMail =()=>{
        isMember().then(r =>{
            console.log("Result : "+ r)
            if(JSON.parse(r) != ""){
                const result = JSON.parse(r).username
                console.log(result)
                if(!result){
                    // console.log("계정 없음")
                    openFailModal();
                }else{
                    userName.current = result
                    //인증 중
                    setIsAuthIng(true)
                    // console.log("메일인증")
                    // console.log("인증번호 : " + randNum.current)
                    send("service_xefuilp", "template_xfz7szn", {
                        to_name: userName.current,
                        message: "인증번호는 " + randNum.current + " 입니다.",
                        user_email: userEmail.current,
                    },"cPndipwNGrbp1LMBT").then(r  =>{});
                }
            }else{
                // console.log("계정 없음")
                openFailModal();
            }
        })

    }



    return (
        <>
            <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <Image
                            className="w-40 h-auto mx-auto"
                            src={logoIcon}
                            alt="FormDuo"
                        />
                        <h2 className="mt-5 font-bold tracking-tight text-center text-1xl text-fdblue">
                            비밀번호 재설정
                        </h2>
                    </div>
                    <form className="mt-8 space-y-4" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="space-y-4 rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="block ml-2 text-sm text-neutral-900">
                                    이메일 주소
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full px-3 py-2 placeholder-gray-500 border border-gray-300 appearance-none rounded-b-md rounded-t-md text-neutral-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                    onChange={onEmailChange}
                                />
                                {userEmail.current.length > 0 && <span className={`message ${isEmail ? 'success text-xs' : 'error text-xs text-red-500'}`}>{emailMessage}</span>}
                                <button
                                    type="button"
                                    onClick ={sendAuthMail}
                                    disabled={!(isEmail)}
                                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md group bg-fdbluedark hover:bg-fdblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    인증 메일 전송
                                </button>
                            </div>
                            <div>
                                <label htmlFor="email-address" className="block ml-2 text-sm text-neutral-900">
                                    이메일 인증
                                </label>
                                <input
                                    id="email-auth"
                                    name="email-auth"
                                    type="text"
                                    required
                                    disabled={!(isAuthIng)}
                                    className="relative block w-full px-3 py-2 placeholder-gray-500 border border-gray-300 appearance-none rounded-b-md rounded-t-md text-neutral-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Authentication Number"
                                    onChange={onAuthChange}
                                />
                                {userAuth.current.length > 0 && <span className={`message ${isAuthConfirm ? 'success text-xs' : 'error text-xs text-red-500'}`}>{authMessage}</span>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block ml-2 text-sm text-neutral-900">
                                    비밀번호
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full px-3 py-2 placeholder-gray-500 border border-gray-300 appearance-none rounded-t-md rounded-b-md text-neutral-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                    onChange={onPwChange}
                                />
                                {userPw.current.length > 0 && (
                                    <span className={`message ${isPassword ? 'success text-xs' : 'error text-xs text-red-500'}`}>{passwordMessage}</span>
                                )}
                            </div>
                            <div>
                                <label htmlFor="password" className="block ml-2 text-sm text-neutral-900">
                                    비밀번호 확인
                                </label>
                                <input
                                    id="passwordChk"
                                    name="passwordChk"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full px-3 py-2 placeholder-gray-500 border border-gray-300 appearance-none rounded-t-md rounded-b-md text-neutral-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password Check"
                                    onChange={onPwChkChange}
                                />
                                {userPwChk.current.length > 0 && (
                                    <span className={`message ${isPasswordConfirm ? 'success text-xs' : 'error text-xs text-red-500'}`}>{passwordConfirmMessage}</span>
                                )}
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick ={reqChangePw}
                                disabled={!(isEmail && isPassword && isPasswordConfirm && isAuthConfirm)}
                                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md group bg-fdbluedark hover:bg-fdblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="w-5 h-5 text-fdbluelight group-hover:text-fdbluedark" aria-hidden="true" />
                </span>
                                비밀번호 재설정
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/*  changePw Modal */}
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
                                        비밀번호 재설정
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-neutral-500">
                                            비밀번호가 재설정 되었습니다. 새로운 비밀번호로 로그인 해주세요☺️
                                        </p>
                                    </div>

                                    <div className="flex justify-center mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                                            onClick={closeModal}
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

            {/*  signUp Fail Modal */}
            <Transition appear show={isFailOpen} as={Fragment}>
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
                                        메일 인증 오류
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-neutral-500">
                                            해당 메일로 등록 된 계정이 없습니다!😢
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
        </>
    )
}
export  default ChangePw;