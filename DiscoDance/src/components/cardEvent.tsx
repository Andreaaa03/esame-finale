import { Link } from "react-router-dom";
import { AllEvents } from "../repo/types";
import "./CardEvent.css";

type UserCardType = {
    event: AllEvents;
    detailPath: string;
    showEvents: string;
};
const CardEvent = ({ event, detailPath, showEvents }: UserCardType) => {
    const { name, date, description, coverImage } = event;

    return (
        <div
            className={`mb-5 card  flex flex-col items-center border rounded-lg shadow md:flex-row  ${
                showEvents === "CURRENT" ? "w-full lg:w-[90%] min-h-20-rem" : "w-full lg:w-5/12 min-h-15-rem"
            }`}>
            <div className="md:relative md:w-1/3 md:shrink-0 md:h-full">
                <img
                    className="object-cover w-full rounded-t-lg h-auto md:absolute md:w-full md:h-full md:rounded-none md:rounded-s-lg"
                    src={coverImage}
                    alt="immagine evento"
                />
            </div>
            <div className="flex flex-col w-full h-full justify-around p-4 leading-normal">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h2>
                <h3 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">{date}</h3>
                <p className="mb-3 font-normal text-white">{description.short} </p>
                <Link to={detailPath}>
                    <button className="bg-white px-3 py-2 rounded-lg">View Detail</button>
                </Link>
            </div>
        </div>
    );
};

export default CardEvent;