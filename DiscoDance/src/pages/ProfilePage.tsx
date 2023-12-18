import { Link } from "react-router-dom";
import CardEvent from "../components/CardEvent";
import { useAllEvents } from "../hooks/useEvents";
import useProfile from "../hooks/useProfile";
import gif from "../assets/Spin-0.gif";

const ProfilePage = () => {
    const {
        isLoading,
        errorCatchProfile,
        booking,
        carimentoInCorso,
        esci,
        eliminaProfilo,
        eliminaPrenotazione,
        nameUser,
        surnameUser,
        ageUser,
        mailUser,
        setNameUser,
        setSurnameUser,
        setAgeUser,
        setMailUser,
    } = useProfile();
    const { event, errorCatchAllEvents } = useAllEvents();
    console.log(errorCatchAllEvents);
    if (isLoading) {
        return (
            <>
                <div className="h-1/4 w-1/4">
                    <p>Loading data...</p>
                    <img className="h-1/4 w-1/4" src={gif} alt="gif" />
                </div>
            </>
        );
    } else {
        return (
            <>
                {errorCatchProfile === false && (
                    <div className="flex md:flex-nowrap flex-wrap">
                        <div className="md:w-1/3 ">
                            <div className="md:fixed md:w-1/3 md:pt-6 md:pl-6 p-4">
                                <div className="w-full flex justify-end md:justify-start">
                                    <Link to="/home">
                                        <button className="bg-white rounded-2xl px-3 py-2 font-bold">HOME</button>
                                    </Link>
                                </div>
                                <div className="py-5">
                                    <div className="flex flex-wrap">
                                        <form action="" className="flex flex-wrap">
                                            <div className="w-[20%] flex items-center">
                                                <p className="w-full text-white">Name</p>
                                            </div>
                                            <input
                                                readOnly
                                                className="w-[80%] my-2 p-2 border-2 border-black read-only: "
                                                type="text"
                                                value={nameUser}
                                                onChange={(e) => setNameUser(e.target.value)}
                                            />
                                            <div className="w-[20%] flex items-center">
                                                <p className="w-full text-white">Surname</p>
                                            </div>
                                            <input
                                                readOnly
                                                className="w-[80%] my-2 p-2 border-2 border-black read-only: "
                                                type="text"
                                                value={surnameUser}
                                                onChange={(e) => setSurnameUser(e.target.value)}
                                            />
                                            <div className="w-[20%] flex items-center">
                                                <p className="w-full text-white">Age</p>
                                            </div>
                                            <input
                                                readOnly
                                                className="w-[80%] my-2 p-2 border-2 border-black read-only: "
                                                type="number"
                                                value={ageUser}
                                                onChange={(e) => setAgeUser(parseInt(e.target.value))}
                                            />
                                            <div className="w-[20%] flex items-center">
                                                <p className="w-full text-white">Email</p>
                                            </div>
                                            <input
                                                readOnly
                                                className="w-[80%] my-2 p-2 border-2 border-black read-only: "
                                                type="email"
                                                value={mailUser}
                                                onChange={(e) => setMailUser(e.target.value)}
                                            />
                                        </form>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <form className="" onSubmit={esci}>
                                        <div className="w-full my-2 p-2 border-2 border-black bg-white flex justify-between items-center">
                                            <div className="h-full pr-2">
                                                <input className="h-full" type="checkbox" required /> LOG OUT
                                            </div>
                                            <button className="bg-red-600 rounded-2xl px-3 py-2 font-bold">CONFERMA</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="w-full">
                                    <form className="" onSubmit={eliminaProfilo}>
                                        <div className="w-full my-2 p-2 border-2 border-black bg-white flex justify-between items-center">
                                            <div className="h-full pr-2">
                                                <input className="h-full" type="checkbox" required /> ELIMINA PROFILO
                                            </div>
                                            <button className="bg-red-600 rounded-2xl px-3 py-2 font-bold">CONFERMA</button>
                                        </div>
                                    </form>
                                </div>
                                {carimentoInCorso === true && (
                                    <div className="w-full flex justify-center">
                                        <img className="h-1/4 w-1/4" src={gif} alt="gif" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="md:w-2/3 pt-2">
                            <h2 className="w-full text-center text-2xl font-bold text-white">Le tue prenotazioni</h2>
                            {errorCatchAllEvents === false && (
                                <div className="">
                                    {event?.map((singleEvent, j) => {
                                        return booking?.map((singleBooking, i) => {
                                            if (singleBooking.event === singleEvent.id) {
                                                return (
                                                    <div
                                                        key={`${j}+${i}`}
                                                        className="flex flex-wrap pb-2 mb-4 justify-center md:mt-6  border-b-2 border-black md:ml-6">
                                                        <CardEvent
                                                            key={`${j}+${i}`}
                                                            event={singleEvent}
                                                            detailPath={`/detail/${singleEvent.id}`}
                                                            showEvents={"CURRENT"}
                                                        />
                                                        <div className="flex md:w-[50%] w-full flex-wrap justify-around ">
                                                            <h2 className="font-bold text-2xl mx-2 md:m-0 md:p-0 pb-2 text-white flex items-center">
                                                                <u>Booked at: {singleBooking.time_selected}</u>
                                                            </h2>
                                                            <button
                                                                onClick={() => {
                                                                    eliminaPrenotazione(singleBooking.event, singleBooking.id);
                                                                }}
                                                                className="text-1xl bg-red-700 px-3 py-2 md:m-0 mb-2 flex justify-end text-white rounded-xl font-bold">
                                                                elimina prenotazione
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null; // You should provide a default return statement or handle the case where the condition is not met
                                        });
                                    })}
                                    {booking?.length === 0 && <p>NON HAI PRENOTAZIONI</p>}
                                    {/* booking o booking?.length===0 in questo caso sono uguali */}
                                </div>
                            )}
                            {errorCatchAllEvents === true && (
                                <div className="flex justify-center w-full mt-10">
                                    <p className="text-white text-3xl">Dati non disponibili...</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {errorCatchProfile === true && (
                    <div className="flex md:flex-nowrap flex-wrap">
                        <p>Dati non disponibili</p>
                    </div>
                )}
            </>
        );
    }
};
export default ProfilePage;
