import { useState } from "react";
import { auth, db, writeOnDBforUser } from "../utils/firebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export const LoginLogout = () => {
    //aggiorna i vari valori
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [age, setAge] = useState(18);
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    const [log, setLog] = useState(false); //accedi o registrati
    const [visible, setVisible] = useState(true); //accedi o registrati PER il bottone indietro
    const [logLostPassword, setLogLostPassword] = useState(false); //per il reset della password
    const navigate = useNavigate();

    const logicLogIn = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, mail, password)
            .then(() => {
                sessionStorage.setItem("userEmail", JSON.stringify(mail));
                navigate("/home");
            })
            .catch((e) => {
                console.log("credenziali sbagliate" + e);
            });
    };
    const logicSignIn = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, mail, password)
            .then(() => {
                writeOnDBforUser(name, surname, age, mail, db);
            })
            .catch((e) => {
                console.log("qualcosa è andato storto" + e);
            });
        setLog(false);
    };

    const lostPassword = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        setVisible(true);
        setLogLostPassword(false);
        sendPasswordResetEmail(auth, mail)
            .then(() => {
                console.log("email inviata");
            })
            .catch((error) => {
                console.log("error: " + error);
            });
    };

    return (
        <div className="w-full flex flex-wrap justify-center">
            {visible === true && (
                <div className="w-full flex justify-center mb-2">
                    <Link to={"/home"}>
                        <button className="text-center font-bold py-2 px-3 bg-white rounded-xl">Torna alla Home</button>
                    </Link>
                </div>
            )}
            {visible === true && log === false && (
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our plathtmlForm</h5>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder={mail}
                                required
                                value={mail}
                                onChange={(e) => {
                                    setMail(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder={password}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        <button
                            onClick={logicLogIn}
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Login to your account
                        </button>
                        <div className="flex items-start text-sm font-medium dark:text-gray-300">
                            Lost your password?{" "}
                            <a
                                onClick={() => {
                                    setLogLostPassword(true), setVisible(false);
                                }}
                                className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">
                                Lost Password
                            </a>
                        </div>
                        <div className="flex text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?{" "}
                            <a className="ms-auto text-blue-700 hover:underline dark:text-blue-500" onClick={() => setLog(true)}>
                                Create account
                            </a>
                        </div>
                    </form>
                </div>
            )}
            {visible === true && log === true && (
                <div className="md:w-3/6 w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="md:space-y-6" onSubmit={logicSignIn}>
                        <h5 className="p-2 text-xl font-medium text-gray-900 dark:text-white">Sign in to our plathtmlForm</h5>
                        <div className="flex flex-wrap">
                            <div className="md:w-1/3 w-full p-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3 w-full p-2">
                                <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Surname
                                </label>
                                <input
                                    type="text"
                                    name="surname"
                                    id="surname"
                                    placeholder="surname"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                    value={surname}
                                    onChange={(e) => {
                                        setSurname(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3 w-full p-2">
                                <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    id="age"
                                    placeholder="age"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                    min="18"
                                    max="110"
                                    value={age}
                                    onChange={(e) => {
                                        setAge(parseInt(e.target.value));
                                    }}
                                />
                            </div>
                            <div className="md:w-2/3 w-full p-2">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="name@company.com"
                                    required
                                    value={mail}
                                    onChange={(e) => {
                                        setMail(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="md:w-1/3 w-full p-2">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap flex-col-reverse md:flex-row justify-between">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300 flex items-center p-2">
                                Already registered?{" "}
                                <a href="#" className="text-blue-700 hover:underline dark:text-blue-500" onClick={() => setLog(false)}>
                                    Go back and login
                                </a>
                            </div>
                            <div className="md:w-1/3 w-full p-2">
                                <button
                                    className="w-full order-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                                    focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                                    dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Create your account
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            {logLostPassword === true && (
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form action="" onSubmit={lostPassword}>
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Lost your password?</h5>
                        <div className="mt-3">
                            <div className="my-6">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder={mail}
                                    required
                                    value={mail}
                                    onChange={(e) => {
                                        setMail(e.target.value);
                                    }}
                                />
                            </div>
                            <button className="w-full mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Send Email to reset your password
                            </button>

                            <div className="flex w-full text-sm font-medium text-gray-500 dark:text-gray-300">
                                You remember the password?
                                <a
                                    onClick={() => {
                                        setVisible(true), setLogLostPassword(false);
                                    }}
                                    className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">
                                    Go back!
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
