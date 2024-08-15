import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';

interface BookingAmtDistributionProps {
    details: {
        id: string;
        actualTripCost: string;
        cgst: string;
        sgst: string;
        leadCharges1: string;
        leadCharges2: string;
        convinenceCharge: string;
        adminCharge: string;
        tax: string;
        techCharges: string;
        promotionDiscount: string;
        SPDiscount: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    isEditable?: boolean;
}

const BookingAmtDistributionModule: React.FC<BookingAmtDistributionProps> = ({ details, onInputChange, showStatus = true, isEditable = true }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // Add your dropdown options here
    const statusOptions = ['APPROVED', 'REJECETD', 'SUSPENDED', 'ONHOLD', 'PENDING'];

    // Dynamic roles data fetching
    // useEffect(() => {
    //     const fetchRoles = async () => {
    //         try {
    //             const response = await getRoleData();
    //             const rolesData = response.data.roles;
    //             if (Array.isArray(rolesData)) {
    //                 // Extract role names from the fetched data and update roleOptions state
    //                 const roles = rolesData.map((fk_roleType: any) => ({
    //                     label: fk_roleType.roleName,
    //                     value: fk_roleType.roleId // Assuming roleId exists to uniquely identify the role
    //                 }));
    //                 setRoleOptions(roles);
    //             } else {
    //                 console.error('Invalid data format:', rolesData);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching roles:', error);
    //         }
    //     };
    //     fetchRoles();
    // }, []);

    return (
        <>
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="actualTripCost" className="block mb-1">
                        Actual Trip Cost
                    </label>
                    <input
                        name="actualTripCost"
                        type="text"
                        id="actualTripCost"
                        placeholder="Enter Actual Trip Cost"
                        className="form-input w-full"
                        value={details.actualTripCost}
                        onChange={onInputChange}
                        disabled={!isEditable}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="cgst" className="block mb-1">
                        CGST
                    </label>
                    <input name="cgst" type="text" id="cgst" placeholder="Enter CGST" className="form-input w-full" value={details.cgst} onChange={onInputChange} disabled={!isEditable} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="sgst" className="block mb-1">
                        SGST
                    </label>
                    <input name="sgst" type="text" id="sgst" placeholder="Enter SGST" className="form-input w-full" value={details.sgst} onChange={onInputChange} disabled={!isEditable} />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="leadCharges1" className="block mb-1">
                        Lead Charges 1
                    </label>
                    <input
                        name="leadCharges1"
                        type="text"
                        id="leadCharges1"
                        placeholder="Enter Lead Charges 1"
                        className="form-input w-full"
                        value={details.leadCharges1}
                        onChange={onInputChange}
                        disabled={!isEditable}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="leadCharges2" className="block mb-1">
                        Lead Charges 2
                    </label>
                    <input
                        name="leadCharges2"
                        type="text"
                        id="leadCharges2"
                        placeholder="Enter Lead Charges 2"
                        className="form-input w-full"
                        value={details.leadCharges2}
                        onChange={onInputChange}
                        disabled={!isEditable}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="convinenceCharge" className="block mb-1">
                        Convenience Charge
                    </label>
                    <input
                        name="convinenceCharge"
                        type="text"
                        id="convinenceCharge"
                        placeholder="Enter Convenience Charge"
                        className="form-input w-full"
                        value={details.convinenceCharge}
                        onChange={onInputChange}
                        disabled={!isEditable}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="adminCharge" className="block mb-1">
                        Admin Charge
                    </label>
                    <input
                        name="adminCharge"
                        type="text"
                        id="adminCharge"
                        placeholder="Enter Admin Charge"
                        className="form-input w-full"
                        value={details.adminCharge}
                        onChange={onInputChange}
                        disabled={!isEditable}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="tax" className="block mb-1">
                        Tax
                    </label>
                    <input name="tax" type="text" id="tax" placeholder="Enter Tax" className="form-input w-full" value={details.tax} onChange={onInputChange} disabled={!isEditable} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="techCharges" className="block mb-1">
                        Tech Charges
                    </label>
                    <input
                        name="techCharges"
                        type="text"
                        id="techCharges"
                        placeholder="Enter Tech Charges"
                        className="form-input w-full"
                        value={details.techCharges}
                        onChange={onInputChange}
                        disabled={!isEditable}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="promotionDiscount" className="block mb-1">
                        Promotion Discount
                    </label>
                    <input
                        name="promotionDiscount"
                        type="text"
                        id="promotionDiscount"
                        placeholder="Enter Promotion Discount"
                        className="form-input w-full"
                        value={details.promotionDiscount}
                        onChange={onInputChange}
                        disabled={!isEditable}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="SPDiscount" className="block mb-1">
                        SP Discount
                    </label>
                    <input
                        name="SPDiscount"
                        type="text"
                        id="SPDiscount"
                        placeholder="Enter SP Discount"
                        className="form-input w-full"
                        value={details.SPDiscount}
                        onChange={onInputChange}
                        disabled={!isEditable}
                    />
                </div>

                {showStatus ? (
                    <div className="lg:w-1/3">
                        <label htmlFor="archive" className="block mb-1">
                            Status
                        </label>
                        {!isEditable ? (
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

export default BookingAmtDistributionModule;
