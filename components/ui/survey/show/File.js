export default function File(props) {
    return (
        <div className="mt-5 border-2 border-gray-100 shadow-lg rounded-2xl dark:border-neutral-600">
            <div className="text-lg text-neutral-900 bg-fdyellowbright indent-3 rounded-t-2xl dark:bg-neutral-400">
                Question. {props.qNumber}
            </div>
            <div className="overflow-hidden shadow rounded-b-2xl">
                <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                    <legend className="text-base font-medium text-neutral-900 contents">{props.qTitle}</legend>
                    <p className="text-sm text-neutral-500">{props.qInfo}</p>
                    <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <svg
                                className="w-12 h-12 mx-auto text-neutral-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div className="flex text-sm text-neutral-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
