import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import ReactQuill from 'react-quill';
import IconEdit from '@/components/Icon/IconEdit';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';

interface CouponMasterProps {
    details: {
        id: string;
        couponCode: string;
        couponName: string;
        couponDesc: string;
        usage: string;
        amount: string;
        benefit: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific?: boolean;
    tabs?: boolean;
}

const CouponMasterModule: React.FC<CouponMasterProps> = ({ details, onInputChange, showStatus = true, viewSpecific, tabs }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [value, setValue] = useState('');
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
                            onClick={() => navigate('/PromotionModule/CouponHistory/EditCouponHistory/1')}
                        >
                            <h3>Edit</h3>
                            <IconEdit />
                        </div>
                    </div>
                </>
            )}
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="couponCode" className="block mb-1 pointer-events-none">
                        Coupon Code
                    </label>
                    {viewSpecific ? (
                        <input
                            name="couponCode"
                            type="text"
                            id="couponCode"
                            placeholder="Enter Coupon Code"
                            className="form-input w-full pointer-events-none"
                            value={details.couponCode}
                            onChange={onInputChange}
                        />
                    ) : (
                        <input name="couponCode" type="text" id="couponCode" placeholder="Enter Coupon Code" className="form-input w-full" value={details.couponCode} onChange={onInputChange} />
                    )}
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="couponName" className="block mb-1 pointer-events-none">
                        Coupon Name
                    </label>
                    {viewSpecific ? (
                        <input
                            name="couponName"
                            type="text"
                            id="couponName"
                            placeholder="Enter Coupon Name"
                            className="form-input w-full pointer-events-none"
                            value={details.couponName}
                            onChange={onInputChange}
                        />
                    ) : (
                        <input name="couponName" type="text" id="couponName" placeholder="Enter Coupon Name" className="form-input w-full" value={details.couponName} onChange={onInputChange} />
                    )}
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="benefit" className="block mb-1 pointer-events-none">
                        Benefit
                    </label>
                    {viewSpecific ? (
                        <input name="benefit" type="text" id="benefit" placeholder="Enter Benefit" className="form-input w-full pointer-events-none" value={details.benefit} onChange={onInputChange} />
                    ) : (
                        <input name="benefit" type="text" id="benefit" placeholder="Enter Benefit" className="form-input w-full" value={details.benefit} onChange={onInputChange} />
                    )}
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="usage" className="block mb-1 pointer-events-none">
                        Usage
                    </label>
                    {viewSpecific ? (
                        <input name="usage" type="text" id="usage" placeholder="Enter Usage" className="form-input w-full pointer-events-none" value={details.usage} onChange={onInputChange} />
                    ) : (
                        <input name="usage" type="text" id="usage" placeholder="Enter Usage" className="form-input w-full" value={details.usage} onChange={onInputChange} />
                    )}
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="amount" className="block mb-1 pointer-events-none">
                        Amount
                    </label>
                    {viewSpecific ? (
                        <input name="amount" type="number" id="amount" placeholder="Enter Amount" className="form-input w-full pointer-events-none" value={details.amount} onChange={onInputChange} />
                    ) : (
                        <input name="amount" type="number" id="amount" placeholder="Enter Amount" className="form-input w-full" value={details.amount} onChange={onInputChange} />
                    )}
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="archive" className="block mb-1 ">
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

            <div className={`lg:w-1/3 mt-4  ${viewSpecific ? 'pointer-events-none' : ''}`}>
                <label htmlFor="remarks" className="block mb-1">
                    Coupon Discription
                </label>
                {viewSpecific ? (
                    <input name="archive" placeholder="" type="text" id="remarks" className="form-input w-full pointer-events-none h-24" value="hai everyone its me " readOnly />
                ) : (
                    <ReactQuill theme="snow" value={value} onChange={setValue} className="h-24 " />
                )}
            </div>
        </>
    );
};

export default CouponMasterModule;
