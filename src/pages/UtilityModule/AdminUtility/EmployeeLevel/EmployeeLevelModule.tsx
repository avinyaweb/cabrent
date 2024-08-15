import React, { useState, ChangeEvent } from 'react';

interface EmployeeLevelModuleProps {
    details: {
        id: string;
        employeeLevelName: string;
        archive: string;
    };
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
}

const EmployeeLevelModule: React.FC<EmployeeLevelModuleProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const [moduleDetails, setModuleDetails] = useState(details);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setModuleDetails({ ...moduleDetails, [event.target.name]: event.target.value });
        onInputChange(event);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="employeeLevelName" className="block mb-1">
                        Employee Level Name
                    </label>
                    <input
                        name="employeeLevelName"
                        type="text"
                        id="employeeLevelName"
                        // placeholder="Enter Employee Level Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        // value={details?.employeeLevelName}
                        // value={'Sandheep'}
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
                <div className="lg:w-1/3"></div>
            </div>
        </>
    );
};

export default EmployeeLevelModule;
