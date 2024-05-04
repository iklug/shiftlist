import Layout from "../components/Layout";
import NewShiftButton from "../components/NewShiftButton";
import Sidebar from "../components/Sidebar";
import ViewShiftsButton from "../components/ViewShiftsButton";
import ProfileTab from "../components/ProfileTab";
import SidebarTab from "../components/SidebarTab";
import SavedTasksTab from "../components/SavedTasksTab";
import { useState, useEffect } from "react";

export default function Landing({ viewAll }) {
    return (
        <div className="flex flex-col items-center">
            <div className=" text-6xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-violet-400 font-bold mb-10">
                ShiftList
            </div>
            <NewShiftButton newShift={newShift} />
            <ViewShiftsButton handleClick={viewAll} />
        </div>
    );
}
