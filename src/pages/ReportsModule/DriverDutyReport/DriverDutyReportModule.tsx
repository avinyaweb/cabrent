import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';

interface TripPaymentsProps {
    details: {
        Code: string;
        DriverName: string;
        OnlineHours: string;
        OfflineHours: string;
        LastOn: string;
        LastOff: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
}

const DriverDutyReportModule: React.FC<TripPaymentsProps> = ({ details, onInputChange, showStatus = true }) => {
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
            <div className="lg:w-1/2 flex flex-col gap-2">
                <label htmlFor="Driver" className="block mb-1">
                    Driver
                </label>
                <input
                    name="Driver"
                    type="text"
                    id="Driver"
                    placeholder="Enter Driver"
                    className="form-input w-full"
                    // value={details.Driver}
                    onChange={onInputChange}
                />

                <label htmlFor="DriverCode" className="block mb-1">
                    Driver Code
                </label>
                <input
                    name="DriverCode"
                    type="text"
                    id="DriverCode"
                    placeholder="Enter Driver Code"
                    className="form-input w-full"
                    //  value={details.DriverCode}
                    onChange={onInputChange}
                />

                <label htmlFor="TotalTrips" className="block mb-1">
                    Total Trips
                </label>
                <input
                    name="TotalTrips"
                    type="text"
                    id="TotalTrips"
                    placeholder="Enter Total Trips"
                    className="form-input w-full"
                    // value={details.TotalTrips}
                    onChange={onInputChange}
                />

                <label htmlFor="EarnedAmount" className="block mb-1">
                    Earned Amount
                </label>
                <input
                    name="EarnedAmount"
                    type="text"
                    id="EarnedAmount"
                    placeholder="Enter Earned Amount"
                    className="form-input w-full"
                    //  value={details.EarnedAmount}
                    onChange={onInputChange}
                />

                <label htmlFor="Commission" className="block mb-1">
                    Commission
                </label>
                <input
                    name="Commission"
                    type="text"
                    id="Commission"
                    placeholder="Enter Commission"
                    className="form-input w-full"
                    //  value={details.Commission}
                    onChange={onInputChange}
                />
            </div>
        </>
    );
};

export default DriverDutyReportModule;
