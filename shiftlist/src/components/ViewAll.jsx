import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectShift, setShift } from "../redux/taskLists";
import { changeViewAll } from "../redux/miscState";

const Pages = () => {
    return <div></div>;
};
const ShiftLink = ({ title, tabs, updatedAt, _id, handleView }) => {
    console.log(tabs);
    const dispatch = useDispatch();
    const handleSelect = () => {
        dispatch(setShift({ title: title, tabs: tabs, _id: _id }));
        dispatch(changeViewAll(false));
    };

    return (
        <div
            className="flex gap-4 lg:gap-10 px-4 py-2 bg-white items-center hover:bg-gray-50 border-b-2 border-b-gray-50"
            onClick={handleSelect}
        >
            <div className="text-gray-800 flex-grow">{title}</div>
            <div className="min-w-16 text-violet-400 text-sm border rounded-lg bg-violet-100 px-1 text-center">{`${
                tabs.length
            } tab${tabs.length > 1 ? "s" : ""}`}</div>
            <div className="text-sm text-gray-300 ml-auto min-w-20">{`${updatedAt}`}</div>
        </div>
    );
};
const AllShiftsContainer = () => {
    return <div></div>;
};

export default function ViewAll({ allPosts, handleView }) {
    const [loading, setLoading] = useState(false);
    const [initialRender, setInitialRender] = useState(true);
    console.log("all posts are here", allPosts);
    const shift = useSelector(selectShift);

    useEffect(() => {
        if (initialRender) {
            setInitialRender(false);
        } else {
            handleView();
        }
    }, [shift]);

    return (
        <div
            className="h-full w-full  md:w-4/5 pr-6  my-24 flex flex-col items-center overflow-y-scroll "
            id="container"
            onScroll={(e) => handleScroll(e)}
        >
            {allPosts.length === 0 ? (
                <div className=" animate-pulse h-full w-full bg-white flex justify-center items-center">
                    <div className="size-8 border-t-4 border-violet-400 animate-spin rounded-full"></div>
                </div>
            ) : (
                <div
                    id="conto"
                    className="flex flex-col rounded-lg overflow-y-scroll w-full"
                    onScroll={(e) => handleScroll(e)}
                >
                    {allPosts.map((post) => (
                        <ShiftLink
                            title={post.title}
                            tabs={post.tabs}
                            updatedAt={post.updatedAt.slice(0, 10)}
                            key={post._id}
                            _id={post._id}
                            handleView={handleView}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
