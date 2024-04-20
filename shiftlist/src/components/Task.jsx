import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function CompleteTaskButton({ completed }) {
    return (
        <div
            className="p-1 mt-1 h-4 w-4 border border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center"
            onClick={""}
        >
            {completed && <div className=" text-gray-500">✓</div>}
        </div>
    );
}

function ExpandingTextArea({ value }) {
    // const [value, setValue] = useState("");
    const ref = useRef(null);

    const handleChange = (e) => {
        // setValue(e.target.value);
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
            className=" resize-none overflow-y-hidden w-full outline-none text-gray-700"
        />
    );
}

export default function Task({ value, completed }) {
    const [indent, setIndent] = useState(false);

    const handleIndent = () => {
        setIndent(!indent);
    };

    return (
        <div className="p-2 flex justify-center items-start gap-3 border border-transparent hover:border-gray-200">
            {indent && <div className="h-2 w-2"></div>}
            <CompleteTaskButton />
            <ExpandingTextArea value={value} />
            <div onClick={handleIndent} className="text-gray-300 select-none">
                {indent ? "<" : ">"}
            </div>
        </div>
    );
}
