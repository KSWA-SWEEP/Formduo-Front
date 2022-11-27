import { useEffect, useState } from "react";

export default function Objective(props) {

  const index = props.svyRespContents.findIndex((svyRespContent) => svyRespContent.qId === props.qId);

  const [tempAnsVal, setTempAnsVal] = useState(
      props.svyRespContents[index].ansVal[0].qContentId === "" && props.svyRespContents[index].ansVal[0].resp === ""
          ? [{
            qContentId: "",
            resp: "",
          }] : props.svyRespContents.ansVal);

  useEffect(() => {
        if (props.isModify)
          updatedSvyRespContents();
      },
      [tempAnsVal]
  );

  // console.log("### qContents: " + JSON.stringify(props.qContents));

  const updatedSvyRespContents = () => {
    // console.log("## tempAnsVal: " + JSON.stringify(tempAnsVal));
    const newList = replaceItemAtIndex(props.svyRespContents, index, {
      ...props.svyRespContents[index],
      ansVal: tempAnsVal,
    });
    props.setSvyRespContents(newList);
  }

  function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }

  if (props.isModify) {

    const onChange = (event) => {
      setTempAnsVal([{ qContentId: event.target.value, resp: props.qContents[event.target.value - 1].qContentVal }]);
    }

    return (

        <div className="mt-5 border-2 border-gray-100 shadow-lg rounded-2xl dark:border-neutral-600">
          <div className="text-lg text-neutral-900 bg-fdyellowbright indent-3 rounded-t-2xl dark:bg-neutral-400">
            Question. {props.qNumber}
          </div>
          <div className="overflow-hidden shadow rounded-2xl">
            <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
              <fieldset>
                <legend className="text-base font-medium text-neutral-900 contents">{props.qTitle}</legend>
                <p className="text-sm text-neutral-500">{props.qInfo}</p>
                <div className="mt-4 space-y-4">

                  {props.qContents && props.qContents.map((qContent) => {
                    return (
                        <div key={qContent.qContentId}>
                          <div className="flex items-center">
                            <input
                                id="push-everything"
                                name={props.qId}
                                type="radio"
                                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                onChange={onChange}
                                value={qContent.qContentId}
                            />
                            <label htmlFor="push-everything" className="block ml-3 text-sm font-medium text-neutral-700">
                              {qContent.qContentVal}
                            </label>
                          </div>
                        </div>
                    )
                  })}
                </div>
              </fieldset>
            </div>
          </div>
        </div>
    )
  }
  else {
    // console.log(props);
    return (
        <div className="mt-5 border-2 border-gray-100 shadow-lg rounded-2xl dark:border-neutral-600">
          <div className="text-lg text-neutral-900 bg-fdyellowbright rounded-t-2xl indent-3 dark:bg-neutral-400">
              Question. {props.qNumber}
          </div>
          <div className="overflow-hidden shadow rounded-b-2xl">
            <div className="px-4 py-5 space-y-6 bg-white sm:p-6 dark:bg-neutral-700">
              <fieldset>
                <legend className="text-base font-medium text-neutral-900 contents dark:text-fdyellowlight">{props.qTitle}</legend>
                <p className="text-sm text-neutral-500 dark:text-white">{props.qInfo}</p>
                <div className="mt-4 space-y-4">

                  {props.qContents && props.qContents.map((qContent, idx) => {
                    // console.log(idx.toString(), props.svyRespContents[index].ansVal[0].qContentId)
                    return (

                        <div key={qContent.qContentId}>
                          <div className="flex items-center">
                            <input
                                id="push-everything"
                                name={props.qId}
                                type="radio"
                                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                checked={(idx+1).toString() === props.svyRespContents[index].ansVal[0].qContentId}
                                readOnly={true}
                                value={qContent.qContentId}
                            />
                            {/* {JSON.stringify(qContent)} */}
                            <label htmlFor="push-everything" className="block ml-3 text-sm font-medium text-neutral-700 dark:text-white">
                              {qContent.qContentVal}
                            </label>
                          </div>
                        </div>
                    )
                  })}
                </div>
              </fieldset>
            </div>
          </div>
        </div>
    )
  }
}
