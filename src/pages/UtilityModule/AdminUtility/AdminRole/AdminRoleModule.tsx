import React, { useState, ChangeEvent } from 'react';

interface AdminRoleModuleProps {
    details: {
        roleKey: string;
        adminRoleName: string;
        adminRoleLevel: string;
        archive: string;
    };
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
}

const AdminRoleModule: React.FC<AdminRoleModuleProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const [moduleDetails, setModuleDetails] = useState(details);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setModuleDetails({ ...moduleDetails, [event.target.name]: event.target.value });
        onInputChange(event);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="roleKey" className="block mb-1">
                        Role Key
                    </label>
                    <input
                        name="roleKey"
                        type="text"
                        id="roleKey"
                        placeholder=""
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        onChange={handleInputChange}
                        readOnly={viewSpecific}
                        // value={details?.roleKey}
                        value={`${viewSpecific ? '' : ``}`}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="adminRoleName" className="block mb-1">
                        Admin Role Name
                    </label>
                    <input
                        name="adminRoleName"
                        type="text"
                        id="adminRoleName"
                        // placeholder="Enter Admin Role Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        onChange={handleInputChange}
                        readOnly={viewSpecific}
                        value={details?.adminRoleName}
                    />
                </div>

                <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <label htmlFor="adminRoleLevel" className="block mb-1">
                        Admin Role Level
                    </label>
                    {viewSpecific ? (
                        <input
                            name="adminRoleLevel"
                            type="text"
                            id="adminRoleLevel"
                            // placeholder="Enter Admin Role Level"
                            value={details?.adminRoleLevel}
                            className={`form-input w-full pointer-events-none`}
                            onChange={handleInputChange}
                            readOnly={viewSpecific}
                        />
                    ) : (
                        <select id="adminRoleLevel" className="form-select text-white-dark" required>
                            <option value="">Select your level</option>
                            <option value={'PENDING'}>L1</option>
                            <option value={'APPROVED'}>L2</option>
                            <option value={'REJECTED'}>L3</option>
                            <option value={'HOLD'}>L4</option>
                            <option value={'HOLD'}>M1</option>
                            <option value={'HOLD'}>M2</option>
                        </select>
                    )}
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
        </>
    );
};

export default AdminRoleModule;
