export default function SurveyTitleShow(props) {
    return (
        <div className="mt-5 border-2 border-gray-100 shadow-lg rounded-2xl dark:border-neutral-700">
            <div className="overflow-hidden shadow rounded-2xl">
                <div className={"bg-fdyellowbright space-y-6 px-4 py-5 sm:p-6 dark:bg-neutral-600"}>
                    <div>
                        <h1 className="px-4 text-xl font-extrabold text-neutral-600 dark:text-fdyellowlight" data-testid="title">
                        {props.svyTitle}
                        </h1>
                        <h1 className="px-4 font-extrabold text-neutral-600 text-l dark:text-fdyellowlight" data-testid="intro">
                        {props.svyIntro}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
  