import React from 'react';

const TextInput = ({ id = '', type = 'text', label = '', hint = '', val = '', onChange = () => {}, error = '' }) => {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={`block mb-2 text-sm font-medium ${error.length > 0 ? 'text-red-700' : 'text-gray-900'}`}
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        placeholder={hint}
        value={val}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-4 ring-red-100 focus:border-transparent focus:outline-none block w-full p-4 hover:ring-4 ease-linear duration-200"
      />
      <p className="mt-1 text-xs text-red-700 select-none">{error.length > 0 ? error : ''}&nbsp;</p>
    </div>
  );
};

export default TextInput;
