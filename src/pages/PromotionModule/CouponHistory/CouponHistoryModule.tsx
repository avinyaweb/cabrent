import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import IconEdit from '@/components/Icon/IconEdit';
import { useNavigate } from 'react-router-dom';

interface CouponHistoryProps {
    details: {
        id: string;
        couponId: string;
        driverId: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific?: boolean;
}

const CouponHistoryModule: React.FC<CouponHistoryProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
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
                            onClick={() => navigate('/PromotionModule/CouponMaster/EditCouponMaster/1')}
                        >
                            <h3>Edit</h3>
                            <IconEdit />
                        </div>
                    </div>
                </>
            )}
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="couponId" className="block mb-1 pointer-events-none">
                        Coupon
                    </label>
                    {viewSpecific ? (
                        <input
                            name="couponId"
                            type="text"
                            id="couponId"
                            placeholder="Enter Coupon ID"
                            className="form-input w-full pointer-events-none"
                            value={details.couponId}
                            onChange={onInputChange}
                        />
                    ) : (
                        <input
                            name="couponId"
                            type="text"
                            id="couponId"
                            placeholder="Enter Coupon ID"
                            className="form-input w-full pointer-events-none"
                            value={details.couponId}
                            onChange={onInputChange}
                        />
                    )}
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="driverId" className="block mb-1 pointer-events-none">
                        Driver
                    </label>
                    {viewSpecific ? (
                        <input
                            name="driverId"
                            type="text"
                            id="driverId"
                            placeholder="Enter Driver ID"
                            className="form-input w-full pointer-events-none"
                            value={details.driverId}
                            onChange={onInputChange}
                        />
                    ) : (
                        <input
                            name="driverId"
                            type="text"
                            id="driverId"
                            placeholder="Enter Driver ID"
                            className="form-input w-full pointer-events-none"
                            value={details.driverId}
                            onChange={onInputChange}
                        />
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

                {showStatus ? ( // Conditionally rendering based on the showStatus prop
                    <div className="lg:w-1/3">
                        <label htmlFor="archive" className="block mb-1">
                            Status
                        </label>
                        <input name="archive" type="text" id="archive" placeholder="Enter Status" className="form-input w-full pointer-events-none" value="TRUE" onChange={onInputChange} />
                    </div>
                ) : (
                    <div className="lg:w-1/3" /> //Empty div when showStatus is false
                )}
            </div>
        </>
    );
};

export default CouponHistoryModule;
