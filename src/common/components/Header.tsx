import logo from "../../assets/logo.png";
import userImg from "../../assets/profile_img.png";
import { IoSearch } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { MdOutlineNotifications } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";
import React, { useEffect, useState } from "react";
import { auth } from "../../config/fire-base";
import useUser from "../../hooks/useUser";
interface Links {
  name: string;
  link: string;
}

const links: Links[] = [
  {
    name: "Home",
    link: "#",
  },
  {
    name: "Movies",
    link: "#",
  },
  {
    name: "Series",
    link: "#",
  },
  {
    name: "New & Popular",
    link: "#",
  },
  {
    name: "My List",
    link: "#",
  },
];
const Header = () => {
  const { user } = useUser();
  const [searchItem, setSearchItem] = useState<string>("");
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const handelSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };

  const handelShowOptions = () => {
    setShowOptions(!showOptions);
  };
  const headerRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        (headerRef.current as HTMLDivElement).classList.add(
          "shadow-md",
          "bg-[#141414]"
        );
        (headerRef.current as HTMLDivElement).classList.remove(
          "bg-gradient-to-r",
          "from-[rgba(0,0,0,0.7)]",
          "to-transparent"
        );
      } else {
        (headerRef.current as HTMLDivElement).classList.add(
          "bg-gradient-to-r",
          "from-[rgba(0,0,0,0.7)]",
          "to-transparent"
        );
        (headerRef.current as HTMLDivElement).classList.remove(
          "shadow-md",
          "bg-[#141414]"
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 text-[#5e5e5e]  bg-gradient-to-r  from-[rgba(0,0,0,0.7)] to-transparent transition-all  z-50 w-full"
    >
      <div className="container py-5">
        <div className="flex relative justify-between gap-2 items-center">
          <div className="flex lg:flex-shrink-0 items-center gap-12">
            {/* logo */}
            <div className="w-[90px]">
              <img src={logo} className="w-full object-contain" alt="logo" />
            </div>
            {/* links */}
            <ul className="max-lg:hidden">
              {links.map((link) => (
                <li key={link.name} className="inline-block px-4">
                  <NavLink
                    to={link.link}
                    className={({ isActive }) =>
                      isActive
                        ? "text-white"
                        : "hover:text-white transition-colors"
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* search input */}
          <div className="flex max-md:hidden flex-grow items-center gap-4">
            <input
              value={searchItem}
              type="text"
              onChange={handelSearch}
              className="flex-grow text-white p-3 bg-transparent"
              placeholder="Browse by languages"
            />
            <IoSearch className=" text-white text-lg" />
          </div>
          {/* profile */}
          <div className="flex  items-center gap-4">
            <p className="text-white text-center">
              {user?.displayName
                ?.split(" ")
                .map((e) => e.charAt(0))
                .slice(0, 2)
                .join("")}
            </p>
            <MdOutlineNotifications className="text-white text-lg" />

            <div
              onClick={handelShowOptions}
              className="flex cursor-pointer gap-1 items-center"
            >
              <img
                className="border-2 w-[35px] aspect-square  rounded"
                src={userImg}
              />
              <TiArrowSortedDown
                className={`text-white transition-all duration-500  text-lg ${
                  showOptions && "rotate-180"
                }`}
              />
            </div>
          </div>
          {showOptions && (
            <div className="absolute bg-[#191919] py-[18px] px-[22px] rounded right-0 top-[110%]">
              <button
                onClick={() => auth.signOut()}
                className="text-white underline"
              >
                Sign out of Netflix
              </button>
            </div>
          )}
        </div>
        {/* <div className="flex md:hidden mt-3 flex-grow items-center gap-4">
          <input
            type="text"
            onChange={handelSearch}
            className="flex-grow text-white p-3 bg-transparent"
            placeholder="Browse by languages"
          />
          <IoSearch className=" text-white text-lg" />
        </div> */}
      </div>
    </header>
  );
};

export default Header;
