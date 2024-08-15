import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { DataTableColumn } from 'mantine-datatable';
import CommonPopUp from '@/components/Models/CommonPopUp';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import IconEdit from '@/components/Icon/IconEdit';

interface BonusHistoryProps {
    details: {
        id: string;
        bonusId: string;
        userId: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific?: boolean;
}

const BonusHistoryModule: React.FC<BonusHistoryProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

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
    const navigate = useNavigate();
    return (
        <>
            {viewSpecific && (
                <>
                    <div className="flex items-center justify-end gap-5 flex-grow mb-3">
                        {/* Edit */}
                        <div
                            className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                            onClick={() => navigate('/PromotionModule/BonusMaster/EditBonusMaster/1')}
                        >
                            <h3>Edit</h3>
                            <IconEdit />
                        </div>
                    </div>
                </>
            )}

            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="bonusId" className="block mb-1 pointer-events-none">
                            Bonus
                        </label>
                        {viewSpecific && (
                            <Link to={'/PromotionModule/BonusMaster/ViewSpecificBonusMaster/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    {viewSpecific ? (
                        <input
                            name="bonusId"
                            type="text"
                            id="bonusId"
                            placeholder="Enter Bonus ID"
                            className="form-input w-full pointer-events-none"
                            value={details.bonusId}
                            // onChange={onInputChange}
                        />
                    ) : (
                        <input
                            name="bonusId"
                            type="text"
                            id="bonusId"
                            placeholder="Enter Bonus ID"
                            className="form-input w-full pointer-events-none"
                            value={details.bonusId}
                            onChange={onInputChange}
                        />
                    )}
                </div>

                <div className="lg:w-1/3">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="userId" className="block mb-1 pointer-events-none">
                            User
                        </label>
                        {viewSpecific && (
                            <Link to={'/BusinessModule/ServiceProvider/ViewSpecificServiceProvider/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    {viewSpecific ? (
                        <input name="userId" type="text" id="userId" placeholder="Enter User ID" className="form-input w-full pointer-events-none" value={details.userId} onChange={onInputChange} />
                    ) : (
                        <input name="userId" type="text" id="userId" placeholder="Enter User ID" className="form-input w-full pointer-events-none" value={details.userId} onChange={onInputChange} />
                    )}
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="archive" className="block mb-1 pointer-events-none">
                        Update Profile Status
                    </label>
                    {viewSpecific ? (
                        <input name="archive" placeholder="Archive" type="text" id="archive" className="form-input w-full pointer-events-none" value={details?.archive} readOnly />
                    ) : (
                        <select
                            id="archive"
                            name="archive"
                            className="form-select text-white-dark"
                            required
                            value={details.archive} // Update this line
                            onChange={onInputChange}
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

export default BonusHistoryModule;
