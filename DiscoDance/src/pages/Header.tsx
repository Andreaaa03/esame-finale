import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="min-h-screen z-50 sfondo ">
            <div className="immagine-header">
                <div className="h-screen flex justify-center items-center">
                    <Link to="/header">
                        <button className="h-36 w-56 bg-trasparent rounded-full font-bold text-white neon md:text-4xl text-2xl shadow-sm mb-4">
                            <p className="w-full">Click me!</p>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="absolute top-0 w-full">
                <h1 className="w-full font-extrabold text-center pt-16 text-6xl neon-title">DiscoDance</h1>
            </div>
        </div>
    );
};

export default Header;
