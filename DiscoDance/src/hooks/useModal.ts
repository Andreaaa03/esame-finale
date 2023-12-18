import { useEffect, useState } from "react";
import { db, readOnDBUsers, writeOnDB } from "../utils/firebase";

//logica per la modale per la prentazione ad un'evento
export const ModalsBooking = (time: string, event: number) => {
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState<Record<string, string | number>[] | null>(null); //tipizzazione dal db
    const [mex, setMex]=useState(Boolean);  //messaggio di conferma, true=ok, false=errore
    const [prenotato, setPrenotato]=useState(false); //se ha effettivamente cliccato, se non l'ho metto appena apre la modale appare un mex di conferma
    useEffect(() => {
        //faccio la chiamata async perchè devo aspettare la risposta dal db
        const fetchData = async () => {
            try {
                setUsers(await readOnDBUsers(db)); //setta a user il db Users
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    //al click faccio impedire il carimento della pagina, Form = Submit
    const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPrenotato(true);

        //mi prendo le info dal booking(l'utente non può modificare) e le salvo sul db Booking
        if (users != null) {
            for (let i = 0; i < users.length; i++) {
                const name = users[i].name.toString();
                const surname = users[i].surname.toString();
                const mail = users[i].mail.toString();
                writeOnDB(name, surname, mail, users[i].age as number, event, time, db)
            }
            setMex(true);
        }
        else setMex(false);
    };
    return { handleSubmit, users, mex, prenotato, showModal, setShowModal }
}