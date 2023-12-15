import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import person from "../assets/user.png";

const HomePage = () => {

    return (
        <div>
                
                <div className="">
                    <Menu />
                    <div className="bg-white rounded-full h-14 w-14 fixed md:bottom-7 md:left-7 bottom-3 left-3 z-30">
                        <div className="flex justify-center items-center h-full">
                            <Link to={"/profile"} className="flex justify-center">
                                <div className="h-1/2 w-1/2">
                                    <img className="" src={person} alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default HomePage;
