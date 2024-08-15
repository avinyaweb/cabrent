import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { getAllCity } from '@/services/RolesService';
interface SubscriptionAmtDistributionProps {
    details: {
        id: string;
        cgst: string;
        sgst: string;
        processingFee: string;
        planAmount: string;
        distributorcommision: string;
        fk_platformFee: string;
        platformName: string;
        platformAmount: string;
        amountAddOrSub: string;
        vehicleTypeName: string;
        vehicleTypeAmount: string;
        fk_vehicleTypeFee: string;
        pgCharges: string;
        totalAmount: string;
        fk_serviceCity: string;
        city: string;
        archive: string;
        changeType: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
}

const SubscriptionAmtDistributionModule: React.FC<SubscriptionAmtDistributionProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [ChPartCommApplicable, setChPartCommApplicable] = useState(details.distributorcommision);

    // Dynamic roles data fetching--Will use in future
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

    const [city, setCity] = useState(details.city);
    const [cityOption, setCityOption] = useState<any[]>([]);

    const [serviceCityOption, SetServiceCityOption] = useState<any[]>([]);
    const [serviceCity, SetServiceCity] = useState(details.city);

    const getAllCityData = async () => {
        try {
            const data = await getAllCity();
            setCityOption(data?.data?.Cities);
        } catch (error) {
            console.log(error);
        }
    };

    //currenly just show city instant of service city
    const getAllServiceCityData = async () => {
        try {
            const data = await getAllCity();
            setCityOption(data?.data?.Cities);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCityData();
        getAllServiceCityData();
    }, []);

    const handleCityTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setCity(value);
        onInputChange({
            target: {
                name: 'city',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleServiceCityTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setCity(value);
        onInputChange({
            target: {
                name: 'fk_serviceCity',
                value: value,
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

    const handleSelectChPartCommApplicable = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setChPartCommApplicable(value);
        onInputChange({
            target: {
                name: 'distributorcommision',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="cgst" className="block mb-1 text-md font-bold">
                        CGST
                    </label>
                    <input
                        name="cgst"
                        type="text"
                        id="cgst"
                        placeholder="Enter CGST"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        value={details.cgst}
                        onChange={onInputChange}
                        readOnly={viewSpecific}
                    />
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="sgst" className="block mb-1 text-md font-bold">
                        SGST
                    </label>
                    <input
                        name="sgst"
                        type="text"
                        id="sgst"
                        placeholder="Enter SGST"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        value={details.sgst}
                        onChange={onInputChange}
                        readOnly={viewSpecific}
                    />
                </div>
                {/* <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="planAmount" className="block mb-1 text-md font-bold">
                        Plan Amount
                    </label>
                    <input
                        name="planAmount"
                        type="number"
                        id="planAmount"
                        placeholder={`${!viewSpecific?'Enter Plan amount': ''}`}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        value={details.planAmount}
                        // value="300"
                        onChange={onInputChange}
                        readOnly={viewSpecific}
                    />
                </div> */}

                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="planAmount" className="block mb-1">
                        Processing Fee
                    </label>
                    {viewSpecific ? (
                        <input
                            name="planAmount"
                            type="text"
                            id="planAmount"
                            className="form-input w-full pointer-events-none"
                            // value={details.planAmount}
                            value="300"
                            readOnly
                        />
                    ) : (
                        <input
                            name="planAmount"
                            type="text"
                            id="planAmount"
                            placeholder="Enter Plan Amount"
                            className="form-input w-full"
                            // value={details.planAmount}
                            onChange={onInputChange}
                        />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`lg:w-1/3 ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="distributorcommision" className="block mb-1 text-md font-bold">
                        Distributorcommision Commission
                    </label>
                    {viewSpecific ? (
                        <input
                            name="distributorcommision"
                            type="text"
                            id="distributorcommision"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details.distributorcommision}
                            readOnly
                        />
                    ) : (
                        <select id="distributorcommision" className="form-select text-white-dark" required value={ChPartCommApplicable} onChange={handleSelectChPartCommApplicable}>
                            <option value="">Select CH Partner Applicable</option>
                            <option value="sample">Yes</option>
                            <option value="sample">No</option>
                        </select>
                    )}
                </div>

                {/* <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="pgCharges" className="block mb-1">
                        Payment Gateway Charges
                    </label>
                    {viewSpecific ? (
                        <input
                            name="pgCharges"
                            type="text"
                            id="pgCharges"
                            className="form-input w-full pointer-events-none"
                            // value={details.pgCharges}
                            value="44"
                            readOnly
                        />
                    ) : (
                        <input
                            name="pgCharges"
                            type="text"
                            id="pgCharges"
                            placeholder="Payment Gateway Charges"
                            className="form-input w-full"
                            // value={details.pgCharges}
                            onChange={onInputChange}
                        />
                    )}
                </div> */}

                <div className={`lg:w-1/3 ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="pgCharges" className="block mb-1">
                        Payment Gateway Charges
                    </label>
                    {viewSpecific ? (
                        <input name="pgCharges" type="text" id="pgCharges" className="form-input w-full pointer-events-none" value="Yes" readOnly />
                    ) : (
                        <select
                            id="pgCharges"
                            className="form-select w-full"
                            //  onChange={onInputChange}
                        >
                            <option value="">Select Payment Gateway Charges</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    )}
                </div>

                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="totalAmount" className="block mb-1">
                        Total Amount
                    </label>
                    {viewSpecific ? (
                        <input
                            name="totalAmount"
                            type="text"
                            id="totalAmount"
                            className="form-input w-full pointer-events-none"
                            // value={details.totalAmount}
                            value="5.6"
                            readOnly
                        />
                    ) : (
                        <input
                            name="totalAmount"
                            type="text"
                            id="totalAmount"
                            placeholder="Enter Total Amount"
                            className="form-input w-full"
                            // value={details.totalAmount}
                            onChange={onInputChange}
                        />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`lg:w-1/3 pointer-events-none`}></div>

                {showStatus && (
                    <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                        <label htmlFor="status" className="block mb-1 text-md font-bold">
                            Status
                        </label>
                        {viewSpecific ? (
                            <input
                                name="status"
                                type="text"
                                id="status"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                // value={details.archive}
                                value="PENDING"
                                onChange={onInputChange}
                            />
                        ) : (
                            <select id="status" className="form-select text-white-dark" required value={details.fk_serviceCity} onChange={handleServiceCityTypeChange}>
                                <option value="">Select Status</option>
                                <option value="PENDING">PENDING</option>
                                <option value="APPROVED">APPROVED</option>
                                <option value="REJECTED">REJECTED</option>
                                <option value="HOLD">HOLD</option>
                                <option value="SUSPENDED">SUSPENDED</option>
                            </select>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default SubscriptionAmtDistributionModule;
