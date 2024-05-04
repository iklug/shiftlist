import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeNoShift, changeViewAll } from "../redux/miscState";

export default function ViewShiftsButton({ handleClick }) {
    return (
        <div
            className="min-w-60 px-10 py-2 bg-white border border-gray-200 text-gray-600 text-center rounded-full m-4 select-none shadow-sm hover:border-yellow-500 transition-colors duration-150"
            onClick={handleClick}
        >
            View Past Shifts
        </div>
    );
}
