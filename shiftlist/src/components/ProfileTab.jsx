import { useState } from "react";
import { useDispatch } from "react-redux";

import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import apiURL from "../utils/apiURL";

const Option = ({ title, clickFunction }) => {
    return (
        <div
            onClick={clickFunction}
            className="flex group justify-start gap-2 items-center w-full hover:bg-gray-100 pl-4 group py-1 text-gray-700"
        >
            <div>{title}</div>
        </div>
    );
};

export default function ProfileTab() {
    const [open, setOpen] = useState(false);
    const [fullyOpen, setFullyOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
        setTimeout(() => {
            setFullyOpen(!fullyOpen);
        }, 100);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const request = await fetch(`${apiURL}/user`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!request.ok) {
                throw new Error("unable to logout?");
            }
            const data = await request.json();
            console.log(data);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col w-full pt-1">
            <div className="w-full text-nowrap bg-gray-200 h-10 rounded-md flex justify-between items-center p-2">
                <p className="text-gray-700 font-semibold">
                    {"User's Profile"}
                </p>
                <div className="flex gap-2 h-4/5 w-20 items-center justify-end">
                    <ChevronRightIcon
                        onClick={handleClick}
                        className={`${
                            open ? "rotate-90" : ""
                        } transition-all duration-200 hover:bg-gray-50 h-6 w-6 p-1 text-gray-900 font-extrabold rounded-full`}
                    />
                </div>
            </div>
            {fullyOpen && (
                <div className="flex flex-col select-none">
                    <Option title={"Logout"} clickFunction={logout} />
                </div>
            )}
        </div>
    );
}
