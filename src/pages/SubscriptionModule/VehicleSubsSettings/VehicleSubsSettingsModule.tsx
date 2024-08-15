import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';

interface CheckboxValues {
    [key: string]: boolean;
}

interface BookingAmtDistributionProps {
    details: {
        id: string;
        actualTripCost: string;
        archive: string;
    };
    onInputChange?: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    isEditable?: boolean;
    viewSpecific: boolean;
}

const VehicleSubsSettingsModule: React.FC<BookingAmtDistributionProps> = ({ details, onInputChange, showStatus = true, viewSpecific, isEditable = true }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // Add your dropdown options here
    const statusOptions = ['APPROVED', 'REJECETD', 'SUSPENDED', 'ONHOLD', 'PENDING'];

    // State to keep track of checkbox values
    const [checkboxValues, setCheckboxValues] = useState<CheckboxValues>({
        governmentRate: false,
        myDiscount: false,
        promotionalDiscount: false,
        convenienceCharge: false,
        selfBooking: false,
        onlineBooking: false,
        nightFare: false,
        leadCharge: false,
        inviteCustomers: false,
        inviteDrivers: false,
        billsShare: false,
        tripsHistory: false,
        plSheetGeneration: false,
        itrFiling: false,
        gst: false,
        gstRegFiling: false,
        contactSave: false,
        couponsRewards: false,
        referralBonus: false,
        walletActive: false,
        subscriptions: false,
    });

    // Handler to update checkbox values
    const handleCheckboxChange = (checkboxName: keyof CheckboxValues) => {
        setCheckboxValues((prevState) => ({
            ...prevState,
            [checkboxName]: !prevState[checkboxName],
        }));
    };

    // Handler to submit the form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page refresh

        // Create JSON object based on checkbox values
        const formData = {
            governmentRate: checkboxValues.governmentRate ? 1 : 0,
            myDiscount: checkboxValues.myDiscount ? 1 : 0,
            promotionalDiscount: checkboxValues.promotionalDiscount ? 1 : 0,
            convenienceCharge: checkboxValues.convenienceCharge ? 1 : 0,
            selfBooking: checkboxValues.selfBooking ? 1 : 0,
            onlineBooking: checkboxValues.onlineBooking ? 1 : 0,
            nightFare: checkboxValues.nightFare ? 1 : 0,
            leadCharge: checkboxValues.leadCharge ? 1 : 0,
            inviteCustomers: checkboxValues.inviteCustomers ? 1 : 0,
            inviteDrivers: checkboxValues.inviteDrivers ? 1 : 0,
            billsShare: checkboxValues.billsShare ? 1 : 0,
            tripsHistory: checkboxValues.tripsHistory ? 1 : 0,
            plSheetGeneration: checkboxValues.plSheetGeneration ? 1 : 0,
            itrFiling: checkboxValues.itrFiling ? 1 : 0,
            gst: checkboxValues.gst ? 1 : 0,
            gstRegFiling: checkboxValues.gstRegFiling ? 1 : 0,
            contactSave: checkboxValues.contactSave ? 1 : 0,
            couponsRewards: checkboxValues.couponsRewards ? 1 : 0,
            referralBonus: checkboxValues.referralBonus ? 1 : 0,
            walletActive: checkboxValues.walletActive ? 1 : 0,
            subscriptions: checkboxValues.subscriptions ? 1 : 0,
        };

        // Log the JSON object to the console
        console.log(formData);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/4">
                    <label htmlFor="travelAgencyID" className="block mb-1">
                        Travel Agency ID
                    </label>
                    <input
                        name="travelAgencyID"
                        type="text"
                        id="travelAgencyID"
                        placeholder="Enter Country Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={`${viewSpecific ? `TA321654` : ``}`}
                        // onChange={handleInputChange}
                    />
                </div>

                <div className="lg:w-1/4">
                    <label htmlFor="companyType" className="block mb-1">
                        Company Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="VehicleType"
                            type="text"
                            id="VehicleType"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={`${viewSpecific ? `Seadn` : ``}`}
                            // onChange={onInputChange}
                        />
                    ) : (
                        <select id="VehicleType" className="form-select text-white-dark">
                            <option value="">Select your vehicle type</option>
                            <option value={'Mini'}>Partnership</option>
                            <option value={'Sidan'}>Privet Limited</option>
                            <option value={'HatchBack'}>NGO limited</option>
                        </select>
                    )}
                </div>

                <div className="lg:w-1/4">
                    <label htmlFor="subscriptionCategory" className="block mb-1">
                        Subscription Category
                    </label>
                    {viewSpecific ? (
                        <input
                            name="subscriptionCategory"
                            type="text"
                            id="subscriptionCategory"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={`${viewSpecific ? `Platinum` : ``}`}
                            // onChange={onInputChange}
                        />
                    ) : (
                        <select id="subscriptionCategory" className="form-select text-white-dark">
                            <option value="">Select your category</option>
                            <option value={'HatchBack'}>Silver</option>
                            <option value={'Sidan'}>Gold</option>
                            <option value={'Mini'}>Platinum</option>
                        </select>
                    )}
                </div>

                <div className="lg:w-1/4 ">
                    <label htmlFor="VehicleType" className="block mb-1 text-md font-bold">
                        Vehicle Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="VehicleType"
                            type="text"
                            id="VehicleType"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={`${viewSpecific ? `Seadn` : ``}`}
                            // onChange={onInputChange}
                        />
                    ) : (
                        <select id="VehicleType" className="form-select text-white-dark">
                            <option value="">Select your Vehicle Type</option>
                            <option value={'Mini'}>Mini</option>
                            <option value={'Sidan'}>Sidan</option>
                            <option value={'HatchBack'}>HatchBack</option>
                            <option value={'Suv'}>Suv</option>
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="governmentRate" className="inline mb-1 w-40 ">
                        Government Rate
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="governmentRate"
                            onChange={() => handleCheckboxChange('governmentRate')}
                            checked={checkboxValues.governmentRate}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="myDiscount" className="inline mb-1 w-40">
                        My Discount
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="myDiscount"
                            onChange={() => handleCheckboxChange('myDiscount')}
                            checked={checkboxValues.myDiscount}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="promotionalDiscount" className="inline mb-1 w-40">
                        Promotional Discount
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="promotionalDiscount"
                            onChange={() => handleCheckboxChange('promotionalDiscount')}
                            checked={checkboxValues.promotionalDiscount}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="convenienceCharge" className="inline mb-1 w-40">
                        Convenience Charge
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="convenienceCharge"
                            onChange={() => handleCheckboxChange('convenienceCharge')}
                            checked={checkboxValues.convenienceCharge}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="selfBooking" className="inline mb-1 w-40">
                        Self Booking
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="selfBooking"
                            onChange={() => handleCheckboxChange('selfBooking')}
                            checked={checkboxValues.selfBooking}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="onlineBooking" className="inline mb-1 w-40">
                        Online Booking
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="onlineBooking"
                            onChange={() => handleCheckboxChange('onlineBooking')}
                            checked={checkboxValues.onlineBooking}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="nightFare" className="inline mb-1 w-40">
                        Night Fare
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="nightFare"
                            onChange={() => handleCheckboxChange('nightFare')}
                            checked={checkboxValues.nightFare}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="leadCharge" className="inline mb-1 w-40">
                        Lead Charge
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="leadCharge"
                            onChange={() => handleCheckboxChange('leadCharge')}
                            checked={checkboxValues.leadCharge}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="inviteCustomers" className="inline mb-1 w-40">
                        Invite Customers
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="inviteCustomers"
                            onChange={() => handleCheckboxChange('inviteCustomers')}
                            checked={checkboxValues.inviteCustomers}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="inviteDrivers" className="inline mb-1 w-40">
                        Invite Drivers
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="inviteDrivers"
                            onChange={() => handleCheckboxChange('inviteDrivers')}
                            checked={checkboxValues.inviteDrivers}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="billsShare" className="inline mb-1 w-40">
                        Bills Share
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="billsShare"
                            onChange={() => handleCheckboxChange('billsShare')}
                            checked={checkboxValues.billsShare}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="tripsHistory" className="inline mb-1 w-40">
                        Trips History
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="tripsHistory"
                            onChange={() => handleCheckboxChange('tripsHistory')}
                            checked={checkboxValues.tripsHistory}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="plSheetGeneration" className="inline mb-1 w-40">
                        P&L Sheet Generation
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="plSheetGeneration"
                            onChange={() => handleCheckboxChange('plSheetGeneration')}
                            checked={checkboxValues.plSheetGeneration}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="itrFiling" className="inline mb-1 w-40">
                        ITR Filing
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="itrFiling"
                            onChange={() => handleCheckboxChange('itrFiling')}
                            checked={checkboxValues.itrFiling}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>

                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="gst" className="inline mb-1 w-40">
                        GST
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="gst"
                            onChange={() => handleCheckboxChange('gst')}
                            checked={checkboxValues.gst}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="gstRegFiling" className="inline mb-1 w-40">
                        GST Reg. Filing
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="gstRegFiling"
                            onChange={() => handleCheckboxChange('gstRegFiling')}
                            checked={checkboxValues.gstRegFiling}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="contactSave" className="inline mb-1 w-40">
                        Contacts Save
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="contactSave"
                            onChange={() => handleCheckboxChange('contactSave')}
                            checked={checkboxValues.contactSave}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="couponsRewards" className="inline mb-1 w-40">
                        Coupons & Rewards
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="couponsRewards"
                            onChange={() => handleCheckboxChange('couponsRewards')}
                            checked={checkboxValues.couponsRewards}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="referralBonus" className="inline mb-1 w-40">
                        Referral Bonus
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="referralBonus"
                            onChange={() => handleCheckboxChange('referralBonus')}
                            checked={checkboxValues.referralBonus}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="walletActive" className="inline mb-1 w-40">
                        Wallet Active
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="walletActive"
                            onChange={() => handleCheckboxChange('walletActive')}
                            checked={checkboxValues.walletActive}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
                <div className="lg:w-1/3 flex items-center h-12 panel">
                    <label htmlFor="subscriptions" className="inline mb-1 w-40">
                        Subscriptions
                    </label>
                    <label className="w-12 h-6 relative">
                        <input
                            type="checkbox"
                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                            id="subscriptions"
                            onChange={() => handleCheckboxChange('subscriptions')}
                            checked={checkboxValues.subscriptions}
                        />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                    <div className="w-9 mx-5">
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-primary">Mandatory</span>
                        </label>
                        <label className="inline-flex mx-2">
                            <input type="radio" name="default_text_color" className="form-radio peer" defaultChecked />
                            <span className="peer-checked:text-secondary">Optional </span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                {showStatus ? (
                    <div className="lg:w-1/3">
                        <label htmlFor="archive" className="block mb-1">
                            Status
                        </label>
                        <select name="archive" id="archive" className="form-select w-full" value={details.archive} onChange={onInputChange} disabled={!isEditable}>
                            {statusOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div className="lg:w-1/3" />
                )}
            </div>

            {/* Submit Button */}
            <button onClick={handleSubmit}>Submit</button>
        </>
    );
};

export default VehicleSubsSettingsModule;
