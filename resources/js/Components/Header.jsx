import React from 'react'
import Avatar from './Avatar';
import { IoSearch } from "react-icons/io5";

const Header = () => {
  return (
      <div className="w-full border-b border-gray-200 px-8 py-2 pt-3 flex items-center justify-between">
          <img className="w-44" src="/Assets/Images/logo-fix.png" alt="" />
          <Avatar />
      </div>
  );
}

export default Header
