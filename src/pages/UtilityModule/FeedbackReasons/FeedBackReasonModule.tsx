import React, { useState, ChangeEvent } from 'react';
//import { createAdminTicketsData } from '@/services/AdminTicketsService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface FeedBackReasonModuleProp {
    details: {
        id: string;
        feedbackReason: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
}

const FeedBackReasonModule: React.FC<FeedBackReasonModuleProp> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const [moduleDetails, setModuleDetails] = useState(details);
    const [value, setValue] = useState('');
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setModuleDetails({ ...moduleDetails, [name]: value });
        onInputChange(event); // Pass the event to the parent component
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="countryName" className="block mb-1">
                        Reason Name
                    </label>
                    <input
                        name="countryName"
                        type="text"
                        id="countryName"
                        placeholder="Enter Country Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.countryName}
                        value={'Reason'}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="lg:w-1/3"></div>
            </div>

            <div className="mt-6 mb-12">
                <label htmlFor="planDescription" className="block mb-1 text-md font-bold">
                    Remarks
                </label>
                {viewSpecific ? (
                    <div className=" w-1/2 border rounded-md text-start h-28 pointer-events-none">
                        <p className="m-2 ">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quaerat dolorem corporis numquam dolorum repellat dignissimos consectetur perspiciatis in, aliquam tenetur
                            cupiditate veniam aliquid impedit odit repudiandae asperiores nam soluta
                        </p>
                    </div>
                ) : (
                    <ReactQuill theme="snow" value={value} onChange={setValue} className={`h-24 w-1/2 ${viewSpecific ? 'pointer-events-none' : ''}`} />
                )}
            </div>
        </>
    );
};

export default FeedBackReasonModule;
