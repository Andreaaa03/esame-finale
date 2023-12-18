import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, readOnDBBooking, readOnDBUsers, resetSession } from "../utils/firebase";
import { deleteUser, signOut } from "firebase/auth";
import { ref, remove } from "firebase/database";

//logica del profilo utente
const useProfile = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    //info dal db
    const [booking, setBooking] = useState<Record<string, string | number>[] | null>(null);
    const [users, setUsers] = useState<Record<string, string | number>[] | null>(null);
    //info utente
    const [nameUser, setNameUser] = useState<string>("");
    const [surnameUser, setSurnameUser] = useState<string>("");
    const [ageUser, setAgeUser] = useState<number>(0);
    const [mailUser, setMailUser] = useState<string>("");

    //per aggiornare la pagina quando elimini una prenotazione interagendo con lo useEffect, non con il reload effettivo della pagina
    const [ricarico, setRicarico] = useState<string>("");

    //per far capire all'utente che si sta caricando qualcosa
    const [carimentoInCorso, setCarimentoInCorso] = useState(false);
    const emailSessione = JSON.parse(sessionStorage.getItem("userEmail") as string);

    const [errorCatchProfile, setErrorCatchProfile] = useState<boolean>(false);


    useEffect(() => {
        //faccio la chiamata async perchè devo aspettare la risposta dal db
        const fetchData = async () => {
            setRicarico("");
            setIsLoading(true);
            try {
                const bookingsData = await readOnDBBooking(db);
                const usersData = await readOnDBUsers(db);

                setBooking(bookingsData);
                setUsers(usersData);

                //mi salvo le info utente dal db
                if (usersData != null) {
                    setNameUser(String(usersData[0].name));
                    setSurnameUser(String(usersData[0].surname));
                    setAgeUser(Number(usersData[0].age));
                    setMailUser(String(usersData[0].mail));
                }
            } catch (error) {
                // Handle error if needed
                console.error('Error fetching data:', error);
                setErrorCatchProfile(true);
            } finally {
                setIsLoading(false);
            }
        };

        if (!emailSessione) {
            navigate("/AccediRegistrati");
        } else {
            fetchData();
        }
    }, [emailSessione, navigate, ricarico]);

    //al click faccio impedire il carimento della pagina, Form = Submit
    const esci = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCarimentoInCorso(true);
        signOut(auth)
            .then(() => {
                resetSession();
                navigate("/");
                setCarimentoInCorso(false);
            })
            .catch((error) => {
                console.log("error: " + error);
            });
    };

    //al click faccio impedire il carimento della pagina, Form = Submit
    const eliminaProfilo = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCarimentoInCorso(true);
        //mi ciclo tutti gli utenti e controllo quale utente ha la mail uguale a quella salvata in sessione
        users?.forEach(u => {
            if (u.mail === emailSessione) {
                console.log("email: " + u.mail + " " + emailSessione);
                // lo rimuovo dal db Users
                remove(
                    ref(db, 'users/' + u.id)
                )
                    .then(() => {
                        //vado a eliminare tutte le sue prenotazioni effettuate
                        booking?.forEach(b => {
                            if (b.mail === emailSessione) {
                                remove(
                                    ref(db, 'booking/' + b.id)
                                ).then(() => {
                                    console.log("prenotazioni eliminate")
                                }).catch((e) => { console.log("error: " + e) });
                            }
                        });
                        if (auth.currentUser) {
                            deleteUser(auth.currentUser)
                                .then(() => {
                                    console.log("eliminato");
                                }).catch((e) => { console.log("error: " + e) })
                                .finally(() => {
                                    //pulisco la sessione
                                    resetSession();
                                    navigate("/");
                                    setCarimentoInCorso(false);
                                });
                            //eleimino l'utente da Firebase Auth
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
        setCarimentoInCorso(true);
        users?.forEach((u) => {
            if (u.mail === emailSessione) {
                booking?.forEach(b => {
                    //controllo che la mail sia uguale alla essione, l'evento sia uguale e che l'id sia lo stesso
                    if (b.mail === emailSessione && b.event === evento && b.id === idBooking) {
                        remove(
                            ref(db, 'booking/' + b.id)
                        ).then(() => {
                            setRicarico(".");
                        }).catch((e) => { console.log("error: " + e) })
                            .finally(() => {
                                setCarimentoInCorso(false);
                            });
                    }
                });
            }
        })
    }

    return {
        isLoading, errorCatchProfile, booking, users, carimentoInCorso, esci, eliminaProfilo, eliminaPrenotazione, nameUser, surnameUser, ageUser, mailUser, setNameUser, setSurnameUser, setAgeUser, setMailUser
    }
}
export default useProfile;