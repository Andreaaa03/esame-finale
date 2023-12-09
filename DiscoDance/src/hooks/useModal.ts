import { useState } from "react";
import { db, writeOnDB } from "../utils/firebase";

export const ModalsBooking = (time:string, event:number) =>{
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        mail: "",
        age: -1,
    });
    // mi prendo i valori degli id e li aggiungo all'o,ggetto
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = () => {
        if (formData.name != "" && formData.surname != "" && formData.mail != "" && formData.age >=0 ) {
            writeOnDB(formData.name, formData.surname, formData.mail, formData.age, event, time, db);
        } else {
            console.log("missed value");
        }
        // chiudo la modale
        setShowModal(false);
    };

    return { handleSubmit, handleChange, showModal, setShowModal}
}