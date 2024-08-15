import React, { useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import ServiceCity from '../../AdminModule/AdminTeams/ServiceCity';

import 'flatpickr/dist/flatpickr.css';

interface SubscriptionInvoiceProps {
    details: {
        id: string;
        subHistoryId: string;
        amount: string;
        paymentStatus: string;
        fk_serviceCity: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
}

const SubscriptionInvoiceModule: React.FC<SubscriptionInvoiceProps> = ({ details, onInputChange, showStatus = true }) => {
    //const [roleOptions, setRoleOptions] = useState<{ label: string; value: string }[]>([]);
    const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(details.paymentStatus);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    // Dynamic roles data fetching --will use in future
    // {
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
    // }

    const handlePaymentStatusTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedPaymentStatus(value);
        onInputChange({
            target: {
                name: 'paymentStatus',
                value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const [moduleDetails, setModuleDetails] = useState(details);

    const handleCitySelection = (selectedCities: any[]) => {
        // Convert the selectedCities array of objects into a comma-separated string of city values
        const cityValues = selectedCities.map((city: { value: any }) => city.value).join(',');
        // Update the details or perform any other necessary actions with the city values
        setModuleDetails({ ...moduleDetails, fk_serviceCity: cityValues });
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // Update the moduleDetails state based on the input changes
        setModuleDetails({ ...moduleDetails, [name]: value });
    };

    return (
        <>
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="subHistoryId" className="block mb-1">
                        Subscription History ID
                    </label>
                    <input
                        name="subHistoryId"
                        type="text"
                        id="subHistoryId"
                        placeholder="Enter Subscription History ID"
                        className="form-input w-full"
                        value={details.subHistoryId}
                        onChange={onInputChange}
                        readOnly
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="amount" className="block mb-1">
                        Amount
                    </label>
                    <input name="amount" type="text" id="amount" placeholder="Enter Amount" className="form-input w-full" value={details.amount} onChange={onInputChange} readOnly />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="serviceProviderType" className="block mb-1">
                        Payment Status
                    </label>
                    <select id="serviceProviderType" className="form-select text-white-dark" required value={details.paymentStatus} onChange={handlePaymentStatusTypeChange}>
                        <option value="">Select Payment Status</option>
                        <option value="status1">Paid</option>
                        <option value="status2">Pending</option>
                        <option value="status3">Rejecetd</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="fk_serviceCity" className="block mb-1">
                        Service City
                    </label>
                    <ServiceCity
                        options={[
                            { value: 'City A', label: 'City A' },
                            { value: 'City B', label: 'City B' },
                            { value: 'City C', label: 'City C' },
                            // Add more options in the same object structure if required
                        ]}
                        selectedCities={moduleDetails.fk_serviceCity ? moduleDetails.fk_serviceCity.split(',').map((city) => ({ value: city, label: city })) : []}
                        onCitySelection={handleCitySelection}
                        // onChange={handleInputChange} // Pass the handleInputChange function
                    />
                </div>

                {showStatus ? ( // Conditionally rendering based on the showStatus prop
                    <div className="lg:w-1/3">
                        <label htmlFor="archive" className="block mb-1">
                            Status
                        </label>
                        <input name="archive" type="text" id="archive" placeholder="Enter Status" className="form-input w-full" value={details.archive} onChange={onInputChange} />
                    </div>
                ) : (
                    <div className="lg:w-1/3" /> //Empty div when showStatus is false
                )}

                <div className="lg:w-1/3"></div>
            </div>
        </>
    );
};

export default SubscriptionInvoiceModule;
