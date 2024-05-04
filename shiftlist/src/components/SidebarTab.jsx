import { useState } from "react";
import {
    ChevronRightIcon,
    ChevronDownIcon,
    PlusIcon,
    ArrowUpRightIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { setShift } from "../redux/taskLists";
import shiftTemplate from "../utils/shiftTemplate";
import { selectShift } from "../redux/taskLists";
import { changeNoShift, selectNoShift } from "../redux/miscState";

const SidebarItem = ({ title, itemData, id }) => {
    const dispatch = useDispatch();
    const shift = useSelector(selectShift);
    const noShift = useSelector(selectNoShift);

    const handleSelect = () => {
        dispatch(setShift(itemData));
        if (noShift) {
            dispatch(changeNoShift(false));
        }
    };

    return (
        <div
            id="container"
            className="flex group justify-start gap-2 items-center w-full hover:bg-gray-100 pl-4 group py-1 text-gray-700"
            onClick={handleSelect}
        >
            <div
                id="bulletPoint"
                className={` ${
                    id === shift._id && "bg-green-400"
                } w-1 h-1 bg-slate-300 rounded-full group-hover:bg-green-400`}
            ></div>
            <div id="title" className="text-sm w-32 truncate">
                {title}
            </div>
            {id !== shift._id && (
                <ArrowUpRightIcon className="hidden group-hover:block h-3 w-3 ml-auto mr-2" />
            )}
        </div>
    );
};

const DraggableItem = ({ title, id }) => {
    return (
        <div
            id="container"
            className="flex group justify-start gap-2 items-center w-full hover:bg-gray-100 pl-4 group py-1 text-gray-700"
        >
            <div>{title}</div>
        </div>
    );
};

export default function SidebarTab({ title, items, handleViewAll }) {
    const [open, setOpen] = useState(false);
    const [fullyOpen, setFullyOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
        setTimeout(() => {
            setFullyOpen(!fullyOpen);
        }, 100);
    };

    const dispatch = useDispatch();

    const handleAddShift = () => {
        setOpen(false);
        setFullyOpen(false);
        dispatch(setShift(shiftTemplate));
        dispatch(changeNoShift(false));
    };

    return (
        <div className="flex flex-col w-full pt-1">
            <div className="w-full text-nowrap bg-gray-200 h-10 rounded-md flex justify-between items-center p-2">
                <p className="text-gray-700 font-semibold">{title}</p>
                <div className="flex gap-2 h-4/5 w-20 items-center justify-end">
                    <PlusIcon
                        className="hover:bg-gray-50 h-6 w-6 rounded-full p-1"
                        onClick={handleAddShift}
                    />
                    <ChevronRightIcon
                        onClick={handleClick}
                        className={`${
                            open ? "rotate-90" : ""
                        } transition-all duration-200 hover:bg-gray-50 h-6 w-6 p-1 text-gray-900 font-extrabold rounded-full`}
                    />
                </div>
            </div>
            {fullyOpen && items?.length > 0 && (
                <div className="flex flex-col select-none">
                    {items.map((item) => (
                        <SidebarItem
                            title={item.title}
                            key={item._id}
                            itemData={item}
                            id={item._id}
                        />
                    ))}
                </div>
            )}
            {fullyOpen && (
                <div
                    className="pl-2 text-gray-500 hover:text-yellow-600 select-none"
                    onClick={handleViewAll}
                >
                    {items?.length > 4
                        ? "View All"
                        : items == null
                        ? "No recent shifts"
                        : ""}
                </div>
            )}
        </div>
    );
}
