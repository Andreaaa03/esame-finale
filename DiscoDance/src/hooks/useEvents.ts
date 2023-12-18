import { useEffect, useState } from "react";
import { AllEvents } from "../repo/types";
import { getAllEvents } from "../repo/index";
import dayjs from "dayjs";

//gestisce tutti gli eventi e li divide in 3 array
export const useAllEvents = () => {
    const [event, setEvent] = useState<AllEvents[]>([]);
    const [pastEvents, setPastEvents] = useState<AllEvents[]>([]);
    const [nextEvents, setNextEvents] = useState<AllEvents[]>([]);
    const [futureEvents, setFutureEvents] = useState<AllEvents[]>([]);
    const datetime: string = "2023-07-21";  //data impostata manualmente 
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorCatchAllEvents, setErrorCatchAllEvents] = useState<boolean>(false);

    useEffect(() => {
        getAllEvents()
            .then((events) => {
                setEvent(events);

                //mi creo 3 array per gestire gli eventi passati, futuri e correnti.
                const newPastEvents: AllEvents[] = [];
                const newNextEvents: AllEvents[] = [];
                const newFutureEvents: AllEvents[] = [];
                let i=0;
                events.forEach((e) => {
                    if (dayjs(e.date) < dayjs(datetime)) {
                        e.date=dayjs(e.date).format("DD/MM/YYYY - HH:mm");
                        newPastEvents.push(e);
                    } else if (dayjs(e.date) >= dayjs(datetime)) {
                        e.date=dayjs(e.date).format("DD/MM/YYYY - HH:mm");
                        if (i === 0) {
                            newNextEvents.push(e);
                            i++;
                        } else {
                            newFutureEvents.push(e);
                        }
                    }
                });
                setPastEvents(newPastEvents);
                setNextEvents(newNextEvents);
                setFutureEvents(newFutureEvents);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
                setErrorCatchAllEvents(true);
            });
    }, [isLoading]);

    return { event, pastEvents, nextEvents, futureEvents, isLoading, datetime, errorCatchAllEvents, setIsLoading };
};
