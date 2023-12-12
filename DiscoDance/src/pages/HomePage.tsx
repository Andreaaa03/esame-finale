import { useEffect } from "react";
import Menu from "../components/Menu";
import { Link, useNavigate } from "react-router-dom";

import person from "../assets/user.png";
const HomePage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!JSON.parse(sessionStorage.getItem("userEmail") as string)) {
            navigate("/");
        }
    });
    return (
        <div>
            {JSON.parse(sessionStorage.getItem("userEmail") as string) && (
                <div className="">
                    <Menu />
                    <div className="bg-white rounded-full h-14 w-14 fixed bottom-7 left-7">
                        <div className="flex justify-center items-center h-full">
                            <Link to={"/profile"} className="flex justify-center">
                                <div className="h-1/2 w-1/2"><img className="" src={person} alt="" /></div>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
    
};

export default HomePage;
