import React, { useState, ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'rsuite';
import RentailsTnCModule from './RentailsTnCModule';

interface createRentailsTnCProps {
    details: {
        archiveName: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
    create?: string;
}

const CreateRentailsTnC: React.FC<createRentailsTnCProps> = () => {
    const data = '';
    const [quileContent, setQuileContent] = useState('');
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    const handleRemarksChange = (content: string) => {
        setQuileContent(content);
    };

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
                        currentPath === '/viewOutstationsTnc/viewOutstationsTnc' ? 'text-blue-600' : ''
                    }`}
                >
                    view Outstations Tnc
                </li>
            </ol>
            <div className="panel mt-6 ">
                <div className="flex items-center relative py-4">
                    <h1 className="text-2xl p-2 font-bold">Create Rentails TnC</h1>
                </div>
                <form>
                    <RentailsTnCModule
                        details={{ archiveName: 'SomeName', archive: 'SomeArchive' }} // Provide appropriate values
                        onInputChange={(e) => {}} // Provide appropriate handler
                        data={data} // Provide data here
                    />

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

export default CreateRentailsTnC;
