import AllTabs from "../components/AllTabs";
import TaskList from "../components/TaskList";
import Title from "../components/Title";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import SidebarTab from "../components/SidebarTab";
import ProfileTab from "../components/ProfileTab";
import SavedTasksTab from "../components/SavedTasksTab";
import ViewAll from "../components/ViewAll";
import Landing from "./Landing";

import { useSelector, useDispatch } from "react-redux";
import {
    selectViewAll,
    selectNoShift,
    changeViewAll,
    changeNoShift,
} from "../redux/miscState";
import {
    activeTab,
    totalTabs,
    selectShift,
    setShift,
    setShiftId,
} from "../redux/taskLists";

import { useEffect, useRef, useState } from "react";
import apiURL from "../utils/apiURL";
import { addAllSavedTasks, addSavedTask } from "../redux/savedTasks";
import { useNavigate } from "react-router-dom";

export default function TodoList() {
    const sessionInfo = sessionStorage.getItem("user");
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionInfo) {
            navigate("/login");
        }
    }, []);

    const [renaming, setRenaming] = useState(false);
    const currentTab = useSelector(activeTab);
    const shift = useSelector(selectShift);
    const noShift = useSelector(selectNoShift);
    const viewAll = useSelector(selectViewAll);
    const tasks = currentTab.tasks;

    const [recent, setRecent] = useState(null);
    const [initialRender, setInitialRender] = useState(true);

    const [allPosts, setAllPosts] = useState([]);
    const [saving, setSaving] = useState("");
    const dispatch = useDispatch();

    const editTabs = () => {
        setRenaming(!renaming);
    };

    useEffect(() => {
        const recent = localStorage.getItem("recentShifts");
        if (recent) {
            const formattedData = JSON.parse(recent);
            setRecent(formattedData);
        } else {
            const getRecentShifts = async () => {
                try {
                    const request = await fetch(`${apiURL}/shiftlist/recent`, {
                        method: "GET",
                        credentials: "include",
                        header: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (!request.ok) {
                        throw new Error("things have failed @ Todolist part 2");
                    }
                    const data = await request.json();
                    if (data[0]._id) {
                        setRecent(data);
                        dispatch(setShift(data[0]));
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            const getSavedTasks = async () => {
                try {
                    const request = await fetch(`${apiURL}/shiftlist/task`, {
                        method: "GET",
                        credentials: "include",
                        header: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (!request.ok) {
                        throw new Error("things have failed @ getSavedTasks");
                    }
                    const data = await request.json();
                    dispatch(addAllSavedTasks(data.tasks));
                } catch (error) {
                    console.error(error);
                }
            };
            getRecentShifts();
            getSavedTasks();
        }
    }, []);

    const timerRef = useRef(null);
    const savingRef = useRef(null);

    const handleSaving = () => {
        setSaving("saved");
        setTimeout(() => setSaving(""), 2000);
    };

    const saveShift = async (apiUrl, shift) => {
        try {
            const request = await fetch(`${apiURL}/shiftlist`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(shift),
            });
            if (!request.ok) {
                throw new Error("failed saveShift @ TodoList");
            }
            const data = await request.json();
            handleSaving();
            if (data._id) {
                dispatch(setShiftId(data._id));
                let copy;
                if (recent) {
                    copy = recent.slice(0, 4);
                    copy.unshift(data);
                } else {
                    copy = [data];
                }

                setRecent(copy);
            } else {
                console.log(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const resetTimer = () => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => saveShift(apiURL, shift), 5000);
    };

    const resetSaving = () => {
        clearTimeout(savingRef.current);
        savingRef.current = setTimeout(() => setSaving("saving"), 2000);
    };

    useEffect(() => {
        if (initialRender) {
            setInitialRender(false);
        } else {
            if (!noShift && !viewAll) {
                resetTimer();
                resetSaving();
            } else {
                clearTimeout(savingRef.current);
                clearTimeout(timerRef.current);
            }
        }
    }, [shift]);

    const handleViewAll = async () => {
        dispatch(changeViewAll(true));
        dispatch(changeNoShift(false));
        try {
            const request = await fetch(`${apiURL}/shiftlist/all`, {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!request.ok) {
                throw new Error("failed to fetch all at TodoList");
            }
            const data = await request.json();
            setAllPosts(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex">
            <Sidebar>
                <ProfileTab />
                <SidebarTab
                    title="Recent Shifts"
                    items={recent}
                    handleViewAll={handleViewAll}
                />
                <SavedTasksTab disable={viewAll} />
            </Sidebar>
            <Layout>
                {noShift && <Landing viewAll={handleViewAll} />}
                {!viewAll && !noShift && (
                    <>
                        <Title saving={saving} />
                        <AllTabs active={currentTab.id} renaming={renaming} />
                        <TaskList
                            tasks={tasks}
                            id={currentTab.id}
                            key={currentTab.id}
                            renaming={renaming}
                            editTabs={editTabs}
                            handleView={handleViewAll}
                        />
                    </>
                )}
                {viewAll && !noShift && <ViewAll allPosts={allPosts} />}
            </Layout>
        </div>
    );
}
