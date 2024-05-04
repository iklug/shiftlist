import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Sidebar({ children }) {
    const [open, setOpen] = useState(false);
    const [fullyOpen, setFullyOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
        if (open) {
            setFullyOpen(!fullyOpen);
        } else {
            setTimeout(() => {
                setFullyOpen(!fullyOpen);
            }, 350);
        }
    };

    return (
        <>
            <div
                className={`${
                    open
                        ? `bg-gray-50 w-72 p-4 drop-shadow-lg z-10 sm:z-0`
                        : `w-10 bg-gray-100 pt-4`
                } transition-all duration-300 ease-linear flex flex-col items-end justify-start absolute  h-screen sm:static`}
            >
                <Bars3Icon
                    className={`${
                        open ? "bg-gray-50" : "bg-gray-100"
                    } p-1 h-8 w-8 text-gray-600  hover:bg-gray-200 rounded-lg z-10`}
                    onClick={handleOpen}
                />
                {fullyOpen && children}
            </div>
            {open && (
                <div className="sm:hidden bg-gray-300 opacity-55 h-screen w-screen fixed"></div>
            )}
        </>
    );
}
