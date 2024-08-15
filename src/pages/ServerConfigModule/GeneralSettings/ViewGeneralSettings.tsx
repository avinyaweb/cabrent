import React, { useState, ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'rsuite';

interface ViewGeneralSettingsProps {
    details: {
        id: string;
        bookingId: string;
        amount: string;
        archive: string;
        appName: string;
        companyMail: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
    create?: string;
}

const ViewGeneralSettings = () => {
    // const [moduleDetails, setModuleDetails] = useState(details);

    // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     console.log('Input changed:', event.target.name, event.target.value);
    //     setModuleDetails({ ...moduleDetails, [event.target.name]: event.target.value });
    //     onInputChange(event);
    // };

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
                        currentPath === '/ServerConfigModule/GeneralSettings/ViewGeneralSettings' ? 'text-blue-600' : ''
                    }`}
                >
                    General Settings
                </li>
            </ol>

            <div className="panel mt-6">
                <h1 className="text-2xl p-2 font-bold">General Settings</h1>
                <form>
                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="appName" className="block mb-1">
                                App Name
                            </label>
                            <input name="appName" type="text" id="appName" placeholder="Enter App Name" className="form-input w-full" />
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="defaultPassword" className="block mb-1">
                                Default Password
                            </label>
                            <input name="defaultPassword" type="password" id="defaultPassword" placeholder="Enter Default Password" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="timezoneOffset" className="block mb-1">
                                Timezone Offset
                            </label>
                            <input name="timezoneOffset" type="text" id="timezoneOffset" placeholder="Enter Timezone Offset" className="form-input w-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="defaultPhoneCode" className="block mb-1">
                                Default Phone Code
                            </label>
                            <input name="defaultPhoneCode" type="text" id="defaultPhoneCode" placeholder="Enter Default Phone Code" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="companyAddress" className="block mb-1">
                                Company Address
                            </label>
                            <input name="companyAddress" type="text" id="companyAddress" placeholder="Enter Company Address" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="companyMail" className="block mb-1">
                                Company Mail
                            </label>
                            <input name="companyMail" type="email" id="companyMail" placeholder="Enter Company Mail" className="form-input w-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="maxRequestRadius" className="block mb-1">
                                Max Request Radius (In Miles)
                            </label>
                            <input name="maxRequestRadius" type="text" id="maxRequestRadius" placeholder="Enter Max Request Radius" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="driverCanceledAllowed" className="block mb-1">
                                No Of Driver Canceled Allowed Per Day (No - 1)
                            </label>
                            <input name="driverCanceledAllowed" type="text" id="driverCanceledAllowed" placeholder="Enter No Of Driver Canceled Allowed" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="riderCanceledAllowed" className="block mb-1">
                                No Of Rider Canceled Allowed Per Day (No - 1)
                            </label>
                            <input name="riderCanceledAllowed" type="text" id="riderCanceledAllowed" placeholder="Enter No Of Rider Canceled Allowed" className="form-input w-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="driversToBeCalled" className="block mb-1">
                                No Of Drivers To be Called Nearby Pickup Point
                            </label>
                            <input name="driversToBeCalled" type="text" id="driversToBeCalled" placeholder="Enter No Of Drivers To be Called" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="requestTimeDriver" className="block mb-1">
                                Req Time For Single Driver Accept/Decline
                            </label>
                            <input name="requestTimeDriver" type="text" id="requestTimeDriver" placeholder="Enter Request Time For Single Driver" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="requestTimeRider" className="block mb-1">
                                Req Time for Rider to Search for Nearby Driver
                            </label>
                            <input name="requestTimeRider" type="text" id="requestTimeRider" placeholder="Enter Requesting Time For Rider" className="form-input w-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="currencySymbol" className="block mb-1">
                                Currency Symbol
                            </label>
                            <input name="currencySymbol" type="text" id="currencySymbol" placeholder="Enter Currency Symbol" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="currencyLabel" className="block mb-1">
                                Currency Label
                            </label>
                            <input name="currencyLabel" type="text" id="currencyLabel" placeholder="Enter Currency Label" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="distanceUnitSymbol" className="block mb-1">
                                Distance Unit Symbol
                            </label>
                            <input name="distanceUnitSymbol" type="text" id="distanceUnitSymbol" placeholder="Enter Distance Unit Symbol" className="form-input w-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="distanceUnitLabel" className="block mb-1">
                                Distance Unit Label
                            </label>
                            <input name="distanceUnitLabel" type="text" id="distanceUnitLabel" placeholder="Enter Distance Unit Label" className="form-input w-full" />
                        </div>
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

export default ViewGeneralSettings;
