import { useEffect, useState } from "react";
import { useAllEvents } from "../hooks/useEvents";
import CardEvent from "./CardEvent";
import gif from "../assets/Spin-0.gif";

const Menu = () => {
    const { pastEvents, nextEvents, futureEvents, isLoading, errorCatchAllEvents, setIsLoading } = useAllEvents();
    const [showEvents, setShowEvents] = useState("");
    useEffect(() => {
        //lo imposto cosi nella home esce subito l'evento corrente
        setShowEvents("CURRENT");
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
            <>
                {errorCatchAllEvents === false && (
                    <div className="mt-14">
                        <div className="fixed top-0 w-full mb-5 z-10 bg-white">
                            <ul className="grid grid-flow-col text-center border-b border-gray-200 text-gray-500">
                                <li>
                                    <a
                                        onClick={() => setShowEvents("PAST")}
                                        className={`flex justify-center border-b-4 border-transparent py-4 hover:cursor-pointer ${
                                            showEvents === "PAST" ? " text-indigo-600 border-indigo-600 font-bold" : ""
                                        }`}>
                                        Eventi passati
                                    </a>
                                </li>
                                <li>
                                    <a
                                        onClick={() => setShowEvents("CURRENT")}
                                        className={`flex justify-center border-b-4 border-transparent py-4 hover:cursor-pointer ${
                                            showEvents === "CURRENT" ? " text-indigo-600 border-indigo-600 font-bold" : ""
                                        }`}>
                                        Prossimo evento
                                    </a>
                                </li>
                                <li>
                                    <a
                                        onClick={() => setShowEvents("FUTURE")}
                                        className={`flex justify-center border-b-4 border-transparent py-4 hover:cursor-pointer ${
                                            showEvents === "FUTURE" ? " text-indigo-600 border-indigo-600 font-bold" : ""
                                        }`}>
                                        Eventi futuri
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="clear-both"></div>
                        <div className="pb-20">
                            {showEvents === "PAST" && (
                                <div className="">
                                    <div className="flex flex-wrap w-full justify-center">
                                        {pastEvents.map((e, i) => {
                                            return <CardEvent key={i} event={e} detailPath={`/detail/${e.id}`} showEvents={showEvents} />;
                                        })}
                                    </div>
                                </div>
                            )}
                            {showEvents === "CURRENT" && (
                                <div className="flex justify-center">
                                    <div className="w-[80%]">
                                        <div className="flex flex-wrap w-full justify-center">
                                            {nextEvents.map((e, i) => {
                                                return (
                                                    <CardEvent key={i} event={e} detailPath={`/detail/${e.id}`} showEvents={showEvents} />
                                                );
                                            })}{" "}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {showEvents === "FUTURE" && (
                                <div className="">
                                    <div className="flex flex-wrap w-full justify-center">
                                        {futureEvents.map((e, i) => {
                                            return <CardEvent key={i} event={e} detailPath={`/detail/${e.id}`} showEvents={showEvents} />;
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {errorCatchAllEvents === true && (
                    <div className="w-full h-screen flex justify-center items-center">
                        <p className="text-white text-center font-bold text-3xl pr-3">Dati non disponibili...</p>
                        <button className="bg-white font-bold rounded-xl px-3 py-2" onClick={() => setIsLoading(true)}>
                            Riprova
                        </button>
                    </div>
                )}
            </>
        );
    }
};

export default Menu;
