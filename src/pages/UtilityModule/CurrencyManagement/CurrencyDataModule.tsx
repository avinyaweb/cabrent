import React, { useState, ChangeEvent } from 'react';

interface CurrencyDataModuleProp {
    details: {
        id: string;
        PrimaryCurrencyName: string;
        SecCurrencyExists: string;
        SecondaryCurrencyName: string;
        SecondaryCurrencySymbol: string;
        CurrencyConversionMultipleRate: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
}

const CurrencyDataModule: React.FC<CurrencyDataModuleProp> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const [moduleDetails, setModuleDetails] = useState(details);

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
                        Primary Currency Name
                    </label>
                    <input
                        name="countryName"
                        type="text"
                        id="countryName"
                        placeholder="Enter Country Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.countryName}
                        value={'INR'}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="archive" className="block mb-1">
                        Secondary Currency Exists
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
                            <option value="">Select Archive</option>
                            <option value={'PENDING'}>Yes</option>
                            <option value={'APPROVED'}>No</option>
                        </select>
                    )}
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="countryName" className="block mb-1">
                        Secondary Currency Name
                    </label>
                    <input
                        name="countryName"
                        type="text"
                        id="countryName"
                        placeholder="Enter Country Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details?.countryName}
                        value={`${viewSpecific ? `Dollar` : ``}`}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-3">
                <div className="lg:w-1/3">
                    <label htmlFor="countryName" className="block mb-1">
                        Secondary Currency Symbol
                    </label>
                    <input
                        name="countryName"
                        type="text"
                        id="countryName"
                        placeholder="Enter Country Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={`${viewSpecific ? `Dollar` : ``}`}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="countryName" className="block mb-1">
                        Currency Conversion Multiple Rate
                    </label>
                    <input
                        name="countryName"
                        type="text"
                        id="countryName"
                        placeholder="Enter Country Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={`${viewSpecific ? `$100.00` : ``}`}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="lg:w-1/3"></div>
            </div>
        </>
    );
};

export default CurrencyDataModule;
