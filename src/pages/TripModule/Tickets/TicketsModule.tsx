import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';

interface TicketsProps {
    details: {
        id: string;
        raisedBy: string;
        raisedAgainst: string;
        initiatedDate: string;
        status: string;
        remarks: string;
        category: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific?: boolean;
}

const TicketsModule: React.FC<TicketsProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // Add your dropdown options here
    const statusOptions = ['APPROVED', 'REJECETD', 'SUSPENDED', 'ONHOLD'];

    // Dynamic roles data fetching
    {
        /*
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getRoleData();
                const rolesData = response.data.roles;

                if (Array.isArray(rolesData)) {
                    // Extract role names from the fetched data and update roleOptions state
                    const roles = rolesData.map((fk_roleType: any) => ({
                        label: fk_roleType.roleName,
                        value: fk_roleType.roleId // Assuming roleId exists to uniquely identify the role
                    }));
                    setRoleOptions(roles);
                } else {
                    console.error('Invalid data format:', rolesData);
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        fetchRoles();
    }, []); 
    */
    }

    return (
        <>
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="raisedBy" className="block mb-1">
                        Raised By
                    </label>
                    <input
                        name="raisedBy"
                        type="text"
                        id="raisedBy"
                        placeholder="Enter Raised By"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.raisedBy}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="raisedAgainst" className="block mb-1">
                        Raised Against
                    </label>
                    <input
                        name="raisedAgainst"
                        type="text"
                        id="raisedAgainst"
                        placeholder="Enter Raised Against"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.raisedAgainst}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="initiatedDate" className="block mb-1">
                        Initiated Date
                    </label>
                    <input
                        name="initiatedDate"
                        type="text"
                        id="initiatedDate"
                        placeholder="Enter Initiated Date"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.initiatedDate}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="remarks" className="block mb-1">
                        Remarks
                    </label>
                    <input
                        name="remarks"
                        type="text"
                        id="remarks"
                        placeholder="Enter Remarks"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.remarks}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="category" className="block mb-1">
                        Category
                    </label>
                    <input
                        name="category"
                        type="text"
                        id="category"
                        placeholder="Enter Category"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.category}
                        onChange={onInputChange}
                    />
                </div>
                {showStatus ? (
                    <div className="lg:w-1/3">
                        <label htmlFor="archive" className="block mb-1">
                            Archive
                        </label>
                        {viewSpecific ? (
                            <input name="status" type="text" id="status" className={`form-input w-full pointer-events-none`} value={details.archive} onChange={onInputChange} />
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
                ) : (
                    <div className="lg:w-1/3" />
                )}
            </div>
        </>
    );
};

export default TicketsModule;
