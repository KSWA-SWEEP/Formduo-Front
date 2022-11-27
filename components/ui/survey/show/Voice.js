import React, { useState, useCallback, useEffect } from "react";
import ReactAudioPlayer from 'react-audio-player';
import { StopCircleIcon, PlayCircleIcon } from "@heroicons/react/20/solid";

const Voice = (props) => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [urlToPlay, setUrlToPlay] = useState(null);
  
  const index = props.svyRespContents.findIndex((svyRespContent) => svyRespContent.qId === props.qId);
  const [tempAnsVal, setTempAnsVal] = useState([
      {
          qContentId: "",
          resp: "",
      }
  ]);

  useEffect(() => {
      updatedSvyRespConents();
  }, [tempAnsVal]);

  useEffect(() => {
    setTempAnsVal({ resp: urlToPlay })
  }, [urlToPlay]);

  const updatedSvyRespConents = () => {
      const newList = replaceItemAtIndex(props.svyRespContents, index, {
          ...props.svyRespContents[index],
          ansVal: tempAnsVal,
      });
      props.setSvyRespContents(newList);
  }

  function replaceItemAtIndex(arr, index, newValue) {
      return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }

  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();
    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();
    onSubmitAudioFile();
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      // console.log(">> "+URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
    }
    // File 생성자를 사용해 파일로 변환
    // const sound = new File([audioUrl], "soundBlob", { lastModified: new Date().getTime(), type: "audio" });
    // console.log(sound); // File 정보 출력
  }, [audioUrl]);

  useEffect(() => {
        if (audioUrl) {
            // console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
            // setUrlToPlay(URL.createObjectURL(audioUrl))
            blobToBase64(audioUrl)
        }
    }, [onRec])

    async function blobToBase64 (url) {

      const reader = new FileReader();
      reader.onload = () => {
        const base64Url = reader.result;
        setUrlToPlay(base64Url);
      }
      reader.readAsDataURL(url);
    }

  if (!props.isModify) return (
    <div className="mt-5 border-2 border-gray-100 shadow-lg rounded-2xl dark:border-neutral-600">
        <div className="text-lg text-neutral-900 bg-fdyellowbright indent-3 rounded-t-2xl dark:bg-neutral-400">
            Question. {props.qNumber}
        </div>
        <div className="overflow-hidden shadow rounded-2xl">
            <div className="px-4 py-5 space-y-6 bg-white sm:p-6 dark:bg-neutral-700">
                <legend className="text-base font-medium text-neutral-900 contents dark:text-fdyellowlight">{props.qTitle}</legend>
                <p className="text-sm text-neutral-500 dark:text-white ">{props.qInfo}</p>
                <div className="flex items-center content-center justify-center"> 
                    <ReactAudioPlayer
                        src={props.svyRespContents[index].ansVal.resp}
                        controls
                    />
                </div>
            </div>
        </div>
    </div>
  )
  return (
    <div className="mt-5 border-2 border-gray-100 shadow-lg rounded-2xl dark:border-neutral-600">
        <div className="text-lg text-neutral-900 rounded-t-2xl bg-fdyellowbright indent-3 dark:bg-neutral-400">
            Question. {props.qNumber}
        </div>
        <div className="overflow-hidden shadow rounded-b-2xl">
            <div className="px-4 py-5 space-y-6 bg-white sm:p-6 dark:bg-neutral-700">
                <legend className="text-base font-medium text-neutral-900 contents dark:text-fdyellowlight">{props.qTitle}</legend>
                <p className="text-sm text-neutral-500 dark:text-white">{props.qInfo}</p>
                <div className="flex items-center content-center justify-center">  
                    {urlToPlay
                    ?
                    <ReactAudioPlayer
                        src={urlToPlay}
                        controls
                    />
                    :
                        <></>
                    }
                    <div>
                        <button 
                            onClick={onRec ? onRecAudio : offRecAudio}
                            className={"items-center justify-center px-4 py-3 mx-4 text-sm font-semibold text-white border border-transparent rounded-3xl" + (onRec ? " bg-red-500 hover:bg-red-600" : " bg-neutral-400 hover:bg-neutral-500")}>
                            {
                                onRec 
                                ? 
                                    <div className="flex items-center">
                                        <PlayCircleIcon className="w-4 h-4 mr-2 text-white"/>
                                        <p>녹음하기</p>
                                    </div>
                                :
                                    <div className="flex items-center">
                                        <StopCircleIcon className="w-4 h-4 mr-2 text-white"/>
                                        <p>녹음중지</p>
                                    </div>
                            }
                        </button>
                    </div>
                </div>
                <p className="text-xs text-center text-red-600">※ 녹음하기 버튼 클릭 후 2-3초 뒤 녹음이 시작됩니다</p>
            </div>
        </div>
    </div>
  );
};

export default Voice;