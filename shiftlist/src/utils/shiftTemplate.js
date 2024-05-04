import { v4 as uuidv4 } from "uuid";

const shiftTemplate = {
    title: "",
    tabs: [
        {
            id: "tab1",
            active: true,
            title: "1",
            tasks: [{ id: uuidv4(), value: "", completed: false }],
            indented: false,
            completed: false,
        },
    ],
    shiftId: null,
};

export default shiftTemplate;
