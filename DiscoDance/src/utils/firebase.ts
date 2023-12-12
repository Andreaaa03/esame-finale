// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Database, getDatabase, ref, push, get } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkQE9lFRXmSHI1ujzXocioC8NbDH5EV-Y",
    authDomain: "esame-react.firebaseapp.com",
    projectId: "esame-react",
    storageBucket: "esame-react.appspot.com",
    messagingSenderId: "760319714965",
    appId: "1:760319714965:web:fe10245fa61a4a90b09d9c",
    databaseURL: "https://esame-react-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export function writeOnDB(
    name: string,
    surname: string,
    mail: string,
    age: number,
    event: number,  // id dell'evento
    time_selected: string,   //orario scelto
    database: Database,
) {
    push(ref(database, "booking/"), {
        name,
        surname,
        mail,
        age,
        event,
        time_selected
    });
}

export function writeOnDBforUser(
    name: string,
    surname: string,
    age: number,
    mail: string,
    database: Database,
) {
    push(ref(database, "users/"), {
        name,
        surname,
        age,
        mail
    });
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export async function readOnDBBooking(db: Database): Promise<Record<string, string | number>[] | null> {
    try {
        const userEmail = JSON.parse(sessionStorage.getItem('userEmail') as string);
        const allBookingRef = ref(db, 'booking/');
        const snapshot = await get(allBookingRef);

        if (snapshot.exists()) {
            const bookingArray = Object.entries(snapshot.val()).map(([id, data]) => ({
                id,
                ...(data as Record<string, string | number>),
            }));

            const userBookings = bookingArray.filter(pre => 'mail' in pre && pre.mail === userEmail);
            // console.log(userBookings);
            return userBookings;
        }
    } catch (error) {
        console.error("An error occurred while reading from the database:", error);
    }
    return null;
}

export async function readOnDBUsers(db: Database): Promise<Record<string, string | number>[] | null> {
    let users;
    try {
        const userEmail = JSON.parse(sessionStorage.getItem('userEmail') as string);
        const allBookingRef = ref(db, 'users/');
        const snapshot = await get(allBookingRef);

        if (snapshot.exists()) {
            const usersArray = Object.entries(snapshot.val()).map(([id, data]) => ({
                id,
                ...(data as Record<string, string | number>),
            }));

            users = usersArray.filter(user => 'mail' in user && user.mail === userEmail);
            // console.log(users);
            return users;
        }
    } catch (error) {
        console.error("An error occurred while reading from the database:", error);
    }
    return null;
}


const tempoInattivo = 10 * 60 * 1000; //10 min
let timeoutId: NodeJS.Timeout;
export function resetSession() {
    sessionStorage.removeItem("userEmail");
}
function setTempoInattivo() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(resetSession, tempoInattivo);
}

document.addEventListener("mousemove", setTempoInattivo);
document.addEventListener("keydown", setTempoInattivo);
