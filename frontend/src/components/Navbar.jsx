import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false); 
  const handleClick = () => setClick(!click);

  const { logout, isAuthenticated, user } = useAuth0();

  const content = (
    <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition">
      <ul className="text-center text-xl p-20">
        <Link to="/userProfile" onClick={() => setClick(false)}>
          <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia cursor-pointer">
            Products
          </li>
        </Link>
        <Link to="/userProfile" onClick={() => setClick(false)}>
          <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia cursor-pointer">
            Profile
          </li>
        </Link>
        <Link to="/viewCart" onClick={() => setClick(false)}>
          <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia cursor-pointer">
            View Cart
          </li>
        </Link>

        {isAuthenticated && (
          <li
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Logout
          </li>
        )}
      </ul>
    </div>
  );

  return (
    <nav>
      <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4 flex-1 bg-slate-900">
        <div className="flex items-center flex-1">
          <span className="text-3xl font-bold">ElecroHub</span>
        </div>

        <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
          <div className="flex items-center gap-4 relative">
            <Link to="/">
              <button className="my-4 py-2 px-4 border border-slate-800 hover:bg-slate-800 rounded">
                Products
              </button>
            </Link>
            <Link to="/viewCart">
              <button className="my-4 py-2 px-4 border border-slate-800 hover:bg-slate-800 rounded">
                Cart
              </button>
            </Link>

            {isAuthenticated && (
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-800 font-bold text-lg cursor-pointer"
                  onClick={() => setDropdown(!dropdown)}
                  title={user.name || "User"} 
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>

                {dropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-slate-800 rounded-lg shadow-lg overflow-hidden z-50">
                    <Link to="/userProfile" onClick={() => setDropdown(false)}>
                      <div className="px-4 py-2 hover:bg-slate-700 cursor-pointer">
                        Profile
                      </div>
                    </Link>
                    <div
                      onClick={() =>
                        logout({ logoutParams: { returnTo: window.location.origin } })
                      }
                      className="px-4 py-2 hover:bg-red-700 cursor-pointer text-white bg-red-600"
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div>{click && content}</div>
        <button className="block sm:hidden transition" onClick={handleClick}>
          {click ? <FaTimes size={25} /> : <CiMenuFries size={25} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
