import { useEffect, useState } from "react";
import { SingleEvent } from "../repo/types";
import { getSingleEvent } from "../repo/index";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
export const useDetailEvents = () => {
    const {id}=useParams();
    const [singleEvent, setEvent] = useState<SingleEvent>(); 
    const [isLoading, setIsLoading] = useState<boolean>(true); //inizializzato come boolean true
    
    let idNum:number = -1;
    if(id){
        idNum = parseInt(id);
    }
    useEffect(() => {
        getSingleEvent(idNum).then((event) => {
            const updateEvent = {
                ...event,
                time: event.time ? [...event.time] : [],
            };
            for(let i=0, min=15; i<6; i++, min+=15) {
                const t = dayjs(event.date).add(min, 'minute').format('HH:mm');
                updateEvent.time.push(t);
            }
            setEvent(updateEvent);
            setIsLoading(false);
        }).catch((error) => {
            console.error(error);
        });
        
    }, [idNum]);

    return { singleEvent, isLoading };
};
