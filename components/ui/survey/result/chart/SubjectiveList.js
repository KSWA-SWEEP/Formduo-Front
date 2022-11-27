export default function SubjectiveList(props) {
    return (
        <div className="mt-5 border-2 border-gray-100 shadow-lg rounded-2xl dark:border-neutral-700">
            <div className="overflow-hidden shadow rounded-2xl">
                <div className={"bg-fdyellowbright space-y-6 px-4 py-5 sm:p-6 dark:bg-neutral-600"}>
                    <div>
                        <h1 className="px-4 text-xl font-extrabold text-neutral-600 dark:text-fdyellowlight" data-testid="title">
                            {props.num}번
                        </h1>
                        <div className="mt-3 ml-10">
                            {props.value.map(e => {
                                return <h1 key={e} className="px-4 mt-2 font-extrabold text-neutral-600 text-l dark:text-fdyellowlight" data-testid="intro">
                                    {e}
                                </h1>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
