import { useState } from "react";

import TodoList from "./pages/TodoList";

function App() {
    const [count, setCount] = useState(["a"]);
    const handleTaskAdd = () => {
        setCount((prev) => [...prev, "a"]);
    };

    return (
        // <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100">
        //     <Title title={`Hello bois`} />
        //     <AllTabs />
        //     <div className="h-full w-full sm:h-5/6 sm:w-5/6 md:h-1/2 md:w-1/2 bg-white shadow-md  rounded-md">
        //         {count.map((item) => (
        //             <Task />
        //         ))}
        //         <AddTask handleClick={handleTaskAdd} />
        //     </div>
        // </div>
        <TodoList tasks={[{ id: 1, value: "moop", completed: false }]} />
    );
}

export default App;
