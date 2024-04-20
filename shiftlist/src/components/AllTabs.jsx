import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { totalTabs, newTab, viewTab } from "../redux/taskLists";

const Tab = ({ id, isActive, title }) => {
    const dispatch = useDispatch();

    return (
        <div
            className={`${
                isActive
                    ? "bg-white shadow-md text-yellow-700"
                    : "bg-gray-200 text-gray-400 shadow-inner hover:bg-gray-100"
            } w-16 flex justify-center items-center select-none rounded-t-md`}
            onClick={() => dispatch(viewTab(id))}
        >
            {title}
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

export default function AllTabs({ active }) {
    const tabs = useSelector(totalTabs);

    return (
        <div className="h-8 w-1/2 flex justify-start px-6 gap-1 bg-gray-100 pt-1">
            {tabs.map((item) => (
                <Tab
                    id={item.id}
                    isActive={item.active}
                    // handleClick={viewTab}
                    key={item.id}
                    title={item.title}
                />
            ))}
            {tabs.length < 9 && <AddNewTab />}
        </div>
    );
}
