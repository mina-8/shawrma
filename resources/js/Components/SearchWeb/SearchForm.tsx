import React from 'react';
import { IoClose } from 'react-icons/io5';

interface SearchFormProps {
  onClose: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onClose }) => {
  return (
    <div className="fixed left-0 right-0 top-16 w-full bg-black bg-opacity-40 z-50 flex justify-center">
      <div className="bg-white rounded-b-lg shadow-lg p-6 w-full max-w-full relative">
        <button
          className="absolute top-2 right-2 text-white hover:bg-sky-700 text-2xl rounded-full bg-sky-500"
          onClick={onClose}
          aria-label="Close search"
        >
          <IoClose />
        </button>
        <h1 className='px-8'>Search our website</h1>
        <form className="flex flex-col lg:flex-row p-8">
          <input
            type="text"
            placeholder="Search..."
            className=" px-4 py-2 focus:outline-none focus:ring-0  focus:ring-sky-500 w-1/2"
            autoFocus
          />
          <button
            type="submit"
            className="bg-sky-500  text-white  px-4 py-2 hover:bg-sky-700 transition"
          >
            Search
          </button>
        </form>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full'>
            <div>
                <h2 className='text-2xl font-bold text-sky-500'>Recent Searches</h2>
                <ul>
                    <li>Search 1</li>
                    <li>Search 2</li>
                    <li>Search 3</li>
                </ul>
            </div>
            <div>
                <h2 className='text-2xl font-bold text-sky-500'>Quick Links</h2>
                <ul>
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;