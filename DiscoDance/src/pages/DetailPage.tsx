import ModalBooking from "../components/ModalBooking";
import { useDetailEvents } from "../hooks/useDetailEvents";
import gif from "../assets/Spin-0.gif";
import { Link } from "react-router-dom";
import person from "../assets/user.png";
import { useAllEvents } from "../hooks/useEvents";

const DetailPage = () => {
    const { singleEvent, isLoading } = useDetailEvents();
    const { datetime } = useAllEvents();

    if (isLoading) {
        return (
            <div className="h-1/4 w-1/4">
                <p>Loading data...</p>
                <img className="h-1/4 w-1/4" src={gif} alt="gif" />
            </div>
        );
    } else {
        return (
            <>
                <div className="w-full min-h-screen md:max-h-screen">
                    <div className="flex justify-end md:justify-start font-bold p-4 md:pb-0">
                        <button onClick={() => window.history.back()} className="bg-white px-3 py-2 rounded-2xl">
                            indietro
                        </button>
                    </div>
                    <div className="md:max-h-screen md:flex md:flex-wrap">
                        <div className="flex flex-wrap justify-center w-full">
                            <h1 className="m-2 mb-0 text-center text-white font-bold md:text-4xl pb-3 md:pb-0 text-2xl">
                                {singleEvent?.name} - {singleEvent?.date_modified}
                            </h1>
                        </div>
                        <div className="w-full md:w-1/3 md:p-4">
                            <img src={singleEvent?.coverImage} alt="img" />
                        </div>
                        <div className="md:w-2/3">
                            <div className="p-4">
                                {singleEvent?.description.long.map((desc, i) => {
                                    return (
                                        <div key={i} className="">
                                            <p className="text-white">{desc}</p>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="p-4 flex flex-wrap">
                                <div className="md:w-1/2 w-full pb-4 md:pb-0">
                                    <h3 className="font-bold w-full text-white text-center md:text-start">Drink inclusi</h3>
                                    <ul className="list-disc px-6">
                                        {singleEvent?.includedDrinks.map((drink, i) => (
                                            <li className="text-white" key={i}>
                                                {drink}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="md:w-1/2 w-full">
                                    <h3 className="font-bold w-full text-center text-white md:text-start">Utils</h3>
                                    <ul className="list-disc px-6 text-white">
                                        <li>Prezzo: {singleEvent?.price}$</li>
                                        <li>Drescode: {singleEvent?.dresscode}</li>
                                        <li className="">
                                            Genere Musicale:
                                            {singleEvent?.tags.map(
                                                (tag, i) =>
                                                    (i === 0 && <span key={i}> {tag}</span>) || (i > 0 && <span key={i}> - {tag}</span>)
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {singleEvent?.isAperitivoIncluded === true && (
                                <div className="p-4 md:pt-0">
                                    <h3 className="font-bold w-ful text-center text-white md:text-start">Aperetivo incluso con:</h3>
                                    <ul className="list-disc pl-6">
                                        {singleEvent?.isAperitivoIncluded === true &&
                                            singleEvent?.includedDishes.map((e, i) => {
                                                return (
                                                    <li key={i} className="text-white py-2">
                                                        {e.name} - {e.description} - {e.allergens}
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="p-4 mb-10 pb-10 flex flex-wrap justify-center w-full md:pb-0 md:mb-0">
                            <h2 className="font-bold w-full text-center pb-2 md:text-2xl text-white">Scegli un orario per prenotare:</h2>
                            {!JSON.parse(sessionStorage.getItem("userEmail") as string) &&
                                singleEvent?.date &&
                                datetime <= singleEvent?.date && (
                                    <div className="flex flex-wrap h-full items-center">
                                        <p className="text-white">Per PRENOTARE devi REGISTRARTI</p>
                                        <Link to={"/AccediRegistrati"}>
                                            <button className="mx-2 underline font-bold px-3 py-2 rounded-xl bg-white ">Accedi</button>
                                        </Link>
                                    </div>
                                )}
                            {JSON.parse(sessionStorage.getItem("userEmail") as string) &&
                                singleEvent?.date &&
                                datetime <= singleEvent?.date &&
                                singleEvent?.time.map((t, i) => <ModalBooking time={t} key={i} event={singleEvent.id} />)}
                            {singleEvent?.date && datetime >= singleEvent?.date && (
                                <div className="flex flex-wrap h-full items-center">
                                    <p className="">Prenotazione non disponibile</p>
                                    <Link to={"/home"}>
                                        <button className="mx-2 underline font-bold px-3 py-2 rounded-xl bg-white ">HOME</button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="bg-white rounded-full h-14 w-14 fixed md:bottom-7 md:left-7 bottom-3 left-3 z-50">
                        <div className="flex justify-center items-center h-full">
                            <Link to={"/profile"} className="flex justify-center">
                                <div className="h-1/2 w-1/2">
                                    <img className="" src={person} alt="immagine profilo" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default DetailPage;
