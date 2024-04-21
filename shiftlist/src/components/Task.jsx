import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTask, completeTask } from "../redux/taskLists";
import { XMarkIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";

function CompleteTaskButton({ completed, id }) {
    const dispatch = useDispatch();

    return (
        <div
            className="p-1 mt-1 h-4 w-4 border border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center"
            onClick={() => dispatch(completeTask(id))}
        >
            {completed && <div className=" text-gray-500">✓</div>}
        </div>
    );
}

function ExpandingTextArea({ value, id, completed }) {
    const dispatch = useDispatch();

    const ref = useRef(null);

    const handleChange = (e) => {
        dispatch(updateTask({ value: e.target.value, id: id }));
        const textarea = ref.current;
        console.log(textarea.scrollHeight);
        textarea.style.height = "24px";
        textarea.style.height = Math.max(textarea.scrollHeight, 24) + "px";
    };

    return (
        <textarea
            ref={ref}
            value={value}
            onChange={handleChange}
            style={{
                height: "24px",
            }}
            className={` resize-none overflow-y-hidden w-full outline-none ${
                completed ? "text-gray-300" : "text-gray-600"
            }`}
        />
    );
}

export default function Task({ value, completed, id }) {
    const [indent, setIndent] = useState(false);

    const handleIndent = () => {
        setIndent(!indent);
    };

    return (
        <div className="group p-2 flex justify-center items-start gap-3 border border-transparent hover:border-gray-200">
            {indent && <div className="h-2 w-2"></div>}
            <EllipsisVerticalIcon
                className="h-6 w-6 -mr-3 -ml-2 text-transparent group-hover:text-gray-400 cursor-pointer"
                onClick={handleIndent}
            />
            <CompleteTaskButton completed={completed} id={id} />
            <ExpandingTextArea id={id} value={value} completed={completed} />

            <XMarkIcon className=" h-6 w-6 group-hover:text-gray-300 hover:bg-gray-50 hover:rounded-sm text-transparent" />
        </div>
    );
}
