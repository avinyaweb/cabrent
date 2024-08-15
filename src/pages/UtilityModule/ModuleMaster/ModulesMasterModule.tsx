import React, { useState, ChangeEvent } from 'react';

interface ModuleMasterModuleProps {
    details: {
        moduleName: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
}

const ModuleMasterModule: React.FC<ModuleMasterModuleProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const [moduleDetails, setModuleDetails] = useState(details);

    console.log(details, 'deatils');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setModuleDetails({ ...moduleDetails, [name]: value });
        onInputChange(event); // Pass the event to the parent component
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="moduleName" className="block mb-1">
                        Module Name
                    </label>
                    <input
                        name="moduleName"
                        type="text"
                        id="moduleName"
                        placeholder="Enter Module Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        value={details.moduleName}
                        readOnly={viewSpecific}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="archive" className="block mb-1">
                        Archive
                    </label>
                    {viewSpecific ? (
                        <input name="archive" placeholder="Archive" type="text" id="archive" className="form-input w-full pointer-events-none" value={details.archive} readOnly />
                    ) : (
                        <select
                            id="archive"
                            name="archive"
                            className="form-select text-white-dark"
                            required
                            value={details.archive} // Update this line
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

                <div className="lg:w-1/3"></div>
            </div>
        </>
    );
};

export default ModuleMasterModule;
