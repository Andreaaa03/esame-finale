import { Link } from "react-router-dom";
import { AllEvents } from "../repo/types";
import "./CardEvent.css"

type UserCardType = {
    event: AllEvents;
    detailPath: string;
};
const CardEvent = ({ event, detailPath }: UserCardType) => {
    const { name, id, date, description, coverImage } = event;

    return (
        <div className="w-1/2 mb-5">
            <p className="w-full">
                {id} - {name} - {date}
            </p>
            <img className="w-3/12" src={coverImage} alt="" />
            <p className="w-full">{description.short}</p>
            <Link to={detailPath}>
                <button className="bg-gray-500">View Detail</button>
            </Link>
        </div>
    );
};

export default CardEvent;