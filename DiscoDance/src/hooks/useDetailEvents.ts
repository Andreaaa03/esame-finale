import { useEffect, useState } from "react";
import { SingleEvent } from "../repo/types";
import { getSingleEvent } from "../repo/index";
import { useParams } from "react-router-dom";
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
            setEvent(event);
            setIsLoading(false);
        }).catch((error) => {
            console.error(error);
        });
    }, [idNum]);

    return { singleEvent, isLoading };
};
