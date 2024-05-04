import { PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { totalTabs, newTab, viewTab, updateTab } from "../redux/taskLists";

const Tab = ({ id, isActive, title }) => {
    const dispatch = useDispatch();

    return (
        <div
            className={`${
                isActive
                    ? "bg-white shadow-md text-yellow-700 flex-[2] max-w-24"
                    : "bg-gray-200 text-gray-400 shadow-inner flex-1 max-w-24 hover:bg-gray-100"
            } w-16 flex justify-center items-center rounded-t-md`}
            onClick={() => dispatch(viewTab(id))}
        >
            <p className=" text-ellipsis truncate px-2">{title}</p>
        </div>
    );
};

const AddNewTab = () => {
    const dispatch = useDispatch();

    return (
        <div
            className="flex justify-center items-center text-gray-400 hover:text-gray-600"
            onClick={() => dispatch(newTab())}
        >
            <PlusIcon className="h-5 w-5 text-gray-400 text-inherit" />
        </div>
    );
};

const EditTab = ({ title, active, id }) => {
    const ref = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (ref.current && active) {
            ref.current.focus();
        }
    }, []);

    return (
        <div className="bg-white  px-2 shadow-md text-gray-700 w-16 flex justify-center items-center select-none max-w-24 flex-1 rounded-t-md">
            <input
                ref={ref}
                className="h-4 w-full text-center outline-none outline-orange-200 rounded-lg focus:outline-blue-200 "
                type="text"
                placeholder={`${
                    title.length < 5 ? title : title.slice(0, 4) + ".."
                }`}
                onChange={(e) =>
                    dispatch(updateTab({ value: e.target.value, id: id }))
                }
            />
        </div>
    );
};

export default function AllTabs({ active, renaming }) {
    const tabs = useSelector(totalTabs);

    return (
        <div className="h-8 w-full sm:w-5/6  md:w-2/3 flex justify-start px-6 gap-1 bg-gray-100 pt-1">
            {tabs.map((item) =>
                !renaming ? (
                    <Tab
                        id={item.id}
                        isActive={item.active}
                        // handleClick={viewTab}
                        key={item.id}
                        title={item.title}
                    />
                ) : (
                    <EditTab
                        title={item.title}
                        active={item.active}
                        key={item.id}
                        id={item.id}
                    />
                )
            )}
            {tabs.length < 9 && !renaming && <AddNewTab />}
        </div>
    );
}
