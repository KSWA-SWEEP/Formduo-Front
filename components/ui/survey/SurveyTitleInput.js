export default function SurveyTitleInput(props) {
    return (
        <div className="mt-5 border-2 border-gray-100 shadow-lg dark:border-neutral-700 rounded-2xl">
            <div className="overflow-hidden shadow rounded-2xl">
                <div className={"bg-fdyellowbright space-y-6 px-4 py-5 sm:p-6 dark:bg-neutral-600"}>
                    <div>
                        <input
                            type="text"
                            id="svyTitle"
                            placeholder="설문 제목을 입력하세요"
                            className="block w-full font-bold border-0 rounded-md shadow-sm text-neutral-900 bg-opacity-20 focus:border-gray-300 focus:ring-gray-300 sm:text-sm dark:bg-neutral-500 dark:text-fdyellowbright dark:placeholder:text-fdyellowlight"
                            onChange={props.setSvyTitle}
                            defaultValue={props.receiveTitle}
                        />
                        <textarea
                            id="svyIntro"
                            rows={3}
                            className="block w-full mt-4 border-0 rounded-md shadow-sm text-neutral-900 bg-opacity-20 focus:border-gray-300 focus:ring-gray-300 sm:text-sm dark:bg-neutral-500 dark:text-fdyellowbright dark:placeholder:text-fdyellowlight"
                            placeholder="설문 설명을 입력하세요"
                            defaultValue={props.receiveIntro}
                            onChange={props.setSvyIntro}
                            
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
  