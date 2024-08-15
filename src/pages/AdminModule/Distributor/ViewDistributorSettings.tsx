import React, { useState, ChangeEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import ServiceCityModal from '@/components/Models/ServiceCityModal';

interface ViewDistributorSettingsProps {
    details: {
        archiveName: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
    create?: string;
}

const ViewDistributorSettings = () => {
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

    const [modal6, setModal6] = useState(false);

    const [addedserviceCityType, setAddedServiceCityType] = useState<any>();
    const [ServiceCityData, setServiceCityData] = useState<any>();

    const handleAddServiceCitySubmit = (selectedServiceCity: any, userID: string) => {
        setServiceCityData(selectedServiceCity);
        setAddedServiceCityType(userID);
        console.error('onInputChange is not defined.');
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
                        currentPath === 'AdminModule/Distributor/ViewDistributorSettings' ? 'text-blue-600' : ''
                    }`}
                >
                    Distribution Settings
                </li>
            </ol>

            <div className="panel mt-6">
                <h1 className="text-2xl p-2 font-bold">Distribution Settings</h1>
                <form>
                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="bookingType" className="block mb-1">
                                Booking Type
                            </label>
                            <select id="bookingType" name="bookingType" className="form-select text-white-dark" required>
                                <option value="">Select</option>
                                <option value={'Online Booking'}>Online Booking</option>
                                <option value={'Schedule Booking'}>Schedule Booking</option>
                                <option value={'QR Code Booking'}>QR Code Booking</option>
                            </select>
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="serviceType" className="block mb-1">
                                Service Type
                            </label>
                            <select id="serviceType" name="serviceType" className="form-select text-white-dark" required>
                                <option value="">Select</option>
                                <option value={'Daily'}>Daily</option>
                                <option value={'Rental'}>Rental</option>
                                <option value={'Outstation'}>Outstation</option>
                            </select>
                        </div>

                        {/* <div className="lg:w-1/3">
                            <label htmlFor="serviceCity" className="block mb-1">
                                Service City
                            </label>
                            <select id="serviceCity" name="serviceCity" className="form-select text-white-dark" required>
                                <option value="">Select</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Madurai">Madurai</option>
                            </select>
                        </div> */}

                        <div className={`w-1/3`}>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <label htmlFor="serviceCity" className="block mb-1 font-bold text-md">
                                    Service City
                                </label>
                                {/* <Link to={'/UtilityModule/ServiceCity/ViewSpecificServiceCity/1'}>
            <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
        </Link> */}
                            </div>
                            {addedserviceCityType === 'serviceCityAdded' ? (
                                <button type="button" className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <div>
                                    {addedserviceCityType === 'serviceCityAdded' ? (
                                        <button type="button" onClick={() => setModal6(true)} className="btn btn-success w-full">
                                            Added
                                        </button>
                                    ) : (
                                        <button type="button" onClick={() => setModal6(true)} className="btn btn-primary w-full">
                                            Add Service City
                                        </button>
                                    )}
                                    <ServiceCityModal event={modal6} closeModal={() => setModal6(false)} onAddServiceCity={handleAddServiceCitySubmit} />
                                </div>
                            )}
                            <ServiceCityModal event={modal6} closeModal={() => setModal6(false)} onAddServiceCity={handleAddServiceCitySubmit} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="subscriptionType" className="block mb-1">
                                Subscription Type
                            </label>
                            <select id="subscriptionType" name="subscriptionType" className="form-select text-white-dark" required>
                                <option value="">Select</option>
                                <option value={'Flat'}>Flat</option>
                                <option value={'Percentage'}>Percentage</option>
                            </select>
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="taxPercentage" className="block mb-1">
                                Tax Percentage
                            </label>
                            <input name="taxPercentage" type="number" id="taxPercentage" placeholder="Enter Tax Percentage" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3"></div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4">
                            Update
                        </button>
                        <button type="button" className="btn btn-danger !mt-6">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ViewDistributorSettings;
