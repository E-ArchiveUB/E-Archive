import React from 'react'

const HeaderMailList = () => {
  return (
      <div className="grid grid-cols-12 border border-black border-opacity-40 mb-8 rounded-md justify-center items-center">
          <div className="w-full flex flex-row justify-center py-3 rounded-l-md items-center bg-blue-200 col-span-2">
              <h1 className="text-sm font-bold">Reference</h1>
          </div>
          <div className="w-full flex flex-row justify-center py-3 items-center bg-blue-100 col-span-4">
              <h1 className="text-sm font-bold">File Name</h1>
          </div>
          <div className="w-full flex flex-row justify-center py-3 items-center bg-blue-200 col-span-1">
              <h1 className="text-sm font-bold">Mail Type</h1>
          </div>
          <div className="w-full flex flex-row justify-center py-3 items-center bg-blue-100 col-span-2">
              <h1 className="text-sm font-bold">Sender</h1>
          </div>
          <div className="w-full flex flex-row justify-center py-3 items-center bg-blue-200 col-span-2">
              <h1 className="text-sm font-bold">Recipient</h1>
          </div>
          <div className="w-full flex flex-row justify-center py-3 items-center rounded-r-md bg-blue-100 col-span-1">
              <h1 className="text-sm font-bold">Action</h1>
          </div>
      </div>
  );
}

export default HeaderMailList


