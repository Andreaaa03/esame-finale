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
    mail: string,
    database: Database,
) {
    push(ref(database, "users/"), {
        name,
        surname,
        mail
    });
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export async function readOnDB(db: Database) {
    const userEmail = JSON.parse(sessionStorage.getItem('userEmail') as string);
    let allBooking;
    const allBookingRef = ref(db, 'booking/');
    let bookingArray;
    try {
        await get(allBookingRef).then((v) => {
            if (v.exists()) {
                bookingArray = Object.entries(v.val()).map(([id, data]) => ({
                    id,
                    ...(data as Record<string, string | number>),
                }));
                // for(let i=0; i<bookingArray.length; i++) {
                //     if (bookingArray[i].mail === userEmail){
                //         allBooking.push(bookingArray[i]);
                //     }
                // }
                allBooking = bookingArray.filter(entry => 'mail' in entry && entry.mail === userEmail);
            } else {
                console.log("errore");
            }
        }).catch((e) => {
            console.log(e);
        })
    } catch (e) {
        console.log(e);
    }
    console.log("bookingArray",bookingArray);
    console.log("le mia prenot",allBooking);
}