import StatusButtons from '@/components/StatusButtons';
import React, { ChangeEvent } from 'react';

interface RolesModuleProps {
    details: {
        roleName: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific: boolean;
}

const RolesModule: React.FC<RolesModuleProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    return (
        <div className="grid grid-cols-1 sm:flex justify-between gap-5">
            <div className="lg:w-1/2">
                <label htmlFor="roleName" className="block mb-1">
                    Role Name
                </label>
                <input
                    name="roleName"
                    type="text"
                    id="roleName"
                    placeholder={`${!viewSpecific ? 'Enter Role name' : ''}`}
                    className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                    readOnly={viewSpecific}
                    //  value={details.roleName}
                    value="Channel partner"
                    onChange={onInputChange}
                />
            </div>
            <StatusButtons title="Role Status" />
            {/* {showStatus && (
                <div className="lg:w-1/2">
                    <label htmlFor="roleName" className="block mb-1">
                        Roles Status
                    </label>
                    {viewSpecific ? (
                        <input name="status" type="text" id="status" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} readOnly={viewSpecific} value={'ACTIVE'} />
                    ) : (
                        <select id="status" className="form-select text-white-dark" required>
                            <option value="">Select your Status</option>
                            <option value={'PENDING'}>PENDING</option>
                            <option value={'APPROVED'}>APPROVED</option>
                            <option value={'REJECTED'}>REJECTED</option>
                            <option value={'HOLD'}>HOLD</option>
                            <option value={'SUSPENDED'}>SUSPENDED</option>
                        </select>
                    )}
                </div>
            )} */}
        </div>
    );
};

export default RolesModule;
