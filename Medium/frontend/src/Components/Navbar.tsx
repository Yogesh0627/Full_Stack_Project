import { Link, NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { UserContext } from "../Context/UserContext";

const Navbar = () => {
    const { Logout } = useContext(AuthContext);
    const { user } = useContext(UserContext);
    const [isMenuOpen, setMenuOpen] = useState(false); // State variable to manage hamburger menu visibility

    // console.log(user)
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <div>
                <div className="flex justify-between gap-5 items-center px-5 md:px-10 py-2">
                    <div className="w-16">
                        <Link to={"/blogs"}>
                            <svg viewBox="0 0 1043.63 592.71">
                                <g data-name="Layer 2">
                                    <g data-name="Layer 1">
                                        <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"></path>
                                    </g>
                                </g>
                            </svg>
                        </Link>
                    </div>
                    <div className="w-full md:w-1/4 flex justify-center gap-2 items-center p-2 rounded-3xl bg-slate-100">
                        <div className="">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="20"
                                height="20"
                                viewBox="0 0 50 50"
                            >
                                <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                            </svg>
                        </div>
                        <input
                            type="search"
                            placeholder="Search"
                            className="focus:outline-none px-1 text-sm font-normal w-full rounded-3xl bg-slate-100"
                        />
                    </div>
                    <div className="flex justify-center  items-center gap-3">
                        <div className="hidden md:flex  justify-center items-center gap-3">
                            <Link to={"/blogs/myblogs"}>My Blogs</Link>
                            <NavLink to={`/publish`} className="">
                                {({ isActive }) => (
                                    <button
                                        type="button"
                                        className={`mr-4 mt-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ${isActive ? 'hidden' : ''}`}
                                    >
                                        New
                                    </button>
                                )}
                            </NavLink>
                            <Avatar name={user.name} size="large"/>
                            <button onClick={Logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Sign Out</button>
                        </div>

                        {/* Hamburger menu button */}     
                        <div className="md:hidden">
                            <button onClick={toggleMenu}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    {/* Hamburger menu content */}
                    <div className="flex flex-col items-center gap-3 py-2 bg-gray-100 rounded-md">
                        <Link to="/blogs/myblogs" className="text-gray-800 hover:text-blue-600">My Blogs</Link>
                        <NavLink to="/publish" className="text-gray-800 hover:text-blue-600">New</NavLink>
                        <button onClick={Logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Sign Out</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;

