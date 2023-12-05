import { useEffect, useState } from "react";
import { AllEvents } from "../repo/types";
import { getAllEvents } from "../repo/index";
import dayjs from "dayjs";

export const useAllEvents = () => {
    const [event, setEvent] = useState<AllEvents[]>([]);
    const [pastEvents, setPastEvents] = useState<AllEvents[]>([]);
    const [nextEvents, setNextEvents] = useState<AllEvents[]>([]);
    const [futureEvents, setFutureEvents] = useState<AllEvents[]>([]);
    const datetime: string = "2023-07-21";
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getAllEvents()
            .then((events) => {
                setEvent(events);
                const newPastEvents: AllEvents[] = [];
                const newNextEvents: AllEvents[] = [];
                const newFutureEvents: AllEvents[] = [];
                let i=0;
                events.forEach((e) => {
                    const time = dayjs(datetime);
                    if (dayjs(e.date) < time) {
                        newPastEvents.push(e);
                    } else if (dayjs(e.date) >= time) {
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
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
                console.log(pastEvents);
                console.log(nextEvents);
                console.log(futureEvents);
            });
    }, [isLoading]);

    return { event, pastEvents, nextEvents, futureEvents, isLoading };
};
