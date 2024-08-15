import React, { useState, ChangeEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import 'flatpickr/dist/flatpickr.css';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import GoogleMapComponent from '@/components/GoogleMap/GoogleMapComponent';
import { FaSearch } from 'react-icons/fa';
import Select from 'react-select';

interface ViewDriverTrackingProps {
    details: {
        archiveName: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
    create?: string;
}

const ViewDriverTracking = () => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // Get today's date in the format 'YYYY-MM-DD'
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;

    const [quileContent, setQuileContent] = useState('hello');

    // const handleRemarksChange = (content: string) => {
    //     setQuileContent(content);
    // };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    const options5 = [
        { value: 'MINI', label: 'MINI' },
        { value: 'SIDAN', label: 'SIDAN' },
        { value: 'HATCHBACK', label: 'HATCHBACK' },
        { value: 'SUV', label: 'SUV' },
    ];

    return (
        <>
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark flex-wrap">
                <li className="">
                    <Link to="/" className={currentPage === '/' ? 'active' : ''} onClick={() => setCurrent('/')}>
                        Home
                    </Link>
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/MapViewModule/DriversTracking/ViewDriverTracking' ? 'text-blue-600' : ''
                    }`}
                >
                    Drivers Tracking
                </li>
            </ol>

            <div className="panel mt-6 ">
                <form>
                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        {/* <div className="lg:w-1/3">
                            <label htmlFor="archive" className="block mb-1">
                                Vehicle Type
                            </label>
                            <select id="archive" name="archive" className="form-select text-white-dark" required>
                                <option value={'PENDING'}>Mini</option>
                                <option value={'APPROVED'}>Sedan</option>
                                <option value={'APPROVED'}>Maxi cab</option>
                                <option value={'REJECTED'}>Toyota</option>
                                <option value={'REJECTED'}>Honda</option>
                                <option value={'REJECTED'}>SUV</option>
                            </select>
                        </div> */}

                        <div className="lg:w-1/3">
                            <div className="mb-5">
                                <label htmlFor="vehicleType" className="block mb-1 text-md font-bold">
                                    Vehicle Type
                                </label>
                                <Select placeholder="Select an option" options={options5} isMulti isSearchable={false} />
                            </div>
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="searchDriver" className="block mb-1">
                                Search Driver
                            </label>
                            <div className="relative">
                                <input name="searchDriver" type="text" id="searchDriver" placeholder="Search Driver..." className="form-input w-full pr-10" />
                                <div className="absolute right-[1px] top-0 flex items-center ">
                                    <div className="cursor-pointer bg-gray-200 hover:bg-[#b6c2f7] transition duration-200 rounded-md w-9 h-[38px] flex justify-center items-center">
                                        <FaSearch className="text-[#4361ee] " />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="SearchLocation" className="block mb-1">
                                Search Location
                            </label>
                            <div className="relative">
                                <input name="searchLocation" type="text" id="searchLocation" placeholder="Search Location..." className="form-input w-full pr-10" />
                                <div className="absolute right-[1px] top-0 flex items-center ">
                                    <div className="cursor-pointer bg-gray-200 hover:bg-[#b6c2f7] transition duration-200 rounded-md w-9 h-[38px] flex justify-center items-center">
                                        <FaSearch className="text-[#4361ee] " />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="archive" className="block mb-1">
                                Service Available City
                            </label>
                            <select id="archive" name="archive" className="form-select text-white-dark" required>
                                <option value={'PENDING'}>Karnataka</option>
                                <option value={'APPROVED'}>Banglore</option>
                                <option value={'APPROVED'}>Jp Nagar</option>
                                <option value={'REJECTED'}>Gurugram</option>
                            </select>
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="Travelagency" className="block mb-1">
                                Travel Agency
                            </label>
                            <input name="Travelagency" type="text" id="Travelagency" placeholder="Enter Travel agency" className="form-input w-full" />
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="drivermobilenumber" className="block mb-1">
                                Driver Mobile number
                            </label>
                            <input name="drivermobilenumber" type="text" id="drivermobilenumber" placeholder="Enter driver mobile no" className="form-input w-full" />
                        </div>
                    </div>

                    <div className="lg:w-1/2 flex justify-center items-center">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4">
                            Submit
                        </button>
                        <button type="button" className="btn btn-danger !mt-6">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            <div className="panel mt-6 overflow-hidden">
                <GoogleMapComponent />
            </div>
        </>
    );
};

export default ViewDriverTracking;
