import { PlusIcon } from "@heroicons/react/24/solid";
import Task from "./Task";

function AddTask() {
    return (
        <div className="flex items-center gap-2 w-full ml-2" onClick={""}>
            <PlusIcon className="h-4 w-4 text-gray-400" />
            <p className="text-gray-400 text-md">New task</p>
        </div>
    );
}

export default function TaskList({ tasks }) {
    return (
        <div className="h-full w-full sm:h-5/6 sm:w-5/6 md:h-1/2 md:w-1/2 bg-white shadow-md  rounded-md">
            {tasks.map((item) => (
                <Task
                    key={item.id}
                    value={item.value}
                    completed={item.completed}
                />
            ))}
            <AddTask />
        </div>
    );
}
