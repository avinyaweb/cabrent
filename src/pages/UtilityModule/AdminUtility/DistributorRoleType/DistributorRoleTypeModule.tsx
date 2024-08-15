import React, { useState, ChangeEvent } from 'react';

interface DistributorRoleTypeModuleProps {
    details: {
        id: string;
        distributorTypeName: string;
        distributorLevel: string;
        archive: string;
    };
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
}

const DistributorRoleTypeModule: React.FC<DistributorRoleTypeModuleProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const [moduleDetails, setModuleDetails] = useState(details);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setModuleDetails({ ...moduleDetails, [name]: value });
        onInputChange(event); // Pass the event to the parent component
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="distributorTypeName" className="block mb-1">
                        Distributor Type Name
                    </label>
                    <input
                        name="distributorTypeName"
                        type="text"
                        id="distributorTypeName"
                        // placeholder="Enter Channel Partner Type Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        value={details?.distributorTypeName}
                        onChange={handleInputChange}
                        readOnly={viewSpecific}
                    />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="distributorLevel" className="block mb-1">
                        Distributor Level
                    </label>
                    <input
                        name="distributorLevel"
                        type="text"
                        id="distributorLevel"
                        // placeholder="Enter Channel Partner Level"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        value={details?.distributorLevel}
                        onChange={handleInputChange}
                        readOnly={viewSpecific}
                    />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="archive" className="block mb-1">
                        Archive
                    </label>
                    {viewSpecific ? (
                        <input name="archive" type="text" id="archive" className="form-input w-full pointer-events-none" value={details?.archive} readOnly />
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
        </>
    );
};

export default DistributorRoleTypeModule;
