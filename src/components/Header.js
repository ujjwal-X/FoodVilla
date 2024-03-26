import { useState } from "react";

import { Link } from "react-router-dom";
import useOnline from "../Utils/useOnline";


const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isOnline = useOnline();
  return (
    <>
      <div className="header flex justify-between bg-white text-black shadow-lg">
        <h1 className="text-3xl font-semibold py-3 px-5">Food Villa</h1>
        <div className="nav-items">
          <ul className="flex py-5 ">
           <li className="px-10 "> <Link to="/">Home</Link></li>
           <li className="px-10"> <Link to={"/about"}>About</Link></li>
           <li className="px-10"> <Link to={"/contact"}>Contact</Link></li>
           <li className="px-10"><Link to={"/cart"}>Cart</Link></li>
           <li className="px-10"><Link Instamart to={"/InstaMart"}>Instamart</Link></li>
             
          </ul>
          
        </div>
        <h1>{ isOnline?'🟢':'🔴'}</h1>
        {
          isLoggedIn ? <button onClick={() => setIsLoggedIn(false)}>Logout</button>
            : <button onClick={() => setIsLoggedIn(true)}>Login</button>}
      </div>
    </>
  );
};
export default Header;
