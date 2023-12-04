import { AllEvents } from "./types";
import { SingleEvent } from "./types";

const URL = "https://its-events.davide-mantovani.workers.dev/events ";

export const getAllEvents = async (): Promise<AllEvents[]> => {
    const res: Response = await fetch(URL);
    if (res.status === 200) {
        const data = (await res.json()); 
        return data; //data è un array di oggetti
    }
    return [];
};

export const getSingleEvent = async (id:string): Promise<SingleEvent> => {
    const res: Response = await fetch(URL+"/"+id);
    if (res.status === 200) {
        const data = (await res.json()); 
        return data; //data è un oggetto
    }
    return {} as SingleEvent;
};

