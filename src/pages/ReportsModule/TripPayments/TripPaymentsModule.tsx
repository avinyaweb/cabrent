import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';

interface TripPaymentsProps {
    details: {
        TripNo: string;
        Driver: string;
        Code: string;
        TripDate: string;
        GrassTotal: string;
        RoundOff: string;
        TotalFare: number;
        LeadCharge: number;
        PlatformFees: number;
        CompanyCommission: number;
        PromoAmount: number;
        GatewayCharge: number;
        DriverEarned: number;
        GST: string;
        DeductedFare: string;
        RideStatus: string;
        PaymentMethod: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
}

const TripPaymentsModule: React.FC<TripPaymentsProps> = ({ details, onInputChange, showStatus = true }) => {
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
            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-5">
                <div className="lg:w-1/3">
                    <label htmlFor="TripNo" className="block mb-1">
                        Trip Number
                    </label>
                    <input name="TripNo" type="text" id="TripNo" placeholder="Enter Trip Number" className="form-input w-full" value={details.TripNo} onChange={onInputChange} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="Driver" className="block mb-1">
                        Driver
                    </label>
                    <input name="Driver" type="text" id="Driver" placeholder="Enter Driver Name" className="form-input w-full" value={details.Driver} onChange={onInputChange} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="Code" className="block mb-1">
                        Code
                    </label>
                    <input name="Code" type="text" id="Code" placeholder="Enter Code" className="form-input w-full" value={details.Code} onChange={onInputChange} />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-5">
                <div className="lg:w-1/3">
                    <label htmlFor="TripDate" className="block mb-1">
                        Trip Date
                    </label>
                    <input name="TripDate" type="text" id="TripDate" placeholder="Enter Trip Date" className="form-input w-full" value={details.TripDate} onChange={onInputChange} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="GrassTotal" className="block mb-1">
                        Grass Total
                    </label>
                    <input name="GrassTotal" type="text" id="GrassTotal" placeholder="Enter Grass Total" className="form-input w-full" value={details.GrassTotal} onChange={onInputChange} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="RoundOff" className="block mb-1">
                        Round Off
                    </label>
                    <input name="RoundOff" type="text" id="RoundOff" placeholder="Enter Round Off" className="form-input w-full" value={details.RoundOff} onChange={onInputChange} />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-5">
                <div className="lg:w-1/3">
                    <label htmlFor="TotalFare" className="block mb-1">
                        Total Fare
                    </label>
                    <input name="TotalFare" type="text" id="TotalFare" placeholder="Enter Total Fare" className="form-input w-full" value={details.TotalFare} onChange={onInputChange} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="LeadCharge" className="block mb-1">
                        Lead Charge
                    </label>
                    <input name="LeadCharge" type="text" id="LeadCharge" placeholder="Enter Lead Charge" className="form-input w-full" value={details.LeadCharge} onChange={onInputChange} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="PlatformFees" className="block mb-1">
                        Platform Fees
                    </label>
                    <input name="PlatformFees" type="text" id="PlatformFees" placeholder="Enter Platform Fees" className="form-input w-full" value={details.PlatformFees} onChange={onInputChange} />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-5">
                <div className="lg:w-1/3">
                    <label htmlFor="CompanyCommission" className="block mb-1">
                        Company Commission
                    </label>
                    <input
                        name="CompanyCommission"
                        type="text"
                        id="CompanyCommission"
                        placeholder="Enter Company Commission"
                        className="form-input w-full"
                        value={details.CompanyCommission}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="PromoAmount" className="block mb-1">
                        Promo Amount
                    </label>
                    <input name="PromoAmount" type="text" id="PromoAmount" placeholder="Enter Promo Amount" className="form-input w-full" value={details.PromoAmount} onChange={onInputChange} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="GatewayCharge" className="block mb-1">
                        Gateway Charge
                    </label>
                    <input
                        name="GatewayCharge"
                        type="text"
                        id="GatewayCharge"
                        placeholder="Enter Gateway Charge"
                        className="form-input w-full"
                        value={details.GatewayCharge}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-5">
                <div className="lg:w-1/3">
                    <label htmlFor="DriverEarned" className="block mb-1">
                        Driver Earned
                    </label>
                    <input name="DriverEarned" type="text" id="DriverEarned" placeholder="Enter Driver Earned" className="form-input w-full" value={details.DriverEarned} onChange={onInputChange} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="GST" className="block mb-1">
                        GST
                    </label>
                    <input name="GST" type="text" id="GST" placeholder="Enter GST" className="form-input w-full" value={details.GST} onChange={onInputChange} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="DeductedFare" className="block mb-1">
                        Deducted Fare
                    </label>
                    <input name="DeductedFare" type="text" id="DeductedFare" placeholder="Enter Deducted Fare" className="form-input w-full" value={details.DeductedFare} onChange={onInputChange} />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-5">
                <div className="lg:w-1/3">
                    <label htmlFor="RideStatus" className="block mb-1">
                        Ride Status
                    </label>
                    <input name="RideStatus" type="text" id="RideStatus" placeholder="Enter Ride Status" className="form-input w-full" value={details.RideStatus} onChange={onInputChange} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="PaymentMethod" className="block mb-1">
                        Payment Method
                    </label>
                    <input
                        name="PaymentMethod"
                        type="text"
                        id="PaymentMethod"
                        placeholder="Enter Payment Method"
                        className="form-input w-full"
                        value={details.PaymentMethod}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3"></div>
            </div>
        </>
    );
};

export default TripPaymentsModule;
