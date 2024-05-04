import { shiftTitle, setTitle } from "../redux/taskLists";
import { useSelector, useDispatch } from "react-redux";

export default function Title({ saving }) {
    const dispatch = useDispatch();
    const title = useSelector(shiftTitle);

    return (
        <div className="w-full sm:w-5/6 md:w-2/3 bg-gray-100 p-1 pl-2 mb-4 flex items-center">
            <input
                type="text"
                placeholder="Title"
                value={title}
                className="font-roboto h-10 border-transparent bg-gray-100 text-gray-600 outline-none text-xl font-semibold w-full"
                onChange={(e) => dispatch(setTitle(e.target.value))}
            />
            <div className="flex items-center gap-2 ml-4">
                <div className="text-sm text-gray-400">
                    {saving === "saving"
                        ? "saving"
                        : saving === "saved"
                        ? "saved"
                        : ""}
                </div>
                {saving === "saving" && (
                    <div className="text-sm text-gray-400 animate-spin size-3 border-t-2 border-t-gray-300 rounded-full"></div>
                )}
                {saving === "saved" && (
                    <div className="text-sm text-gray-400 size-3  rounded-full"></div>
                )}
            </div>
        </div>
    );
}
