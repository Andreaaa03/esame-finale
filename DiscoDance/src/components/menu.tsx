import { useEffect, useState } from "react";
import { useAllEvents } from "../hooks/useEvents";
import CardEvent from "./CardEvent";
import gif from "../assets/Spin-0.gif";
import { db, readOnDB } from "../utils/firebase";

const Menu = () => {
    const { pastEvents, nextEvents, futureEvents, isLoading } = useAllEvents();
    const [showEvents, setShowEvents] = useState("");
    useEffect(() => {
        setShowEvents("CURRENT");
        readOnDB(db);
    }, []);
    if (isLoading) {
        return (
            <div className="h-1/4 w-1/4">
                <p>Loading data...</p>
                <img className="h-1/4 w-1/4" src={gif} alt="" />
            </div>
        );
    } else {
        return (
            <div className="">
                <div className="fixed top-0 w-full mb-5 z-10 bg-white">
                    <ul className="grid grid-flow-col text-center border-b border-gray-200 text-gray-500">
                        <li>
                            <a
                                onClick={() => setShowEvents("PAST")}
                                className={`flex justify-center border-b-4 border-transparent py-4 hover:cursor-pointer ${
                                    showEvents === "PAST" ? " text-indigo-600 border-indigo-600" : ""
                                }`}>
                                Eventi passati
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => setShowEvents("CURRENT")}
                                className={`flex justify-center border-b-4 border-transparent py-4 hover:cursor-pointer ${
                                    showEvents === "CURRENT" ? " text-indigo-600 border-indigo-600" : ""
                                }`}>
                                Prossimo evento
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => setShowEvents("FUTURE")}
                                className={`flex justify-center border-b-4 border-transparent py-4 hover:cursor-pointer ${
                                    showEvents === "FUTURE" ? " text-indigo-600 border-indigo-600" : ""
                                }`}>
                                Eventi futuri
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="">
                    {showEvents === "PAST" && (
                        <div id="page1" className="mt-20">
                            <div className="flex flex-wrap w-full justify-center">
                                {pastEvents.map((e, i) => {
                                    return <CardEvent key={i} event={e} detailPath={`/detail/${e.id}`} showEvents={showEvents} />;
                                })}
                            </div>
                        </div>
                    )}
                    {showEvents === "CURRENT" && (
                        <div id="page2" className="mt-20">
                            <div className="flex flex-wrap w-full justify-center">
                                {nextEvents.map((e, i) => {
                                    return <CardEvent key={i} event={e} detailPath={`/detail/${e.id}`} showEvents={showEvents} />;
                                })}
                            </div>
                        </div>
                    )}
                    {showEvents === "FUTURE" && (
                        <div id="page3" className="mt-20">
                            <div className="flex flex-wrap w-full justify-center">
                                {futureEvents.map((e, i) => {
                                    return <CardEvent key={i} event={e} detailPath={`/detail/${e.id}`} showEvents={showEvents} />;
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
};

export default Menu;
