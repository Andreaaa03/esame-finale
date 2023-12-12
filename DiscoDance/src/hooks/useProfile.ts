import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, readOnDBBooking, readOnDBUsers } from "../utils/firebase";

const useProfile =()=>{
    const navigate=useNavigate();
    const [isLoading, setIsLoading]=useState(true);
    const [booking, setBooking] = useState<Record<string, string | number>[] | null>(null);
    const [users, setUsers] = useState<Record<string, string | number>[] | null>(null);
    useEffect(() => {
        setIsLoading(true);
        
        const fetchData = async () => {
            setIsLoading(true);
            try {
                setBooking(await readOnDBBooking(db));
                setUsers(await readOnDBUsers(db));
                setIsLoading(false);
            } catch (error) {
                // Handle error if needed
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        if (!JSON.parse(sessionStorage.getItem("userEmail") as string)) {
            navigate("/AccediRegistrati");
        } else {
            fetchData();
        }

    }, [navigate]);
    
    return { isLoading, booking, users}
}
export default useProfile;