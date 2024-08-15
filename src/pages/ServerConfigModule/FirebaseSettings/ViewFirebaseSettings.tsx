import React, { useState, ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'rsuite';

interface ViewFirebaseSettingsProps {
    details: {
        archiveName: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
    create?: string;
}

const ViewFirebaseSettings = () => {
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
                        currentPath === '/ServerConfigModule/FirebaseSettings/ViewFirebaseSettings' ? 'text-blue-600' : ''
                    }`}
                >
                    Firebase Settings
                </li>
            </ol>

            <div className="panel mt-6">
                <h1 className="text-2xl p-2 font-bold">Firebase Settings</h1>
                <form>
                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="projectId" className="block mb-1">
                                Project ID
                            </label>
                            <input name="projectId" type="text" id="projectId" placeholder="Enter Project ID" className="form-input w-full" />
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="defaultAppName" className="block mb-1">
                                Default App Name
                            </label>
                            <input name="defaultAppName" type="text" id="defaultAppName" placeholder="Enter Default App Name" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="authDomain" className="block mb-1">
                                Auth Domain
                            </label>
                            <input name="authDomain" type="text" id="authDomain" placeholder="Enter Auth Domain" className="form-input w-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="databaseURL" className="block mb-1">
                                Database URL
                            </label>
                            <input name="databaseURL" type="text" id="databaseURL" placeholder="Enter Database URL" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="storageBucket" className="block mb-1">
                                Storage Bucket
                            </label>
                            <input name="storageBucket" type="text" id="storageBucket" placeholder="Enter Storage Bucket" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="fcmServer" className="block mb-1">
                                FCM Server
                            </label>
                            <input name="fcmServer" type="text" id="fcmServer" placeholder="Enter FCM Server" className="form-input w-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="googleApiKey" className="block mb-1">
                                Google API KEY
                            </label>
                            <input name="googleApiKey" type="text" id="googleApiKey" placeholder="Enter Google API KEY" className="form-input w-full" />
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

export default ViewFirebaseSettings;
