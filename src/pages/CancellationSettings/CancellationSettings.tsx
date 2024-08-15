import React, { useState, ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'rsuite';

interface CancellationSettingsProps {
    details: {
        archiveName: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
    create?: string;
}

const CancellationSettings = () => {
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
                        currentPath === '/CancellationSettings/CancellationSettings' ? 'text-blue-600' : ''
                    }`}
                >
                    Cancellation Settings
                </li>
            </ol>

            <div className="panel mt-6 ">
                <h1 className="text-2xl p-2 font-bold">Cancellation Settings</h1>
                <form>
                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="archiveName" className="block mb-1">
                                Cancellation Exists
                            </label>
                            <select id="archive" name="archive" className="form-select text-white-dark" required>
                                <option value="">Select </option>
                                <option value={'PENDING'}>Yes</option>
                                <option value={'APPROVED'}>No</option>
                            </select>
                        </div>

                        <div className="lg:w-1/3">
                            <label htmlFor="archive" className="block mb-1">
                                No of Cancellation Allowed Per Driver
                            </label>
                            <input name="oldPassword" type="number" id="oldPassword" className="form-input w-full" />
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="archive" className="block mb-1">
                                No of Cancellation Allowed Per Rider
                            </label>
                            <input name="oldPassword" type="number" id="oldPassword" className="form-input w-full" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-1/3">
                            <label htmlFor="archiveName" className="block mb-1">
                                Charge User For Cancellation
                            </label>
                            <select id="archive" name="archive" className="form-select text-white-dark" required>
                                <option value="">Select </option>
                                <option value={'PENDING'}>Yes</option>
                                <option value={'APPROVED'}>No</option>
                            </select>
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="archive" className="block mb-1">
                                Block User If Cancelled Limit Exceeds
                            </label>
                            <select id="archive" name="archive" className="form-select text-white-dark" required>
                                <option value="">Select </option>
                                <option value={'PENDING'}>Yes</option>
                                <option value={'APPROVED'}>No</option>
                            </select>
                        </div>
                        <div className="lg:w-1/3">
                            <label htmlFor="archive" className="block mb-1">
                                Block Usr Upto this no of days If Can Limit Exd (In Days)
                            </label>
                            <input name="oldPassword" type="number" id="oldPassword" className="form-input w-full" />
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

export default CancellationSettings;
