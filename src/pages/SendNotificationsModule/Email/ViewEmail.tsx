import React, { useState, ChangeEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'rsuite';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface viewEmailProps {
    details: {
        archiveName: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
    create?: string;
}

const ViewEmail = () => {
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
                        currentPath === '/SendNotificationsModule/Email/ViewEmail' ? 'text-blue-600' : ''
                    }`}
                >
                    Email Notification
                </li>
            </ol>

            <div className="panel mt-6 ">
                <h1 className="text-2xl p-2 font-bold">Email Notification</h1>
                <form>
                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/2">
                            <label htmlFor="archiveName" className="block mb-1">
                                Select Notification To
                            </label>
                            <select id="archive" name="archive" className="form-select text-white-dark" required>
                                <option value="">Select </option>
                                <option value={'PENDING'}>All Drivers</option>
                                <option value={'APPROVED'}>Online Drivers</option>
                                <option value={'APPROVED'}>Offline Drivers</option>
                                <option value={'REJECTED'}>Inactive Drivers</option>
                                <option value={'HOLD'}>All Riders</option>
                                <option value={'SUSPENDED'}>Inactive Riders</option>
                            </select>
                        </div>

                        <div className="lg:w-1/2">
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
                    </div>
                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/2">
                            <label htmlFor="archive" className="block mb-1">
                                Enter Message:
                            </label>
                            <ReactQuill key="remarks-editor-editable" value={quileContent} onChange={(content) => handleRemarksChange(content)} />
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4">
                            Submit
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

export default ViewEmail;
