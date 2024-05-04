import { useDispatch, useSelector } from "react-redux";
import { resetShift, selectShift, setShift } from "../redux/taskLists";
import { useNavigate } from "react-router-dom";
import shiftTemplate from "../utils/shiftTemplate";
import { changeNoShift } from "../redux/miscState";

export default function NewShiftButton() {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setShift(shiftTemplate));
        dispatch(changeNoShift(false));
    };

    return (
        <div
            className="px-10 py-2 min-w-60 bg-yellow-400 text-yellow-900 border-2 text-center rounded-full m-3 hover:bg-white  hover:border-yellow-500 transition-colors duration-150 select-none"
            onClick={handleClick}
        >
            New Shift
        </div>
    );
}
