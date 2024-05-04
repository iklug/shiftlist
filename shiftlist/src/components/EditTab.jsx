import { useRef, useEffect } from "react";

export default function EditTab({ title, active }) {
    const ref = useRef(null);

    useEffect(() => {
        console.log(ref);
        if (ref.current && active) {
            ref.current.focus();
        }
    }, []);

    return (
        <div className="bg-white  px-2 shadow-md text-gray-700 w-16 flex justify-center items-center select-none rounded-t-md">
            <input
                ref={ref}
                className="h-4 w-full text-center outline-none outline-orange-200 rounded-lg"
                type="text"
                placeholder={title}
            />
        </div>
    );
}
