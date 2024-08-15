import React, { useState, ChangeEvent } from 'react';
//import { createAdminTicketsData } from '@/services/AdminTicketsService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface OfficeDetailsModuleProp {
    details: {
        id: string;
        Actions: string;
        line_1: string;
        line_2: string;
        landmark: string;
        state: string;
        city: string;
        zip: string;
        Mail: string;
        Phone: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
}

const OfficeDetailsModule: React.FC<OfficeDetailsModuleProp> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const [moduleDetails, setModuleDetails] = useState(details);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setModuleDetails({ ...moduleDetails, [name]: value });
        onInputChange(event); // Pass the event to the parent component
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/2">
                    <label htmlFor="mail" className="block mb-1">
                        Email
                    </label>
                    <input
                        name="mail"
                        type="text"
                        id="mail"
                        placeholder={`${viewSpecific ? `` : `Enter Mail`}`}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.Mail}
                        value={`${viewSpecific ? `sample@gmail.com` : ``}`}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="lg:w-1/2">
                    <label htmlFor="phone" className="block mb-1">
                        Phone
                    </label>
                    <input
                        name="phone"
                        type="number"
                        id="phone"
                        placeholder={`${viewSpecific ? `` : `Enter Phone`}`}
                        value={`${viewSpecific ? `9876543210` : ``}`}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.Phone}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <h1 className="text-2xl font-bold mt-5">Address</h1>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/2 mt-3">
                    <label htmlFor="line_1" className="block mb-1">
                        Line 1:
                    </label>
                    <input
                        name="line_1"
                        type="text"
                        id="phone"
                        placeholder={`${viewSpecific ? `` : `Enter line 1`}`}
                        value={`${viewSpecific ? `JP Nagar` : ``}`}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.line_1}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="lg:w-1/2"></div>
            </div>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/2 mt-3">
                    <label htmlFor="line_2" className="block mb-1">
                        Line 2:
                    </label>
                    <input
                        name="line_2"
                        type="text"
                        id="line_2"
                        placeholder={`${viewSpecific ? `` : `Enter line 2`}`}
                        value={`${viewSpecific ? `3rd Cross` : ``}`}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.line_2}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="lg:w-1/2"></div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/4 mt-3">
                    <label htmlFor="landmark" className="block mb-1">
                        Landmark:
                    </label>
                    <input
                        name="landmark"
                        type="text"
                        id="landmark"
                        placeholder={`${viewSpecific ? `` : `Enter line 2`}`}
                        value={`${viewSpecific ? `Metro station` : ``}`}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.landmark}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="lg:w-1/4 mt-3">
                    <label htmlFor="state" className="block mb-1">
                        State:
                    </label>
                    <input
                        name="state"
                        type="text"
                        id="state"
                        placeholder={`${viewSpecific ? `` : `Enter state`}`}
                        value={`${viewSpecific ? `Karnataka` : ``}`}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.state}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="lg:w-1/4 mt-3"></div>
                <div className="lg:w-1/4 mt-3"></div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/4 mt-3">
                    <label htmlFor="city" className="block mb-1">
                        City:
                    </label>
                    <input
                        name="city"
                        type="text"
                        id="city"
                        placeholder={`${viewSpecific ? `` : `Enter city`}`}
                        value={`${viewSpecific ? `Bangalore` : ``}`}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.city}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="lg:w-1/4 mt-3">
                    <label htmlFor="zip" className="block mb-1">
                        Zip:
                    </label>
                    <input
                        name="zip"
                        type="number"
                        id="zip"
                        placeholder={`${viewSpecific ? `` : `Enter zip code`}`}
                        value={`${viewSpecific ? `987654` : ``}`}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.zip}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="lg:w-1/4 mt-3"></div>
                <div className="lg:w-1/4 mt-3"></div>
            </div>
        </>
    );
};

export default OfficeDetailsModule;
