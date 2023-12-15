import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, readOnDBBooking, readOnDBUsers, resetSession } from "../utils/firebase";
import { deleteUser, signOut } from "firebase/auth";
import { ref, remove } from "firebase/database";

const useProfile = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [booking, setBooking] = useState<Record<string, string | number>[] | null>(null);
    const [users, setUsers] = useState<Record<string, string | number>[] | null>(null);
    const [nameUser, setNameUser] = useState<string>("");
    const [surnameUser, setSurnameUser] = useState<string>("");
    const [ageUser, setAgeUser] = useState<number>(0);
    const [mailUser, setMailUser] = useState<string>("");
    const [firstMailUser, setFirstMailUser] = useState<string>("");
    const [ricarico, setRicarico] = useState<string>("");
    const emailSessione = JSON.parse(sessionStorage.getItem("userEmail") as string);
    useEffect(() => {
        const fetchData = async () => {
            setRicarico("");
            setIsLoading(true);
            try {
                const bookingsData = await readOnDBBooking(db);
                const usersData = await readOnDBUsers(db);

                setBooking(bookingsData);
                setUsers(usersData);

                if (usersData != null) {
                    setNameUser(String(usersData[0].name));
                    setSurnameUser(String(usersData[0].surname));
                    setAgeUser(Number(usersData[0].age));
                    setFirstMailUser(String(usersData[0].mail));
                    setMailUser(String(usersData[0].mail));
                }

                setIsLoading(false);
            } catch (error) {
                // Handle error if needed
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        if (!emailSessione) {
            navigate("/AccediRegistrati");
        } else {
            fetchData();
        }
    }, [emailSessione, navigate, ricarico]);  // Aggiunto emailSessione come dipendenza

    const esci = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        signOut(auth)
            .then(() => {
                resetSession();
                navigate("/");
            })
            .catch((error) => {
                console.log("error: " + error);
            });
    };


    const eliminaProfilo = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        users?.forEach(u => {
            if (u.mail === emailSessione) {
                console.log("email: " + u.mail + " " + emailSessione);
                remove(
                    ref(db, 'users/' + u.id)
                )
                    .then(() => {
                        if (auth.currentUser) {
                            users?.forEach((u) => {
                                if (u.mail === emailSessione) {
                                    booking?.forEach(b => {
                                        if (b.mail === emailSessione) {
                                            remove(
                                                ref(db, 'booking/' + b.id)
                                            ).then(() => {
                                                window.location.reload();
                                            }).catch((e) => { console.log("error: " + e) });
                                        }
                                    });
                                }
                            })
                            deleteUser(auth.currentUser);
                            navigate("/");
                            resetSession();
                        } else
                            console.log("eliminazione utente NON effettuata!!!");
                    })
                    .catch((error) => {
                        console.log("error: " + error);
                    });
            }
        })
    }

    const eliminaPrenotazione = (evento: string | number, idBooking: string | number) => {
        users?.forEach((u) => {
            if (u.mail === emailSessione) {
                booking?.forEach(b => {
                    if (b.mail === emailSessione && b.event === evento && b.id === idBooking) {
                        remove(
                            ref(db, 'booking/' + b.id)
                        ).then(() => {
                            // window.location.reload();
                            setRicarico(".");
                        }).catch((e) => { console.log("error: " + e) });
                    }
                });
            }
        })
    }

    return {
        isLoading, booking, users, esci, eliminaProfilo, eliminaPrenotazione, nameUser, surnameUser, ageUser, mailUser, firstMailUser, setNameUser, setSurnameUser, setAgeUser, setMailUser, setFirstMailUser
    }
}
export default useProfile;