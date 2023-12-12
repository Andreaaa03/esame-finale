import { Link } from "react-router-dom";
import CardEvent from "../components/CardEvent";
import { useAllEvents } from "../hooks/useEvents";
import useProfile from "../hooks/useProfile";
import { resetSession } from "../utils/firebase";

const ProfilePage = () => {
    const { booking, users, isLoading } = useProfile();
    const { event } = useAllEvents();
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
                                {users?.map((u, i) => {
                                    return (
                                        <div className="flex flex-wrap">
                                            <form action="" key={i}>
                                                <input className="w-full my-2 p-2 border-2 border-black " type="text" value={u.name} />
                                                <input className="w-full my-2 p-2 border-2 border-black " type="text" value={u.surname} />
                                                <input className="w-full my-2 p-2 border-2 border-black " type="text" value={u.mail} />
                                            </form>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="w-full">
                                <form action="" className="">
                                    <div className="w-full my-2 p-2 border-2 border-black bg-white flex justify-between items-center">
                                        <div className="h-full pr-2">
                                            <input className="h-full" type="checkbox" required /> LOG OUT
                                        </div>
                                        <button onClick={() => resetSession()} className="bg-red-600 rounded-2xl px-3 py-2">
                                            CONFERMA
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/3 pt-2">
                        {event?.map((singleEvent) => {
                            return booking?.map((singleBooking, i) => {
                                if (singleBooking.event === singleEvent.id) {
                                    return (
                                        <div className="flex flex-wrap justify-center mt-6 border-b-2 border-black ml-6">
                                            <h2 className="font-bold text-2xl m-0 p-0 flex justify-center text-white">{singleEvent.name}Booked at: {singleBooking.time_selected}</h2>
                                            <CardEvent
                                                key={i}
                                                event={singleEvent}
                                                detailPath={`/detail/${singleEvent.id}`}
                                                showEvents={"CURRENT"}
                                            />
                                        </div>
                                    );
                                }
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
