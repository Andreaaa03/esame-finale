import { useState } from "react";
import { auth, db, writeOnDBforUser } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const LoginLogout = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [log, setLog] = useState(false);
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
    const logicSignIn = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(name, surname, mail, password);
        event.preventDefault();
        createUserWithEmailAndPassword(auth, mail, password)
            .then(()=>{
                writeOnDBforUser(name, surname, mail, db)
            })
            .catch((e)=>{
                console.log("qualcosa è andato storto"+e);
            })
        setLog(false);
    };

    return (
        <div className="">
            {log === false && (
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
                        <div className="flex items-start">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        value=""
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                        required
                                    />
                                </div>
                                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">
                                Lost Password?
                            </a>
                        </div>
                        <button
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={logicLogIn}>
                            Login to your account
                        </button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?{" "}
                            <a href="#" className="text-blue-700 hover:underline dark:text-blue-500" onClick={() => setLog(true)}>
                                Create account
                            </a>
                        </div>
                    </form>
                </div>
            )}
            {log === true && (
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our plathtmlForm</h5>
                        <div>
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
                        <div>
                            <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Surname
                            </label>
                            <input
                                type="surname"
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
                        <div>
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
                        <div>
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
                        <div>
                            <button
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                                focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                                dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={logicSignIn}>
                                Create your account
                            </button>
                        </div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Already registered?{" "}
                            <a href="#" className="text-blue-700 hover:underline dark:text-blue-500" onClick={() => setLog(false)}>
                                Go back and login
                            </a>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
