import { useEffect, useState } from "react";
import { db, readOnDBUsers, writeOnDB } from "../utils/firebase";

export const ModalsBooking = (time: string, event: number) => {
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState<Record<string, string | number>[] | null>(null);
    const [mex, setMex]=useState(Boolean);
    const [prenotato, setPrenotato]=useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setUsers(await readOnDBUsers(db));
            } catch (error) {
                // Handle error if needed
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPrenotato(true);
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