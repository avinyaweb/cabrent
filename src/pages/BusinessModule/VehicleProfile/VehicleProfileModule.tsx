import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { State, City } from 'country-state-city';
import ServiceCity from '../../AdminModule/AdminTeams/ServiceCity';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { getAllCountry, getAllState, getAllCity } from '@/services/RolesService';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import ChannelPartnerModal, { staticChannelPartnerData } from '@/components/Models/ChannelPartnerModal';
import ServiceCityModal from '@/components/Models/ServiceCityModal';

import { DataTableColumn } from 'mantine-datatable';
import CommonPopUp from '@/components/Models/CommonPopUp';
import { getChannelPartnerData } from '@/services/ChannelPartnerService';
import { staticFleetOwnerData } from '../FleetOwner/ViewFleetOwner';

interface VehicleProfileProps {
    details: {
        serviceProviderType: string;
        channelPartnerType: string;
        fleetManagementType: string;
        vehRegNumber: string;
        vehRTONumber: string;
        vehChasisNumber: string;
        vehCategory: string;
        seatCapacity: string;
        bootSpace: string;
        loadCapacity: string;
        bodyDimension: string;
        vehBrandName: string;
        vehType: string;
        vehBrandModel: string;
        vehColor: string;
        vehFuelType: string;
        country: string;
        state: string;
        city: string;
        fk_serviceCity: string;
        serviceType: string;
        vehicleRegistrationDate: Date | string;
        vehicleAge: string;
        loanBanker: string;
        loanAccNumber: string;
        emiAmt: string;
        emiDate: string;
        currLocation: string;
        archive: string;
        // Removed serviceType, serviceP, country, state, city
    };
    onInputChange?: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    showStatus?: boolean;
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

const VehicleProfileModule: React.FC<VehicleProfileProps> = ({ details, onInputChange, showStatus = true, viewSpecific, isEditPage }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    //const [roleOptions, setRoleOptions] = useState<{ label: string; value: string }[]>([]);
    const [selectedserviceProvider, setSelectedserviceProvider] = useState(details.serviceProviderType);
    const [selectedChannelPartner, setSelectedChannelPartner] = useState(details.channelPartnerType);
    const [selectedFleetManagement, setSelectedFleetManagement] = useState(details.fleetManagementType);
    const [moduleDetails, setModuleDetails] = useState(details);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [states, setStates] = useState<StateType[]>([]);
    const [cities, setCities] = useState<CityType[]>([]);
    const [vehicleCategory, setVehicleCategory] = useState<string>('');
    const [seatingCapacityType, setSeatingCapacityType] = useState<string>('');
    const [bootSpace, setBootSpace] = useState<string>('');
    const [loadCapacityType, setLoadCapacityType] = useState<string>('');
    const [bodyDimension, setBodyDimension] = useState<string>('');
    const [vehRegistrationDate, setVehRegistrationDate] = useState<Date | null>(null);
    const [vehAge, setVehAge] = useState<string>('');
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
    const [serviceCityOption, SetServiceCityOption] = useState<any[]>([]);
    const [serviceCity, SetServiceCity] = useState(details.city);

    const [modal6, setModal6] = useState(false);
    const [ServiceCityData, setServiceCityData] = useState<any[]>([]);
    const [addedserviceCityType, setAddedServiceCityType] = useState<any>();

    // popup service city
    const handleAddServiceCitySubmit = (selectedServiceCity: any[], userID: string) => {
        setServiceCityData(selectedServiceCity);
        setAddedServiceCityType(userID);
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
        onInputChange?.({
            target: {
                name: 'country',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleStateTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setState(value);
        onInputChange?.({
            target: {
                name: 'state',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleCityTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setCity(value);
        onInputChange?.({
            target: {
                name: 'city',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleServiceCityTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setCity(value);
        onInputChange?.({
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

    // handle select dropdown function.

    const handleServiceProviderTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedserviceProvider(value);
        onInputChange?.({
            target: {
                name: 'serviceProviderType',
                value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    // // handle select dropdown function.
    // const handleChannelPartnerTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { value } = event.target;
    //     setSelectedChannelPartner(value);
    //     onInputChange({
    //         target: {
    //             name: 'channelPartnerType',
    //             value,
    //         },
    //     } as React.ChangeEvent<HTMLInputElement>);
    // };
    // // handle select dropdown function.
    // const handleFleetManagementTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { value } = event.target;
    //     setSelectedFleetManagement(value);
    //     onInputChange({
    //         target: {
    //             name: 'fleetManagementType',
    //             value,
    //         },
    //     } as React.ChangeEvent<HTMLInputElement>);
    // };

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

    // future things useEffect(() => {
    //     if (selectedCountry) {
    //         const countryStates = State.getStatesOfCountry(selectedCountry.value);
    //         setStates(countryStates);
    //         setSelectedState(null);
    //         setSelectedCity(null);
    //     }
    // }, [selectedCountry]);

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

    const handleVehicleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setVehicleCategory(e.target.value);
        setSeatingCapacityType('');
        setBootSpace('');
        setLoadCapacityType('');
        setBodyDimension('');
    };

    const handleSeatingCapacityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSeatingCapacityType(e.target.value);
        setBootSpace('');
        setBodyDimension('');
    };

    const handleLoadCapacityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setLoadCapacityType(e.target.value);
        setBootSpace('');
        setBodyDimension('');
    };

    const handleVehRegistrationDateChange = (date: Date[]) => {
        const registrationDate = date[0] || null;

        if (registrationDate) {
            const today = new Date();
            const diffInMilliseconds = today.getTime() - registrationDate.getTime();
            const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
            const years = Math.floor(diffInDays / 365);
            const months = Math.floor((diffInDays % 365) / 30);
            const days = Math.floor((diffInDays % 365) % 30);

            const formattedAge = `${years} years, ${months} months, ${days} days`;
            setVehAge(formattedAge);
        }

        setVehRegistrationDate(registrationDate);
    };

    // channel partner popup table --------->>
    const [modal, setmodal] = useState(false);
    const [SelectedCHPartner, setSelectedCHPartners] = useState<any[]>([]);
    const [addedCHPartnersType, setAddedCHPartnersType] = useState<any>();
    const [ChannelPartnerData, setChannelPartnerData] = useState<any[]>([]);
    // channel partner table columns
    const channelPartenrColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID' },
        { accessor: 'bussinessName', title: 'Bussiness Name' },
        { accessor: 'channelPartnerType', title: 'Channel Partner Type' },
        { accessor: 'mobile', title: 'Mobile' },
        { accessor: 'firstName', title: 'First Name' },
        { accessor: 'email', title: 'Email' },
        { accessor: 'archive', title: 'Archive' },
        { accessor: 'createdAt', title: 'Created At' },
        { accessor: 'updatedAt', title: 'Updated At' },
    ];
    // Dynamic Data of channel partner.
    // useEffect(() => {
    //     const fetchChannelPartnerData = async () => {
    //         try {
    //             const { data } = await getChannelPartnerData();
    //             if (data?.ChannelPartners) {
    //                 // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //                 const newData = data.ChannelPartners.map(({ _id: id, ...rest }) => ({
    //                     id,
    //                     ...rest,
    //                 }));
    //                 setChannelPartnerData(newData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching admin data:', error.message);
    //         }
    //     };
    //     fetchChannelPartnerData();
    // }, []);

    // popup channel partner
    const handleAddChPartner = (selectedCHPartners: any[], id: string) => {
        setSelectedCHPartners(selectedCHPartners);
        setAddedCHPartnersType(id);
    };

    // Fleet Owner Popup Table -------------->>
    const [modal2, setmodal2] = useState(false);
    const [fleetOwnerData, setfleetOwnerData] = useState<any[]>([]);
    const [fleetOwnerType, setfleetOwnerType] = useState<any>();
    // popup service city
    const handleAddFleetSubmit = (selectedFleetOwner: any[], id: string) => {
        setfleetOwnerData(selectedFleetOwner);
        setfleetOwnerType(id);
    };

    const fleetOwnerColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID' },
        { accessor: 'companyType', title: 'Company Type' },
        { accessor: 'channelPartnerType', title: 'Channel Partner Type' },
        { accessor: 'fleetManagementType', title: 'Fleet Management Type' },
        { accessor: 'firstName', title: 'First Name' },
        { accessor: 'middleName', title: 'Middle Name' },
        { accessor: 'lastName', title: 'Last Name' },
        { accessor: 'email', title: 'Email' },
        { accessor: 'dob', title: 'DOB' },
        { accessor: 'gender', title: 'Gender' },
        { accessor: 'fatherName', title: 'Father Name' },
        { accessor: 'mobileNumber', title: 'Mobile Number' },
        { accessor: 'altMobileNumber', title: 'Alt Mobile Number' },
        { accessor: 'country', title: 'Country' },
        { accessor: 'state', title: 'State' },
        { accessor: 'city', title: 'City' },
        { accessor: 'regAddress', title: 'Reg Address' },
        { accessor: 'commAddress', title: 'Comm Address' },
        { accessor: 'fk_serviceCity', title: 'Service City' },
        { accessor: 'archive', title: 'Archive' },
    ];

    return (
        <>
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="serviceProviderType" className="block mb-1">
                            Driver
                        </label>
                        {viewSpecific && (
                            <Link to={'/BusinessModule/ServiceProvider/ViewSpecificServiceProvider/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    {viewSpecific ? (
                        <input
                            id="serviceProviderType"
                            className="form-input w-full pointer-events-none"
                            // value={details.serviceProviderType}
                            value={'Own cum Driver'}
                            readOnly
                        />
                    ) : (
                        <select id="serviceProviderType" className="form-select text-white-dark" required value={details.serviceProviderType} onChange={handleServiceProviderTypeChange}>
                            <option value="">Select Driver Type</option>
                            <option value="type1">Driver</option>
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
                            // value={details.channelPartnerType}
                            value="Techno Agency"
                            readOnly
                        />
                    ) : isEditPage ? (
                        <div>
                            {addedCHPartnersType === 'channel partner' ? (
                                <button type="button" onClick={() => setmodal(true)} className="btn btn-success w-full">
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
                                    <button type="button" onClick={() => setmodal(true)} className="btn btn-primary w-1/3">
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {addedCHPartnersType === 'channel partner' ? (
                                <button type="button" onClick={() => setmodal(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <button type="button" onClick={() => setmodal(true)} className="btn btn-primary w-full">
                                    Add Distributor
                                </button>
                            )}
                        </div>
                    )}
                    <CommonPopUp title={'Channel Partner'} columns={channelPartenrColumns} data={ChannelPartnerData} event={modal} closeModal={() => setmodal(false)} onSubmit={handleAddChPartner} />
                </div>
                {/* <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
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
                            value={details.fleetManagementType}
                            readOnly
                        />
                    ) : isEditPage ? (
                        <div>
                            {fleetOwnerType === 'travel agancy' ? (
                                <button type="button" onClick={() => setmodal2(true)} className="btn btn-success w-full">
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
                                    <button type="button" onClick={() => setmodal2(true)} className="btn btn-primary w-1/3">
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {fleetOwnerType === 'travel agancy' ? (
                                <button type="button" onClick={() => setmodal2(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <button type="button" onClick={() => setmodal2(true)} className="btn btn-primary w-full">
                                    Add Travel Agancy
                                </button>
                            )}
                        </div>
                    )}
                    <CommonPopUp title={'Travel Agancy'} columns={fleetOwnerColumns} data={staticFleetOwnerData} event={modal2} closeModal={() => setmodal2(false)} onSubmit={handleAddFleetSubmit} />
                </div> */}
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="travelAgency" className="block mb-1">
                        Travel Agency
                    </label>
                    {viewSpecific ? (
                        <input
                            name="travelAgency"
                            type="text"
                            id="travelAgency"
                            placeholder="Enter Travel Agency"
                            className="form-input w-full pointer-events-none"
                            // value={details.travelAgency}
                            value="Ansar Agency"
                            readOnly
                        />
                    ) : (
                        <input
                            name="travelAgency"
                            type="text"
                            id="travelAgency"
                            placeholder="Enter Travel Agency"
                            className="form-input w-full"
                            // value={details.travelAgency}
                            onChange={onInputChange}
                        />
                    )}
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehRegNumber" className="block mb-1">
                        Vehicle Registration Number
                    </label>
                    {viewSpecific ? (
                        <input
                            name="vehRegNumber"
                            type="text"
                            id="vehRegNumber"
                            placeholder="Enter Vehicle Registration Number"
                            className="form-input w-full pointer-events-none"
                            // value={details.vehRegNumber}
                            value={'KL 41 P 2891'}
                            readOnly
                        />
                    ) : (
                        <input
                            name="vehRegNumber"
                            type="text"
                            id="vehRegNumber"
                            placeholder="Enter Vehicle Registration Number"
                            className="form-input w-full"
                            value={details.vehRegNumber}
                            onChange={onInputChange}
                        />
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehRTONumber" className="block mb-1">
                        Vehicle RTO Number
                    </label>
                    {viewSpecific ? (
                        <input
                            name="vehRTONumber"
                            type="text"
                            id="vehRTONumber"
                            className="form-input w-full pointer-events-none"
                            //  value={details.vehRTONumber}
                            value="KERALA-Aluva"
                            readOnly
                        />
                    ) : (
                        <input
                            name="vehRTONumber"
                            type="text"
                            id="vehRTONumber"
                            placeholder="Enter Vehicle RTO Number"
                            className="form-input w-full"
                            // value={details.vehRTONumber}
                            onChange={onInputChange}
                        />
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehChasisNumber" className="block mb-1">
                        Vehicle Chassis Number
                    </label>
                    {viewSpecific ? (
                        <input
                            name="vehChasisNumber"
                            type="text"
                            id="vehChasisNumber"
                            className="form-input w-full pointer-events-none"
                            // value={details.vehChasisNumber}
                            value="DummyVIN123456"
                            readOnly
                        />
                    ) : (
                        <input
                            name="vehChasisNumber"
                            type="text"
                            id="vehChasisNumber"
                            placeholder="Enter Vehicle Chassis Number"
                            className="form-input w-full"
                            value={details.vehChasisNumber}
                            onChange={onInputChange}
                        />
                    )}
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="serviceType" className="block mb-1">
                        Service Type
                    </label>
                    {viewSpecific ? (
                        <input name="serviceType" type="text" id="serviceType" className="form-input w-full pointer-events-none" value={'RENTAL'} readOnly />
                    ) : (
                        <div id="serviceType" className="form-radio flex gap-4 text-white-dark" data-value={details.serviceType as string}>
                            <input type="radio" name="serviceType" value="type1" id="type1" />
                            <label htmlFor="type1" className="mr-4">
                                DAILY
                            </label>

                            <input type="radio" name="serviceType" value="type2" id="type2" />
                            <label htmlFor="type2" className="mr-4">
                                RENTAL
                            </label>

                            <input type="radio" name="serviceType" value="type3" id="type3" />
                            <label htmlFor="type3">OUTSTATION</label>
                        </div>
                    )}
                </div>

                {/* <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehManufacturer" className="block mb-1">
                        Vehicle Manufacturer
                    </label>
                    {viewSpecific ? (
                        <input name="vehManufacturer" type="text" id="vehManufacturer" className="form-input w-full pointer-events-none" value={'honda'} readOnly />
                    ) : (
                        <input
                            name="vehManufacturer"
                            type="text"
                            id="vehManufacturer"
                            placeholder="Enter Vehicle RTO Number"
                            className="form-input w-full"
                            value={details.vehManufacturer}
                            onChange={onInputChange}
                        />
                    )}
                </div> */}
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehType" className="block mb-1">
                        Vehicle Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="vehType"
                            type="text"
                            id="vehType"
                            placeholder="Enter Vehicle Chassis Number"
                            className="form-input w-full pointer-events-none"
                            // value={details.vehType}
                            value="Sedan"
                            readOnly
                        />
                    ) : (
                        <select id="vehType" className="form-select text-white-dark" required value={details.vehType}>
                            <option value="">Select Vehicle Type</option>
                            <option value="type3">Mini</option>
                            <option value="type3">Hatchback</option>
                            <option value="type3">Sedan</option>
                            <option value="type3">SUV</option>
                        </select>
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <div>
                        <label htmlFor="vehCategory" className="block mb-1">
                            Vehicle Category
                        </label>
                        {viewSpecific ? (
                            <input
                                id="vehCategory"
                                className="form-input  w-full pointer-events-none"
                                // value={details.vehCategory}
                                value="Passenger"
                                readOnly
                            />
                        ) : (
                            <select id="vehCategory" className="form-select text-white-dark" required onChange={handleVehicleCategoryChange} value={details.vehCategory}>
                                <option value="">Select Vehicle Category</option>
                                <option value="passenger">Passenger</option>
                            </select>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="seatCapacity" className="block mb-1">
                        Seating Capacity
                    </label>
                    {viewSpecific ? (
                        <input
                            name="seatCapacity"
                            type="text"
                            id="seatCapacity"
                            placeholder="Enter Vehicle Chassis Number"
                            className="form-input w-full pointer-events-none"
                            // value={details.seatCapacity}
                            value="5 x 1"
                            readOnly
                        />
                    ) : (
                        <select id="seatCapacity" className="form-select text-white-dark" required value={details.seatCapacity}>
                            <option value="">Select Seating Capacity</option>
                            <option value="capacity1">4 x 1</option>
                            <option value="capacity2">5 x 1</option>
                            <option value="capacity3">6 x 1</option>
                            <option value="capacity4">7 x 1</option>
                        </select>
                    )}
                </div>
                {/* <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="loadCapacity" className="block mb-1">
                        Load Capacity
                    </label>
                    {viewSpecific ? (
                        <input
                            name="loadCapacity"
                            type="text"
                            id="loadCapacity"
                            placeholder="Enter Vehicle Chassis Number"
                            className="form-input w-full pointer-events-none"
                            // value={details.loadCapacity}
                            value="10 Tons"
                            readOnly
                        />
                    ) : (
                        <select id="loadCapacity" className="form-select text-white-dark" required value={details.loadCapacity}>
                            <option value="">Select Load Capacity</option>
                            <option value="loadCapacity1">5 Tons</option>
                            <option value="loadCapacity2">10 Tons</option>
                            <option value="loadCapacity3">15 Tons</option>
                            <option value="loadCapacity4">20 Tons</option>
                        </select>
                    )}
                </div> */}

                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="bootSpace" className="block mb-1">
                        Boot Space
                    </label>
                    {viewSpecific ? (
                        <input
                            name="bootSpace"
                            type="text"
                            id="bootSpace"
                            placeholder="Enter Vehicle Chassis Number"
                            className="form-input w-full pointer-events-none"
                            // value={details.bootSpace}
                            value="200 Lts"
                            readOnly
                        />
                    ) : (
                        <select id="bootSpace" className="form-select text-white-dark" required value={details.bootSpace}>
                            <option value="">Select Boot Space</option>
                            <option value="space1">200 Lts.</option>
                            <option value="space2">400 Lts.</option>
                            <option value="space3">600 Lts.</option>
                            <option value="space4">800 Lts.</option>
                        </select>
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}></div>
            </div>

            {/* <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
            
                </div> */}

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehBrandName" className="block mb-1">
                        Vehicle Brand Name
                    </label>
                    {viewSpecific ? (
                        <input
                            name="vehBrandName"
                            type="text"
                            id="vehBrandName"
                            className="form-input w-full pointer-events-none"
                            //  value={details.vehBrandName}
                            value="Suzuki"
                            readOnly
                        />
                    ) : (
                        <input
                            name="vehBrandName"
                            type="text"
                            id="vehBrandName"
                            placeholder="Enter Vehicle Brand Name"
                            className="form-input w-full"
                            // value={details.vehBrandName}

                            onChange={onInputChange}
                        />
                    )}
                </div>
                {/* <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehType" className="block mb-1">
                        Vehicle Type
                    </label>
                    {viewSpecific ? (
                        <input name="vehType" type="text" id="vehType" className="form-input w-full pointer-events-none" value={details.vehType} readOnly />
                    ) : (
                        <input name="vehType" type="text" id="vehType" placeholder="Enter Vehicle Type" className="form-input w-full" value={details.vehType} onChange={onInputChange} />
                    )}
                </div> */}
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehBrandModel" className="block mb-1">
                        Vehicle Brand Model
                    </label>
                    {viewSpecific ? (
                        <input
                            name="vehBrandModel"
                            type="text"
                            id="vehBrandModel"
                            className="form-input w-full pointer-events-none"
                            // value={details.vehBrandModel}
                            value="Swift"
                            readOnly
                        />
                    ) : (
                        <input
                            name="vehBrandModel"
                            type="text"
                            id="vehBrandModel"
                            placeholder="Enter Vehicle Brand Model"
                            className="form-input w-full"
                            // value={details.vehBrandModel}
                            onChange={onInputChange}
                        />
                    )}
                </div>

                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="bodyDimension" className="block mb-1">
                        Body Dimension
                    </label>
                    {viewSpecific ? (
                        <input
                            name="bodyDimension"
                            type="text"
                            id="bodyDimension"
                            placeholder="Enter Vehicle Chassis Number"
                            className="form-input w-full pointer-events-none"
                            value="6 x 8"
                            readOnly
                        />
                    ) : (
                        <select id="bodyDimension" className="form-select text-white-dark" required onChange={(e) => setBodyDimension(e.target.value)} value={details.bodyDimension}>
                            <option value="">Select Body Dimension</option>
                            <option value="body1">6 x 8</option>
                            <option value="body2">7 x 4</option>
                            <option value="body3">8 x 4</option>
                            <option value="body4">5 x 2</option>
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehColor" className="block mb-1">
                        Vehicle Color
                    </label>
                    {viewSpecific ? (
                        <input
                            name="vehColor"
                            type="text"
                            id="vehColor"
                            placeholder="Enter Vehicle Color"
                            className="form-input w-full pointer-events-none"
                            //  value={details.vehColor}
                            value="Red"
                            readOnly
                        />
                    ) : (
                        <input name="vehColor" type="text" id="vehColor" placeholder="Enter Vehicle Color" className="form-input w-full" value={details.vehColor} onChange={onInputChange} />
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehFuelType" className="block mb-1">
                        Vehicle Fuel Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="vehFuelType"
                            type="text"
                            id="vehFuelType"
                            placeholder="Enter Vehicle Fuel Type"
                            className="form-input w-full pointer-events-none"
                            // value={details.vehFuelType}
                            value="Petrol"
                            readOnly
                        />
                    ) : (
                        <select id="vehFuelType" className="form-select text-white-dark" required value={details.vehFuelType}>
                            <option value="">Select Fuel Type</option>
                            <option value="PETROL">PETROL</option>
                            <option value="DIESEL">DIESEL</option>
                            <option value="LPG">LPG</option>
                            <option value="CNG">CNG</option>
                            <option value="EV">EV</option>
                        </select>
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="serviceProviderType" className="block mb-1">
                            Service City
                        </label>
                        {viewSpecific && (
                            <Link to={'/UtilityModule/ServiceCity/ViewSpecificServiceCity/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>

                    {viewSpecific ? (
                        <input
                            name="fk_serviceCity"
                            type="text"
                            id="fk_serviceCity"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            // value={details.fk_serviceCity}
                            value="Banglore"
                            readOnly
                        />
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

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                {/* <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="ctnEmail" className="block mb-1">
                        Vehicle Manufacturing Date
                    </label>
                    {viewSpecific ? (
                        <Flatpickr value={date1} options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" readOnly />
                    ) : (
                        <Flatpickr value={date1} options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" onChange={(date: any) => setDate1(date)} />
                    )}
                </div> */}
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehRegistrationDate" className="block mb-1">
                        Vehicle Registration Date
                    </label>
                    {viewSpecific ? (
                        <Flatpickr
                            value={[vehRegistrationDate, date1]} // Combining vehRegistrationDate and date1 into an array
                            options={{ dateFormat: 'Y-m-d' }}
                            className="form-input"
                            readOnly
                        />
                    ) : (
                        <Flatpickr
                            value={[vehRegistrationDate, date1]} // Combining vehRegistrationDate and date1 into an array
                            options={{ dateFormat: 'Y-m-d' }}
                            className="form-input"
                            // onChange={(date: Date[]) => handleVehRegistrationDateChange(date)}
                        />
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehAge" className="block mb-1">
                        Vehicle Age
                    </label>
                    {viewSpecific ? (
                        <input
                            name="vehAge"
                            type="text"
                            id="vehAge"
                            className="form-input w-full pointer-events-none"
                            // value={vehAge}
                            value="20 Years"
                            readOnly
                        />
                    ) : (
                        <input
                            name="vehAge"
                            type="text"
                            id="vehAge"
                            placeholder="Enter Vehicle Age"
                            className="form-input w-full"
                            // value={vehAge}
                            onChange={onInputChange}
                        />
                    )}
                </div>

                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}></div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="fk_adminTeam" className="block mb-1">
                        Country
                    </label>
                    {viewSpecific ? (
                        <input name="country" type="tel" id="country" className="form-input w-full pointer-events-none" value={'India'} onChange={onInputChange} readOnly />
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
                    <label htmlFor="fk_adminTeam" className="block mb-1">
                        State
                    </label>
                    {viewSpecific ? (
                        <input name="state" type="tel" id="state" className="form-input w-full pointer-events-none" value={'kerala'} onChange={onInputChange} readOnly />
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
                    <label htmlFor="fk_adminTeam" className="block mb-1">
                        City
                    </label>
                    {viewSpecific ? (
                        <input name="city" type="tel" id="city" className="form-input w-full pointer-events-none" value={'kochi'} onChange={onInputChange} readOnly />
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

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="loanBanker" className="block mb-1">
                        Loan Banker
                    </label>
                    {viewSpecific ? (
                        <input
                            name="loanBanker"
                            type="text"
                            id="loanBanker"
                            placeholder="Enter Loan Banker"
                            className="form-input w-full pointer-events-none"
                            // value={details.loanBanker}
                            value="Union Bank of india"
                            onChange={onInputChange}
                        />
                    ) : (
                        <input name="loanBanker" type="text" id="loanBanker" placeholder="Enter Loan Banker" className="form-input w-full" value={details.loanBanker} onChange={onInputChange} />
                    )}
                </div>

                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="loanAccNumber" className="block mb-1">
                        Loan Account Number
                    </label>
                    {viewSpecific ? (
                        <input name="loanAccNumber" type="number" id="loanAccNumber" className="form-input w-full pointer-events-none" value={'1231231243'} onChange={onInputChange} />
                    ) : (
                        <input
                            name="loanAccNumber"
                            type="number"
                            id="loanAccNumber"
                            placeholder="Enter Loan Account Number"
                            className="form-input w-full"
                            value={details.loanAccNumber}
                            onChange={onInputChange}
                        />
                    )}
                </div>

                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="emiAmt" className="block mb-1">
                        EMI Amount-Month
                    </label>
                    {viewSpecific ? (
                        <input
                            name="emiAmt"
                            type="number"
                            id="emiAmt"
                            placeholder="Enter EMI Amount"
                            className="form-input w-full pointer-events-none"
                            // value={details.emiAmt}
                            value="3000"
                            onChange={onInputChange}
                        />
                    ) : (
                        <input name="emiAmt" type="number" id="emiAmt" placeholder="Enter EMI Amount" className="form-input w-full" value={details.emiAmt} onChange={onInputChange} />
                    )}
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="ctnEmail" className="block mb-1">
                        EMI Date
                    </label>
                    {viewSpecific ? (
                        <Flatpickr
                            value={date1}
                            options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                            className="form-input pointer-events-none"
                            onChange={(date: any) => setDate1(date)}
                        />
                    ) : (
                        <Flatpickr
                            value={date1}
                            options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                            className="form-input"
                            onChange={(date: any) => setDate1(date)}
                            placeholder="Select Date"
                        />
                    )}
                </div>

                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="currLocation" className="block mb-1">
                        Current Location
                    </label>
                    {viewSpecific ? (
                        <input
                            name="currLocation"
                            type="text"
                            id="currLocation"
                            placeholder="Enter Current Location"
                            className="form-input w-full pointer-events-none"
                            // value={details.currLocation}
                            value="Cochin"
                            onChange={onInputChange}
                        />
                    ) : (
                        <input
                            name="currLocation"
                            type="text"
                            id="currLocation"
                            placeholder="Enter Current Location"
                            className="form-input w-full"
                            value={details.currLocation}
                            onChange={onInputChange}
                        />
                    )}
                </div>

                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}></div>

                {/* <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="archive" className="block mb-1">
                        Allow To Rider Later
                    </label>
                    {viewSpecific ? (
                        <input name="archive" placeholder="Archive" type="text" id="archive" className="form-input w-full pointer-events-none" value={details?.archive} readOnly />
                    ) : (
                        <select
                            id="archive"
                            name="archive"
                            className="form-select text-white-dark"
                            required
                            value={details?.archive} // Update this line
                            onChange={onInputChange}
                        >
                            <option value="">Select Archive</option>
                            <option value={'yes'}>Yes</option>
                            <option value={'no'}>No</option>
                        </select>
                    )}
                </div> */}

                {showStatus ? ( // Conditionally rendering based on the showStatus prop
                    <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                        <label htmlFor="archive" className="block mb-1">
                            Status
                        </label>
                        {viewSpecific ? (
                            <input
                                name="status"
                                type="text"
                                id="status"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none font-bold' : ''}`}
                                // value={details.archive}
                                value={'APPROVED'}
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
                ) : null}
            </div>
        </>
    );
};

export default VehicleProfileModule;
