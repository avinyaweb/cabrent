import React, { useState, ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useLocation } from 'react-router-dom';

interface viewRiderPrivacyProps {
    details: {
        archiveName: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
    create?: string;
}

const ViewRiderPrivacy = () => {
    const data =
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia voluptatibus ducimus, pariatur in eligendi incidunt quam eius rem natus magnam fugit adipisci laborum assumenda dolorem cupiditate nulla nisi dolorum dicta.';

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    const [quileContent, setQuileContent] = useState(data);

    const handleRemarksChange = (content: string) => {
        setQuileContent(content);
    };

    const handleCancle = () => {
        window.location.reload();
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
                        currentPath === '/APPCMSModule' ? 'text-blue-600' : ''
                    }`}
                >
                    APP CMS
                </li>
                <li
                    className={`before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                        currentPath === '/APPCMSModule/RiderPrivacy/ViewRiderPrivacy' ? 'text-blue-600' : ''
                    }`}
                >
                    Rider Privacy
                </li>
            </ol>
            <div className="panel mt-6 ">
                <form>
                    <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                        <div className="lg:w-full">
                            <ReactQuill key="remarks-editor-editable" value={quileContent} onChange={(content) => handleRemarksChange(content)} />
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4">
                            Update
                        </button>
                        <button type="button" className="btn btn-danger !mt-6" onClick={handleCancle}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ViewRiderPrivacy;
