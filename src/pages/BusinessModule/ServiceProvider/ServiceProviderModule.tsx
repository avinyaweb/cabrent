import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { State, City } from 'country-state-city';
import { Link } from 'react-router-dom';
import ServiceCity from '../../AdminModule/AdminTeams/ServiceCity';
import { getAllCountry, getAllState, getAllCity } from '@/services/RolesService';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import ChannelPartnerModal from '@/components/Models/ChannelPartnerModal';
import FleetOwnerDetailsModal from '@/components/Models/FleetOwnerDetailsModal';

interface ServiceProviderProps {
    details: {
        serviceProviderType: string;
        driverKey: string;
        channelPartnerType: string;
        TravelAgency: string;
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
        dlNumber: string;
        dlValidity: string;
        policeVerNumber: string;
        batchNumber: string;
        batchValidity: string;
        password: string;
        permanentAddress: string;
        presentAddress: string;
        registerAddress: string;
        fk_serviceCity: string;
        badgeNumber: string;
        badgeValidity: string;
        isAvailable: boolean;
        driverStatus: string;
        driverLocation: boolean;
        emergencyContact: string;
        driverApprovalDate: string;
        panNumber: string;
        rtoDisplayCard: string;
        stateAndRto: string;
        verificationHistory: string;
        archive: string;

        profileImage: string;
        drivinglicense: string;
        aadharCard: string;
        aadharImages: string;
        panImages: string;
        panCard: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    noPassEdit: boolean;
    viewSpecific?: boolean;
    isEditPage?: boolean;
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

const ServiceProviderModule: React.FC<ServiceProviderProps> = ({ details, onInputChange, showStatus = true, viewSpecific, noPassEdit, isEditPage }: any) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    //const [roleOptions, setRoleOptions] = useState<{ label: string; value: string }[]>([]);
    const [selectedServiceProvider, setSelectedServiceProvider] = useState(details.serviceProviderType);
    const [selectedChannelPartner, setSelectedChannelPartner] = useState(details.channelPartnerType);
    const [selectedFleetManagement, setSelectedFleetManagement] = useState(details.TravelAgency);
    const [genderValue, setGenderValue] = useState('');
    const [selectedGender, setSelectedGender] = useState(details.gender);
    const [moduleDetails, setModuleDetails] = useState(details);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [states, setStates] = useState<StateType[]>([]);
    const [cities, setCities] = useState<CityType[]>([]);
    const [SelectedCHPartner, setSelectedCHPartners] = useState<any[]>([]);
    const [addedCHPartnersType, setAddedCHPartnersType] = useState<any>();
    const [modal5, setModal5] = useState(false);
    const [modal7, setModal7] = useState(false);
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
    const [serviceCityOption, SetServiceCityOption] = useState<any[]>([]);
    const [serviceCity, SetServiceCity] = useState(details.city);

    // popup channel partner
    const handleAddUserSubmit = (selectedCHPartners: any[], userID: string) => {
        setSelectedCHPartners(selectedCHPartners);
        setAddedCHPartnersType(userID);
    };

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

    const navigate = useNavigate();

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
        getAllCountryData();
        getAllStateData();
        getAllCityData();
        getAllServiceCityData();
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

    // Get today's date in the format 'YYYY-MM-DD'
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;
    const [date1, setDate1] = useState<any>(formattedToday);

    // select drowpdown Handle function.
    const handleServiceProviderTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedServiceProvider(value);
        onInputChange({
            target: {
                name: 'serviceProviderType',
                value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };
    // select drowpdown Handle function.
    const handleChannelPartnerTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedChannelPartner(value);
        onInputChange({
            target: {
                name: 'channelPartnerType',
                value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };
    // select drowpdown Handle function.
    const handleTravelAgencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedFleetManagement(value);
        onInputChange({
            target: {
                name: 'TravelAgency',
                value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };
    // select drowpdown Handle function.
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
        if (selectedCountry) {
            const countryStates: StateType[] = State.getStatesOfCountry(selectedCountry.value).map((state) => ({
                ...state,
                countryIsoCode: selectedCountry.value, // Assuming selectedCountry has a countryIsoCode property
            }));
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

    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedState(value);
    };

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedCity(value);
        // Perform any other necessary actions upon city selection
    };

    // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { name, value } = e.target;
    //     const inputValue = value === 'true' ? 'true' : 'false'; // Convert boolean to string
    //     const eventObject: React.ChangeEvent<HTMLInputElement> = {
    //         target: {
    //             name,
    //             value: inputValue,
    //             type: 'checkbox',
    //         },
    //     };
    //     handleInputChange(eventObject);
    // };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="serviceProviderType" className="block mb-1 font-bold text-md">
                        Driver Type
                    </label>
                    {viewSpecific ? (
                        <input name="serviceProviderType" type="text" id="serviceProviderType" className="form-input w-full pointer-events-none" value={details.serviceProviderType} readOnly />
                    ) : (
                        <select id="serviceProviderType" className="form-select text-white-dark" required value={details.serviceProviderType} onChange={handleServiceProviderTypeChange}>
                            <option value="">Driver Type</option>
                            <option value="type1">Fleet</option>
                            <option value="type2">Owner Cum Driver</option>
                        </select>
                    )}
                </div>

                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="channelPartnerType" className="block mb-1">
                            Distributor
                        </label>
                        {viewSpecific && (
                            <Link to={'/AdminModule/ChannelPartner/ViewSpecificChannelPartner/659cd6574c25d43e62c6dd9f'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    {viewSpecific ? (
                        <input
                            name="channelPartnerType"
                            type="text"
                            id="channelPartnerType"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details.channelPartnerType}
                            readOnly
                        />
                    ) : isEditPage ? (
                        <div>
                            {addedCHPartnersType === 'chPartnerAdded' ? (
                                <button type="button" onClick={() => setModal5(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <div className="flex">
                                    <input
                                        name="channelPartnerType"
                                        type="text"
                                        id="channelPartnerType"
                                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                        value={details.channelPartnerType}
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
                            <ChannelPartnerModal event={modal5} closeModal={() => setModal5(false)} onAddChannelPartner={handleAddUserSubmit} />
                        </div>
                    )}
                </div>

                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fleetManagementType" className="block mb-1">
                            Traval Agancy
                        </label>
                        {viewSpecific && (
                            <Link to={'/BusinessModule/FleetOwner/ViewSpecificFleetOwner/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto" />
                            </Link>
                        )}
                    </div>
                    {viewSpecific ? (
                        <input
                            name="fleetManagementType"
                            type="text"
                            id="fleetManagementType"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            // value={details.fleetManagementType}
                            value={'ABC travels'}
                            readOnly
                        />
                    ) : isEditPage ? (
                        <div>
                            {addedCHPartnersType === 'fleetAdded' ? (
                                <button type="button" onClick={() => setModal7(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <div className="flex">
                                    <input
                                        name="fleetManagementType"
                                        type="text"
                                        id="fleetManagementType"
                                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                        value={details.fleetManagementType}
                                        readOnly
                                    />
                                    <button type="button" onClick={() => setModal7(true)} className="btn btn-primary w-1/3">
                                        Edit
                                    </button>
                                    <FleetOwnerDetailsModal event={modal7} closeModal={() => setModal7(false)} onAddFleetOwner={handleAddUserSubmit} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {addedCHPartnersType === 'fleetAdded' ? (
                                <button type="button" onClick={() => setModal7(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <button type="button" onClick={() => setModal7(true)} className="btn btn-primary w-full">
                                    Add Travel Agancy
                                </button>
                            )}
                            <FleetOwnerDetailsModal event={modal7} closeModal={() => setModal7(false)} onAddFleetOwner={handleAddUserSubmit} />
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="firstName" className="block mb-1 font-bold text-md">
                        First Name
                    </label>
                    {viewSpecific ? (
                        <input name="firstName" type="text" id="firstName" className="form-input w-full pointer-events-none" value={details.firstName} readOnly />
                    ) : (
                        <input name="firstName" type="text" id="firstName" placeholder="Enter First Name" className="form-input w-full" value={details.firstName} onChange={onInputChange} />
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="middleName" className="block mb-1 font-bold text-md">
                        Middle Name
                    </label>
                    {viewSpecific ? (
                        <input name="middleName" type="text" id="middleName" className="form-input w-full pointer-events-none" value={details.middleName} readOnly />
                    ) : (
                        <input name="middleName" type="text" id="middleName" placeholder="Enter Middle Name" className="form-input w-full" value={details.middleName} onChange={onInputChange} />
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="lastName" className="block mb-1 font-bold text-md">
                        Last Name
                    </label>
                    {viewSpecific ? (
                        <input name="lastName" type="text" id="lastName" className="form-input w-full pointer-events-none" value={details.lastName} readOnly />
                    ) : (
                        <input name="lastName" type="text" id="lastName" placeholder="Enter Last Name" className="form-input w-full" value={details.lastName} onChange={onInputChange} />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="email" className="block mb-1 font-bold text-md">
                        Email Address
                    </label>
                    {viewSpecific ? (
                        <input name="email" id="email" type="text" placeholder="Example@gmail.com" className="form-input w-full pointer-events-none" value={details.email} readOnly />
                    ) : (
                        <input name="email" id="email" type="text" placeholder="Example@gmail.com" className="form-input w-full" value={details.email} onChange={onInputChange} />
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="ctnEmail" className="block mb-1 font-bold text-md">
                        Date of Birth
                    </label>
                    {viewSpecific ? (
                        <Flatpickr
                            value={date1}
                            options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                            className="form-input pointer-events-none"
                            onChange={(date) => setDate1(date)}
                            readOnly
                        />
                    ) : (
                        <Flatpickr value={date1} options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" onChange={(date) => setDate1(date)} />
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="gender" className="block mb-1 font-bold text-md">
                        Gender
                    </label>
                    {viewSpecific ? (
                        <input name="gender" id="gender" type="text" className="form-input w-full pointer-events-none" value={details.gender} readOnly />
                    ) : (
                        <select id="gender" className="form-select text-white-dark" required value={selectedGender} onChange={handleGenderTypeChange}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="fatherName" className="block mb-1 font-bold text-md">
                        Father Name
                    </label>
                    {viewSpecific ? (
                        <input name="fatherName" type="text" id="fatherName" placeholder="Enter Father's Name" className="form-input w-full pointer-events-none" value={details.fatherName} readOnly />
                    ) : (
                        <input name="fatherName" type="text" id="fatherName" placeholder="Enter Father's Name" className="form-input w-full" value={details.fatherName} onChange={onInputChange} />
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="mobileNumber" className="block mb-1 font-bold text-md">
                        Mobile Number
                    </label>
                    {viewSpecific ? (
                        <input
                            name="mobileNumber"
                            type="number"
                            id="mobileNumber"
                            placeholder="(+91) Enter Mobile Number"
                            className="form-input w-full pointer-events-none"
                            value={details.mobileNumber}
                            readOnly
                        />
                    ) : (
                        <input
                            name="mobileNumber"
                            type="number"
                            id="mobileNumber"
                            placeholder="(+91) Enter Mobile Number"
                            className="form-input w-full"
                            value={details.mobileNumber}
                            onChange={onInputChange}
                        />
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="altMobileNumber" className="block mb-1 font-bold text-md">
                        Alternative Mobile Number
                    </label>
                    {viewSpecific ? (
                        <input
                            name="altMobileNumber"
                            type="number"
                            id="altMobileNumber"
                            placeholder="(+91) Enter Alt. Mobile Number"
                            className="form-input w-full pointer-events-none"
                            value={details.altMobileNumber}
                            readOnly
                        />
                    ) : (
                        <input
                            name="altMobileNumber"
                            type="number"
                            id="altMobileNumber"
                            placeholder="(+91) Enter Alt. Mobile Number"
                            className="form-input w-full"
                            value={details.altMobileNumber}
                            onChange={onInputChange}
                        />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <label htmlFor="badgeNumber" className="block mb-1 font-bold text-md">
                        Badge Number
                    </label>
                    {viewSpecific ? (
                        <input
                            name="badgeNumber"
                            type="text"
                            id="badgeNumber"
                            className="form-input w-full border-gray-300 rounded-md pl-3 pr-3 focus:outline-none focus:ring focus:border-blue-300"
                            value={details.badgeNumber}
                            readOnly
                        />
                    ) : (
                        <input
                            name="badgeNumber"
                            type="text"
                            id="badgeNumber"
                            placeholder="Enter Badge Number"
                            className="form-input w-full border-gray-300 rounded-md pl-3 pr-3 focus:outline-none focus:ring focus:border-blue-300"
                            value={details.badgeNumber}
                            onChange={onInputChange}
                        />
                    )}
                </div>
                <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <label htmlFor="badgeValidity" className="block mb-1 font-bold text-md">
                        Badge Validity
                    </label>
                    <Flatpickr
                        value={details.badgeValidity}
                        options={{
                            dateFormat: 'Y-m-d',
                            position: isRtl ? 'auto right' : 'auto left',
                            defaultDate: viewSpecific ? undefined : 'today',
                        }}
                        className="form-input w-full border-gray-300 rounded-md pl-3 pr-10 focus:outline-none focus:ring focus:border-blue-300"
                        onChange={(date) => {
                            const event = {
                                target: {
                                    name: 'badgeValidity',
                                    value: date[0].toISOString(), // Ensure only the first date is passed
                                },
                            };
                            handleInputChange(event as ChangeEvent<HTMLInputElement>);
                        }}
                        disabled={noPassEdit}
                    />
                </div>

                <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <label htmlFor="isAvailable" className="block mb-1 font-bold text-md">
                        Is Available
                    </label>
                    <select
                        name="isAvailable"
                        id="isAvailable"
                        className="form-select w-full border-gray-300 rounded-md pl-3 pr-3 focus:outline-none focus:ring focus:border-blue-300"
                        value={details.isAvailable ? 'true' : 'false'}
                        // future things onChange={(e) => handleSelectChange(e)}
                        disabled={viewSpecific}
                    >
                        {!viewSpecific && (
                            <option value="" disabled selected>
                                Choose Availability
                            </option>
                        )}
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <label htmlFor="driverStatus" className="block mb-1 font-bold text-md">
                        Driver Status
                    </label>
                    <input
                        name="driverStatus"
                        type="text"
                        id="driverStatus"
                        placeholder="Enter Driver Status"
                        className="form-input w-full border-gray-300 rounded-md pl-3 pr-3 focus:outline-none focus:ring focus:border-blue-300"
                        value={details.driverStatus}
                        onChange={onInputChange}
                    />
                </div>
                <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <label htmlFor="emergencyContact" className="block mb-1 font-bold text-md">
                        Emergency Contact
                    </label>
                    <input
                        name="emergencyContact"
                        type="text"
                        id="emergencyContact"
                        placeholder="Enter Emergency Contact"
                        className="form-input w-full border-gray-300 rounded-md pl-3 pr-3 focus:outline-none focus:ring focus:border-blue-300"
                        value={details.emergencyContact}
                        onChange={onInputChange}
                    />
                </div>
                <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <label htmlFor="driverApprovalDate" className="block mb-1 font-bold text-md">
                        Driver Approval Date
                    </label>

                    {viewSpecific ? (
                        <input
                            name="driverApprovalDate"
                            type="text"
                            id="driverApprovalDate"
                            className="form-input w-full border-gray-300 rounded-md pl-3 pr-3 focus:outline-none focus:ring focus:border-blue-300"
                            // value={details.emergencyContact}
                            value={'12-03-2024'}
                            onChange={onInputChange}
                        />
                    ) : (
                        <Flatpickr
                            value={details.badgeValidity}
                            options={{
                                dateFormat: 'Y-m-d',
                                position: isRtl ? 'auto right' : 'auto left',
                                defaultDate: viewSpecific ? undefined : 'today',
                            }}
                            className="form-input w-full border-gray-300 rounded-md pl-3 pr-10 focus:outline-none focus:ring focus:border-blue-300"
                            onChange={(date) => {
                                const event = {
                                    target: {
                                        name: 'badgeValidity',
                                        value: date[0].toISOString(), // Ensure only the first date is passed
                                    },
                                };
                                handleInputChange(event as ChangeEvent<HTMLInputElement>);
                            }}
                            disabled={viewSpecific}
                        />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="fk_adminTeam" className="block mb-1 font-bold text-md">
                        Country
                    </label>
                    {viewSpecific ? (
                        <input name="country" type="tel" id="country" className="form-input w-full pointer-events-none" value={details.country} onChange={onInputChange} readOnly />
                    ) : (
                        <select id="fk_adminTeam" className="form-select text-white-dark" required value={details.country} onChange={handleCountryTypeChange}>
                            <option value="">Select your Country</option>
                            {countryOption.map((data) => {
                                return <option value={data?.countryName}>{data?.countryName}</option>;
                            })}
                        </select>
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="fk_adminTeam" className="block mb-1 font-bold text-md">
                        State
                    </label>
                    {viewSpecific ? (
                        <input name="state" type="tel" id="state" className="form-input w-full pointer-events-none" value={details.state} onChange={onInputChange} readOnly />
                    ) : (
                        <select id="fk_adminTeam" className="form-select text-white-dark" required value={details.state} onChange={handleStateTypeChange}>
                            <option value="">Select your state</option>
                            {stateOption.map((data) => {
                                return <option value={data.stateName}>{data?.stateName}</option>;
                            })}
                        </select>
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="fk_adminTeam" className="block mb-1 font-bold text-md">
                        City
                    </label>
                    {viewSpecific ? (
                        <input name="city" type="tel" id="city" className="form-input w-full pointer-events-none" value={details.city} onChange={onInputChange} readOnly />
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
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="batchNumber" className="block mb-1 font-bold text-md">
                        Batch Number
                    </label>
                    {viewSpecific ? (
                        <input
                            name="batchNumber"
                            type="number"
                            id="batchNumber"
                            className="form-input w-full pointer-events-none"
                            // value={details.batchNumber}
                            value="535345"
                            readOnly
                        />
                    ) : (
                        <input name="batchNumber" type="number" id="batchNumber" placeholder="Enter Batch Number" className="form-input w-full" value={details.batchNumber} onChange={onInputChange} />
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="batchValidity" className="block mb-1 font-bold text-md">
                        Batch Validity
                    </label>
                    {viewSpecific ? (
                        <Flatpickr
                            value={details.badgeValidity}
                            options={{
                                dateFormat: 'Y-m-d',
                                position: isRtl ? 'auto right' : 'auto left',
                                defaultDate: viewSpecific ? undefined : 'today',
                            }}
                            className="form-input w-full border-gray-300 rounded-md pl-3 pr-10 focus:outline-none focus:ring focus:border-blue-300"
                            onChange={(date) => {
                                const event = {
                                    target: {
                                        name: 'badgeValidity',
                                        value: date[0].toISOString(), // Ensure only the first date is passed
                                    },
                                };
                                handleInputChange(event as ChangeEvent<HTMLInputElement>);
                            }}
                            readOnly
                        />
                    ) : (
                        <Flatpickr
                            value={details.badgeValidity}
                            options={{
                                dateFormat: 'Y-m-d',
                                position: isRtl ? 'auto right' : 'auto left',
                                defaultDate: viewSpecific ? undefined : 'today',
                            }}
                            className="form-input w-full border-gray-300 rounded-md pl-3 pr-10 focus:outline-none focus:ring focus:border-blue-300"
                            onChange={(date) => {
                                const event = {
                                    target: {
                                        name: 'badgeValidity',
                                        value: date[0].toISOString(), // Ensure only the first date is passed
                                    },
                                };
                                handleInputChange(event as ChangeEvent<HTMLInputElement>);
                            }}
                            readOnly
                        />
                    )}
                </div>

                <div className={`${viewSpecific ? 'lg:w-1/3 pointer-events-none' : 'lg:w-1/3'}`}>
                    <div className="flex items-center justify-between mb-1">
                        <label htmlFor="password" className="block font-bold text-md">
                            Password
                        </label>
                        {noPassEdit && (
                            <div className="flex items-center">
                                <span className="text-sm text-blue-600 cursor-pointer mr-2" onClick={() => navigate('/ResetPassword')}>
                                    Reset Password
                                </span>
                                <FaArrowUpRightFromSquare className="text-blue-600" onClick={() => navigate('/ResetPassword')} /> {/* Corrected icon name */}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center">
                        <input
                            name="passwordHash"
                            type="password"
                            id="passwordHash"
                            placeholder={viewSpecific ? '' : 'Enter Password'}
                            className={`form-input w-full ${viewSpecific || noPassEdit ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            // value={details.passwordHash}
                            value={viewSpecific ? '1212312' : ''}
                            onChange={onInputChange}
                        />
                        {/* future needed {validation?.passwordHash && <div className="text-red-600 text-sm">*{validation?.passwordHash}</div>} */}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/2 pointer-events-none` : `lg:w-1/2`}`}>
                    <label htmlFor="permanentAddress" className="block mb-1 font-bold text-md">
                        Permanent Address
                    </label>
                    {viewSpecific ? (
                        <input name="permanentAddress" type="text" id="permanentAddress" className="form-input w-full pointer-events-none" value={details.permanentAddress} readOnly />
                    ) : (
                        <input
                            name="permanentAddress"
                            type="text"
                            id="permanentAddress"
                            placeholder="Enter Permanent Address"
                            className="form-input w-full"
                            value={details.permanentAddress}
                            onChange={onInputChange}
                        />
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/2 pointer-events-none` : `lg:w-1/2`}`}>
                    <label htmlFor="presentAddress" className="block mb-1 font-bold text-md">
                        Present Address
                    </label>
                    {viewSpecific ? (
                        <input name="presentAddress" type="text" id="presentAddress" className="form-input w-full pointer-events-none" value={details.presentAddress} readOnly />
                    ) : (
                        <input
                            name="presentAddress"
                            type="text"
                            id="presentAddress"
                            placeholder="Enter Present Address"
                            className="form-input w-full"
                            value={details.presentAddress}
                            onChange={onInputChange}
                        />
                    )}
                </div>

                <div className={`${viewSpecific ? `lg:w-1/2 pointer-events-none` : `lg:w-1/2`}`}>
                    <label htmlFor="RegisterAddress" className="block mb-1 font-bold text-md">
                        Register Address
                    </label>

                    {viewSpecific ? (
                        <input name="RegisterAddress" type="text" id="RegisterAddress" className="form-input w-full pointer-events-none" value="21765323517623" readOnly />
                    ) : (
                        <input name="RegisterAddress" type="text" id="RegisterAddress" placeholder="Enter Present Address" className="form-input w-full" onChange={onInputChange} />
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/2 pointer-events-none` : `lg:w-1/2`}`}>
                    <label htmlFor="dlValidity" className="block mb-1 font-bold text-md">
                        DL Validity
                    </label>
                    {viewSpecific ? (
                        <Flatpickr
                            value={details.badgeValidity}
                            options={{
                                dateFormat: 'Y-m-d',
                                position: isRtl ? 'auto right' : 'auto left',
                                defaultDate: viewSpecific ? undefined : 'today',
                            }}
                            className="form-input w-full border-gray-300 rounded-md pl-3 pr-10 focus:outline-none focus:ring focus:border-blue-300"
                            onChange={(date) => {
                                const event = {
                                    target: {
                                        name: 'badgeValidity',
                                        value: date[0].toISOString(), // Ensure only the first date is passed
                                    },
                                };
                                handleInputChange(event as ChangeEvent<HTMLInputElement>);
                            }}
                            readOnly
                        />
                    ) : (
                        <Flatpickr
                            value={details.badgeValidity}
                            options={{
                                dateFormat: 'Y-m-d',
                                position: isRtl ? 'auto right' : 'auto left',
                                defaultDate: viewSpecific ? undefined : 'today',
                            }}
                            className="form-input w-full border-gray-300 rounded-md pl-3 pr-10 focus:outline-none focus:ring focus:border-blue-300"
                            onChange={(date) => {
                                const event = {
                                    target: {
                                        name: 'badgeValidity',
                                        value: date[0].toISOString(), // Ensure only the first date is passed
                                    },
                                };
                                handleInputChange(event as ChangeEvent<HTMLInputElement>);
                            }}
                            readOnly
                        />
                    )}
                </div>

                <div className={`${viewSpecific ? `lg:w-1/2 pointer-events-none` : `lg:w-1/2`}`}>
                    <label htmlFor="policeVerNumber" className="block mb-1 font-bold text-md">
                        Police Verification Number
                    </label>
                    {viewSpecific ? (
                        <input name="policeVerNumber" type="number" id="policeVerNumber" className="form-input w-full pointer-events-none" value="9045874897494546" readOnly />
                    ) : (
                        <input
                            name="policeVerNumber"
                            type="number"
                            id="policeVerNumber"
                            placeholder="Enter Police Verification Number"
                            className="form-input w-full"
                            value={details.policeVerNumber}
                            onChange={onInputChange}
                        />
                    )}
                </div>

                <div className={`${viewSpecific ? `lg:w-1/2 pointer-events-none` : `lg:w-1/2`}`}>
                    <label htmlFor="driverLocation" className="block mb-1 font-bold text-md">
                        Driver Location
                    </label>
                    {viewSpecific ? (
                        <select
                            name="driverLocation"
                            id="driverLocation"
                            className="form-select w-full pointer-events-none"
                            // value={details.driverLocation}
                            value="Yes"
                            onChange={onInputChange}
                            disabled
                        >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    ) : (
                        <select name="driverLocation" id="driverLocation" className="form-select w-full" value={details.driverLocation} onChange={onInputChange}>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? 'lg:w-1/3' : 'lg:w-1/2'}`}>
                    <label htmlFor="fk_serviceCity" className="block mb-1 font-bold text-md">
                        Service City
                        <FaArrowUpRightFromSquare className="inline-block ml-2 text-blue-500 cursor-pointer" onClick={() => navigate('/UtilityModule/ServiceCity/ViewSpecificServiceCity/1')} />
                    </label>
                    {viewSpecific ? (
                        <input
                            name="fk_serviceCity"
                            type="tel"
                            id="fk_serviceCity"
                            className="form-input w-full pointer-events-none"
                            value={details.fk_serviceCity}
                            onChange={onInputChange}
                            readOnly
                        />
                    ) : (
                        <select id="fk_adminTeam" className="form-select text-white-dark w-full" required value={details.fk_serviceCity} onChange={handleServiceCityTypeChange}>
                            <option value="">Select your city</option>
                            {cityOption.map((data) => (
                                <option key={data.cityName} value={data.cityName}>
                                    {data?.cityName}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div className={`${viewSpecific ? 'lg:w-1/3' : 'lg:w-1/2'}`}>
                    <label htmlFor="driverKey" className="block mb-1 font-bold text-md">
                        Unique ID
                    </label>
                    {viewSpecific ? (
                        <input name="driverKey" type="text" id="driverKey" className="form-input w-full pointer-events-none" value="driver123key" readOnly />
                    ) : (
                        <input name="driverKey" type="text" id="driverKey" placeholder="Enter Driver Key" className="form-input w-full" value={details.driverKey} onChange={onInputChange} />
                    )}
                </div>

                <div className={`${viewSpecific ? 'lg:w-1/3' : 'lg:w-1/2'}`}>
                    <label htmlFor="archive" className="block mb-1 font-bold text-md">
                        Company
                    </label>
                    {viewSpecific ? (
                        <input name="archive" placeholder="Archive" type="text" id="archive" className="form-input w-full pointer-events-none" value={details?.archive} readOnly />
                    ) : (
                        <select
                            id="archive"
                            name="archive"
                            className="form-select text-white-dark w-full"
                            required
                            value={details?.archive} // Update this line
                            onChange={onInputChange}
                        >
                            <option value="">Select Archive</option>
                            <option value="yes">Channel Partner</option>
                            <option value="no">CARRENT</option>
                            <option value="yes">abcd</option>
                            <option value="no">phonepay</option>
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="rtoDisplayCard" className="block mb-1 font-bold text-md">
                        RTO Display Card
                    </label>
                    <input
                        name="rtoDisplayCard"
                        type="text"
                        id="rtoDisplayCard"
                        placeholder={`${viewSpecific ? `` : `Enter RTO Display Card`}`}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.rtoDisplayCard}
                        onChange={onInputChange}
                    />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="stateAndRto" className="block mb-1 font-bold text-md">
                        State and RTO
                    </label>
                    <input
                        name="stateAndRto"
                        type="text"
                        id="stateAndRto"
                        placeholder={`${viewSpecific ? `` : `Enter State and RTO`}`}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.stateAndRto}
                        onChange={onInputChange}
                    />
                </div>
                {
                    showStatus ? ( // Conditionally rendering based on the showStatus prop
                        <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                            <label htmlFor="status" className="block mb-1 font-bold text-md">
                                Status
                            </label>
                            {viewSpecific ? (
                                <input
                                    name="status"
                                    type="text"
                                    id="status"
                                    className={`form-input w-full ${viewSpecific ? 'pointer-events-none ' : ''}`}
                                    value={details.archive}
                                    onChange={onInputChange}
                                />
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
                    ) : null //Empty div when showStatus is false
                }
            </div>
        </>
    );
};

export default ServiceProviderModule;
