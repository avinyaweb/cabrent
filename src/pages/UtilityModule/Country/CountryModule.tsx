import React, { useState, ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface CountryModuleProps {
    details: {
        countryName: string;
        currencyName: string;
        countryCode: string;
        currencyCode: string;
        phoneCode: string;
        archive: string;
    };
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
}

const CountryModule: React.FC<CountryModuleProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const [moduleDetails, setModuleDetails] = useState(details);
    const [value, setValue] = useState('');
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setModuleDetails({ ...moduleDetails, [name]: value });
        onInputChange(event); // Pass the event to the parent component
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="countryName" className="block mb-1">
                        Country Name
                    </label>
                    <input
                        name="countryName"
                        type="text"
                        id="countryName"
                        placeholder="Enter Country Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.countryName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="currencyName" className="block mb-1">
                        Currency Name
                    </label>
                    <input
                        name="currencyName"
                        type="text"
                        id="currencyName"
                        placeholder="Enter Currency Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.currencyName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="phoneCode" className="block mb-1">
                        Phone Code
                    </label>
                    <input
                        name="phoneCode"
                        type="text"
                        id="phoneCode"
                        placeholder="Enter Phone Code"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.phoneCode}
                        value={`${viewSpecific ? `123456798` : ``}`}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-4">
                <div className="lg:w-1/3">
                    <label htmlFor="countryCode" className="block mb-1">
                        Country Code
                    </label>
                    <input
                        name="countryCode"
                        type="text"
                        id="countryCode"
                        placeholder="Enter Country Code"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.countryCode}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="currencyCode" className="block mb-1">
                        Currency Code
                    </label>
                    <input
                        name="currencyCode"
                        type="text"
                        id="currencyCode"
                        placeholder="Enter Currency Code"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.currencyCode}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="archive" className="block mb-1">
                        Archive
                    </label>
                    {viewSpecific ? (
                        <input name="archive" placeholder="Archive" type="text" id="archive" className="form-input w-full pointer-events-none" value={details?.archive} readOnly />
                    ) : (
                        <select
                            id="archive"
                            name="archive"
                            className="form-select text-white-dark"
                            required
                            value={details?.archive} // Update this line
                            onChange={handleInputChange}
                        >
                            <option value="">Select Archive</option>
                            <option value={'PENDING'}>Pending</option>
                            <option value={'APPROVED'}>Approved</option>
                            <option value={'REJECTED'}>Rejected</option>
                            <option value={'HOLD'}>Hold</option>
                            <option value={'SUSPENDED'}>Suspended</option>
                        </select>
                    )}
                </div>
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

export default CountryModule;
