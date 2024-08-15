import React, { useState, useEffect, ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getAllCity } from '@/services/RolesService';
import { getAllVehicleUtility } from '@/services/UtilityServices/VehicleUtilityServices';
import CarouselModel from '@/components/Carousel/CarouselModel';
import ImageUploading, { ImageListType } from 'react-images-uploading';
// import '../../../assets/css/file-upload-preview.css';
import IconX from '@/components/Icon/IconX';
import CommonPopUp from '@/components/Models/CommonPopUp';
import { DataTableColumn } from 'mantine-datatable';
import { Link } from 'react-router-dom';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import Select from 'react-select';
import ViewSpecificBookingAmtDistribution from '../../BookingAmtDistribution/ViewSpecificBookingAmtDistribution';

interface VehicleTypesProps {
    details: {
        id: string;
        vehicleType: string;
        serviceType: string;
        displayOrder: string;
        tripType: string;
        seatCapacity: string;
        fk_serviceCity: string;
        lowCatVehicle: string;
        baseFee: string;
        leadCharge: string;
        perKMRate: string;
        minimumFare: string;
        commision: string;
        timeMinRate: string;
        rideLater: string;
        isVehAvailable: string;
        description: string;
        features: string;
        vehicleIcon: string;
        conveyanceAvail: string;
        conveyanceCharge: string;
        taxApplicable: string;
        cgst: string;
        sgst: string;
        cancelChargeDriver: string;
        cancelChargeRider: string;
        peakHourStart: string;
        peakHourEnd: string;
        peakFareIncrease: string;
        peakHourStart2: string;
        peakHourEnd2: string;
        peakFare2Increase: string;
        nightHourStart: string;
        nightHourEnd: string;
        nightIncreseFare: string;
        isWaitCharge: string;
        beforeTripWaitChargeApplicable: string; //boolean
        maxWaitTime: string;
        minWaitTimeBeforeTrip: string;
        waitChargePerMin: string;
        waitingRate: string;
        archive: string;

        //booking amt dist
        actualTripCost: string;
        leadCharges1: string;
        leadCharges2: string;
        convinenceCharge: string;
        adminCharge: string;
        tax: string;
        techCharges: string;
        promotionDiscount: string;
        SPDiscount: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific: boolean;
    isEditPage: boolean;
}

interface DailyFares {
    id: string;
    fk_vehicleType: string;
    dailyExtraKMRate: string;
    dailyExtraTimeRate: string;
    // dailyExtraKMRateOneWay: string;
    // dailyExtraTimeRateOneWay: string;
    // dailyBaseFeeOneWay: string;
    // dailyBaseFeeTwoWay: string;
    // dailyExtraKMRateTwoWay: string;
    // dailyExtraTimeRateTwoWay: string;
}

interface RentalFares {
    id: string;
    fk_vehicleType: string;
    rentalExtraKMRate: string;
    rentalExtraTimeRate: string;
    // rentalExtraKMRateOneWay: string;
    // rentalExtraTimeRateOneWay: string;
    // rentalBaseFeeOneWay: string;
    // rentalBaseFeeTwoWay: string;
    // rentalExtraKMRateTwoWay: string;
    // rentalExtraTimeRateTwoWay: string;
}

interface OutstationFares {
    id: string;
    fk_vehicleType: string;
    outstationExtraKMRate: string;
    outstationExtraTimeRate: string;
    outstationExtraKMRateOneWay: string;
    outstationExtraTimeRateOneWay: string;
    outstationBaseFeeOneWay: string;
    outstationBaseFeeTwoWay: string;
    outstationExtraKMRateTwoWay: string;
    outstationExtraTimeRateTwoWay: string;
}

interface Details {
    [key: string]: string;
}

interface Field {
    name: string;
    label: string;
}

const staticServiceCityData = [
    {
        id: '1',
        fk_serviceCity: 'NYC',
        planName: 'Basic Plan',
        planDetails: 'Includes standard features',
        planDuration: '30 days',
        planAmount: '$50',
        planDescription: 'Entry-level subscription',
        planDistance: 'Unlimited',
        planLiveStartTime: '2024-01-05T09:00:00Z',
        planLiveEndTime: '2024-02-04T18:00:00Z',
        archive: 'false',
        approvedBy: 'Admin',
        approvedAt: '2024-01-05T12:00:00Z',
        createdBy: 'User123',
        createdAt: '2024-01-05T08:30:00Z',
        updatedBy: 'User456',
        updatedAt: '2024-01-05T11:45:00Z',
        updatedHistory: [
            {
                updatedByObjectId: '654e26716e8ddde56bf6fe64',
                updatedTime: '2024-01-01T09:40:05.000Z',
                _id: '65928875e10d341487baa93a',
            },
            {
                updatedByObjectId: '654e26716e8ddde56bf6fe64',
                updatedTime: '2024-01-01T10:28:30.000Z',
                _id: '659293cee10d341487baa9fa',
            },
        ],
    },
    {
        id: '2',
        fk_serviceCity: 'LA',
        planName: 'Premium Plan',
        planDetails: 'Includes advanced features',
        planDuration: '90 days',
        planAmount: '$150',
        planDescription: 'High-end subscription',
        planDistance: 'Unlimited',
        planLiveStartTime: '2024-01-10T10:00:00Z',
        planLiveEndTime: '2024-04-09T18:00:00Z',
        archive: 'false',
        approvedBy: 'Manager',
        approvedAt: '2024-01-06T09:30:00Z',
        createdBy: 'User789',
        createdAt: '2024-01-06T08:45:00Z',
        updatedBy: 'UserABC',
        updatedAt: '2024-01-07T11:20:00Z',
    },
    {
        id: '3',
        fk_serviceCity: 'SF',
        planName: 'Pro Plan',
        planDetails: 'Includes premium features',
        planDuration: '365 days',
        planAmount: '$500',
        planDescription: 'Top-tier subscription',
        planDistance: 'Unlimited',
        planLiveStartTime: '2024-02-01T08:00:00Z',
        planLiveEndTime: '2025-01-31T18:00:00Z',
        archive: 'false',
        approvedBy: 'Supervisor',
        approvedAt: '2024-01-07T15:00:00Z',
        createdBy: 'UserXYZ',
        createdAt: '2024-01-07T07:30:00Z',
        updatedBy: 'User123',
        updatedAt: '2024-01-08T10:15:00Z',
    },
];

const VehicleTypesModule: React.FC<VehicleTypesProps> = ({ details, onInputChange, showStatus = true, viewSpecific, isEditPage }) => {
    // future code -->>
    // const dispatch = useDispatch();
    // const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [moduleDetails, setModuleDetails] = useState(details);
    const [LowCatVehicle, setLowCatVehicle] = useState(details.lowCatVehicle);
    const [TripType, setTripType] = useState(details.tripType);
    const [RideLater, setRideLater] = useState(details.rideLater);
    const [IsVehAvailable, setIsVehAvailable] = useState(details.isVehAvailable);
    const [ConveyanceAvail, setConveyanceAvail] = useState(details.conveyanceAvail);
    const [TaxApplicable, setTaxApplicable] = useState(details.taxApplicable);
    const [IsWaitCharge, setIsWaitCharge] = useState(details.isWaitCharge);
    const [BeforeTripWaitChargeApplicable, setBeforeTripWaitChargeApplicable] = useState(details.isWaitCharge);
    const [value, setValue] = useState('');
    const [city, setCity] = useState(details.fk_serviceCity);
    const [cityOption, setCityOption] = useState<any[]>([]);
    const [vehicle, setvehicle] = useState(details.vehicleType);
    const [vehicleyOption, setvehicleOption] = useState<any[]>([]);
    // ftire code -->>
    // const [serviceCityOption, SetServiceCityOption] = useState<any[]>([]);
    // const [serviceCity, SetServiceCity] = useState(details.fk_serviceCity);
    const [modal1, setModal1] = useState(false);
    const maxNumber = 69;

    // service city
    const handleCitySelection = (selectedCities: any) => {
        // Convert the selectedCities array of objects into a comma-separated string of city values
        const cityValues = selectedCities.map((city: any) => city.value).join(',');
        // Update the details or perform any other necessary actions with the city values
        setModuleDetails({ ...moduleDetails, fk_serviceCity: cityValues });
    };
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // Update the moduleDetails state based on the input changes
        setModuleDetails({ ...moduleDetails, [name]: value });
    };

    // handle selection dropdown functions.
    const handleSelectLowCatVehicle = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setLowCatVehicle(value);
        onInputChange({
            target: {
                name: 'lowCatVehicle',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    // handle trip type  dropdown functions.
    const handleSelectTriptype = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setTripType(value);
        onInputChange({
            target: {
                name: 'lowCatVehicle',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleSelectRideLater = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setRideLater(value);
        onInputChange({
            target: {
                name: 'rideLater',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };
    const handleSelectIsVehAvailable = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setIsVehAvailable(value);
        onInputChange({
            target: {
                name: 'isVehAvailable',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };
    const handleSelectConveyanceAvail = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setConveyanceAvail(value);
        onInputChange({
            target: {
                name: 'conveyanceAvail',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };
    const handleSelectTaxApplicable = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setTaxApplicable(value);
        onInputChange({
            target: {
                name: 'taxApplicable',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };
    const handleSelectIsWaitCharge = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setIsWaitCharge(value);
        onInputChange({
            target: {
                name: 'isWaitCharge',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };
    const handleSelectBeforeTripWaitChargeApplicable = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setBeforeTripWaitChargeApplicable(value);
        onInputChange({
            target: {
                name: 'beforeTripWaitChargeApplicable',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
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

    const getAllVehicleData = async () => {
        try {
            const data = await getAllVehicleUtility();
            setvehicleOption(data?.data?.VehicleUtilities);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCityData();
        getAllServiceCityData();
        getAllVehicleData();
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

    const handlevehicleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setvehicle(value);
        onInputChange({
            target: {
                name: 'vehicleType',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    // image preview and static img data.
    const vehicleIconImage = [
        'https://cdn.pixabay.com/photo/2020/10/13/22/14/vehicle-5652959_1280.png',
        // Add more image URLs as needed
    ];
    const [vehicleIconImg, setVehicleIconImg] = useState<any>([]);
    // handle image upload.
    const handlevehicleIconImg = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setVehicleIconImg(imageList as never[]);
    };

    // service city pop-up
    const [modal2, setmodal2] = useState(false);
    const [fk_serviceCityData, setfk_serviceCityData] = useState<any[]>([]);
    const [fk_serviceCityType, setfk_serviceCityType] = useState<any>();
    // popup service city
    const handleAddfk_serviceCitySubmit = (selectedfk_serviceCity: any[], id: string) => {
        setfk_serviceCityData(selectedfk_serviceCity);
        setfk_serviceCityType(id);
    };

    const fk_serviceCityColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID' },
        { accessor: 'country', title: 'country' },
        { accessor: 'state', title: 'state' },
        { accessor: 'city', title: 'city' },
        { accessor: 'dailyReqRadius', title: 'Daily Req Radius' },
        { accessor: 'rentalReqRadius', title: 'Rental Req Radius' },
        { accessor: 'outstationReqRadius', title: 'Outstation Req Radius' },
        { accessor: 'cityCentreLat', title: 'City Centre Lat' },
        { accessor: 'cityCentreLong', title: 'City Centre Long' },
        { accessor: 'cityBoundary', title: 'City Boundary' },
        { accessor: 'archive', title: 'Archive' },
    ];

    const options5 = [
        { value: 'MINI', label: 'MINI' },
        { value: 'SIDAN', label: 'SIDAN' },
        { value: 'HATCHBACK', label: 'HATCHBACK' },
        { value: 'SUV', label: 'SUV' },
    ];

    const [showVehicleType, setShowVehicleType] = useState(false);
    const [LowCateVehicle, setLowCateVehicle] = useState('');

    const handleSelectLowCateVehicle = (event: any) => {
        const value = event.target.value;
        setLowCateVehicle(value);
        setShowVehicleType(value === 'sample');
    };

    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');

    const [serviceType, setServiceType] = useState('');

    const handleServiceTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setServiceType(e.target.value);
    };

    const fieldConfigurations: { [key: string]: Field[] } = {
        Daily: [
            { name: 'dailyExtraKMRate', label: 'Daily Extra KM Rate' },
            { name: 'dailyExtraTimeRate', label: 'Daily Extra Time Rate' },
            // { name: 'dailyExtraKMRateOneWay', label: 'Daily Extra KM Rate One Way' },
            // { name: 'dailyExtraTimeRateOneWay', label: 'Daily Extra Time Rate One Way' },
            // { name: 'dailyBaseFeeOneWay', label: 'Daily Base Fee One Way' },
            // { name: 'dailyBaseFeeTwoWay', label: 'Daily Base Fee Two Way' },
            // { name: 'dailyExtraKMRateTwoWay', label: 'Daily Extra KM Rate Two Way' },
            // { name: 'dailyExtraTimeRateTwoWay', label: 'Daily Extra Time Rate Two Way' },
        ],
        Rental: [
            { name: 'rentalExtraKMRate', label: 'Rental Extra KM Rate' },
            { name: 'rentalExtraTimeRate', label: 'Rental Extra Time Rate' },
            // { name: 'rentalExtraKMRateOneWay', label: 'Rental Extra KM Rate One Way' },
            // { name: 'rentalExtraTimeRateOneWay', label: 'Rental Extra Time Rate One Way' },
            // { name: 'rentalBaseFeeOneWay', label: 'Rental Base Fee One Way' },
            // { name: 'rentalBaseFeeTwoWay', label: 'Rental Base Fee Two Way' },
            // { name: 'rentalExtraKMRateTwoWay', label: 'Rental Extra KM Rate Two Way' },
            // { name: 'rentalExtraTimeRateTwoWay', label: 'Rental Extra Time Rate Two Way' },
        ],
        Outstation: [
            { name: 'outstationExtraKMRate', label: 'Outstation Extra KM Rate' },
            { name: 'outstationExtraTimeRate', label: 'Outstation Extra Time Rate' },
            { name: 'outstationExtraKMRateOneWay', label: 'Outstation Extra KM Rate One Way' },
            { name: 'outstationExtraTimeRateOneWay', label: 'Outstation Extra Time Rate One Way' },
            { name: 'outstationBaseFeeOneWay', label: 'Outstation Base Fee One Way' },
            { name: 'outstationBaseFeeTwoWay', label: 'Outstation Base Fee Two Way' },
            { name: 'outstationExtraKMRateTwoWay', label: 'Outstation Extra KM Rate Two Way' },
            { name: 'outstationExtraTimeRateTwoWay', label: 'Outstation Extra Time Rate Two Way' },
        ],
    };

    return (
        <>
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/2 ">
                    <label htmlFor="VehicleType" className="block mb-1 text-md font-bold">
                        Vehicle Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="VehicleType"
                            type="text"
                            id="VehicleType"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details.vehicleType}
                            onChange={onInputChange}
                        />
                    ) : (
                        <select id="VehicleType" className="form-select text-white-dark" required value={details.vehicleType} onChange={handlevehicleTypeChange}>
                            <option value="">Select your Vehicle Type</option>
                            <option value={'Mini'}>Mini</option>
                            <option value={'Sidan'}>Sidan</option>
                            <option value={'HatchBack'}>HatchBack</option>
                            <option value={'Suv'}>Suv</option>
                        </select>
                    )}
                </div>

                <div className="lg:w-1/2 ">
                    <label htmlFor="serviceType" className="block mb-1 text-md font-bold">
                        Service Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="serviceType"
                            type="text"
                            id="serviceType"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details.archive}
                            onChange={onInputChange}
                        />
                    ) : (
                        <select id="serviceType" className="form-select text-white-dark" required value={serviceType} onChange={handleServiceTypeChange}>
                            <option value="">Select your Service Type</option>
                            <option value={'Daily'}>Daily</option>
                            <option value={'Rental'}>Rental</option>
                            <option value={'Outstation'}>Out Station</option>
                        </select>
                    )}
                </div>

                {/* <div className="lg:w-1/3">
                    {viewSpecific ? (
                        <div>
                            <label htmlFor="vehicleType" className="block mb-1 text-md font-bold">
                                Vehicle Type
                            </label>
                            <input name="vehicleType" placeholder="Select" type="text" id="vehicleType" className="form-input w-full pointer-events-none" value={'MINI'} readOnly />
                        </div>
                    ) : (
                        showVehicleType && (
                            <div className="mb-5">
                                <label htmlFor="vehicleType" className="block mb-1 text-md font-bold">
                                    Vehicle Type
                                </label>
                                <Select placeholder="Select an option" options={options5} isMulti isSearchable={false} />
                            </div>
                        )
                    )}
                </div> */}
                {/* <div className="lg:w-1/3">
                    <label htmlFor="displayOrder" className="block mb-1 text-md font-bold">
                        Display Order
                    </label>
                    <input
                        name="displayOrder"
                        type="text"
                        id="displayOrder"
                        placeholder="Enter Display Order"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.displayOrder}
                        onChange={onInputChange}
                    />
                </div> */}
            </div>

            {/* Service type fare details */}
            {serviceType && (
                <div className="panel mt-3">
                    <h2 className="text-2xl font-bold mb-3">Enter More Details About {serviceType}*</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">
                        {fieldConfigurations[serviceType].map((field: any) => (
                            <div key={field.name}>
                                <label htmlFor={field.name} className="block mb-1 text-md font-bold">
                                    {field.label}
                                </label>
                                <input
                                    name={field.name}
                                    id={field.name}
                                    type="text"
                                    className="form-input w-full"
                                    // value={details[field.name]}
                                    onChange={onInputChange}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-4">
                <div className="lg:w-1/2">
                    <label htmlFor="lowCatVehicle" className="block mb-1 text-md font-bold">
                        Low Category Vehicle
                    </label>
                    {viewSpecific ? (
                        <input
                            name="lowCatVehicle"
                            type="text"
                            id="lowCatVehicle"
                            placeholder="Enter Low Category Vehicle"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.lowCatVehicle}
                            onChange={onInputChange}
                        />
                    ) : (
                        <select id="lowCatVehicle" className="form-select text-white-dark" name="lowCatVehicle" required value={LowCateVehicle} onChange={handleSelectLowCateVehicle}>
                            <option value="">Select Yes or No </option>
                            <option value="sample">Yes</option>
                            <option value="no">No</option>
                        </select>
                    )}
                </div>

                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <div>
                            <label htmlFor="vehicleType" className="block mb-1 text-md font-bold">
                                Available Vehicle Type
                            </label>
                            <input name="vehicleType" placeholder="Select" type="text" id="vehicleType" className="form-input w-full pointer-events-none" value={'MINI'} readOnly />
                        </div>
                    ) : (
                        showVehicleType && (
                            <div className="mb-5">
                                <label htmlFor="vehicleType" className="block mb-1 text-md font-bold">
                                    Available Vehicle Type
                                </label>
                                <Select placeholder="Select an option" options={options5} isMulti isSearchable={false} />
                            </div>
                        )
                    )}
                </div>

                {/* <div className="lg:w-1/3"></div> */}
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="seatCapacity" className="block mb-1 text-md font-bold">
                        Seat Capacity
                    </label>
                    <input
                        name="seatCapacity"
                        type="Number"
                        id="seatCapacity"
                        placeholder="Enter Seat Capacity"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.seatCapacity}
                        onChange={onInputChange}
                    />
                </div>
                <div className={`lg:w-1/3`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_serviceCity" className="block mb-1">
                            Service City
                        </label>
                        {viewSpecific && (
                            <Link to={'/UtilityModule/ServiceCity/ViewSpecificServiceCity/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto" />
                            </Link>
                        )}
                    </div>
                    {viewSpecific ? (
                        <input
                            name="fk_serviceCity"
                            type="text"
                            id="fk_serviceCity"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details.fk_serviceCity}
                            readOnly
                        />
                    ) : isEditPage ? (
                        <div>
                            {fk_serviceCityType === 'service city' ? (
                                <button type="button" onClick={() => setmodal2(true)} className="btn btn-success w-full">
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
                                    <button type="button" onClick={() => setmodal2(true)} className="btn btn-primary w-1/3">
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {fk_serviceCityType === 'service city' ? (
                                <button type="button" onClick={() => setmodal2(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <button type="button" onClick={() => setmodal2(true)} className="btn btn-primary w-full">
                                    Add Service City
                                </button>
                            )}
                        </div>
                    )}
                    <CommonPopUp
                        title={'Service City'}
                        columns={fk_serviceCityColumns}
                        data={staticServiceCityData}
                        event={modal2}
                        closeModal={() => setmodal2(false)}
                        onSubmit={handleAddfk_serviceCitySubmit}
                    />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="displayOrder" className="block mb-1 text-md font-bold">
                        Display Order
                    </label>
                    <input
                        name="displayOrder"
                        type="text"
                        id="displayOrder"
                        placeholder="Enter Display Order"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.displayOrder}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            {/* service type fare details */}

            {/* {serviceType && (
                     <div className="panel">
                    <div>
                        {fieldConfigurations[serviceType].map((field:any) => (
                            <div key={field.name}>
                                <label htmlFor={field.name} className="block mb-1 text-md font-bold">
                                    {field.label}
                                </label>
                                <input
                                    name={field.name}
                                    id={field.name}
                                    type="text"
                                    className="form-input w-full"
                                    // value={details[field.name]}
                                    onChange={onInputChange}
                                />
                            </div>
                        ))}
                    </div>
                    </div>
                )}
           */}

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 ">
                <div className="lg:w-1/2">
                    <label htmlFor="description" className="block mb-1 text-md font-bold">
                        Features
                    </label>
                    {viewSpecific ? (
                        <div className=" w-full border rounded-md text-start h-28 pointer-events-none">
                            <p className="m-2 ">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quaerat dolorem corporis numquam dolorum repellat dignissimos consectetur perspiciatis in, aliquam tenetur
                                cupiditate veniam aliquid impedit odit repudiandae asperiores nam soluta
                            </p>
                        </div>
                    ) : (
                        <ReactQuill theme="snow" value={value1} onChange={setValue1} className={`h-24 w-full`} />
                    )}
                </div>
                <div className="lg:w-1/2 ">
                    <label htmlFor="remarks" className="block mb-1 text-md font-bold">
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

            <div className="panel mt-12">
                <h2 className="text-3xl font-bold mb-3"> Fare details*</h2>

                {/* booking amt dist */}

                <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                    <div className="lg:w-1/3">
                        <label htmlFor="actualTripCost" className="block mb-1">
                            Actual Trip Cost
                        </label>
                        <input
                            name="actualTripCost"
                            type="text"
                            id="actualTripCost"
                            placeholder="Enter Actual Trip Cost"
                            className="form-input w-full"
                            value={details.actualTripCost}
                            onChange={onInputChange}
                            disabled={viewSpecific}
                        />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="adminCharge" className="block mb-1">
                            Admin Charge
                        </label>
                        <input
                            name="adminCharge"
                            type="text"
                            id="adminCharge"
                            placeholder="Enter Admin Charge"
                            className="form-input w-full"
                            value={details.adminCharge}
                            onChange={onInputChange}
                            disabled={viewSpecific}
                        />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="SPDiscount" className="block mb-1">
                            SP Discount
                        </label>
                        <input
                            name="SPDiscount"
                            type="text"
                            id="SPDiscount"
                            placeholder="Enter SP Discount"
                            className="form-input w-full"
                            value={details.SPDiscount}
                            onChange={onInputChange}
                            disabled={viewSpecific}
                        />
                    </div>

                    {/* <div className="lg:w-1/3">
                    <label htmlFor="cgst" className="block mb-1">
                        CGST
                    </label>
                    <input name="cgst" type="text" id="cgst" placeholder="Enter CGST" className="form-input w-full" value={details.cgst} onChange={onInputChange} disabled={viewSpecific} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="sgst" className="block mb-1">
                        SGST
                    </label>
                    <input name="sgst" type="text" id="sgst" placeholder="Enter SGST" className="form-input w-full" value={details.sgst} onChange={onInputChange} disabled={viewSpecific} />
                </div> */}
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="leadCharges1" className="block mb-1">
                            Lead Charges 1
                        </label>
                        <input
                            name="leadCharges1"
                            type="text"
                            id="leadCharges1"
                            placeholder="Enter Lead Charges 1"
                            className="form-input w-full"
                            value={details.leadCharges1}
                            onChange={onInputChange}
                            disabled={viewSpecific}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="leadCharges2" className="block mb-1">
                            Lead Charges 2
                        </label>
                        <input
                            name="leadCharges2"
                            type="text"
                            id="leadCharges2"
                            placeholder="Enter Lead Charges 2"
                            className="form-input w-full"
                            value={details.leadCharges2}
                            onChange={onInputChange}
                            disabled={viewSpecific}
                        />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="conveyanceAvail" className="block mb-1 text-md font-bold">
                            Conveyance Available
                        </label>
                        {viewSpecific ? (
                            <input
                                name="conveyanceAvail"
                                type="text"
                                id="conveyanceAvail"
                                placeholder="Enter Conveyance Available"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={details.conveyanceAvail}
                                onChange={onInputChange}
                            />
                        ) : (
                            <select id="conveyanceAvail" className="form-select text-white-dark" name="conveyanceAvail" required value={ConveyanceAvail} onChange={handleSelectConveyanceAvail}>
                                <option value="">Select conveyance Available</option>
                                <option value="sample">Yes</option>
                                <option value="sample">No</option>
                            </select>
                        )}
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    {/* <div className="lg:w-1/3">
                    <label htmlFor="adminCharge" className="block mb-1">
                        Admin Charge
                    </label>
                    <input
                        name="adminCharge"
                        type="text"
                        id="adminCharge"
                        placeholder="Enter Admin Charge"
                        className="form-input w-full"
                        value={details.adminCharge}
                        onChange={onInputChange}
                        disabled={viewSpecific}
                    />
                </div> */}
                    {/* <div className="lg:w-1/3">
                    <label htmlFor="tax" className="block mb-1">
                        Tax
                    </label>
                    <input name="tax" type="text" id="tax" placeholder="Enter Tax" className="form-input w-full" value={details.tax} onChange={onInputChange} disabled={viewSpecific} />
                </div> */}

                    <div className="lg:w-1/3">
                        <label htmlFor="conveyanceCharge" className="block mb-1 text-md font-bold">
                            Conveyance Change Limit
                        </label>
                        <input
                            name="conveyanceCharge"
                            type="text"
                            id="conveyanceCharge"
                            placeholder="Enter Conveyance Charge"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.conveyanceCharge}
                            onChange={onInputChange}
                        />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="convinenceCharge" className="block mb-1">
                            Convenience Charge
                        </label>
                        <input
                            name="convinenceCharge"
                            type="text"
                            id="convinenceCharge"
                            placeholder="Enter Convenience Charge"
                            className="form-input w-full"
                            value={details.convinenceCharge}
                            onChange={onInputChange}
                            disabled={viewSpecific}
                        />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="techCharges" className="block mb-1">
                            Tech Charges
                        </label>
                        <input
                            name="techCharges"
                            type="text"
                            id="techCharges"
                            placeholder="Enter Tech Charges"
                            className="form-input w-full"
                            value={details.techCharges}
                            onChange={onInputChange}
                            disabled={viewSpecific}
                        />
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="promotionDiscount" className="block mb-1">
                            Promotion Discount
                        </label>
                        <input
                            name="promotionDiscount"
                            type="text"
                            id="promotionDiscount"
                            placeholder="Enter Promotion Discount"
                            className="form-input w-full"
                            value={details.promotionDiscount}
                            onChange={onInputChange}
                            disabled={viewSpecific}
                        />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="rideLater" className="block mb-1 text-md font-bold">
                            Scheduled Booking
                        </label>
                        {viewSpecific ? (
                            <input
                                name="rideLater"
                                type="text"
                                id="rideLater"
                                // placeholder="Select yes or no"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={details.rideLater}
                                onChange={onInputChange}
                            />
                        ) : (
                            <select id="rideLater" className="form-select text-white-dark" name="rideLater" required value={RideLater} onChange={handleSelectRideLater}>
                                <option value="">Select Yes or No</option>
                                <option value="sample">Yes</option>
                                <option value="sample">No</option>
                            </select>
                        )}
                    </div>
                    {/* <div className="lg:w-1/3">
                    <label htmlFor="SPDiscount" className="block mb-1">
                        SP Discount
                    </label>
                    <input
                        name="SPDiscount"
                        type="text"
                        id="SPDiscount"
                        placeholder="Enter SP Discount"
                        className="form-input w-full"
                        value={details.SPDiscount}
                        onChange={onInputChange}
                        disabled={viewSpecific}
                    />
                </div> */}
                    <div className="lg:w-1/3">
                        <label htmlFor="waitingRate" className="block mb-1 text-md font-bold">
                            Waiting Rate
                            <span className="text-xs">&nbsp;(Minute or Hour)</span>
                        </label>

                        <input
                            name="waitingRate"
                            type="text"
                            id="waitingRate"
                            placeholder="Enter Waiting Rate"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.waitingRate}
                            onChange={onInputChange}
                        />
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="baseFee" className="block mb-1 text-md font-bold">
                            Base Fee
                        </label>
                        <input
                            name="baseFee"
                            type="Number"
                            id="baseFee"
                            placeholder="Enter Base Fee"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.baseFee}
                            onChange={onInputChange}
                        />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="isVehAvailable" className="block mb-1 text-md font-bold">
                            Is Vehicle Available
                        </label>
                        {viewSpecific ? (
                            <input
                                name="isVehAvailable"
                                type="text"
                                id="isVehAvailable"
                                placeholder="Enter Is Vehicle Available"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={details.isVehAvailable}
                                onChange={onInputChange}
                            />
                        ) : (
                            <select id="isVehAvailable" className="form-select text-white-dark" name="isVehAvailable" required value={IsVehAvailable} onChange={handleSelectIsVehAvailable}>
                                <option value="">Select is Veh Available</option>
                                <option value="sample">Yes</option>
                                <option value="sample">No</option>
                            </select>
                        )}
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="perKMRate" className="block mb-1 text-md font-bold">
                            Per KM Rate
                        </label>
                        <input
                            name="perKMRate"
                            type="Number"
                            id="perKMRate"
                            placeholder="Enter Per KM Rate"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.perKMRate}
                            onChange={onInputChange}
                        />
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="minimumFare" className="block mb-1 text-md font-bold">
                            Minimum Fare
                        </label>
                        <input
                            name="minimumFare"
                            type="Number"
                            id="minimumFare"
                            placeholder="Enter Minimum Fare"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.minimumFare}
                            onChange={onInputChange}
                        />
                    </div>

                    <div className="lg:w-1/3">
                        <label htmlFor="tripType" className="block mb-1 text-md font-bold">
                            Trip Type
                        </label>
                        {viewSpecific ? (
                            <input
                                name="tripType"
                                type="text"
                                id="tripType"
                                placeholder="Enter  Trip type"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={details.tripType}
                                onChange={onInputChange}
                            />
                        ) : (
                            <select id="tripType" className="form-select text-white-dark" name="tripType" required value={TripType} onChange={handleSelectTriptype}>
                                <option value="">Select Trip type</option>
                                <option value="sample">Daily</option>
                                <option value="sample">Rental</option>
                                <option value="sample">Outstation</option>
                            </select>
                        )}
                    </div>

                    {/* <div className="lg:w-1/3">
                     <label htmlFor="commision" className="block mb-1 text-md font-bold">
                         commision
                     </label>
                     <input
                         name="commision"
                         type="Number"
                         id="commision"
                         placeholder="Enter commision"
                         className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                         readOnly={viewSpecific}
                         value={details.commision}
                         onChange={onInputChange}
                     />
                 </div> */}
                    <div className="lg:w-1/3">
                        <label htmlFor="timeMinRate" className="block mb-1 text-md font-bold">
                            Time Min Rate
                        </label>
                        <input
                            name="timeMinRate"
                            type="Number"
                            id="timeMinRate"
                            placeholder="Enter Time Min Rate"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.timeMinRate}
                            onChange={onInputChange}
                        />
                    </div>

                    {/* <div className="lg:w-1/3">
                     <label htmlFor="conveyanceAvail" className="block mb-1 text-md font-bold">
                         Conveyance Available
                     </label>
                     {viewSpecific ? (
                         <input
                             name="conveyanceAvail"
                             type="text"
                             id="conveyanceAvail"
                             placeholder="Enter Conveyance Available"
                             className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                             readOnly={viewSpecific}
                             value={details.conveyanceAvail}
                             onChange={onInputChange}
                         />
                     ) : (
                         <select id="conveyanceAvail" className="form-select text-white-dark" name="conveyanceAvail" required value={ConveyanceAvail} onChange={handleSelectConveyanceAvail}>
                             <option value="">Select conveyance Available</option>
                             <option value="sample">Yes</option>
                             <option value="sample">No</option>
                         </select>
                     )}
                 </div> */}
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6"></div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    {/* <div className="lg:w-1/3">
                     <label htmlFor="features" className="block mb-1 text-md font-bold">
                         Features
                     </label>
                     <input
                         name="features"
                         type="text"
                         id="features"
                         placeholder="Enter Features"
                         className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                         readOnly={viewSpecific}
                         value={details.features}
                         onChange={onInputChange}
                     />
                 </div> */}

                    {/* <div className="lg:w-1/3">
                   
 
 <label htmlFor="waitingRate" className="block mb-1 text-md font-bold">
     Waiting Rate 
     <span className='text-xs'>&nbsp;(Minute or Hour)</span>
 </label>
 
                     <input
                         name="waitingRate"
                         type="text"
                         id="waitingRate"
                         placeholder="Enter Waiting Rate"
                         className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                         readOnly={viewSpecific}
                         value={details.waitingRate}
                         onChange={onInputChange}
                     />
                 </div> */}
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 ">
                    {/* <div className="lg:w-1/3">
                     <label htmlFor="conveyanceCharge" className="block mb-1 text-md font-bold">
                     Conveyance Change Limit
                     </label>
                     <input
                         name="conveyanceCharge"
                         type="text"
                         id="conveyanceCharge"
                         placeholder="Enter Conveyance Charge"
                         className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                         readOnly={viewSpecific}
                         value={details.conveyanceCharge}
                         onChange={onInputChange}
                     />
                 </div> */}
                    <div className="lg:w-1/3">
                        <label htmlFor="taxApplicable" className="block mb-1 text-md font-bold">
                            Tax Applicable
                        </label>
                        {viewSpecific ? (
                            <input
                                name="taxApplicable"
                                type="text"
                                id="taxApplicable"
                                placeholder="Enter Tax Applicable"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={details.taxApplicable}
                                onChange={onInputChange}
                            />
                        ) : (
                            <select id="taxApplicable" className="form-select text-white-dark" name="taxApplicable" required value={TaxApplicable} onChange={handleSelectTaxApplicable}>
                                <option value="">Select tax applicable</option>
                                <option value="sample">Yes</option>
                                <option value="sample">No</option>
                            </select>
                        )}
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="waitChargePerMin" className="block mb-1 text-md font-bold">
                            Wait Charge Per Min
                        </label>
                        <input
                            name="waitChargePerMin"
                            type="text"
                            id="waitChargePerMin"
                            placeholder="Enter Wait Charge Per Min"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.waitChargePerMin}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="cgst" className="block mb-1 text-md font-bold">
                            CGST
                        </label>
                        <input
                            name="cgst"
                            type="text"
                            id="cgst"
                            placeholder="Enter CGST"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.cgst}
                            onChange={onInputChange}
                        />
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="sgst" className="block mb-1 text-md font-bold">
                            SGST
                        </label>
                        <input
                            name="sgst"
                            type="text"
                            id="sgst"
                            placeholder="Enter SGST"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.sgst}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="cancelChargeDriver" className="block mb-1 text-md font-bold">
                            Cancel Charge Driver
                        </label>
                        <input
                            name="cancelChargeDriver"
                            type="text"
                            id="cancelChargeDriver"
                            placeholder="Enter Cancel Charge Driver"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.cancelChargeDriver}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="cancelChargeRider" className="block mb-1 text-md font-bold">
                            Cancel Charge Rider
                        </label>
                        <input
                            name="cancelChargeRider"
                            type="text"
                            id="cancelChargeRider"
                            placeholder="Enter Cancel Charge Rider"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.cancelChargeRider}
                            onChange={onInputChange}
                        />
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="peakHourStart" className="block mb-1 text-md font-bold">
                            Peak Hour Start
                        </label>
                        <input
                            name="peakHourStart"
                            type="time"
                            id="peakHourStart"
                            placeholder="Enter Peak Hour Start"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.peakHourStart}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="peakHourEnd" className="block mb-1 text-md font-bold">
                            Peak Hour End
                        </label>
                        <input
                            name="peakHourEnd"
                            type="text"
                            id="peakHourEnd"
                            placeholder="Enter Peak Hour End"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.peakHourEnd}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="peakFareIncrease" className="block mb-1 text-md font-bold">
                            Peak Fare Increase
                        </label>
                        <input
                            name="peakFareIncrease"
                            type="text"
                            id="peakFareIncrease"
                            placeholder="Enter Peak Fare Increase"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.peakFareIncrease}
                            onChange={onInputChange}
                        />
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="peakHourStart2" className="block mb-1 text-md font-bold">
                            Peak Hour Start 2
                        </label>
                        <input
                            name="peakHourStart2"
                            type="time"
                            id="peakHourStart2"
                            placeholder="Enter Peak Hour Start 2"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.peakHourStart2}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="peakHourEnd2" className="block mb-1 text-md font-bold">
                            Peak Hour End 2
                        </label>
                        <input
                            name="peakHourEnd2"
                            type="time"
                            id="peakHourEnd2"
                            placeholder="Enter Peak Hour End 2"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.peakHourEnd2}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="peakFare2Increase" className="block mb-1 text-md font-bold">
                            Peak Fare 2 Increase
                        </label>
                        <input
                            name="peakFare2Increase"
                            type="text"
                            id="peakFare2Increase"
                            placeholder="Enter Peak Fare 2 Increase"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.peakFare2Increase}
                            onChange={onInputChange}
                        />
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="nightHourStart" className="block mb-1 text-md font-bold">
                            Night Hour Start
                        </label>
                        <input
                            name="nightHourStart"
                            type="time"
                            id="nightHourStart"
                            placeholder="Enter Night Hour Start"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.nightHourStart}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="nightHourEnd" className="block mb-1 text-md font-bold">
                            Night Hour End
                        </label>
                        <input
                            name="nightHourEnd"
                            type="time"
                            id="nightHourEnd"
                            placeholder="Enter Night Hour End"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.nightHourEnd}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="nightIncreseFare" className="block mb-1 text-md font-bold">
                            Night Increase Fare
                        </label>
                        <input
                            name="nightIncreseFare"
                            type="text"
                            id="nightIncreseFare"
                            placeholder="Enter Night Increase Fare"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.nightIncreseFare}
                            onChange={onInputChange}
                        />
                    </div>
                </div>

                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="isWaitCharge" className="block mb-1 text-md font-bold">
                            Is Wait Charge
                        </label>
                        {viewSpecific ? (
                            <input
                                name="isWaitCharge"
                                type="text"
                                id="isWaitCharge"
                                placeholder="Enter Is Wait Charge"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={details.isWaitCharge}
                                onChange={onInputChange}
                            />
                        ) : (
                            <select id="isWaitCharge" className="form-select text-white-dark" name="isWaitCharge" required value={IsWaitCharge} onChange={handleSelectIsWaitCharge}>
                                <option value="">Select wait charge</option>
                                <option value="sample">Yes</option>
                                <option value="sample">No</option>
                            </select>
                        )}
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="beforeTripWaitChargeApplicable" className="block mb-1 text-md font-bold">
                            Before Trip Wait Charge Applicable
                        </label>
                        {viewSpecific ? (
                            <input
                                name="beforeTripWaitChargeApplicable"
                                type="text"
                                id="beforeTripWaitChargeApplicable"
                                placeholder="Enter Before Trip Wait Charge Applicable"
                                className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                readOnly={viewSpecific}
                                value={details.beforeTripWaitChargeApplicable}
                                onChange={onInputChange}
                            />
                        ) : (
                            <select
                                id="beforeTripWaitChargeApplicable"
                                className="form-select text-white-dark"
                                required
                                name="beforeTripWaitChargeApplicable"
                                value={BeforeTripWaitChargeApplicable}
                                onChange={handleSelectBeforeTripWaitChargeApplicable}
                            >
                                <option value="">Select wait charge applicable</option>
                                <option value="sample">Yes</option>
                                <option value="sample">No</option>
                            </select>
                        )}
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="maxWaitTime" className="block mb-1 text-md font-bold">
                            Max Wait Time
                            <span className="text-xs">&nbsp;(Per Minute)</span>
                        </label>
                        <input
                            name="maxWaitTime"
                            type="text"
                            id="maxWaitTime"
                            placeholder="Enter Max Wait Time"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.maxWaitTime}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <div className="grid grid-divs-3 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="minWaitTimeBeforeTrip" className="block mb-1 text-md font-bold">
                            Min Wait Time Before Trip
                        </label>
                        <input
                            name="minWaitTimeBeforeTrip"
                            type="text"
                            id="minWaitTimeBeforeTrip"
                            placeholder="Enter Min Wait Time Before Trip"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.minWaitTimeBeforeTrip}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="lg:w-1/3"></div>
                    <div className="lg:w-1/3"></div>
                </div>
            </div>

            {/* <div className="grid grid-divs-3 sm:flex justify-between gap-5 mt-6 ">
                <div className="lg:w-1/2">
                    {viewSpecific ? (
                        <div>
                            <label htmlFor="cancelledCQImages" className="block mb-1 text-lg font-bold">
                                Vehicle Icon
                            </label>
                            {vehicleIconImage?.map((imgUrl, ind) => {
                                return (
                                    <img
                                        src={imgUrl}
                                        alt="Aadhar"
                                        key={ind}
                                        className="w-1/3 object-cover cursor-pointer rounded-md hover:scale-105 transition duration-300 shadow-md border"
                                        onClick={() => setModal1(true)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mb-5">
                            <div className="custom-file-container" data-upload-id="mySecondImage">
                                <div className="label-container">
                                    <label>
                                        Upload <span className="text-black text-lg font-bold"> - Vehicle Icon</span>{' '}
                                    </label>
                                    <button
                                        type="button"
                                        className="custom-file-container__image-clear"
                                        title="Clear Image"
                                        onClick={() => {
                                            setVehicleIconImg([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <ImageUploading multiple value={vehicleIconImg} onChange={handlevehicleIconImg} maxNumber={maxNumber}>
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                        <div className="upload__image-wrapper">
                                            <button className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                Choose File...
                                            </button>
                                            &nbsp;
                                            <div className="grid gap-4 sm:grid-cols-3 grid-cols-1">
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="custom-file-container__image-preview relative">
                                                        <button
                                                            type="button"
                                                            className="custom-file-container__image-clear bg-dark-light dark:bg-dark dark:text-white-dark rounded-full block w-fit p-0.5 absolute top-0 left-0"
                                                            title="Clear Image"
                                                            onClick={() => onImageRemove(index)}
                                                        >
                                                            <IconX className="w-3 h-3" />
                                                        </button>
                                                        <img src={image.dataURL} alt="img" className="object-cover shadow rounded w-full !max-h-48" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>
                        </div>
                    )}
                    <CarouselModel event={modal1} closeModal={() => setModal1(false)} title={'Vehicle Icon'} files={vehicleIconImage} />
                </div>
            </div> */}
        </>
    );
};

export default VehicleTypesModule;
