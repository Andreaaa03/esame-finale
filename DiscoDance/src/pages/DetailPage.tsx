import ModalBooking from "../components/ModalBooking";
import { useDetailEvents } from "../hooks/useDetailEvents";
import gif from "../assets/Spin-0.gif";
import { Link } from "react-router-dom";

const DetailPage = () => {
    const { singleEvent, isLoading } = useDetailEvents();

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
                <button onClick={() => window.history.back()} className="bg-green-500">
                    indietro
                </button>
                <h1>dettaglio</h1>
                <img src={singleEvent?.coverImage} alt="img" />
                <p>{singleEvent?.id}</p>
                <p>{singleEvent?.name}</p>
                <p>{singleEvent?.description.long}</p>
                <p>{singleEvent?.includedDrinks}</p>
                <p>{singleEvent?.isAperitivoIncluded}</p>
                {JSON.parse(sessionStorage.getItem("userEmail") as string) &&
                    singleEvent?.time.map((t, i) => <ModalBooking time={t} key={i} event={singleEvent.id} />)}
                {!JSON.parse(sessionStorage.getItem("userEmail") as string) && 
                    <div className="flex flex-wrap">
                        <p className="text-white">Per PRENOTARE devi REGISTRRTI</p>
                        <Link to={"/AccediRegistrati"}>
                            <button className="mx-2 px-2 underline text-blue-700 bg-red-500">
                                Accedi
                            </button>
                        </Link>
                    </div>
                }
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
