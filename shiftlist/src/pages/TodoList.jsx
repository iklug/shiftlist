import AllTabs from "../components/AllTabs";
import TaskList from "../components/TaskList";
import Title from "../components/Title";
import Layout from "../components/Layout";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeTab } from "../redux/taskLists";

export default function TodoList() {
    //using redux, i want selectors for active tab which will highlight the active tab
    //and only render a tasklist for that active tab.

    const currentTab = useSelector(activeTab);

    const tasks = currentTab.tasks;

    return (
        <Layout>
            <Title />
            <AllTabs active={currentTab.id} />
            <TaskList tasks={tasks} />
        </Layout>
    );
}
