import { PlusIcon } from "@heroicons/react/24/solid";
import Task from "./Task";
import { useDispatch } from "react-redux";
import { newTask, completeTask } from "../redux/taskLists";

function AddTask() {
    const dispatch = useDispatch();

    return (
        <div
            className="flex items-center gap-2 w-full ml-2"
            onClick={() => dispatch(newTask())}
        >
            <PlusIcon className="h-4 w-4 text-gray-400" />
            <p className="text-gray-400 text-md select-none">New task</p>
        </div>
    );
}

function Options({ name }) {
    return (
        <div className="w-full h-12 flex justify-end items-center gap-3 px-4 text-gray-400 select-none">
            <div className="hover:text-yellow-700">rename</div>
            <div className="hover:text-yellow-700">remove</div>
        </div>
    );
}

export default function TaskList({ tasks }) {
    return (
        <div className="h-full w-full sm:h-5/6 sm:w-5/6 md:h-1/2 md:w-1/2 bg-white shadow-md  rounded-md overflow-scroll pb-4">
            <Options name={"Bilbo"} />
            {tasks.map((item) => (
                <Task
                    key={item.id}
                    value={item.value}
                    completed={item.completed}
                    id={item.id}
                />
            ))}
            <AddTask />
        </div>
    );
}
