import React, { useState, ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'rsuite';

interface ViewSMSConfigurationsProps {
    details: {
        id: string;
        bookingId: string;
        amount: string;
        archive: string;
        smsGateway: string;
        twilioAccountSid: string;
        twilioAuthToken: string;
        twilioNumber: string;
        nexmoApiKey: string;
        nexmoApiSecret: string;
        nexmoApiNumber: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
    create?: string;
}

const ViewSMSConfigurations = () => {
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
                        currentPath === '/ServerConfigModule/SMSConfigurations/ViewSMSConfigurations' ? 'text-blue-600' : ''
                    }`}
                >
                    SMS Configuration
                </li>
            </ol>

            <div className="panel mt-6">
                <h1 className="text-2xl p-2 font-bold">SMS Configuration</h1>
                <form>
                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="smsGateway" className="block mb-1">
                                SMS Gateway
                            </label>
                            <select id="smsGateway" name="smsGateway" className="form-select text-white-dark" required>
                                <option value="">Select</option>
                                <option value={'Twilio'}>Twilio</option>
                                <option value={'Nexmo'}>Nexmo</option>
                            </select>
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="twilioAccountSid" className="block mb-1">
                                Twilio Account SID
                            </label>
                            <input name="twilioAccountSid" type="text" id="twilioAccountSid" placeholder="Enter Twilio Account SID" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="twilioAuthToken" className="block mb-1">
                                Twilio Auth Token
                            </label>
                            <input name="twilioAuthToken" type="text" id="twilioAuthToken" placeholder="Enter Twilio Auth Token" className="form-input w-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="twilioNumber" className="block mb-1">
                                Twilio Number
                            </label>
                            <input name="twilioNumber" type="text" id="twilioNumber" placeholder="Enter Twilio Number" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="nexmoApiKey" className="block mb-1">
                                Nexmo API Key
                            </label>
                            <input name="nexmoApiKey" type="text" id="nexmoApiKey" placeholder="Enter Nexmo API Key" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="nexmoApiSecret" className="block mb-1">
                                Nexmo API Secret
                            </label>
                            <input name="nexmoApiSecret" type="text" id="nexmoApiSecret" placeholder="Enter Nexmo API Secret" className="form-input w-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="nexmoApiNumber" className="block mb-1">
                                Nexmo API Number
                            </label>
                            <input name="nexmoApiNumber" type="text" id="nexmoApiNumber" placeholder="Enter Nexmo API Number" className="form-input w-full" />
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

export default ViewSMSConfigurations;
