import React, { useState, useEffect, ChangeEvent } from 'react';
import { City } from 'country-state-city';
import { getAllCountry, getAllState, getAllCity } from '@/services/RolesService';
import { getAllCompanyType } from '@/services/UtilityServices/CompanyTypeService';
import ReactQuill from 'react-quill';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import ChannelPartnerModal from '@/components/Models/ChannelPartnerModal';
import 'flatpickr/dist/flatpickr.css';
import 'react-quill/dist/quill.snow.css';
import DistributorModal from '@/components/Models/DistributorModal';
import { IoEye, IoEyeOff } from 'react-icons/io5';

interface FleetOwnerProps {
    details: {
        companyType: string;
        distributor: string;
        TravelAgencyType: string;
        TravelAgencyName: string;
        firstName: string;
        middleName: string;
        lastName: string;
        email: string;
        dob: string;
        gender: string;
        fatherName: string;
        mobileNumber: string;
        altMobileNumber: string;
        country: string;
        state: string;
        city: string;
        regAddress: string;
        commAddress: string;
        fk_serviceCity: string;
        ProfileStatus: string;
        leasedVehicle: string;
        agreedSaasContract: boolean;
        digitalTravelAgencyOwner: boolean;
        leasedAgreementImg: string;
        walletAmount: string;
        walletStatus: string;
        activeDriver: string;
        inactiveDriver: string;
        activeVehicle: string;
        inactiveVehicle: string;
        numberOfVehicle: string;
        numberOfDriver: string;
        Password: string;
        uniqueId: string;
        vehicleNumber: string;
        driverMobileNumber: string;
        driverName: string;
        driverPassword: string;
        referralCode: string;
        referredBy: string;
        distributorCode: string;
        ownerAddress: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    isEditPage?: boolean;
    viewSpecific?: boolean;
    noPassEdit?: boolean;
}

// Define the StateType type to represent the structure of the state object
type StateType = {
    name: string;
    isoCode: string;
    countryIsoCode: string;
};

// Define the CityType type to represent the structure of the city object
type CityType = {
    name: string;
    stateCode: string;
    countryCode: string;
};

const FleetOwnerModule: React.FC<FleetOwnerProps> = ({ details, onInputChange, showStatus = true, viewSpecific, isEditPage, noPassEdit }) => {
    //const [roleOptions, setRoleOptions] = useState<{ label: string; value: string }[]>([]);
    const [selectedCompany, setSelectedCompany] = useState(details.companyType);
    const [selectedChannelPartner, setSelectedChannelPartner] = useState(details.distributor);
    const [selectedFleetManagement, setSelectedFleetManagement] = useState(details.TravelAgencyType);
    const [genderValue, setGenderValue] = useState('');
    const [selectedGender, setSelectedGender] = useState(details.gender);
    const [moduleDetails, setModuleDetails] = useState(details);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [cities, setCities] = useState<CityType[]>([]);
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');
    const [IsOwner, setIsOwner] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({
        label: 'India',
        value: 'IN',
    });

    const [state, setState] = useState(details.state);
    const [country, setCountry] = useState(details.country);
    const [city, setCity] = useState(details.city);
    const [countryOption, setCountryOption] = useState<any[]>([]);
    const [stateOption, setStateOption] = useState<any[]>([]);
    const [cityOption, setCityOption] = useState<any[]>([]);
    const [companyOption, SetcompanyTypeOption] = useState<any[]>([]);

    const getAllCountryData = async () => {
        try {
            const data = await getAllCountry();
            setCountryOption(data?.data?.Countries);
        } catch (error) {
            console.log(error);
        }
    };
    const getAllStateData = async () => {
        try {
            const data = await getAllState();
            setStateOption(data?.data?.States);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllCityData = async () => {
        try {
            const data = await getAllCity();
            setCityOption(data?.data?.Cities);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllServiceCityData = async () => {
        try {
            const data = await getAllCity();
            setCityOption(data?.data?.Cities);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllCompanyTypeData = async () => {
        try {
            const data = await getAllCompanyType();
            SetcompanyTypeOption(data?.data?.CompanyTypes);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCountryData();
        getAllStateData();
        getAllCityData();
        getAllServiceCityData();
        getAllCompanyTypeData();
    }, []);

    const handleCountryTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setCountry(value);
        onInputChange({
            target: {
                name: 'country',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleStateTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setState(value);
        onInputChange({
            target: {
                name: 'state',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

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

    const handleCompanyTypeChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setCity(value);
        onInputChange({
            target: {
                name: 'companyType',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    // Get today's date in the format 'YYYY-MM-DD'
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;

    const [date1, setDate1] = useState<any>(formattedToday);
    // handle select dropdown.
    const handleCompanyTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedCompany(value);
        onInputChange({
            target: {
                name: 'companyType',
                value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };
    // handle select dropdown.
    const handledistributorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedChannelPartner(value);
        onInputChange({
            target: {
                name: 'distributor',
                value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };
    // handle select dropdown.
    const handleTravelAgencyTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        if (value === 'Owner') {
            setIsOwner(true);
        } else {
            setIsOwner(false);
        }
        setSelectedFleetManagement(value);
        onInputChange({
            target: {
                name: 'TravelAgencyType',
                value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    // handle select dropdown.
    const handleGenderTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedGender(value);
        onInputChange({
            target: {
                name: 'gender',
                value: genderValue,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

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

    useEffect(() => {
        if (selectedCountry && selectedState) {
            const stateCities = City.getCitiesOfState(selectedCountry.value, selectedState);
            setCities(stateCities);
            setSelectedCity(null);
        }
    }, [selectedState, selectedCountry]);

    //Will use in future
    // const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { value } = event.target;
    //     setSelectedState(value);
    // };
    // const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { value } = event.target;
    //     setSelectedCity(value);
    // };

    const [modal5, setModal5] = useState(false);

    const [SelectedCHPartner, setSelectedCHPartners] = useState<any[]>([]);
    const [ServiceCityData, setServiceCityData] = useState<any[]>([]);
    const [addedserviceCityType, setAddedServiceCityType] = useState<any>();
    const [addedCHPartnersType, setAddedCHPartnersType] = useState<any>();

    const handleAddUserSubmit = (selectedCHPartners: any[], userID: string) => {
        setSelectedCHPartners(selectedCHPartners);
        setAddedCHPartnersType(userID);
    };

    const handleAddServiceCitySubmit = (selectedServiceCity: any[], userID: string) => {
        setServiceCityData(selectedServiceCity);
        setAddedServiceCityType(userID);
    };

    const navigate = useNavigate();

    //password visibility:
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    //password visibility:
    const [showDriverPassword, setShowDriverPassword] = useState(false);

    const toggleDriverPasswordVisibility = () => {
        setShowDriverPassword((prevState) => !prevState);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none ` : `lg:w-1/3`}`}>
                    <label htmlFor="serviceProviderType" className="block mb-1 font-bold text-md">
                        Company Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="serviceProviderType"
                            type="text"
                            id="serviceProviderType"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            // value={details.serviceProviderType}
                            value={'Proprietorship'}
                            readOnly
                        />
                    ) : (
                        <select id="fk_adminTeam" className="form-select text-white-dark" required value={details.companyType} onChange={handleCompanyTypeChanged}>
                            <option value="">Select Company Type</option>
                            <option value="Proprietorship">Proprietorship</option>
                            <option value="Partnership">Partnership</option>
                            <option value="Privatelimited">Privatelimited</option>
                            {/* {companyOption.map((data) => {
                                return <option value={data.companyTypeName}>{data?.companyTypeName}</option>;
                            })} */}
                        </select>
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none ` : `lg:w-1/3`}`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="distributor" className="block mb-1 font-bold text-md">
                            Distributor
                        </label>
                        {viewSpecific && (
                            <Link to={'/AdminModule/Distributor/ViewSpecificDistributor/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    {viewSpecific ? (
                        <input name="distributor" type="text" id="distributor" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={details.distributor} readOnly />
                    ) : isEditPage ? (
                        <div>
                            {addedCHPartnersType === 'chPartnerAdded' ? (
                                <button type="button" onClick={() => setModal5(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <div className="flex">
                                    <input
                                        name="distributor"
                                        type="text"
                                        id="distributor"
                                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                        value={details.distributor}
                                        readOnly
                                    />
                                    <button type="button" onClick={() => setModal5(true)} className="btn btn-primary w-1/3">
                                        Edit
                                    </button>
                                    <ChannelPartnerModal event={modal5} closeModal={() => setModal5(false)} onAddChannelPartner={handleAddUserSubmit} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {addedCHPartnersType === 'chPartnerAdded' ? (
                                <button type="button" onClick={() => setModal5(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <button type="button" onClick={() => setModal5(true)} className="btn btn-primary w-full">
                                    Add Distributor
                                </button>
                            )}
                            <DistributorModal event={modal5} closeModal={() => setModal5(false)} onAddChannelPartner={handleAddUserSubmit} />
                        </div>
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none ` : `lg:w-1/3`}`}>
                    <label htmlFor="TravelAgencyType" className="block mb-1 font-bold text-md">
                        Travel Agency Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="TravelAgencyType"
                            type="text"
                            id="TravelAgencyType"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            // value={details.TravelAgencyType}
                            value={'Owner Com Driver'}
                            readOnly
                        />
                    ) : (
                        <select id="TravelAgencyType" className="form-select text-white-dark" required value={details.TravelAgencyType} onChange={handleTravelAgencyTypeChange}>
                            <option value="">Select Fleet Management</option>
                            <option value="OwnerCumDriver">Owner cum Driver</option>
                            <option value="Owner">Owner</option>
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <label htmlFor="firstName" className="block mb-1 text-md font-bold">
                        First Name
                    </label>
                    <input
                        name="firstName"
                        type="text"
                        id="firstName"
                        placeholder="Enter First Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        value={details.firstName}
                        onChange={onInputChange}
                        readOnly={viewSpecific}
                    />
                </div>
                <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <label htmlFor="middleName" className="block mb-1 text-md font-bold">
                        Middle Name
                    </label>
                    <input
                        name="middleName"
                        type="text"
                        id="middleName"
                        placeholder="Enter Middle Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        value={details.middleName}
                        onChange={onInputChange}
                        readOnly={viewSpecific}
                    />
                </div>
                <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <label htmlFor="lastName" className="block mb-1 text-md font-bold">
                        Last Name
                    </label>
                    <input
                        name="lastName"
                        type="text"
                        id="lastName"
                        placeholder="Enter Last Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        value={details.lastName}
                        onChange={onInputChange}
                        readOnly={viewSpecific}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <label htmlFor="email" className="block mb-1 text-md font-bold">
                        Email Address
                    </label>
                    <input
                        name="email"
                        id="email"
                        type="text"
                        placeholder="Example@gmail.com"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        value={details.email}
                        onChange={onInputChange} // Assuming you have an onInputChange function to handle input changes
                        readOnly={viewSpecific}
                    />
                </div>
                <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <label htmlFor="ctnEmail" className="block mb-1 text-md font-bold">
                        Date of Birth
                    </label>
                    <input
                        name="ctnEmail"
                        id="ctnEmail"
                        type="text"
                        placeholder="Enter Date of Birth"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        value={date1}
                        onChange={(e) => setDate1(e.target.value)} // Assuming date1 is controlled state for the date
                        readOnly={viewSpecific}
                    />
                </div>
                <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <label htmlFor="gender" className="block mb-1 text-md font-bold">
                        Gender
                    </label>
                    {viewSpecific ? (
                        <input id="gender" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={'Male'} readOnly />
                    ) : (
                        <select
                            id="gender"
                            className="form-select text-white-dark"
                            required
                            value={selectedGender}
                            onChange={handleGenderTypeChange} // Assuming you have a function to handle gender type change
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <label htmlFor="numberOfVehicle" className="block mb-1 text-md font-bold">
                        Number of Vehicle
                    </label>
                    <input
                        name="email"
                        id="numberOfVehicle"
                        type="number"
                        placeholder="Enter Number of Vehicle"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        value={details.numberOfVehicle}
                        onChange={onInputChange} // Assuming you have an onInputChange function to handle input changes
                        readOnly={viewSpecific}
                    />
                </div>
                <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <label htmlFor="numberOfDriver" className="block mb-1 text-md font-bold">
                        Number of Driver
                    </label>
                    <input
                        name="email"
                        id="numberOfDriver"
                        type="number"
                        placeholder="Enter Number of Driver"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        value={details.numberOfDriver}
                        onChange={onInputChange} // Assuming you have an onInputChange function to handle input changes
                        readOnly={viewSpecific}
                    />
                </div>
                {/* <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <label htmlFor="Password" className="block mb-1 text-md font-bold">
                        Agency Password
                    </label>
                    <input
                        name="password"
                        id="Password"
                        type="password"
                        placeholder="Enter Password"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        value={details.Password}
                        onChange={onInputChange} // Assuming you have an onInputChange function to handle input changes
                        readOnly={viewSpecific}
                    />
                </div> */}

                <div className={`lg:w-1/3 `}>
                    <label htmlFor="password" className="block mb-1 text-md font-bold flex flex-row items-center gap-2">
                        Password
                        {showPassword ? (
                            <IoEyeOff className="text-gray-600 cursor-pointer" onClick={togglePasswordVisibility} />
                        ) : (
                            <IoEye className="text-gray-600 cursor-pointer" onClick={togglePasswordVisibility} />
                        )}
                        {noPassEdit && (
                            <>
                                <span className="ml-2 text-sm text-blue-600 cursor-pointer">Reset Password</span>
                                <FaArrowUpRightFromSquare className="text-blue-600 " onClick={() => navigate('/ResetPassword')} />
                            </>
                        )}
                    </label>
                    <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        placeholder={viewSpecific ? '' : 'Enter Password'}
                        className={`form-input w-full ${viewSpecific || noPassEdit ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.Password}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            {viewSpecific && (
                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                    <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                        <label htmlFor="uniqueId" className="block mb-1 text-md font-bold">
                            Agency ID
                        </label>
                        <input
                            name="uniqueId"
                            id="uniqueId"
                            type="text"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details.uniqueId}
                            onChange={onInputChange}
                            readOnly={viewSpecific}
                        />
                    </div>
                    <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                        <label htmlFor="referredBy" className="block mb-1 text-md font-bold">
                            Refferal by
                        </label>
                        <input name="referredBy" id="referredBy" type="text" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={details.referredBy} readOnly={true} />
                    </div>
                    <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                        <label htmlFor="distributorCode" className="block mb-1 text-md font-bold">
                            Distributor ID
                        </label>
                        <input
                            name="distributorCode"
                            id="distributorCode"
                            type="text"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details.distributorCode}
                            onChange={onInputChange}
                            readOnly={viewSpecific}
                        />
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <label htmlFor=" travelAgencyName" className="block mb-1 text-md font-bold">
                        Travel Agency Name
                    </label>
                    <input
                        name=" travelAgencyName"
                        id=" travelAgencyName"
                        type="text"
                        placeholder="Enter Company Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        value={details.TravelAgencyName}
                        onChange={onInputChange}
                        readOnly={viewSpecific}
                    />
                </div>

                <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <label htmlFor="mobileNumber" className="block mb-1 text-md font-bold">
                        Mobile Number
                    </label>
                    <input
                        name="mobileNumber"
                        id="mobileNumber"
                        type="number"
                        placeholder="(+91) Enter Mobile Number"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        value={details.mobileNumber}
                        onChange={onInputChange} // Assuming you have an onInputChange function to handle input changes
                        readOnly={viewSpecific}
                    />
                </div>

                <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <label htmlFor="altMobileNumber" className="block mb-1 text-md font-bold">
                        Alternative Mobile Number
                    </label>
                    <input
                        name="altMobileNumber"
                        id="altMobileNumber"
                        type="number"
                        placeholder="(+91) Enter Alt. Mobile Number"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        value={details.altMobileNumber}
                        onChange={onInputChange} // Assuming you have an onInputChange function to handle input changes
                        readOnly={viewSpecific}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none ` : `lg:w-1/3`}`}>
                    <label htmlFor="fk_adminTeam" className="block mb-1 font-bold text-md">
                        Country
                    </label>
                    {viewSpecific ? (
                        <input
                            name="country"
                            type="tel"
                            id="country"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details.country}
                            onChange={onInputChange}
                            readOnly
                        />
                    ) : (
                        <select id="fk_adminTeam" className="form-select text-white-dark" required value={details.country} onChange={handleCountryTypeChange}>
                            <option value="">Select your Country</option>
                            {countryOption.map((data) => {
                                return <option value={data?.countryName}>{data?.countryName}</option>;
                            })}
                        </select>
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none ` : `lg:w-1/3`}`}>
                    <label htmlFor="fk_adminTeam" className="block mb-1 font-bold text-md">
                        State
                    </label>
                    {viewSpecific ? (
                        <input
                            name="state"
                            type="tel"
                            id="state"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details.state}
                            onChange={onInputChange}
                            readOnly
                        />
                    ) : (
                        <select id="fk_adminTeam" className="form-select text-white-dark" required value={details.state} onChange={handleStateTypeChange}>
                            <option value="">Select your state</option>
                            {stateOption.map((data) => {
                                return <option value={data.stateName}>{data?.stateName}</option>;
                            })}
                        </select>
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none ` : `lg:w-1/3`}`}>
                    <label htmlFor="fk_adminTeam" className="block mb-1 font-bold text-md">
                        City
                    </label>
                    {viewSpecific ? (
                        <input name="city" type="tel" id="city" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={details.city} onChange={onInputChange} readOnly />
                    ) : (
                        <select id="fk_adminTeam" className="form-select text-white-dark" required value={details.city} onChange={handleCityTypeChange}>
                            <option value="">Select your city</option>
                            {cityOption.map((data) => {
                                return <option value={data.cityName}>{data?.cityName}</option>;
                            })}
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none ` : `lg:w-1/3`}`}>
                    <label htmlFor="fk_adminTeam" className="block mb-1 font-bold text-md">
                        Agreed Saas Contract
                    </label>
                    {viewSpecific ? (
                        <input name="city" type="tel" id="city" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={'yes'} onChange={onInputChange} readOnly />
                    ) : (
                        <input name="city" type="tel" id="city" className={`form-input w-full `} value={'true'} onChange={onInputChange} />
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none ` : `lg:w-1/3`}`}>
                    <label htmlFor="fk_adminTeam" className="block mb-1 font-bold text-md">
                        Digital Travel Agency Owner
                    </label>
                    {viewSpecific ? (
                        <input name="city" type="tel" id="city" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={'yes'} onChange={onInputChange} readOnly />
                    ) : (
                        <input name="city" type="tel" id="city" className={`form-input w-full `} value={'true'} onChange={onInputChange} />
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none ` : `lg:w-1/3`}`}>
                    <label htmlFor="fk_adminTeam" className="block mb-1 font-bold text-md">
                        Travel Agency Status
                    </label>
                    {viewSpecific ? (
                        <input name="status" type="text" id="status" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={'Approved'} onChange={onInputChange} />
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
            </div>

            {IsOwner ? (
                <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                    <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                        <label htmlFor="driverName" className="block mb-1 text-md font-bold">
                            Driver Name
                        </label>
                        <input
                            name="driverName"
                            type="text"
                            id="driverName"
                            placeholder="Enter Driver Name"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details?.driverName}
                            onChange={onInputChange}
                            readOnly={viewSpecific}
                        />
                    </div>
                    <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                        <label htmlFor="driverNumber" className="block mb-1 text-md font-bold">
                            Driver Number
                        </label>
                        <input
                            name="driverNumber"
                            type="number"
                            id="driverNumber"
                            placeholder="Enter Driver Number"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details.driverMobileNumber}
                            onChange={onInputChange}
                            readOnly={viewSpecific}
                        />
                    </div>
                    {/* <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                        <label htmlFor="driverPassword" className="block mb-1 text-md font-bold">
                            Driver Password
                        </label>
                        <input
                            name="driverPassword"
                            type="password"
                            id="driverPassword"
                            placeholder="Enter Driver Password"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details.driverPassword}
                            onChange={onInputChange}
                            readOnly={viewSpecific}
                        />
                    </div> */}

                    <div className={`lg:w-1/3 `}>
                        <label htmlFor="driverPassword" className="block mb-1 text-md font-bold flex flex-row items-center gap-2">
                            Driver Password
                            {showDriverPassword ? (
                                <IoEyeOff className="text-gray-600 cursor-pointer" onClick={toggleDriverPasswordVisibility} />
                            ) : (
                                <IoEye className="text-gray-600 cursor-pointer" onClick={toggleDriverPasswordVisibility} />
                            )}
                            {noPassEdit && (
                                <>
                                    <span className="ml-2 text-sm text-blue-600 cursor-pointer">Reset Password</span>
                                    <FaArrowUpRightFromSquare className="text-blue-600 " onClick={() => navigate('/ResetPassword')} />
                                </>
                            )}
                        </label>
                        <input
                            name="driverPassword"
                            type={showDriverPassword ? 'text' : 'password'}
                            id="driverPassword"
                            placeholder={viewSpecific ? '' : 'Enter Password'}
                            className={`form-input w-full ${viewSpecific || noPassEdit ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.driverPassword}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
            ) : (
                <></>
            )}

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 mb-10">
                <div className="lg:w-1/2">
                    <label htmlFor="regAddress" className="block mb-1 text-md font-bold">
                        Registration Address
                    </label>
                    {viewSpecific ? (
                        <div className=" w-full border rounded-md text-start h-28 pointer-events-none">
                            <p className="m-2 ">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quaerat dolorem corporis numquam dolorum repellat dignissimos consectetur perspiciatis in, aliquam tenetur
                                cupiditate veniam aliquid impedit odit repudiandae asperiores nam soluta
                            </p>
                        </div>
                    ) : (
                        <ReactQuill theme="snow" value={value} onChange={setValue} className={`h-24 w-full`} />
                    )}
                </div>
                <div className="lg:w-1/2 ">
                    <label htmlFor="commAddress" className="block mb-1 text-md font-bold">
                        Owner Address
                    </label>
                    {viewSpecific ? (
                        <div className=" w-full border rounded-md text-start h-28 pointer-events-none">
                            <p className="m-2 ">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quaerat dolorem corporis numquam dolorum repellat dignissimos consectetur perspiciatis in, aliquam tenetur
                                cupiditate veniam aliquid impedit odit repudiandae asperiores nam soluta
                            </p>
                        </div>
                    ) : (
                        <ReactQuill theme="snow" value={value2} onChange={setValue2} className={`h-24 w-full`} />
                    )}
                </div>
            </div>
        </>
    );
};

export default FleetOwnerModule;
