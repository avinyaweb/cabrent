import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { State, City } from 'country-state-city';
import { Link } from 'react-router-dom';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { DataTableColumn } from 'mantine-datatable';
import CommonPopUp from '@/components/Models/CommonPopUp';
import { getAllCityData } from '@/services/UtilityServices/CityService';

interface ServiceCityModuleProps {
    details: {
        country: string;
        state: string;
        city: string;
        dailyReqRadius: string;
        serviceType: string;
        rentalReqRadius: string;
        outstationReqRadius: string;
        cityCentreLat: string;
        cityCentreLong: string;
        cityBoundary: string;
        ApproxCityKMCenter: string;
        driverPrefixCode: string;
        tripPrefixCode: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific: boolean;
    isEdit: boolean;
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

// Define the IState type to represent the structure of the state object
interface IState {
    name: string;
    isoCode: string;
    countryIsoCode: string;
}

const ServiceCityModule: React.FC<ServiceCityModuleProps> = ({ details, onInputChange, showStatus = true, viewSpecific, isEdit }) => {
    // future code -->>
    // const dispatch = useDispatch();
    // const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [moduleDetails, setModuleDetails] = useState(details);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [states, setStates] = useState<IState[]>([]);
    const [cities, setCities] = useState<CityType[]>([]);
    const [selectedCountry, setSelectedCountry] = useState({
        label: 'India',
        value: 'IN',
    });

    useEffect(() => {
        if (selectedCountry) {
            const countryStates = State.getStatesOfCountry(selectedCountry.value);
            setStates(countryStates as unknown as IState[]); // Change the type here
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

    // future code -->>
    // const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { value } = event.target;
    //     setSelectedState(value);
    // };
    // const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { value } = event.target;
    //     setSelectedCity(value);
    // };

    // Fleet Owner Popup Table -------------->>
    const [modal, setModal] = useState(false);
    const [fk_CityData, setfk_CityData] = useState<any[]>([]);
    const [fk_CityType, setfk_CityType] = useState<any>();
    const [allCityData, setAllCityData] = useState<any[]>([]);
    // popup service city
    const handlefk_CitySubmit = (selectedfk_City: any[], id: string) => {
        setfk_CityData(selectedfk_City);
        setfk_CityType(id);
    };
    const fk_CityColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID' },
        { accessor: 'fk_stateOrProvince', title: 'State Name' },
        { accessor: 'cityName', title: 'City Name' },
        { accessor: 'archive', title: 'Status (Archive)' },
    ];

    // Dynamic Data
    // useEffect(() => {
    //     const fetchAdminCityData = async () => {
    //         try {
    //             const { data } = await getAllCityData();
    //             if (data?.Cities) {
    //                 const newData = data.Cities.map(({ _id: id, ...rest }: { _id: string }) => ({
    //                     id,
    //                     ...rest,
    //                 }));
    //                 setAllCityData(newData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching admin data:', error.message);
    //         }
    //     };
    //     fetchAdminCityData();
    // }, []);

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/2">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_City" className="block mb-1">
                            City
                        </label>
                        {viewSpecific && (
                            <Link to={'/UtilityModule/City/ViewSpecificCity/65e76e7d0fe34dfe73c7c9d9'}>
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
                            value={details.city}
                            readOnly
                        />
                    ) : isEdit ? (
                        <div>
                            {fk_CityType === 'city' ? (
                                <button type="button" onClick={() => setModal(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <div className="flex">
                                    <input
                                        name="fleetManagementType"
                                        type="text"
                                        id="fleetManagementType"
                                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                        value={details.city}
                                        readOnly
                                    />
                                    <button type="button" onClick={() => setModal(true)} className="btn btn-primary w-1/3">
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {fk_CityType === 'city' ? (
                                <button type="button" onClick={() => setModal(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <button type="button" onClick={() => setModal(true)} className="btn btn-primary w-full">
                                    Add City
                                </button>
                            )}
                        </div>
                    )}
                    <CommonPopUp title={'City'} columns={fk_CityColumns} data={allCityData} event={modal} closeModal={() => setModal(false)} onSubmit={handlefk_CitySubmit} />
                </div>
                <div className="lg:w-1/2">
                    <label htmlFor="serviceType" className="block mb-1">
                        Service Type
                    </label>
                    {viewSpecific ? (
                        <input name="serviceType" type="text" id="serviceType" className={`form-input w-full pointer-events-none`} value={'Type 1'} />
                    ) : (
                        <select id="serviceType" className="form-select text-white-dark" required>
                            <option value="">Select Your Service Type</option>
                            <option value={'Daily'}>Daily</option>
                            <option value={'Rental'}>Rental</option>
                            <option value={'Outstation'}>Outstation</option>
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="dailyReqRadius" className="block mb-1">
                        Daily Request Radius
                    </label>
                    <input
                        name="dailyReqRadius"
                        type="text"
                        id="dailyReqRadius"
                        placeholder="Enter Daily Request Radius"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.dailyReqRadius}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="rentalReqRadius" className="block mb-1">
                        Rental Request Radius
                    </label>
                    <input
                        name="rentalReqRadius"
                        type="text"
                        id="rentalReqRadius"
                        placeholder="Enter Rental Request Radius"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.rentalReqRadius}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="outstationReqRadius" className="block mb-1">
                        Outstation Request Radius
                    </label>
                    <input
                        name="outstationReqRadius"
                        type="text"
                        id="outstationReqRadius"
                        placeholder="Enter Outstation Request Radius"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.outstationReqRadius}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="cityCentreLat" className="block mb-1">
                        City Centre Latitude
                    </label>
                    <input
                        name="cityCentreLat"
                        type="text"
                        id="cityCentreLat"
                        placeholder="Enter City Centre Latitude"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.cityCentreLat}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="cityCentreLong" className="block mb-1">
                        City Centre Longitude
                    </label>
                    <input
                        name="cityCentreLong"
                        type="text"
                        id="cityCentreLong"
                        placeholder="Enter City Centre Longitude"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.cityCentreLong}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="ApproxCityKMCenter" className="block mb-1">
                        Approx City Boundary KM from Center
                    </label>
                    <input
                        name="ApproxCityKMCenter"
                        type="text"
                        id="ApproxCityKMCenter"
                        placeholder=" Approx City Boundary"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.ApproxCityKMCenter}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/2">
                    <label htmlFor="driverPrefixCode" className="block mb-1">
                        Driver Prefix Code
                    </label>
                    <input
                        name="driverPrefixCode"
                        type="text"
                        id="driverPrefixCode"
                        placeholder="Enter Driver Prefix Code"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={'DRBL123'}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/2">
                    <label htmlFor="tripPrefixCode" className="block mb-1">
                        Trip Prefix Code
                    </label>
                    <input
                        name="tripPrefixCode"
                        type="text"
                        id="tripPrefixCode"
                        placeholder="Enter City Centre Longitude"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={'KABL321'}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                {showStatus ? (
                    <div className="lg:w-1/3">
                        <label htmlFor="status" className="block mb-1">
                            Status
                        </label>
                        {viewSpecific ? (
                            <input name="status" type="text" id="status" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={'Active '} onChange={onInputChange} />
                        ) : (
                            <select id="status" className="form-select text-white-dark" required>
                                <option value="">Select your Status</option>
                                <option value={'Active'}>Active</option>
                                <option value={'InActive'}>InActive</option>
                            </select>
                        )}
                    </div>
                ) : null}
            </div>
        </>
    );
};

export default ServiceCityModule;
