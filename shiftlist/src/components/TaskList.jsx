import { PlusIcon } from "@heroicons/react/24/solid";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import {
    newTask,
    completeTask,
    deleteTab,
    selectShift,
} from "../redux/taskLists";
import BottomBanner from "./BottomBanner";
import { useState } from "react";

function AddTask() {
    const dispatch = useDispatch();

    return (
        <div
            className="flex items-center gap-2 w-full ml-2 min-h-10 text-gray-400 hover:text-yellow-600"
            onClick={() => dispatch(newTask())}
        >
            <PlusIcon className="h-4 w-4" />
            <p className="text-md select-none">New task</p>
        </div>
    );
}

function Options({ id, renaming, editTabs, reflect }) {
    const dispatch = useDispatch();
    const shift = useSelector(selectShift);
    const lastTab = shift.tabs.length === 1;
    return (
        <div className="w-full min-h-12 flex justify-end items-center gap-3 px-4 text-gray-400 select-none font-roboto">
            {renaming && (
                <div className="bg-gray-100 p-1 px-6 flex justify-center text-xs sm:text-sm md:text-xs lg:text-sm md:px-2 flex-grow rounded-full">
                    <div>
                        {`Stay HIPAA compliant. Try using patient initials or
                        room number.`}
                    </div>
                </div>
            )}
            <div
                className={` ${
                    renaming
                        ? "bg-yellow-600 py-[2px] px-2 rounded-md text-white"
                        : "hover:text-yellow-700"
                } `}
                onClick={editTabs}
            >
                {renaming ? "save" : "rename"}
            </div>

            {/* <div
                className={`hover:text-yellow-700 ${
                    reflect && "text-violet-400"
                }`}
                onClick={reflect}
            >
                {renaming ? "" : "reflect"}
            </div> */}
            <div
                className="hover:text-red-700 text-gray-300"
                onClick={() => dispatch(deleteTab(id))}
            >
                {renaming || lastTab ? "" : "remove"}
            </div>
        </div>
    );
}

function TaskContainer({ children }) {
    return (
        <div className=" max-h-4/5 w-full overflow-scroll overflow-x-hidden">
            {children}
        </div>
    );
}

//to be implemented later
function Reflection() {
    const [reflection, setReflection] = useState("");
    const dispatch = useDispatch();
    return (
        <div className="flex flex-col justify-start items-center px-4">
            <textarea
                name="reflection"
                className="resize-none overflow-y-hidden outline-none m-4 border-2 p-4 border-gray-100 text-gray-700 rounded-lg w-full h-[500px]"
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
            ></textarea>
            <div className="px-2 py-1 bg-violet-50 text-violet-900 rounded-lg">
                Save
            </div>
        </div>
    );
}

export default function TaskList({
    tasks,
    id,
    renaming,
    editTabs,
    handleView,
    noShift,
}) {
    const [reflect, setReflect] = useState(false);

    return (
        <div className="h-full w-full sm:h-5/6 sm:w-5/6 md:h-2/3 md:w-2/3 bg-white shadow-md  rounded-md overflow-y-scroll overflow-x-hidden pb-0 flex flex-col">
            <Options
                id={id}
                renaming={renaming}
                editTabs={editTabs}
                reflect={() => setReflect(!reflect)}
            />
            <TaskContainer>
                {!reflect &&
                    tasks.map((item) => (
                        <Task
                            key={item.id}
                            value={item.value}
                            completed={item.completed}
                            id={item.id}
                            indented={item.indented}
                        />
                    ))}
                {reflect && <Reflection />}
            </TaskContainer>
            <AddTask />
            <BottomBanner handleView={handleView} noShift={noShift} />
        </div>
    );
}
