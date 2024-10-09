import React from 'react'
import Avatar from './Avatar';
import { IoSearch } from "react-icons/io5";

const Header = () => {
  return (
      <div className="w-full border-b border-gray-200 px-8 py-2 pt-3 flex items-center justify-between">
          <img className="w-44" src="/Assets/Images/logo-fix.png" alt="" />
          <div className="w-auto rounded-md px-2 flex flex-row gap-2 justify-center items-center border-[0.1px] border-black border-opacity-40">
              <input
                  style={{
                      outline: "none",
                      border: "none",
                      boxShadow: "none",
                      WebkitBoxShadow: "none",
                      MozBoxShadow: "none",
                  }}
                  className="w-96 text-xs placeholder:text-xs tracking-wide py-2 focus-within:outline-none"
                  type="text"
                  placeholder='Search Archive'
              />
              <IoSearch />
          </div>
          <Avatar />
      </div>
  );
}

export default Header
