import { useAllEvents } from "../hooks/useEvents";
import CardEvent from "./CardEvent";

const Menu = () => {
    const { pastEvents, nextEvents, futureEvents, isLoading } = useAllEvents();
    if (isLoading) {
        return <p>Loading data...</p>;
    } else {
        return (
            <div className="">
                <ul className="grid grid-flow-col text-center border-b border-gray-200 text-gray-500">
                    <li>
                        <a
                            href="#page1"
                            className="flex justify-center border-b-4 border-transparent hover:text-indigo-600 hover:border-indigo-600 py-4">
                            Eventi passati
                        </a>
                    </li>
                    <li>
                        <a
                            href="#page2"
                            className="flex justify-center border-b-4 border-transparent hover:text-indigo-600 hover:border-indigo-600 py-4">
                            Prossimo evento
                        </a>
                    </li>
                    <li>
                        <a
                            href="#page3"
                            className="flex justify-center border-b-4 border-transparent hover:text-indigo-600 hover:border-indigo-600 py-4">
                            Eventi futuri
                        </a>
                    </li>
                </ul>
                <div id="page1" className="">
                    <div className="flex flex-wrap w-full p-10">
                        {pastEvents.map((e, i) => {
                            return <CardEvent key={i} event={e} detailPath={`/detail/${e.id}`} />;
                        })}
                    </div>
                </div>
                <div id="page2" className="">
                    <div className="flex flex-wrap w-full p-10">
                        {nextEvents.map((e, i) => {
                            return <CardEvent key={i} event={e} detailPath={`/detail/${e.id}`} />;
                        })}
                    </div>
                </div>
                <div id="page3" className="">
                    <div className="flex flex-wrap w-full p-10">
                        {futureEvents.map((e, i) => {
                            return <CardEvent key={i} event={e} detailPath={`/detail/${e.id}`} />;
                        })}
                    </div>
                </div>
            </div>
        );
    }
};

export default Menu;
