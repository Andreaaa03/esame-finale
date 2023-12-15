import { useEffect, useState } from "react";
import { SingleEvent } from "../repo/types";
import { getSingleEvent } from "../repo/index";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
export const useDetailEvents = () => {
    const {id}=useParams();
    const [singleEvent, setEvent] = useState<SingleEvent>();   // singolo evento 
    const [isLoading, setIsLoading] = useState<boolean>(true); //inizializzato come boolean true
    
    let idNum:number = -1;
    if(id){
        idNum = parseInt(id);
    }
    useEffect(() => {
        getSingleEvent(idNum).then((event) => {
            //mi creo un oggetto con l'array time, se voglio modificare qualcosa uso direttamente updateEvent. lavoro sulla copia che poi setto a singleEvent
            const updateEvent = {
                ...event,   //l'oggetto originale
                date_modified: event.date,
                time: event.time ? [...event.time] : [],    
            };
            for(let i=0, min=0; i<6; i++, min+=15) {
                const t = dayjs(event.date).add(min, 'minute').format('HH:mm'); //mi costruisco l'array ogni 15 min
                updateEvent.time.push(t);
            }
            updateEvent.date_modified=dayjs(event.date).format("YYYY/MM/DD - HH:mm"); //modifico l'oggetto con un formato data diverso dall'originale
            setEvent(updateEvent);
            setIsLoading(false);
        }).catch((error) => {
            console.error(error);
        });
        
    }, [idNum]);

    return { singleEvent, isLoading };
};
