import React, { useState, useEffect, ChangeEvent } from 'react';
import { State, City } from 'country-state-city';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { useNavigate, Link } from 'react-router-dom';
import ServiceCityModal from '@/components/Models/ServiceCityModal';

interface DistributorSettingsModuleProps {
    details: {
        bookingType: string;
        serviceType: string;
        serviceCity: string;
        subscriptionType: string;
        taxPercentage: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
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

const DistributorSettingsModule: React.FC<DistributorSettingsModuleProps> = ({ redirect, details, onInputChange, showStatus = true, viewSpecific, isEditPage, noPassEdit }) => {
    // future code -->>>
    // const dispatch = useDispatch();
    // const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // future code --->>>
    // const [roleValue, setRoleValue] = useState('');
    // const [serviceTypeValue, setserviceTypeValue] = useState('');
    // const [subscriptionTypeValue, setsubscriptionTypeValue] = useState('');
    const [selectedbookingType, setSelectedbookingType] = useState(details.bookingType);
    const [selectedserviceType, setSelectedserviceType] = useState(details.serviceType);
    const [selectedserviceCity, setSelectedserviceCity] = useState(details.serviceCity);
    const [selectedsubscriptionType, setSelectedsubscriptionType] = useState(details.subscriptionType);
    const [selectedtaxPercentage, setSelectedtaxPercentage] = useState(details.taxPercentage);
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

    // future code --->>>
    // const [serviceCityOption, SetServiceCityOption] = useState<any[]>([]);
    // const [serviceCity, SetServiceCity] = useState(details.city);

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

    // Get today's date in the format 'YYYY-MM-DD'
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;

    const [date1, setDate1] = useState<any>(formattedToday);

    const handleRoleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedbookingType(value);
        onInputChange({
            target: {
                name: 'channelPartnerType',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleserviceTypeTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedserviceType(value);
        onInputChange({
            target: {
                name: 'serviceType',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };
    // future code --->>>
    // const handleserviceTypeserviceCitytype = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { value } = event.target;
    //     setSelectedserviceCity(value);
    //     onInputChange({
    //         target: {
    //             name: 'serviceCitytype',
    //             value: value,
    //         },
    //     } as React.ChangeEvent<HTMLInputElement>);
    // };

    const handlesubscriptionTypeTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedsubscriptionType(value);
        onInputChange({
            target: {
                name: 'subscriptionCommisionAmountType',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleTripsTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedtaxPercentage(value);
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

    const [modal6, setModal6] = useState(false);

    const [addedserviceCityType, setAddedServiceCityType] = useState<any>();
    const [ServiceCityData, setServiceCityData] = useState<any[]>([]);

    const handleAddServiceCitySubmit = (selectedServiceCity: any[], userID: string) => {
        setServiceCityData(selectedServiceCity);
        setAddedServiceCityType(userID);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`lg:w-1/3 ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="bookingType" className="block mb-1 text-md font-bold">
                        Booking Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="bookingType"
                            type="text"
                            id="bookingType"
                            placeholder="Enter Booking Type"
                            className="form-input w-full"
                            value={'Online booking'}
                            onChange={onInputChange}
                            readOnly
                        />
                    ) : (
                        <select id="bookingType" className="form-select text-white-dark" name="bookingType" required>
                            <option value="">Select Booking Type</option>
                            <option value="Online Booking">Online Booking</option>
                            <option value="Schedule Booking">Schedule Booking</option>
                            <option value="QR Code Booking">QR Code Booking</option>
                        </select>
                    )}
                </div>

                <div className={`lg:w-1/3 ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="serviceType" className="block mb-1 text-md font-bold">
                        Service Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="serviceType"
                            type="text"
                            id="serviceType"
                            placeholder="Enter Service Type"
                            className="form-input w-full pointer-events-none"
                            value={'Daily'}
                            onChange={onInputChange}
                            readOnly
                        />
                    ) : (
                        <select id="serviceType" className="form-select text-white-dark" name="serviceType" required>
                            <option value="">Select Service Type</option>
                            <option value="Daily">Daily</option>
                            <option value="Rental">Rental</option>
                            <option value="Outstation">Outstation</option>
                        </select>
                    )}
                </div>

                <div className={`w-1/3 ${viewSpecific ? 'pointer-events-none' : ''}`}>
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
                        <input
                            name="serviceCity"
                            type="text"
                            id="serviceCity"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            // value={details.serviceCity}
                            value={'Banglore'}
                            readOnly
                        />
                    ) : (
                        <div>
                            {addedserviceCityType === 'serviceCityAdded' ? (
                                <button type="button" className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <div>
                                    <button type="button" onClick={() => setModal6(true)} className="btn btn-primary w-full">
                                        Add Service City
                                    </button>
                                    <ServiceCityModal event={modal6} closeModal={() => setModal6(false)} onAddServiceCity={handleAddServiceCitySubmit} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 mt-5 sm:flex justify-between gap-5">
                <div className={`lg:w-1/3 ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="subscriptionType" className="block mb-1 text-md font-bold">
                        Subscription Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="subscriptionType"
                            type="text"
                            id="subscriptionType"
                            placeholder="Enter Subscription Type"
                            className="form-input w-full"
                            value={'Flat'}
                            onChange={onInputChange}
                            readOnly
                        />
                    ) : (
                        <select id="subscriptionType" className="form-select text-white-dark" name="subscriptionType" required>
                            <option value="">Select Subscription Type</option>
                            <option value="Flat">Flat</option>
                            <option value="Percentage">Percentage</option>
                        </select>
                    )}
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="taxPercentage" className="block mb-1">
                        Tax Percentage
                    </label>
                    <input
                        name="taxPercentage"
                        type="number"
                        id="taxPercentage"
                        placeholder="Enter Tax Percentage"
                        value={'6'}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : 'pointer-events-none'}`}
                        disabled={viewSpecific}
                    />
                </div>

                <div className={`lg:w-1/3 ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="category" className="block mb-1 text-md font-bold">
                        Category
                    </label>
                    {viewSpecific ? (
                        <input
                            name="category"
                            type="text"
                            id="category"
                            placeholder="Enter Category"
                            className="form-input w-full pointer-events-none"
                            value={'Gold'}
                            onChange={onInputChange}
                            readOnly
                        />
                    ) : (
                        <select id="category" className="form-select text-white-dark" name="category" required disabled={viewSpecific}>
                            <option value="">Select Category</option>
                            <option value="Gold">Gold</option>
                            <option value="Silver">Silver</option>
                            <option value="Platinum">Platinum</option>
                        </select>
                    )}
                </div>
            </div>

            <hr className="mt-10" />
        </>
    );
};

export default DistributorSettingsModule;
