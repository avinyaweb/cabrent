import React, { useState, ChangeEvent } from 'react';

interface PriorityModuleProps {
    details: {
        id: string;
        communityName: string;
        communityImg: string;
        serviceCity: string;
        link: string;
        status: string;
        approvedAt: string;
        approvedBy: string;
        createdAt: string;
        createdBy: string;
        updatedAt: string;
        updatedBy: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
    create?: string;
}

const CommunityModule: React.FC<PriorityModuleProps> = ({ details, onInputChange, showStatus = true, viewSpecific, create }) => {
    const [moduleDetails, setModuleDetails] = useState(details);

    // console.log(details,"modulesdetails")

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log('Input changed:', event.target.name, event.target.value);
        setModuleDetails({ ...moduleDetails, [event.target.name]: event.target.value });
        onInputChange(event);
    };

    return (
        <div className="grid grid-cols-1 sm:flex justify-between gap-5">
            <div className="lg:w-1/3">
                <label htmlFor="PriorityName" className="block mb-1">
                    Community Name
                </label>
                <input
                    name="PriorityName"
                    type="text"
                    id="PriorityName"
                    placeholder="Enter archive Name"
                    className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                    value={details?.communityName}
                    onChange={handleInputChange}
                    readOnly={viewSpecific}
                />
            </div>

            <div className="lg:w-1/3">
                <label htmlFor="PriorityName" className="block mb-1">
                    Community Link
                </label>
                <input
                    name="PriorityName"
                    type="text"
                    id="PriorityName"
                    placeholder="Enter archive Name"
                    className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                    value={details?.link}
                    onChange={handleInputChange}
                    readOnly={viewSpecific}
                />
            </div>

            <div className="lg:w-1/3">
                <label htmlFor="PriorityName" className="block mb-1">
                    Service City
                </label>
                <input
                    name="PriorityName"
                    type="text"
                    id="PriorityName"
                    placeholder="Enter archive Name"
                    className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                    value={details?.serviceCity}
                    onChange={handleInputChange}
                    readOnly={viewSpecific}
                />
            </div>

            <div className="lg:w-1/3">
                <label htmlFor="archive" className="block mb-1">
                    Status
                </label>
                {viewSpecific ? (
                    <input name="archive" placeholder="Archive" type="text" id="archive" className="form-input w-full pointer-events-none" value={details?.status} readOnly />
                ) : (
                    <select
                        id="archive"
                        name="archive"
                        className="form-select text-white-dark"
                        required
                        value={details?.status} // Update this line
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
    );
};

export default CommunityModule;
