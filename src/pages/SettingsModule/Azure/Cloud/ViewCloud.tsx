import React, { useState, ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'rsuite';

interface ViewEmailConfigurationsProps {
    details: {
        archiveName: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
    create?: string;
}

const ViewCloud = () => {
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
                        currentPath === '/SettingsModule/Azure/Cloud/ViewCloud' ? 'text-blue-600' : ''
                    }`}
                >
                    View Cloud
                </li>
            </ol>

            <div className="panel mt-6">
                <h1 className="text-2xl p-2 font-bold">View Cloud</h1>
                <form>
                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="emailGateway" className="block mb-1">
                                Email Gateway
                            </label>
                            <select id="emailGateway" name="emailGateway" className="form-select text-white-dark" required>
                                <option value="">Select</option>
                                <option value={'Gmail'}>Gmail</option>
                                <option value={'Outlook'}>Outlook</option>
                            </select>
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="smtpUsername" className="block mb-1">
                                SMTP Email User Name
                            </label>
                            <input name="smtpUsername" type="text" id="smtpUsername" placeholder="Enter SMTP Email User Name" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="smtpPassword" className="block mb-1">
                                SMTP Email Password
                            </label>
                            <input name="smtpPassword" type="password" id="smtpPassword" placeholder="Enter SMTP Email Password" className="form-input w-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="sendgridKey" className="block mb-1">
                                SendGrid Key
                            </label>
                            <input name="sendgridKey" type="text" id="sendgridKey" placeholder="Enter SendGrid Key" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="mailFromAddress" className="block mb-1">
                                Mail From Address
                            </label>
                            <input name="mailFromAddress" type="email" id="mailFromAddress" placeholder="Enter Mail From Address" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="appSupportNumber" className="block mb-1">
                                App Support Number
                            </label>
                            <input name="appSupportNumber" type="tel" id="appSupportNumber" placeholder="Enter App Support Number" className="form-input w-full" />
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

export default ViewCloud;
