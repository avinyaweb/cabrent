import React, { useState, ChangeEvent } from 'react';
//import { createAdminTicketsData } from '@/services/AdminTicketsService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface CancellationModuleProp {
    details: {
        id: string;
        appResLanCode: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
}

const CancellationModule: React.FC<CancellationModuleProp> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const [moduleDetails, setModuleDetails] = useState(details);
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setModuleDetails({ ...moduleDetails, [name]: value });
        onInputChange(event); // Pass the event to the parent component
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="archive" className="block mb-1">
                        Select Language
                    </label>
                    {viewSpecific ? (
                        <input name="archive" placeholder="Archive" type="text" id="archive" className="form-input w-full pointer-events-none" value={details?.archive} readOnly />
                    ) : (
                        <select
                            id="archive"
                            name="archive"
                            className="form-select text-white-dark"
                            required
                            // value={details?.archive}  // Update this line
                            // onChange={handleInputChange}
                        >
                            <option value="">Select Language</option>
                            <option value={'PENDING'}>Lan2</option>
                            <option value={'APPROVED'}>Lan1</option>
                            <option value={'REJECTED'}>Lan3</option>
                        </select>
                    )}
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="countryName" className="block mb-1">
                        Driver Reason Name
                    </label>
                    <input
                        name="countryName"
                        type="text"
                        id="countryName"
                        placeholder="Enter Driver Reason Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.countryName}
                        value={'Somthing'}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="countryName" className="block mb-1">
                        Rider Reason Name
                    </label>
                    <input
                        name="countryName"
                        type="text"
                        id="countryName"
                        placeholder="Enter  Rider Reason Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.countryName}
                        value={'Driver Issue'}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 ">
                <div className="lg:w-1/2">
                    <label htmlFor="description" className="block mb-1 text-md font-bold">
                        Driver Cancellation Reason(Seperate Reason by comma)
                    </label>
                    {viewSpecific ? (
                        <div className=" w-full border rounded-md text-start h-28 pointer-events-none">
                            <p className="m-2 ">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quaerat dolorem corporis numquam dolorum repellat dignissimos consectetur perspiciatis in, aliquam tenetur
                                cupiditate veniam aliquid impedit odit repudiandae asperiores nam soluta
                            </p>
                        </div>
                    ) : (
                        <ReactQuill theme="snow" value={value} onChange={setValue} className={`h-24 w-full`} />
                    )}
                </div>
                <div className="lg:w-1/2 ">
                    <label htmlFor="remarks" className="block mb-1 text-md font-bold">
                        Rider Cancellation Reason(Seperate Reason by comma)
                    </label>
                    {viewSpecific ? (
                        <div className=" w-full border rounded-md text-start h-28 pointer-events-none">
                            <p className="m-2 ">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quaerat dolorem corporis numquam dolorum repellat dignissimos consectetur perspiciatis in, aliquam tenetur
                                cupiditate veniam aliquid impedit odit repudiandae asperiores nam soluta
                            </p>
                        </div>
                    ) : (
                        <ReactQuill theme="snow" value={value2} onChange={setValue2} className={`h-24 w-full`} />
                    )}
                </div>
            </div>
        </>
    );
};

export default CancellationModule;
