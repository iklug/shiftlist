import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetShift, selectShift } from "../redux/taskLists";
import { changeNoShift } from "../redux/miscState";
import apiURL from "../utils/apiURL";

const Popup = ({ cancel, deleteShift }) => {
    return (
        <div className=" h-32 w-72 md:w-96 p-4 bg-white flex flex-col gap-4 rounded-lg shadow-lg">
            <div className="text-gray-800">
                Are you sure you want to delete the entire shift?
            </div>
            <div className="flex justify-center  gap-6">
                <div
                    onClick={deleteShift}
                    className="px-4 py-1 bg-red-300 hover:bg-red-400 text-red-900 rounded-lg flex items-center shadow-sm"
                >
                    Delete Shift
                </div>
                <div
                    onClick={cancel}
                    className="px-4 py-1 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-lg flex items-center shadow-sm"
                >
                    Go Back
                </div>
            </div>
        </div>
    );
};

const Backdrop = ({ children }) => {
    return (
        <div className="h-screen w-screen fixed top-0 left-0 z-10 bg-gray-500/35 flex justify-center items-center">
            {children}
        </div>
    );
};

export default function BottomBanner({ handleView, noShift }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [popup, setPopup] = useState(false);

    const shift = useSelector(selectShift);
    const handleDelete = async () => {
        //set current shift to nothing
        //delete in database
        try {
            const request = await fetch(`${apiURL}/shiftlist`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id: shift._id }),
            });
            if (!request.ok) {
                throw new Error("failed to delete at handleDelete");
            }
            const data = await request.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
        //delete from recent locally
        //redirect to landing page
        dispatch(changeNoShift(true));
        window.location.reload();
    };

    return (
        <div className="min-h-10 w-full bg-gray-50 mt-auto flex justify-end items-center pr-4 relative">
            <div
                className="text-gray-300 hover:text-gray-500 select-none"
                onClick={() => setPopup(true)}
            >
                delete shift
            </div>
            {popup && (
                <Backdrop>
                    <Popup
                        cancel={() => setPopup(false)}
                        deleteShift={handleDelete}
                    />
                </Backdrop>
            )}
        </div>
    );
}
