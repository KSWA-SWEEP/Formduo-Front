export default function Video(props) {
    return (
        <div className="mt-5 border-2 border-gray-100 rounded-2xl shadow-lg">
            <div className="text-lg bg-fdyellowbright text-neutral-900 indent-3">
                Question. {props.qNumber}
            </div>
            <div className="overflow-hidden shadow rounded-2xl">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <legend className="contents text-base font-medium text-neutral-900">{props.qTitle}</legend>
                    <p className="text-sm text-neutral-500">{props.qInfo}</p>
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    </div>
                </div>
            </div>
        </div>
    )
}
