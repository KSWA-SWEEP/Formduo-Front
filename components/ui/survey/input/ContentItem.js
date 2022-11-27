import { XMarkIcon } from "@heroicons/react/20/solid"

const ContentItem = ({ qContentId, qContentVal, onRemoveContent, onUpdate }) => {
    return (
        <div className="hover:border-b-2 hover:border-spacing-2 hover:border-gray-200 dark:hover:border-neutral-600">
            <div className="grid items-center grid-cols-12 gap-2 my-2 place-content-between">
                <div className="flex items-center col-span-11">
                    <div className="w-full">
                        <input
                            placeholder="선택지를 입력하세요"
                            defaultValue={qContentVal?qContentVal:""}
                            type="text"
                            className="block w-full text-sm border-0 rounded sm:text-sm text-fdblue focus:ring-fdblue dark:bg-neutral-500 dark:text-fdyellowbright dark:placeholder:text-fdyellowlight"
                            onChange={onUpdate(qContentId)}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-end h-5 col-span-1 flex-end"  onClick={() => onRemoveContent(qContentId)}>
                    <XMarkIcon className="w-5 h-5 text-neutral-500 hover:bg-neutral-200"/>
                </div>
            </div>
        </div>
    );
};
  
  export default ContentItem;
  