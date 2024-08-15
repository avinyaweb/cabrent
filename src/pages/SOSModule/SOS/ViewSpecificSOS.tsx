import React, { useState, ChangeEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import GoogleMapComponent from '@/components/GoogleMap/GoogleMapComponent';
import { FaSearch } from 'react-icons/fa';

interface ViewDriversTrackingProps {
    details: {
        archiveName: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
    create?: string;
}

const ViewSpecificSOS = () => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // Get today's date in the format 'YYYY-MM-DD'
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;
    const [date1, setDate1] = useState<any>(formattedToday);
    const [date2, setDate2] = useState<any>(formattedToday);

    const [quileContent, setQuileContent] = useState('hello');

    const handleRemarksChange = (content: string) => {
        setQuileContent(content);
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

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
                        currentPath === '/SOSModule/SOS/ViewSpecificSOS' ? 'text-blue-600' : ''
                    }`}
                >
                    SOS
                </li>
            </ol>

            <div className="panel mt-6 ">
                <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                    <div className="lg:w-1/4">
                        <label htmlFor="archive" className="block mb-1">
                            SOS Place
                        </label>
                        <input name="SosPlace" type="text" id="SosPlace" value={'Jp Nagar'} className="form-input w-full pr-10" />
                    </div>
                    <div className="lg:w-1/4">
                        <label htmlFor="fk_ServiceCity" className="block mb-1">
                            Service City
                        </label>
                        <input name="fk_ServiceCity" type="text" id="fk_ServiceCity" value={'Bangalore'} className="form-input w-full pr-10" />
                    </div>
                    <div className="lg:w-1/4">
                        <label htmlFor="kilometer" className="block mb-1">
                            kilometers
                        </label>
                        <input name="kilometer" type="text" id="kilometer" value={'7 km'} className="form-input w-full pr-10" />
                    </div>
                    <div className="lg:w-1/4">
                        <label htmlFor="nearestPoliceStation" className="block mb-1">
                            Nearest Police Station
                        </label>
                        <input name="nearestPoliceStation" type="text" id="nearestPoliceStation" value={'Jp Nagar Police Station'} className="form-input w-full pr-10" />
                    </div>
                </div>
                <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                    <div className="lg:w-1/4">
                        <label htmlFor="riderName" className="block mb-1">
                            Rider Name
                        </label>
                        <input name="riderName" type="text" id="riderName" value={'Shankar'} className="form-input w-full pr-10" />
                    </div>
                    <div className="lg:w-1/4">
                        <label htmlFor="contactNumber" className="block mb-1">
                            Contact Number
                        </label>
                        <input name="contactNumber" type="text" id="contactNumber" value={'9876543210'} className="form-input w-full pr-10" />
                    </div>
                    <div className="lg:w-1/4">
                        <label htmlFor="travelAgency" className="block mb-1">
                            Travel Agency
                        </label>
                        <input name="travelAgency" type="text" id="travelAgency" value={'Ganesh Tours'} className="form-input w-full pr-10" />
                    </div>
                    <div className="lg:w-1/4">
                        <label htmlFor="distributor" className="block mb-1">
                            Distributor
                        </label>
                        <input name="distributor" type="text" id="distributor" value={'Western India Travels'} className="form-input w-full pr-10" />
                    </div>
                </div>
                <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                    <div className="lg:w-1/3">
                        <label htmlFor="status" className="block mb-1">
                            Status
                        </label>
                        <input name="status" type="text" id="status" value={'PENDING'} className="form-input w-full pr-10" />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="cleared" className="block mb-1">
                            Cleared
                        </label>
                        <input name="cleared" type="text" id="cleared" value={'No'} className="form-input w-full pr-10" />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="emergancyLevel" className="block mb-1">
                            Emergancy Level
                        </label>
                        <input name="emergancyLevel" type="text" id="emergancyLevel" value={'High'} className="form-input w-full pr-10" />
                    </div>
                </div>
            </div>

            <div className="panel mt-6 overflow-hidden">
                <GoogleMapComponent />
            </div>
        </>
    );
};

export default ViewSpecificSOS;
