import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="min-h-screen z-50 sfondo ">
            <div className="immagine-header">
                <div className="h-screen flex justify-center items-center">
                    <Link to="/header">
                        <button className="w-32 h-32 bg-transparent rounded-full">Click me!</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
