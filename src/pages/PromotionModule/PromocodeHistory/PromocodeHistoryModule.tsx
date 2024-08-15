import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import IconEdit from '@/components/Icon/IconEdit';

interface PromocodeHistoryProps {
    details: {
        id: string;
        promocodeId: string;
        driverId: string;
        promocodeStatus: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific?: boolean;
}

const PromocodeHistoryModule: React.FC<PromocodeHistoryProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
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
                            onClick={() => navigate('/PromotionModule/PromocodeHistory/EditPromocodeHistory/1')}
                        >
                            <h3>Edit</h3>
                            <IconEdit />
                        </div>
                    </div>
                </>
            )}
            {/* <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="channelPartnerType" className="block mb-1 font-bold text-md">
                            Channel Partner
                        </label>
                        {viewSpecific && (
                            <Link to={'/AdminModule/ChannelPartner/ViewSpecificChannelPartner/659cd6574c25d43e62c6dd9f'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div> */}
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3 pointer-events-none">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="promocodeId" className="block mb-1">
                            Promocode
                        </label>
                        {viewSpecific && (
                            <Link to={'/PromotionModule/PromocodeMaster/ViewSpecificPromocodeMaster/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>

                    <input
                        name="promocodeId"
                        type="text"
                        id="promocodeId"
                        placeholder="Enter Promocode ID"
                        className="form-input w-full pointer-events-none"
                        value={details.promocodeId}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="driverId" className="block mb-1">
                        Driver
                    </label>
                    <input
                        name="driverId"
                        type="text"
                        id="driverId"
                        placeholder="Enter Driver ID"
                        className="form-input w-full pointer-events-none"
                        value={details.driverId}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3 pointer-events-none">
                    <label htmlFor="promocodeStatus" className="block mb-1">
                        Promocode Status
                    </label>
                    <input
                        name="promocodeStatus"
                        type="text"
                        id="promocodeStatus"
                        placeholder="Enter Promocode Status"
                        className="form-input w-full pointer-events-none"
                        value={details.promocodeStatus}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                {/* {showStatus ? ( // Conditionally rendering based on the showStatus prop
                    <div className="lg:w-1/3">
                        <label htmlFor="archive" className="block mb-1">
                            Status
                        </label>
                        <input name="archive" type="text" id="archive" placeholder="Enter Status" className="form-input w-full" value={details.archive} onChange={onInputChange} />
                    </div>
                ) : (
                    <div className="lg:w-1/3" /> //Empty div when showStatus is false
                )} */}

                <div className="lg:w-1/3">
                    <label htmlFor="archive" className="block mb-1">
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

                <div className="lg:w-1/3" />
                <div className="lg:w-1/3" />
            </div>
        </>
    );
};

export default PromocodeHistoryModule;
