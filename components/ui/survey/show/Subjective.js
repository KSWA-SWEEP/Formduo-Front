import { useState, useEffect } from "react";

export default function Subjective(props) {

    const index = props.svyRespContents.findIndex((svyRespContent) => svyRespContent.qId === props.qId);

    const [answer, setAnswer] = useState();

    const [tempAnsVal, setTempAnsVal] = useState(
        props.svyRespContents[index].ansVal[0].qContentId === "" && props.svyRespContents[index].ansVal[0].resp === ""
            ? [{
                qContentId: "",
                resp: "",
            }] : props.svyRespContents.ansVal);

    useEffect(() => {
            if (props.isModify)
                updatedSvyRespConents();
    },
        [tempAnsVal]
    );

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

    const onChange = (event) => {
        setAnswer(event.target.value);
        setTempAnsVal([{ resp: event.target.value }]);
    }

    if (props.isModify) {
        return (
            <div className="mt-5 border-2 border-gray-100 shadow-lg rounded-2xl dark:border-neutral-600">
                <div className="text-lg text-neutral-900 bg-fdyellowbright indent-3 rounded-t-2xl dark:bg-neutral-400">
                    Question.{props.qNumber}
                </div>
                <div className="overflow-hidden shadow rounded-2xl">
                    <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                        <legend className="text-base font-medium text-neutral-900 contents">{props.qTitle}</legend>
                        <p className="text-sm text-neutral-500">{props.qInfo}</p>
                        <div className="mt-1">
                            <textarea
                                id="about"
                                name="about"
                                rows={3}
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="답변 내용을 입력하세요"
                                value={answer}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="mt-5 border-2 border-gray-100 shadow-lg rounded-2xl dark:border-neutral-600">
                <div className="text-lg text-neutral-900 rounded-t-2xl bg-fdyellowbright indent-3 dark:bg-neutral-400">
                    Question.{props.qNumber}
                </div>
                <div className="overflow-hidden shadow rounded-b-2xl">
                    <div className="px-4 py-5 space-y-6 bg-white sm:p-6 dark:bg-neutral-700">
                        <legend className="text-base font-medium text-neutral-900 contents dark:text-fdyellowlight">{props.qTitle}</legend>
                        <p className="text-sm text-neutral-500 dark:text-white">{props.qInfo}</p>
                        <div className="mt-1">
                            <textarea
                                id="about"
                                name="about"
                                rows={3}
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="답변 내용을 입력하세요"
                                value={props.svyRespContents[index].ansVal[0].resp}
                                readOnly={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}






