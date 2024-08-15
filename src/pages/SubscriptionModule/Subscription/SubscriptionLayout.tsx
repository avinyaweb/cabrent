import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getAllCity } from '@/services/RolesService';
import SubsAmtDistributionModal from '@/components/Models/SubsAmtDistributionModal';
import { Link } from 'react-router-dom';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import ServiceCityModal from '@/components/Models/ServiceCityModal';
import { IoCalendarNumber } from 'react-icons/io5';

interface SubscriptionProps {
    details: {
        id: string;
        fk_serviceCity: string;
        planName: string;
        planDetails: string;
        planAmount: string;
        fk_subscriptionAmountDistribution: string;
        planDescription: string;
        couponAmount: string;
        NumberOfDay: string;
        planLiveStartTime: string;
        planLiveEndTime: string;
        archive: string;
        city: string;

        //new fields:
        remainingDaysString: string;
        categoryString: string;
        newUser: string;
        countOfUse: string;
        couponIsApplicable: string;
        useWalletMoney: string;
        vehicleType: string;
        type: string;
    };
    onInputChange?: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    showStatus?: boolean;
    viewSpecific?: any;
    viewSpecificEdit?: any;
    isEditPage?: boolean;
}

interface User {
    id: string;
}

const SubscriptionLayout: React.FC<SubscriptionProps> = ({ details, onInputChange, showStatus = true, viewSpecific, viewSpecificEdit, isEditPage }) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    // Get today's date and time in the format 'YYYY-MM-DD HH:mm'
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hour = String(today.getHours()).padStart(2, '0');
    const minute = String(today.getMinutes()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day} ${hour}:${minute}`;
    const [modal5, setModal5] = useState(false);
    const [date1, setDate1] = useState<string>(formattedToday);
    const [date2, setDate2] = useState<string>(formattedToday);
    const [value, setValue] = useState('');

    // Future code -->>
    // const [selectedSubsDist, setSelectedSubsDist] = useState<User[]>([]);
    // const [addedSubsDistType, setAddedSubsDistType] = useState<any>();

    // add user in bank
    const handleAddUserSubmit = async (selectedSubsDist: User[], userID: string): Promise<void> => {
        // Future code -->>
        // setSelectedSubsDist(selectedSubsDist);
        // setAddedSubsDistType(userID);
    };

    //Will use in future
    // const [platformAmount, setPlatformAmount] = useState(details.PlatformAmount);
    // const [vehicleTypeAmount, setVehicleTypeAmount] = useState(details.VehicleTypeAmount);

    // Dynamic roles data fetching --will use in future
    // {
    // useEffect(() => {
    //     const fetchRoles = async () => {
    //         try {
    //             const response = await getRoleData();
    //             const rolesData = response.data.roles;
    //             if (Array.isArray(rolesData)) {
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

    // const [serviceCityOption, SetServiceCityOption] = useState<any[]>([]);
    // const [serviceCity, SetServiceCity] = useState(details.city);

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

    // const handleCityTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { value } = event.target;
    //     setCity(value);
    //     onInputChange({
    //         target: {
    //             name: 'city',
    //             value: value,
    //         },
    //     } as React.ChangeEvent<HTMLInputElement>);
    // };

    // const handleServiceCityTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { value } = event.target;
    //     setCity(value);
    //     onInputChange({
    //         target: {
    //             name: 'fk_serviceCity',
    //             value: value,
    //         },
    //     } as React.ChangeEvent<HTMLInputElement>);
    // };

    //Will use in future
    // const handleCitySelection = (selectedCities: any[]) => {
    //     const cityValues = selectedCities.map((city: { value: any }) => city.value).join(',');
    //     setModuleDetails({ ...moduleDetails, fk_serviceCity: cityValues });
    // };

    //Will use in future
    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
        // Rest of your code
    };

    const classNames = `${viewSpecific ? 'lg:w-1/4 pointer-events-none' : 'lg:w-1/4'}`;
    const placeholderText = viewSpecific ? '' : 'Enter Plan Name';
    const placeholderPlanAmount = viewSpecific ? '' : 'Enter Plan Amount tax';
    const placeholderNumberOfDay = viewSpecific ? '' : 'Enter Number Of Days';
    const placeholderPlanName = viewSpecific ? '' : 'Enter Plan Name';
    const placeholdercouponAmount = viewSpecific ? '' : 'Enter Coupon Amount';
    const placeholderSubscriptionAmtDistribution = viewSpecific ? '' : 'Enter Subscription Amt Distribution';
    const placeholderCouponName = viewSpecific ? '' : 'Enter Coupon Use Count';
    const placeholderCountofUse = viewSpecific ? '' : 'Enter Count of Use';

    //service city popup

    const [modal6, setModal6] = useState(false);

    const [addedserviceCityType, setAddedServiceCityType] = useState<any>();
    const [ServiceCityData, setServiceCityData] = useState<any>();

    const handleAddServiceCitySubmit = (selectedServiceCity: any, userID: string) => {
        setServiceCityData(selectedServiceCity);
        setAddedServiceCityType(userID);
        if (onInputChange) {
            onInputChange({
                target: {
                    name: 'serviceCity',
                    value: selectedServiceCity,
                },
            } as React.ChangeEvent<HTMLInputElement>);
        } else {
            console.error('onInputChange is not defined.');
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className={`lg:w-1/3  pointer-events-none`}>
                    <label htmlFor="planName" className="block mb-1 text-md font-bold">
                        Plan Name
                    </label>
                    <input
                        name="planName"
                        type="text"
                        id="planName"
                        placeholder={placeholderText}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        value={details.planName}
                        onChange={onInputChange}
                        readOnly={viewSpecific}
                    />
                </div>
                <div className={`lg:w-1/3  pointer-events-none`}>
                    <label htmlFor="planDetails" className="block mb-1 text-md font-bold">
                        Plan Details
                    </label>
                    <input
                        name="planDetails"
                        type="text"
                        id="planDetails"
                        placeholder={placeholderText}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        value={details.planDetails}
                        onChange={onInputChange}
                        readOnly={viewSpecific}
                    />
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="planAmount" className="block mb-1 text-md font-bold">
                        Plan Amount Tax
                    </label>
                    {viewSpecific ? (
                        <input
                            name="planAmount"
                            type="number"
                            id="planAmount"
                            placeholder={placeholderPlanAmount}
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            // value={details.planAmount}
                            value="399"
                            readOnly
                        />
                    ) : (
                        <input name="planAmount" type="number" id="planAmount" placeholder={placeholderPlanAmount} className="form-input w-full" value={details.planAmount} onChange={onInputChange} />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="planLiveEndTime" className="block mb-1 text-md font-bold">
                        Plan Live End Time
                    </label>
                    <div className="relative">
                        <Flatpickr
                            data-enable-time
                            options={{
                                enableTime: true,
                                dateFormat: 'Y-m-d H:i',
                                position: isRtl ? 'auto right' : 'auto left',
                            }}
                            value={date2}
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            onChange={(date2) => setDate2(date2[0].toISOString())}
                            disabled={viewSpecific}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500 hover:text-gray-700">
                            <IoCalendarNumber />
                        </div>
                    </div>
                </div>

                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="planLiveEndTime" className="block mb-1 text-md font-bold">
                        Plan Live End Time
                    </label>
                    <div className="relative">
                        <Flatpickr
                            data-enable-time
                            options={{
                                enableTime: true,
                                dateFormat: 'Y-m-d H:i',
                                position: isRtl ? 'auto right' : 'auto left',
                            }}
                            value={date2}
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            onChange={(date2) => setDate2(date2[0].toISOString())}
                            disabled={viewSpecific}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500 hover:text-gray-700">
                            <IoCalendarNumber />
                        </div>
                    </div>
                </div>

                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="NumberOfDay" className="block mb-1 text-md font-bold">
                        Remaining Days
                    </label>
                    {viewSpecific ? (
                        <input
                            name="NumberOfDay"
                            type="number"
                            id="NumberOfDay"
                            placeholder={placeholderNumberOfDay}
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            // value={details.NumberOfDay}
                            value="30"
                            readOnly
                        />
                    ) : (
                        <input
                            name="NumberOfDay"
                            type="number"
                            id="NumberOfDay"
                            placeholder={placeholderNumberOfDay}
                            className="form-input w-full"
                            value={details.NumberOfDay}
                            onChange={onInputChange}
                        />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`w-1/3`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="serviceCity" className="block mb-1 font-bold text-md">
                            Service City
                        </label>
                        {viewSpecific && (
                            <Link to={'/UtilityModule/ServiceCity/ViewSpecificServiceCity/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    {viewSpecific ? (
                        <input name="serviceCity" type="text" id="serviceCity" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={details.fk_serviceCity} readOnly />
                    ) : isEditPage ? (
                        <div>
                            {addedserviceCityType === 'serviceCityAdded' ? (
                                <button type="button" onClick={() => setModal6(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <div className="flex">
                                    <input
                                        name="serviceCity"
                                        type="text"
                                        id="serviceCity"
                                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                        value={details.fk_serviceCity}
                                        readOnly
                                    />
                                    <button type="button" onClick={() => setModal6(true)} className="btn btn-primary w-1/3">
                                        Edit
                                    </button>
                                    <ServiceCityModal event={modal6} closeModal={() => setModal6(false)} onAddServiceCity={handleAddServiceCitySubmit} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {addedserviceCityType === 'serviceCityAdded' ? (
                                <button type="button" onClick={() => setModal6(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <button type="button" onClick={() => setModal6(true)} className="btn btn-primary w-full">
                                    Add Service City
                                </button>
                            )}
                            <ServiceCityModal event={modal6} closeModal={() => setModal6(false)} onAddServiceCity={handleAddServiceCitySubmit} />
                        </div>
                    )}
                </div>

                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="categoryString" className="block mb-1 text-md font-bold">
                        Subscription Category
                    </label>
                    {viewSpecific ? (
                        <input
                            name="categoryString"
                            type="text"
                            id="categoryString"
                            placeholder={placeholderPlanName}
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details.categoryString}
                            readOnly
                        />
                    ) : (
                        <select id="categoryString" onChange={onInputChange} className="form-select text-white-dark" required value={details.categoryString}>
                            <option value="">Select your Category</option>
                            <option value="Gold">Gold</option>
                            <option value="Silver">Silver</option>
                            <option value="Platinum">Platinum</option>
                        </select>
                    )}
                </div>

                {/* <div className={`lg:w-1/3  pointer-events-none`}></div> */}

                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="newUser" className="block mb-1 text-md font-bold">
                        New User
                    </label>
                    {viewSpecific ? (
                        <input
                            name="newUser"
                            type="text"
                            id="newUser"
                            placeholder={placeholderPlanName}
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details.newUser}
                            onChange={onInputChange}
                        />
                    ) : (
                        <select id="newUser" className="form-select text-white-dark" onChange={onInputChange} required value={details.newUser}>
                            <option value="">Select your Category</option>
                            <option value={'Yes'}>Yes</option>
                            <option value={'No'}>No</option>
                        </select>
                    )}
                </div>
            </div>

            {/* new fields */}

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="couponIsApplicable" className="block mb-1 text-md font-bold">
                        Coupon is Applicable
                    </label>
                    {viewSpecific ? (
                        <input
                            name="couponIsApplicable"
                            type="text"
                            id="couponIsApplicable"
                            placeholder={placeholderPlanName}
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details.couponIsApplicable}
                            onChange={onInputChange}
                        />
                    ) : (
                        <select id="couponIsApplicable" onChange={onInputChange} className="form-select text-white-dark" required value={details.couponIsApplicable}>
                            <option value="">Select your Category</option>
                            <option value={'Yes'}>Yes</option>
                            <option value={'No'}>No</option>
                        </select>
                    )}
                </div>

                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="useWalletMoney" className="block mb-1 text-md font-bold">
                        Use Money Wallet
                    </label>
                    {viewSpecific ? (
                        <input
                            name="useWalletMoney"
                            type="text"
                            id="useWalletMoney"
                            placeholder={placeholderPlanName}
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details.useWalletMoney}
                            onChange={onInputChange}
                        />
                    ) : (
                        <select id="useWalletMoney" className="form-select text-white-dark" onChange={onInputChange} required value={details.useWalletMoney}>
                            <option value="">Select your Category</option>
                            <option value={'Yes'}>Yes</option>
                            <option value={'No'}>No</option>
                        </select>
                    )}
                </div>

                <div className={`lg:w-1/3 ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="countOfUse" className="block mb-1 text-md font-bold">
                        Count Of Use
                    </label>
                    {viewSpecific ? (
                        <input
                            name="countOfUse"
                            type="text"
                            id="countOfUse"
                            // placeholder={placeholderCouponName}
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details.countOfUse}
                            readOnly
                        />
                    ) : (
                        <input name="countOfUse" type="text" id="countOfUse" placeholder="Enter the Count of use" className="form-input w-full" value={details.countOfUse} onChange={onInputChange} />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                {/* <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="vehicleType" className="block mb-1 text-md font-bold">
                        Vehicle Type
                    </label>
                    {viewSpecific ? (
                        <input name="vehicleType" id="vehicleType" type="text" className="form-input w-full pointer-events-none" value={'Flat'} onChange={onInputChange} readOnly />
                    ) : (
                        <select id="vehicleType" className="form-select text-white-dark" name="vehicleType" required value={details.vehicleType} onChange={onInputChange}>
                            <option value="">Select Vehicle Type</option>
                            <option value="Mini">Mini</option>
                            <option value="Sidan">Sidan</option>
                            <option value="Hatch back">Hatch back</option>
                            <option value="Suv">Suv</option>
                        </select>
                    )}
                </div>

                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="type" className="block mb-1 text-md font-bold">
                        Flat or Persentage
                    </label>
                    {viewSpecific ? (
                        <input name="type" id="type" type="text" className="form-input w-full pointer-events-none" value={'Flat'} onChange={onInputChange} readOnly />
                    ) : (
                        <select id="type" className="form-select text-white-dark" name="type" required value={details.type} onChange={onInputChange}>
                            <option value="">Select Type</option>
                            <option value="FLAT">Flat</option>
                            <option value="PERCENTAGE">Percentage</option>
                        </select>
                    )}
                </div> */}
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                {showStatus && ( // Conditionally rendering based on the showStatus prop
                    <div className={`lg:w-1/3  pointer-events-none`}>
                        <label htmlFor="status" className="block mb-1 text-md font-bold">
                            Subscription Status
                        </label>
                        {viewSpecific ? (
                            <input
                                name="status"
                                type="text"
                                id="status"
                                placeholder={placeholderPlanName}
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                // value={details.archive}
                                value="APPROVED"
                                onChange={onInputChange}
                            />
                        ) : (
                            <select id="status" className="form-select text-white-dark" required value={details.archive}>
                                <option value="">Select your Status</option>
                                <option value={'PENDING'}>PENDING</option>
                                <option value={'APPROVED'}>APPROVED</option>
                                <option value={'REJECTED'}>REJECTED</option>
                                <option value={'HOLD'}>HOLD</option>
                                <option value={'SUSPENDED'}>SUSPENDED</option>
                            </select>
                        )}
                    </div>
                )}
            </div>

            <div className="mt-6 mb-12">
                <label htmlFor="planDescription" className="block mb-1 text-md font-bold">
                    Plan Description
                </label>
                {viewSpecific ? (
                    <div className=" w-1/2 border rounded-md text-start h-28 pointer-events-none">
                        <p className="m-2 ">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quaerat dolorem corporis numquam dolorum repellat dignissimos consectetur perspiciatis in, aliquam tenetur
                            cupiditate veniam aliquid impedit odit repudiandae asperiores nam soluta
                        </p>
                    </div>
                ) : (
                    <ReactQuill theme="snow" value={value} onChange={setValue} className={`h-24 w-1/2 ${viewSpecific ? 'pointer-events-none' : ''}`} />
                )}
            </div>
        </>
    );
};

export default SubscriptionLayout;
