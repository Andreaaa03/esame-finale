import ModalBooking from "../components/ModalBooking";
import { useDetailEvents } from "../hooks/useDetailEvents";
import gif from "../assets/Spin-0.gif";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DetailPage = () => {
    const { singleEvent, isLoading } = useDetailEvents();
    const navigate = useNavigate();
    useEffect(() => {
        if (!JSON.parse(sessionStorage.getItem("userEmail") as string)) {
            navigate("/");
        }
    });
    if (isLoading) {
        return (
            <div className="h-1/4 w-1/4">
                <p>Loading data...</p>
                <img className="h-1/4 w-1/4" src={gif} alt="gif" />
            </div>
        );
    } else {
        return (
            <div>
                <Link to={"/home"}>
                    <button className="bg-green-500">home</button>
                </Link>
                <h1>dettaglio</h1>
                <img src={singleEvent?.coverImage} alt="img" />
                <p>{singleEvent?.id}</p>
                <p>{singleEvent?.name}</p>
                <p>{singleEvent?.description.long}</p>
                <p>{singleEvent?.includedDrinks}</p>
                <p>{singleEvent?.isAperitivoIncluded}</p>
                {singleEvent?.time.map((t, i) => (
                    <ModalBooking time={t} key={i} event={singleEvent.id} />
                ))}
                {singleEvent?.isAperitivoIncluded === true &&
                    singleEvent?.includedDishes.map((e, i) => {
                        return (
                            <button key={i}>
                                {e.name} - {e.description} - {e.allergens}
                            </button>
                        );
                    })}
            </div>
        );
    }
};

export default DetailPage;
