import React, { useState, ChangeEvent } from 'react';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'rsuite';

interface RentailsTnCModuleProps {
    details: {
        archiveName: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
    create?: string;
    data?: string;
    isEdit?: boolean;
}

const RentailsTnCModule: React.FC<RentailsTnCModuleProps> = ({ details, onInputChange, showStatus, viewSpecific, create, data, isEdit }) => {
    const [quileContent, setQuileContent] = useState(data);
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    const handleRemarksChange = (content: string) => {
        setQuileContent(content);
    };

    return (
        <>
            {viewSpecific && (
                <div className="flex items-center relative py-4">
                    {viewSpecific && <h1 className="text-2xl p-2 font-bold">Rentails TnC</h1>}
                    <div className="flex items-center  gap-5">
                        <Link to={'/PagesModule/RentailsTnC/editRentailsTnC'}>
                            <button className="btn btn-primary text-sm px-3 py-1 w-16" type="button">
                                Edit
                            </button>
                        </Link>
                    </div>
                </div>
            )}
            <form>
                <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                    <div className="lg:w-full">
                        {viewSpecific ? (
                            <ReactQuill key="remarks-editor-editable" value={quileContent} onChange={(content) => handleRemarksChange(content)} readOnly className="pointer-events-none" />
                        ) : (
                            <ReactQuill key="remarks-editor-editable" value={quileContent} onChange={(content) => handleRemarksChange(content)} />
                        )}
                    </div>
                </div>
            </form>
        </>
    );
};

export default RentailsTnCModule;
