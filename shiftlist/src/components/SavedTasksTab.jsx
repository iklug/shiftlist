import {
    PlusIcon,
    ChevronRightIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newTask, addTaskAllTabs } from "../redux/taskLists";
import {
    selectSavedTasks,
    addSavedTask,
    deleteSavedTask,
} from "../redux/savedTasks";
import apiURL from "../utils/apiURL";

const SavedTask = ({ title, edit, disable, id }) => {
    const dispatch = useDispatch();
    const savedTasks = useSelector(selectSavedTasks);
    console.log("these are the savedTasks", savedTasks);
    const handleDelete = () => {
        console.log("this is something");
        dispatch(deleteSavedTask(id));
    };

    return (
        <div
            id="container"
            className={`${
                edit ? "bg-violet-100" : "bg-gray-50"
            } flex group justify-start gap-2 items-center w-full hover:bg-gray-100 pl-4 group py-1 text-gray-700`}
        >
            <div id="title" className="text-sm w-32 truncate">
                {title}
            </div>
            {!edit && !disable && (
                <PlusIcon
                    className="size-4 group-hover:visible invisible text-gray-500 hover:text-gray-900"
                    title="Add to current tab"
                    onClick={() => dispatch(newTask(title))}
                />
            )}
            {!edit && !disable && (
                <DocumentPlusIcon
                    className="size-5 group-hover:visible invisible text-gray-500 hover:text-gray-900"
                    title="Add to all tabs"
                    onClick={() => dispatch(addTaskAllTabs(title))}
                />
            )}
            {edit && (
                <XMarkIcon
                    className="size-5 invisible group-hover:visible text-gray-400 hover:text-red-500 hover:bg-red-100 ml-auto mr-1"
                    onClick={handleDelete}
                />
            )}
        </div>
    );
};

const TaskInput = ({ closeInput }) => {
    const [task, setTask] = useState("");
    const dispatch = useDispatch();
    const submitTask = async () => {
        //dispatch(setTask to something because i don't really need to wait for the backend for this)
        dispatch(addSavedTask({ title: task }));
        //does this not just make the task dissapear?
        // closeInput();
        closeInput();
        try {
            const request = await fetch(`${apiURL}/shiftlist/task`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    task: {
                        title: task,
                    },
                }),
            });

            if (!request.ok) {
                throw new Error("failed to send savedTask @ TaskInput");
            }
            const data = await request.json();
            console.log("submitTask results::", data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            id="container"
            className="flex w-50 gap-2 bg-gray-200 -mt-2 pt-4 pb-2 rounded-b-md justify-center"
        >
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-32 outline-none text-sm px-1 rounded-md ml-2"
            />
            <div
                className="bg-yellow-600 text-white p-1 text-sm rounded-md mr-2"
                onClick={submitTask}
            >
                Save
            </div>
        </div>
    );
};

export default function SavedTasksTab({ disable }) {
    const [open, setOpen] = useState(false);
    const [fullyOpen, setFullyOpen] = useState(false);
    const [newTask, setNewTask] = useState(false);
    const [edit, setEdit] = useState(false);
    const handleClick = () => {
        setOpen(!open);
        setTimeout(() => {
            setFullyOpen(!fullyOpen);
        }, 100);
    };

    const savedTasks = useSelector(selectSavedTasks);
    console.log("savedTasks 😀", savedTasks);
    const dispatch = useDispatch();

    const saveDeletion = async () => {
        try {
            const request = await fetch(`${apiURL}/shiftlist/task`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(savedTasks),
            });
            if (!request.ok) {
                throw new Error("error at save deletion in SavedTasksTab");
            }
            const data = await request.json();
            console.log(data);
            setEdit(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col w-full pt-1">
            <div className="w-full text-nowrap bg-gray-200 h-10 rounded-md flex justify-between items-center p-2">
                <p className="text-gray-700 font-semibold">Saved Tasks</p>
                <div className="flex gap-2 h-4/5 w-20 items-center justify-end">
                    {newTask ? (
                        <XMarkIcon
                            className="hover:bg-gray-50 h-6 w-6 rounded-full p-1"
                            onClick={() => setNewTask(false)}
                            title={"Cancel"}
                        />
                    ) : (
                        <PlusIcon
                            className="hover:bg-gray-50 h-6 w-6 rounded-full p-1"
                            title={"New saved task"}
                            onClick={() => {
                                setNewTask(true);
                            }}
                        />
                    )}
                    <ChevronRightIcon
                        onClick={handleClick}
                        title={"View saved tasks"}
                        className={`${
                            open ? "rotate-90" : ""
                        } transition-all duration-200 hover:bg-gray-50 h-6 w-6 p-1 text-gray-900 font-extrabold rounded-full`}
                    />
                </div>
            </div>
            {newTask && <TaskInput closeInput={() => setNewTask(false)} />}
            {fullyOpen && savedTasks?.length > 0 && (
                <div className="flex flex-col select-none max-h-72 overflow-scroll">
                    {savedTasks.map((item) => (
                        <SavedTask
                            title={item.title}
                            key={item.title}
                            edit={edit}
                            disable={disable}
                            id={item._id}
                            handleEdit={() => setEdit(false)}
                            // itemData={item}
                            // id={item._id}
                        />
                    ))}
                </div>
            )}
            {fullyOpen && (savedTasks?.length > 0 || edit) && (
                <div className="pt-2 pl-2 flex justify-end">
                    {!edit ? (
                        <div
                            className="bg-violet-100 px-3 rounded-lg text-violet-800 select-none hover:bg-violet-200 "
                            onClick={() => setEdit(!edit)}
                        >
                            Edit List
                        </div>
                    ) : (
                        <div
                            className="bg-violet-100 px-3 rounded-lg text-violet-800 select-none hover:bg-violet-200 "
                            onClick={saveDeletion}
                        >
                            Save
                        </div>
                    )}
                </div>
            )}
            {fullyOpen && savedTasks.length === 0 && !edit && (
                <div className="text-gray-700 text-sm bg-gray-100 p-2 flex flex-col rounded-lg">
                    <div>You have no saved tasks.</div>
                    <div>Try adding one!</div>
                </div>
            )}
        </div>
    );
}
