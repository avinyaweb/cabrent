import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { State, City } from 'country-state-city';
import ServiceCity from '../AdminTeams/ServiceCity';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getAllCountry, getAllState, getAllCity } from '@/services/RolesService';
import { getAllAdminRoles } from '@/services/UtilityServices/AdminRoleServices';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { useNavigate, Link } from 'react-router-dom';
import ServiceCityModal from '@/components/Models/ServiceCityModal';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import DistributorModal from '@/components/Models/DistributorModal';
import DistributorSettingsModal from '@/components/Models/DistributorSettingsModal';

interface ChannelPartnerModuleProps {
    details: {
        bussinessName: string;
        Distributorcategory: string;
        fk_serviceCity: string;
        firstName: string;
        middleName: string;
        lastName: string;
        email: string;
        dob: string;
        gender: string;
        mobile: string;
        altMobile: string;
        password: string;
        country: string;
        state: string;
        city: string;
        subscriptionCommisionAmountType: string;
        subscriptionCommisionAmountValue: string;
        tripsCommisionAmountType: string;
        tripsCommisionAmountValue: string;
        registrationOfficeAddress: string;
        communicationOfficeAddress: string;
        remarks: string;
        status: string;
        fk_roletype: string;
        parentDistributor: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific?: boolean;
    redirect?: boolean;
    isEditPage: boolean;
    noPassEdit: boolean;
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

const DistributorModule: React.FC<ChannelPartnerModuleProps> = ({ redirect, details, onInputChange, showStatus = true, viewSpecific, isEditPage, noPassEdit }) => {
    // future code -->>>
    // const dispatch = useDispatch();
    // const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [selectedOption, setSelectedOption] = useState<string>('Flat');
    const [subscriptionOption, setSubscriptionOption] = useState<string>('Flat'); // Initialize with a default value

    const handleRadioChange = (option: string) => {
        setSelectedOption(option);
    };

    const handleSubscriptionChange = (option: string) => {
        setSubscriptionOption(option);
    };
    // future code --->>>
    // const [roleValue, setRoleValue] = useState('');
    // const [genderValue, setGenderValue] = useState('');
    // const [commissionValue, setCommissionValue] = useState('');
    const [selectedRole, setSelectedRole] = useState(details.Distributorcategory);
    const [selectedGender, setSelectedGender] = useState(details.gender);
    const [selectedFk_Role, setSelectedFk_Role] = useState(details.fk_roletype);
    const [selectedCommission, setSelectedCommission] = useState(details.subscriptionCommisionAmountType);
    const [selectedTripsCommission, setSelectedTripsCommission] = useState(details.tripsCommisionAmountType);
    const [moduleDetails, setModuleDetails] = useState(details);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [states, setStates] = useState<StateType[]>([]);
    const [cities, setCities] = useState<CityType[]>([]);
    const [value2, setValue2] = useState('');
    const [selectedCountry, setSelectedCountry] = useState({
        label: 'India',
        value: 'IN',
    });

    //dynamic data setup
    const [state, setState] = useState(details.state);
    const [country, setCountry] = useState(details.country);
    const [city, setCity] = useState(details.city);
    const [countryOption, setCountryOption] = useState<any[]>([]);
    const [stateOption, setStateOption] = useState<any[]>([]);
    const [cityOption, setCityOption] = useState<any[]>([]);
    // future code --->>>
    // const [serviceCityOption, SetServiceCityOption] = useState<any[]>([]);
    // const [serviceCity, SetServiceCity] = useState(details.city);
    const [adminRoleOption, setAdminRoleOption] = useState<any[]>([]);
    const [adminRole, setAdminRole] = useState(details.city);

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

    //currenly just show city instant of service city
    const getAllServiceCityData = async () => {
        try {
            const data = await getAllCity();
            setCityOption(data?.data?.Cities);
        } catch (error) {
            console.log(error);
        }
    };

    //fetch all admin role from utility
    const getAllAdminRolesData = async () => {
        try {
            const data = await getAllAdminRoles();
            setAdminRoleOption(data?.data?.AdminRoles);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCountryData();
        getAllStateData();
        getAllCityData();
        getAllServiceCityData();
        getAllAdminRolesData();
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
    // future code --->>>
    // const handleServiceCityTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { value } = event.target;
    //     setCity(value);
    //     onInputChange({
    //         target: {
    //             name: 'Service city',
    //             value: value,
    //         },
    //     } as React.ChangeEvent<HTMLInputElement>);
    // };

    const handleAdminRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setAdminRole(value);
        onInputChange({
            target: {
                name: 'fk_roleType',
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

    const handleRoleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedRole(value);
        onInputChange({
            target: {
                name: 'Distributorcategory',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleGenderTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedGender(value);
        onInputChange({
            target: {
                name: 'gender',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };
    // future code --->>>
    // const handleGenderfk_roletype = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { value } = event.target;
    //     setSelectedFk_Role(value);
    //     onInputChange({
    //         target: {
    //             name: 'fk_roletype',
    //             value: value,
    //         },
    //     } as React.ChangeEvent<HTMLInputElement>);
    // };

    const handleCommissionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedCommission(value);
        onInputChange({
            target: {
                name: 'subscriptionCommisionAmountType',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleTripsTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedTripsCommission(value);
        onInputChange({
            target: {
                name: 'tripsCommisionAmountType',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };
    // future code --->>>
    // const handleCitySelection = (selectedCities: any) => {
    //     // Convert the selectedCities array of objects into a comma-separated string of city values
    //     const cityValues = selectedCities.map((city: any) => city.value).join(',');
    //     // Update the details or perform any other necessary actions with the city values
    //     setModuleDetails({ ...moduleDetails, fk_serviceCity: cityValues });
    // };

    // future code --->>>
    // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target;
    //     // Update the moduleDetails state based on the input changes
    //     setModuleDetails({ ...moduleDetails, [name]: value });
    // };

    useEffect(() => {
        if (selectedCountry) {
            const countryStates: any = State.getStatesOfCountry(selectedCountry.value);
            setStates(countryStates);
            setSelectedState(null);
            setSelectedCity(null);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedCountry && selectedState) {
            const stateCities = City.getCitiesOfState(selectedCountry.value, selectedState);
            setCities(stateCities);
            setSelectedCity(null);
        }
    }, [selectedState, selectedCountry]);

    // future code --->>>
    // const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { value } = event.target;
    //     setSelectedState(value);
    //     onInputChange({
    //         target: {
    //             name: 'state',
    //             value: value,
    //         },
    //     } as React.ChangeEvent<HTMLInputElement>);
    // };

    // const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { value } = event.target;
    //     setSelectedCity(value);
    //     // Perform any other necessary actions upon city selection
    //     onInputChange({
    //         target: {
    //             name: 'city',
    //             value: value,
    //         },
    //     } as React.ChangeEvent<HTMLInputElement>);
    // };

    // const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     // Handle dropdown change event
    // };

    const naviagte = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [modal6, setModal6] = useState(false);
    const [addedserviceCityType, setAddedServiceCityType] = useState<any>();
    const [ServiceCityData, setServiceCityData] = useState<any[]>([]);
    const [value, setValue] = useState('');

    const [selectedDistributorType, setSelectedDistributorType] = useState<any>();
    const [modalVisible, setModalVisible] = useState(false);

    const handleAddServiceCitySubmit = (selectedServiceCity: any[], userID: string) => {
        setServiceCityData(selectedServiceCity);
        setAddedServiceCityType(userID);
    };

    const handleDistributorTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedDistributorType(value);
        if (value === 'Child') {
            setModalVisible(true);
        }
    };

    const [modal7, setModal7] = useState(false);
    const [addedDristributorSettingsType, setAddedDristributorSettingsType] = useState<any>();
    const [DristributorSettingsData, setDristributorSettingsData] = useState<any[]>([]);

    const handleAddDristributorSettingsSubmit = (selectedDristributorSettings: any[], userID: string) => {
        setDristributorSettingsData(selectedDristributorSettings);
        setAddedDristributorSettingsType(userID);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="bussinessName" className="block mb-1 text-md font-bold">
                        Distributor Business Name
                    </label>
                    <input
                        name="bussinessName"
                        type="text"
                        id="bussinessName"
                        placeholder="Enter Distributor Business Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details.bussinessName}
                        value={viewSpecific ? 'DPL Sonic Ltd' : ''}
                        onChange={onInputChange}
                    />
                </div>
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="Distributorcategory" className="block mb-1 text-md font-bold">
                        Distributor category
                    </label>
                    {viewSpecific ? (
                        <input
                            name="Distributorcategory"
                            type="text"
                            id="Distributorcategory"
                            placeholder="Enter Distributor Business Name"
                            className="form-input w-full pointer-events-none"
                            value={'CEO'}
                            onChange={onInputChange}
                            readOnly
                        />
                    ) : (
                        <select id="Distributorcategory" className="form-select text-white-dark" name="Distributorcategory" required value={selectedRole} onChange={handleRoleTypeChange}>
                            <option value="">Select Distributor category</option>
                            <option value="CEO">CEO</option>
                            <option value="PROPIETOR">PROPIETOR</option>
                            <option value="MANAGER">MANAGER</option>
                            <option value="MD">MD</option>
                            <option value="MAINDISTRIBUTOR">MAINDISTRIBUTOR</option>
                            <option value="SUBDISTRIBUTOR">SUBDISTRIBUTOR</option>
                            <option value="AGENT">AGENT</option>
                        </select>
                    )}
                </div>

                <div className={`w-1/3`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_serviceCity" className="block mb-1 font-bold text-md">
                            Service City
                        </label>
                        {viewSpecific && (
                            <Link to={'/UtilityModule/ServiceCity/ViewSpecificServiceCity/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    {viewSpecific ? (
                        <input name="fk_serviceCity" type="text" id="fk_serviceCity" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={'Kochi'} readOnly />
                    ) : isEditPage ? (
                        <div>
                            {addedserviceCityType === 'serviceCityAdded' ? (
                                <button type="button" onClick={() => setModal6(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <div className="flex">
                                    <input
                                        name="fk_serviceCity"
                                        type="text"
                                        id="fk_serviceCity"
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
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="firstName" className="block mb-1 text-md font-bold">
                        First Name
                    </label>
                    <input
                        name="firstName"
                        type="text"
                        id="firstName"
                        placeholder="Enter First Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={viewSpecific ? 'Aslam' : ''}
                        onChange={onInputChange}
                    />
                </div>
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="middleName" className="block mb-1 text-md font-bold">
                        Middle Name
                    </label>
                    <input
                        name="middleName"
                        type="text"
                        id="middleName"
                        placeholder="Enter Middle Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={viewSpecific ? 'sajeev' : ''}
                        onChange={onInputChange}
                    />
                </div>
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="lastName" className="block mb-1 text-md font-bold">
                        Last Name
                    </label>
                    <input
                        name="lastName"
                        type="text"
                        id="lastName"
                        placeholder="Enter Last Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={viewSpecific ? 'cj' : ''}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="email" className="block mb-1 text-md font-bold">
                        Email Address
                    </label>
                    <input
                        name="email"
                        id="email"
                        type="text"
                        placeholder="name@gmail.com"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        // value={details.email}
                        value={viewSpecific ? 'aslam@123' : ''}
                        onChange={onInputChange}
                    />
                </div>
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="ctnEmail" className="block mb-1 text-md font-bold">
                        Date of Birth
                    </label>
                    {viewSpecific ? (
                        <input className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} readOnly={viewSpecific} value={viewSpecific ? '12-03-2024' : ''} type="text" name="dob" />
                    ) : (
                        <input className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} readOnly={viewSpecific} type="date" name="dob" onChange={onInputChange} />
                    )}
                </div>
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="gender" className="block mb-1 text-md font-bold">
                        Gender
                    </label>
                    {viewSpecific ? (
                        <input name="gender" id="gender" type="text" placeholder="gender" className="form-input w-full pointer-events-none" value={'male'} onChange={onInputChange} readOnly />
                    ) : (
                        <select id="gender" className="form-select text-white-dark" required value={selectedGender} onChange={handleGenderTypeChange}>
                            <option value="">Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHERS">Others</option>
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="fk_adminTeam" className="block mb-1 text-md font-bold">
                        Country
                    </label>
                    {viewSpecific ? (
                        <input name="country" type="tel" id="country" className="form-input w-full pointer-events-none" value="India" onChange={onInputChange} readOnly />
                    ) : (
                        <select id="fk_adminTeam" className="form-select text-white-dark" required value={details.country} onChange={handleCountryTypeChange}>
                            <option value="">Select your Country</option>
                            {countryOption.map((data) => {
                                return (
                                    <option key={data?.id} value={data?.countryName}>
                                        {data?.countryName}
                                    </option>
                                );
                            })}
                        </select>
                    )}
                </div>
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="fk_adminTeam" className="block mb-1 text-md font-bold">
                        State
                    </label>
                    {viewSpecific ? (
                        <input name="state" type="tel" id="state" className="form-input w-full pointer-events-none" value="kerala" onChange={onInputChange} readOnly />
                    ) : (
                        <select id="fk_adminTeam" className="form-select text-white-dark" required value={details.state} onChange={handleStateTypeChange}>
                            <option value="">Select your state</option>
                            {stateOption.map((data) => {
                                return <option value={data.stateName}>{data?.stateName}</option>;
                            })}
                        </select>
                    )}
                </div>
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="fk_adminTeam" className="block mb-1 text-md font-bold">
                        City
                    </label>
                    {viewSpecific ? (
                        <input name="city" type="tel" id="city" className="form-input w-full pointer-events-none" value="kochi" onChange={onInputChange} readOnly />
                    ) : (
                        <select id="fk_adminTeam" className="form-select text-white-dark" required value={details.city} onChange={handleCityTypeChange}>
                            <option value="">Select your city</option>
                            {cityOption.map((data) => {
                                return (
                                    <option key={data?.id} value={data.cityName}>
                                        {data?.cityName}
                                    </option>
                                );
                            })}
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="mobile" className="block mb-1 text-md font-bold">
                        Mobile Number
                    </label>
                    <input
                        name="mobile"
                        type="tel"
                        id="mobile"
                        placeholder="(+91) Enter Mobile Number"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={viewSpecific ? '934628346237' : ''}
                        onChange={onInputChange}
                    />
                </div>
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="altMobile" className="block mb-1 text-md font-bold">
                        Alternative Mobile Number
                    </label>
                    <input
                        name="altMobile"
                        type="tel"
                        id="altMobile"
                        placeholder="(+91) Enter Alternative Mobile Number"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={viewSpecific ? '2351737128' : ''}
                        onChange={onInputChange}
                    />
                </div>

                <div className={`lg:w-1/3 ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="distributorType" className="block mb-1 text-md font-bold">
                        Distributor Type
                    </label>
                    <select
                        name="distributorType"
                        id="distributorType"
                        className={`form-select w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        disabled={viewSpecific}
                        value={selectedDistributorType}
                        onChange={handleDistributorTypeChange}
                    >
                        <option value="" disabled>
                            {viewSpecific ? '' : 'Select Distributor Type'}
                        </option>
                        <option value="Parent">Parent</option>
                        <option value="Child">Child</option>
                    </select>
                </div>

                {modalVisible && (
                    <DistributorModal
                        event={modalVisible}
                        closeModal={() => setModalVisible(false)}
                        onAddChannelPartner={() => {
                            // Handle the addition of a channel partner
                            setModalVisible(false);
                        }}
                    />
                )}
            </div>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`lg:w-1/3 ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="passwordHash" className="block mb-1 text-md font-bold flex-row items-center gap-2">
                        Password
                        {noPassEdit && (
                            <>
                                <span className="ml-2 text-sm text-blue-600 cursor-pointer">Reset Password</span>
                                <FaArrowUpRightFromSquare className="text-blue-600" onClick={() => naviagte('/ResetPassword')} />
                            </>
                        )}
                    </label>
                    <div className="relative">
                        <input
                            name="passwordHash"
                            type={showPassword ? 'text' : 'password'}
                            id="passwordHash"
                            placeholder={viewSpecific ? '' : 'Enter Password'}
                            className={`form-input w-full ${viewSpecific || noPassEdit ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            // value={details.password}
                            value={viewSpecific ? '2131231' : ''}
                            onChange={onInputChange}
                        />
                        <button type="button" className="absolute inset-y-0 right-0 px-3 text-gray-600 focus:outline-none" onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <div className={`lg:w-1/3 ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="invitelinkforTravelagency" className="block mb-1 text-md font-bold">
                        Invite Link for TravelAgency
                    </label>
                    <input
                        name="invitelinkforTravelagency"
                        type="number"
                        id="invitelinkforTravelagency"
                        placeholder="Enter Invite Link for TravelAgency"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={viewSpecific ? 'http:20.235.243.171/#/company-driversignup/bc026536a1' : ''}
                        onChange={onInputChange}
                    />
                </div>

                <div className={`lg:w-1/3 ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="distributionCategory" className="block mb-1 text-md font-bold">
                        Distribution Category
                    </label>
                    <select
                        name="distributionCategory"
                        id="distributionCategory"
                        className={`form-select w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        disabled={viewSpecific}
                        value={viewSpecific ? 'Silver' : ''}
                        // onChange={onInputChange}
                    >
                        <option value="Silver">Silver</option>
                        <option value="Gold">Gold</option>
                        <option value="Platinum">Platinum</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="fk_roletype" className="block mb-1 text-md font-bold">
                        Role
                    </label>
                    {viewSpecific ? (
                        <input
                            name="fk_roletype"
                            id="fk_roletype"
                            type="text"
                            placeholder="Select Role"
                            className="form-input w-full pointer-events-none"
                            value={'role 1'}
                            onChange={onInputChange}
                            readOnly
                        />
                    ) : (
                        <select id="fk_roleType" className="form-select text-white-dark" required value={details.fk_roletype} onChange={handleAdminRoleChange}>
                            <option value="">Select Admin Role</option>
                            {adminRoleOption.map((data) => {
                                return (
                                    <option key={data?.id} value={data.adminRoleName}>
                                        {data?.adminRoleName}
                                    </option>
                                );
                            })}
                        </select>
                    )}
                </div>

                <div className={`w-1/3`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="distributorsettings" className="block mb-1 font-bold text-md">
                            Distributor Settings
                        </label>
                        {viewSpecific && (
                            <Link to={'/AdminModule/Distributor/DistributorSettings/ViewSpecificDistributorSettings/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    {viewSpecific ? (
                        <input name="distributorsettings" type="text" id="distributorsettings" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} readOnly />
                    ) : isEditPage ? (
                        <div>
                            {addedDristributorSettingsType === 'serviceCityAdded' ? (
                                <button type="button" onClick={() => setModal7(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <div className="flex">
                                    <input
                                        name="distributorsettings"
                                        type="text"
                                        id="distributorsettings"
                                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                        // value={details.distributorsettings}
                                        // value= "section 1"
                                        readOnly
                                    />
                                    <button type="button" onClick={() => setModal7(true)} className="btn btn-primary w-1/3">
                                        Edit
                                    </button>
                                    <DistributorSettingsModal event={modal7} closeModal={() => setModal7(false)} onAddChannelPartner={handleAddDristributorSettingsSubmit} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {addedDristributorSettingsType === 'serviceCityAdded' ? (
                                <button type="button" onClick={() => setModal7(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <button type="button" onClick={() => setModal7(true)} className="btn btn-primary w-full">
                                    Add distributor Settings
                                </button>
                            )}
                            <DistributorSettingsModal event={modal7} closeModal={() => setModal7(false)} onAddChannelPartner={handleAddDristributorSettingsSubmit} />
                        </div>
                    )}
                </div>

                <div className={`w-1/3`}></div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/2">
                    <label htmlFor="registrationOfficeAddress" className="block mb-1 text-md font-bold">
                        Register Office Address
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
                <div className="lg:w-1/2">
                    <label htmlFor="communicationOfficeAddress" className="block mb-1 text-md font-bold">
                        Communication Office Address
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

                {showStatus ? ( // Conditionally rendering based on the showStatus prop
                    <div className={`w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                        <label htmlFor="status" className="block mb-1 text-md font-bold">
                            Status
                        </label>
                        {viewSpecific ? (
                            <input name="status" type="text" id="status" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={'APPROVED'} onChange={onInputChange} />
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
                    <div className="lg:w-1/3" /> //Empty div when showStatus is false
                )}
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6"></div>

            <hr className="mt-10" />

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`w-1/2   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="subscriptionPercentageAmount" className="block mb-3 text-md font-bold">
                        Trip Commission:
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="inline-flex">
                                <input type="radio" name="radioOption" disabled={viewSpecific} className="form-radio" checked={selectedOption === 'Flat'} onChange={() => handleRadioChange('Flat')} />
                                <span>Flat</span>
                            </label>
                        </div>
                        <div>
                            <label className="inline-flex">
                                <input
                                    type="radio"
                                    name="radioOption"
                                    disabled={viewSpecific}
                                    className="form-radio"
                                    checked={selectedOption === 'Percentage'}
                                    onChange={() => handleRadioChange('Percentage')}
                                />
                                <span>Percentage</span>
                            </label>
                        </div>
                    </div>
                </div>

                {selectedOption === 'Percentage' ? (
                    <div className={`w-1/2   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                        <label htmlFor="percentageAmount" className="block mb-1 text-md font-bold">
                            {viewSpecific ? '' : 'Enter The percentage Amount'}
                        </label>
                        <input
                            name="percentageAmount"
                            type="number"
                            id="percentageAmount"
                            placeholder={`${viewSpecific ? `` : `Enter Percentage Amount`}`}
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            // value={details.percentageAmount}
                            onChange={onInputChange}
                        />
                    </div>
                ) : (
                    <div className={`w-1/2   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                        <label htmlFor="flatAmount" className="block mb-1 text-md font-bold">
                            {viewSpecific ? '' : 'Enter The Flat Amount'}
                        </label>
                        <input
                            name="flatAmount"
                            type="number"
                            id="flatAmount"
                            placeholder={`${viewSpecific ? `` : `Enter Flat Amount`}`}
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            // value={details.flatAmount}
                            onChange={onInputChange}
                        />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`w-1/2   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="subscriptionPercentageAmount" className="block mb-3 text-md font-bold">
                        Subscription Commission:
                    </label>
                    <div className="space-y-2">
                        <div>
                            <label className="inline-flex">
                                <input
                                    type="radio"
                                    name="subscriptionOption"
                                    disabled={viewSpecific}
                                    className="form-radio"
                                    checked={subscriptionOption === 'Flat'}
                                    onChange={() => handleSubscriptionChange('Flat')}
                                />
                                <span>Flat</span>
                            </label>
                        </div>
                        <div>
                            <label className="inline-flex">
                                <input
                                    type="radio"
                                    name="subscriptionOption"
                                    disabled={viewSpecific}
                                    className="form-radio"
                                    checked={subscriptionOption === 'Percentage'}
                                    onChange={() => handleSubscriptionChange('Percentage')}
                                />
                                <span>Percentage</span>
                            </label>
                        </div>
                    </div>
                </div>

                {subscriptionOption === 'Percentage' ? (
                    <div className={`w-1/2   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                        <label htmlFor="subscriptionPercentageAmount" className="block mb-1 text-md font-bold">
                            {viewSpecific ? '' : 'Enter Percentage Amount'}
                        </label>
                        <input
                            name="subscriptionPercentageAmount"
                            type="number"
                            id="subscriptionPercentageAmount"
                            placeholder={`${viewSpecific ? `` : `Enter Percentage Amount`}`}
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            // value={subscriptionDetails.percentageAmount}
                            onChange={onInputChange}
                        />
                    </div>
                ) : (
                    <div className={`w-1/2   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                        <label htmlFor="subscriptionFlatAmount" className="block mb-1 text-md font-bold">
                            {viewSpecific ? '' : 'Enter Flat Amount'}
                        </label>
                        <input
                            name="subscriptionFlatAmount"
                            type="number"
                            id="subscriptionFlatAmount"
                            placeholder={`${viewSpecific ? `` : `Enter Flat Amount`}`}
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            // value={subscriptionDetails.flatAmount}
                            onChange={onInputChange}
                        />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 mb-14">
                <div className="lg:w-1/2 ">
                    <label htmlFor="commAddress" className="block mb-1 text-md font-bold">
                        Remarks
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

export default DistributorModule;
