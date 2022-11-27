import { useState, useEffect } from "react";

export default function Checkbox(props) {

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

  const insertAnsVal = (tempQContentId, tempResp) => {
    const ansVal = {
      qContentId: tempQContentId,
      resp: tempResp,
    };
    setTempAnsVal(tempAnsVal.concat(ansVal));
  };

  const deleteAnsVal = (tempQContentId) => {
    setTempAnsVal(tempAnsVal.filter(temp => temp.qContentId !== tempQContentId));
  }

  const updatedSvyRespContents = () => {
    const newList = replaceItemAtIndex(props.svyRespContents, index, {
      ...props.svyRespContents[index],
      ansVal: tempAnsVal,
    });
    props.setSvyRespContents(newList);
  }

  function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }

  const [checked, setChecked] = useState([]);
  const handleCheck = (event) => {
    const updatedList = [...checked];

  
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
      var idx = event.target.value;
      var targetIdx = props.qContents.findIndex((content) => content.qContentId === idx);

      // insertAnsVal(event.target.value, props.qContents[event.target.value - 1].qContentVal);
      insertAnsVal(event.target.value, targetIdx != -1 ? props.qContents[targetIdx].qContentVal : props.qContents[event.target.value - 1].qContentVal);
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
      deleteAnsVal(event.target.value);
    }

    setChecked(updatedList);
  }

  function findAnswers(idx) {
    let kk = false;
    props.svyRespContents[index].ansVal.map(item => {
      if(idx.toString() === (item.qContentId-1).toString()) {
        kk = true;
      }
    })
    return kk;
  }

  if (props.isModify) {
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
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                  id="comments"
                                  name="comments"
                                  type="checkbox"
                                  className="w-4 h-4 border-gray-300 rounded text-fdblue focus:ring-fdblue"
                                  onChange={handleCheck}
                                  value={qContent.qContentId}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label id="qContent" htmlFor="comments" className="font-medium text-neutral-700">
                                {qContent.qContentVal}
                              </label>
                            </div>
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
  } else {

    return (
        <div className="mt-5 border-2 border-gray-100 shadow-lg rounded-2xl dark:border-neutral-600">
          <div className="text-lg text-neutral-900 rounded-t-2xl bg-fdyellowbright indent-3 dark:bg-neutral-400">
            Question. {props.qNumber}
          </div>
          <div className="overflow-hidden shadow rounded-b-2xl">
            <div className="px-4 py-5 space-y-6 bg-white sm:p-6 dark:bg-neutral-700">
              <fieldset>
                <legend className="text-base font-medium text-neutral-900 contents dark:text-fdyellowlight">{props.qTitle}</legend>
                <p className="text-sm text-neutral-500 dark:text-white">{props.qInfo}</p>
                <div className="mt-4 space-y-4">
                  {props.qContents && props.qContents.map((qContent, idx) => {

                        return (
                            <div key={qContent.qContentId}>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                      <input
                                          id="comments"
                                          name="comments"
                                          type="checkbox"
                                          className="w-4 h-4 border-gray-300 rounded text-fdblue focus:ring-fdblue"
                                          // onChange={handleCheck}
                                          readOnly={true}
                                          checked = {findAnswers(idx)}
                                          value={qContent.qContentId}
                                      />
                                    </div>
                                    <div className="ml-3 text-sm">
                                      <label id="qContent" htmlFor="comments" className="font-medium text-neutral-700 dark:text-white">
                                        {qContent.qContentVal}
                                      </label>
                                    </div>
                                </div>
                          </div>
                    )})}
                </div>
              </fieldset>
            </div>
          </div>
        </div>
    )
  }
}
