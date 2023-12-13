import { Link } from "react-router-dom";
import CardEvent from "../components/CardEvent";
import { useAllEvents } from "../hooks/useEvents";
import useProfile from "../hooks/useProfile";
import { auth } from "../utils/firebase";
import { sendEmailVerification, updateEmail } from "firebase/auth";

const ProfilePage = () => {
    const {
        isLoading,
        booking,
        esci,
        nameUser,
        surnameUser,
        ageUser,
        mailUser,
        firstMailUser,
        setNameUser,
        setSurnameUser,
        setAgeUser,
        setMailUser,
    } = useProfile();
    const { event } = useAllEvents();

    const modifica = async (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(auth);
        if (auth.currentUser != null && mailUser != null && typeof mailUser !== "number" && mailUser !== firstMailUser) {
            console.log("Entrato");

            try {
                await sendEmailVerification(auth.currentUser);
                if (auth.currentUser.emailVerified) {
                    await updateEmail(auth.currentUser, mailUser);
                    console.log("Aggiornato");
                }
            } catch (error) {
                console.log("Errore:", error);
            }
        }
    };
    // updateProfile(auth, {
    //     name: nameUser,
    //     surname: surnameUser,
    //     age: ageUser,
    //     email: mailUser,
    // });
    if (isLoading) {
        return (
            <>
                <p>loading...</p>
            </>
        );
    } else {
        return (
            <>
                <div className="flex flex-nowrap">
                    <div className="w-1/3 ">
                        <div className="fixed w-1/3 pt-6 pl-6 ">
                            <div className="">
                                <Link to="/home">
                                    <button className="bg-white rounded-2xl px-3 py-2">HOME</button>
                                </Link>
                            </div>
                            <div className="py-5">
                                <div className="flex flex-wrap">
                                    <form action="" className="flex flex-wrap" onSubmit={modifica}>
                                        <div className="w-[20%] flex items-center">
                                            <p className="w-full text-white">Name</p>
                                        </div>
                                        <input
                                            className="w-[80%] my-2 p-2 border-2 border-black read-only: "
                                            type="text"
                                            value={nameUser}
                                            onChange={(e) => setNameUser(e.target.value)}
                                        />
                                        <div className="w-[20%] flex items-center">
                                            <p className="w-full text-white">Surname</p>
                                        </div>
                                        <input
                                            className="w-[80%] my-2 p-2 border-2 border-black read-only: "
                                            type="text"
                                            value={surnameUser}
                                            onChange={(e) => setSurnameUser(e.target.value)}
                                        />
                                        <div className="w-[20%] flex items-center">
                                            <p className="w-full text-white">Age</p>
                                        </div>
                                        <input
                                            className="w-[80%] my-2 p-2 border-2 border-black read-only: "
                                            type="number"
                                            value={ageUser}
                                            onChange={(e) => setAgeUser(parseInt(e.target.value))}
                                        />
                                        <div className="w-[20%] flex items-center">
                                            <p className="w-full text-white">Email</p>
                                        </div>
                                        <input
                                            className="w-[80%] my-2 p-2 border-2 border-black read-only: "
                                            type="email"
                                            value={mailUser}
                                            onChange={(e) => setMailUser(e.target.value)}
                                        />
                                        <div className="w-full">
                                            <div className="w-full my-2 p-2 border-2 border-black bg-white flex justify-between items-center">
                                                <div className="h-full pr-2">
                                                    <input className="h-full" type="checkbox" required /> Modifiche effettuate
                                                </div>
                                                <button className="bg-red-600 rounded-2xl px-3 py-2">MODIFICA</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="w-full">
                                <form className="" onSubmit={esci}>
                                    <div className="w-full my-2 p-2 border-2 border-black bg-white flex justify-between items-center">
                                        <div className="h-full pr-2">
                                            <input className="h-full" type="checkbox" required /> LOG OUT
                                        </div>
                                        <button className="bg-red-600 rounded-2xl px-3 py-2">CONFERMA</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/3 pt-2">
                        {event?.map((singleEvent, j) => {
                            return booking?.map((singleBooking, i) => {
                                if (singleBooking.event === singleEvent.id) {
                                    return (
                                        <div key={`${j}+${i}`} className="flex flex-wrap justify-center mt-6 border-b-2 border-black ml-6">
                                            <h2 className="font-bold text-2xl m-0 p-0 flex justify-center text-white">
                                                {singleEvent.name} &nbsp; <u>Booked at: {singleBooking.time_selected}</u>
                                            </h2>
                                            <CardEvent
                                                key={`${j}+${i}`}
                                                event={singleEvent}
                                                detailPath={`/detail/${singleEvent.id}`}
                                                showEvents={"CURRENT"}
                                            />
                                        </div>
                                    );
                                }
                                return null; // You should provide a default return statement or handle the case where the condition is not met
                            });
                        })}
                        {booking?.length === 0 && <p>NON HAI PRENOTAZIONI</p>}
                        {/* booking o booking?.length===0 in questo caso sono uguali */}
                    </div>
                </div>
            </>
        );
    }
};
export default ProfilePage;
