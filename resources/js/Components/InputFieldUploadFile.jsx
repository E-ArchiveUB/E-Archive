import React from 'react'

const InputFieldUploadFile = ( {title, placeholder}) => {

  return (
      <div className="flex flex-col gap-1">
          <label
              className="text-sm font-medium text-customBlue"
              htmlFor="Name"
          >
              {title}
          </label>
          <input
              style={{
                  outline: "none",
                  boxShadow: "none",
                  WebkitBoxShadow: "none",
                  MozBoxShadow: "none",
              }}
              className="border border-black border-opacity-60 rounded-md py-3 text-sm font-medium placeholder:font-medium placeholder:text-gray-400 bg-white"
              type="text" placeholder={placeholder}
          />
      </div>
  );
}

export default InputFieldUploadFile
