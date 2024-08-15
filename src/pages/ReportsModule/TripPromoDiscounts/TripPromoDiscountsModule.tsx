import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';

interface TripPromoDiscountsProps {
    details: {
        date: string;
        tripNumber: string;
        driverName: string;
        driverPhone: string;
        promoCode: string | null;
        promoAmount: number;
        amountToDriver: number;
        commission: number;
        totalAmount: number;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
}

const TripPromoDiscountsModule: React.FC<TripPromoDiscountsProps> = ({ details, onInputChange, showStatus = true }) => {
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

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
                <div>
                    <label htmlFor="TripNo" className="block mb-1">
                        Trip Number
                    </label>
                    <input
                        name="TripNo"
                        type="text"
                        id="TripNo"
                        placeholder="Enter Trip Number"
                        className="form-input w-full"
                        //   value={details.TripNo}
                        onChange={onInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="Driver" className="block mb-1">
                        Driver
                    </label>
                    <input
                        name="Driver"
                        type="text"
                        id="Driver"
                        placeholder="Enter Driver Name"
                        className="form-input w-full"
                        //   value={details.Driver}
                        onChange={onInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="Code" className="block mb-1">
                        Code
                    </label>
                    <input
                        name="Code"
                        type="text"
                        id="Code"
                        placeholder="Enter Code"
                        className="form-input w-full"
                        //   value={details.Code}
                        onChange={onInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="Date" className="block mb-1">
                        Date
                    </label>
                    <input
                        name="Date"
                        type="text"
                        id="Date"
                        placeholder="Enter Date"
                        className="form-input w-full"
                        //   value={details.Date}
                        onChange={onInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="DriverPhone" className="block mb-1">
                        Driver Phone
                    </label>
                    <input
                        name="DriverPhone"
                        type="text"
                        id="DriverPhone"
                        placeholder="Enter Driver Phone"
                        className="form-input w-full"
                        //   value={details.DriverPhone}
                        onChange={onInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="PromoAmount" className="block mb-1">
                        Promo Amount
                    </label>
                    <input
                        name="PromoAmount"
                        type="text"
                        id="PromoAmount"
                        placeholder="Enter Promo Amount"
                        className="form-input w-full"
                        //   value={details.PromoAmount}
                        onChange={onInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="AmountToDriver" className="block mb-1">
                        Amount to Driver
                    </label>
                    <input
                        name="AmountToDriver"
                        type="text"
                        id="AmountToDriver"
                        placeholder="Enter Amount to Driver"
                        className="form-input w-full"
                        //   value={details.AmountToDriver}
                        onChange={onInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="Commission" className="block mb-1">
                        Commission
                    </label>
                    <input
                        name="Commission"
                        type="text"
                        id="Commission"
                        placeholder="Enter Commission"
                        className="form-input w-full"
                        //   value={details.Commission}
                        onChange={onInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="TotalAmount" className="block mb-1">
                        Total Amount
                    </label>
                    <input
                        name="TotalAmount"
                        type="text"
                        id="TotalAmount"
                        placeholder="Enter Total Amount"
                        className="form-input w-full"
                        //   value={details.TotalAmount}
                        onChange={onInputChange}
                    />
                </div>
            </div>
        </>
    );
};

export default TripPromoDiscountsModule;
