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
// import FleetOwnerDetailsModal, { fleetManagementType } from '../../../components/Models/fleetOwnerDetailsModal';
import { DataTableColumn } from 'mantine-datatable';
import CommonPopUp from '@/components/Models/CommonPopUp';
import { getChannelPartnerData } from '@/services/ChannelPartnerService';
import { staticFleetOwnerData } from '../FleetOwner/ViewFleetOwner';

interface VehicleProfileProps {
    details: {
        // vehicle Profile Master
        serviceProviderType: string;
        channelPartnerType: string;
        fleetManagementType: string;
        serviceType: string;
        vehRTONumber: string;
        vehicleAge: string;
        vehRegNumber: string;
        vehicleRegistrationDate: Date | null;
        vehicleManufacturingDate: Date | null;
        vehType: string; //
        serviceP: string; //-- doubt
        loanBanker: string;
        emiAmt: string;
        loanAccNumber: string;
        emiDate: string;
        currLocation: string;
        // vehicle Master
        seatCapacity: string; //
        vehColor: string; //
        vehBrandModel: string; //
        vehFuelType: string; //
        vehCategory: string; //
        vehManufacturer: string; //--new
        vehBrandName: string; //
        loadCapacity: string;
        vehChasisNumber: string;
        bootSpace: string;
        bodyDimension: string;
        archive: string;
        country: string;
        state: string;
        city: string;
        fk_serviceCity: string;
    };
    viewSpecific: boolean;
}

const VehicleProfileSection: React.FC<VehicleProfileProps> = ({ details, viewSpecific }) => {
    console.log(details);

    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    return (
        <>
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <label htmlFor="channelPartnerType" className="block mb-1">
                                Dirver
                            </label>
                            {viewSpecific && (
                                <Link to={'/AdminModule/ChannelPartner/ViewSpecificChannelPartner/1'}>
                                    <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                                </Link>
                            )}
                        </div>
                    </div>
                    <input id="serviceProviderType" className="form-input w-full pointer-events-none" value={'Arun'} readOnly />
                </div>

                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="channelPartnerType" className="block mb-1">
                            Channel Partner
                        </label>
                        {viewSpecific && (
                            <Link to={'/AdminModule/ChannelPartner/ViewSpecificChannelPartner/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto " />
                            </Link>
                        )}
                    </div>
                    <input name="channelPartnerType" type="text" id="channelPartnerType" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={'Raghu'} readOnly />
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
                    <input name="fleetManagementType" type="text" id="fleetManagementType" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={'Arun'} readOnly />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehRegNumber" className="block mb-1">
                        Vehicle Registration Number
                    </label>
                    {viewSpecific && (
                        <input
                            name="vehRegNumber"
                            type="text"
                            id="vehRegNumber"
                            placeholder="Enter Vehicle Registration Number"
                            className="form-input w-full pointer-events-none"
                            value={'32165498798'}
                            readOnly
                        />
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehRTONumber" className="block mb-1">
                        Vehicle RTO Number
                    </label>
                    {viewSpecific && <input name="vehRTONumber" type="text" id="vehRTONumber" className="form-input w-full pointer-events-none" value={'KHADSIA312'} readOnly />}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehChasisNumber" className="block mb-1">
                        Vehicle Chassis Number
                    </label>
                    {viewSpecific && <input name="vehChasisNumber" type="text" id="vehChasisNumber" className="form-input w-full pointer-events-none" value={'24152'} readOnly />}
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="serviceType" className="block mb-1">
                        Service Type
                    </label>
                    {viewSpecific && <input name="serviceType" type="text" id="serviceType" className="form-input w-full pointer-events-none" value={'Yes'} readOnly />}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehManufacturer" className="block mb-1">
                        Vehicle Manufacturer
                    </label>
                    {viewSpecific && <input name="vehManufacturer" type="text" id="vehManufacturer" className="form-input w-full pointer-events-none" value={'Toyota'} readOnly />}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehType" className="block mb-1">
                        Vehicle Body Type
                    </label>
                    {viewSpecific && (
                        <input name="vehType" type="text" id="vehType" placeholder="Enter Vehicle Chassis Number" className="form-input w-full pointer-events-none" value={'SUV'} readOnly />
                    )}
                </div>
            </div>

            {/* <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <div>
                        <label htmlFor="vehCategory" className="block mb-1">
                            Vehicle Category
                        </label>
                        {viewSpecific && <input id="vehCategory" className="form-input  w-full pointer-events-none" value={details.vehCategory} readOnly />}
                    </div>
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    {vehicleCategory === 'passenger' && (
                        <div>
                            <label htmlFor="seatCapacity" className="block mb-1">
                                Seating Capacity
                            </label>
                            <select id="seatCapacity" className="form-select text-white-dark" required onChange={handleSeatingCapacityChange} value={details.seatCapacity}>
                                <option value="">Select Seating Capacity</option>
                                <option value="capacity1">4 x 1</option>
                                <option value="capacity2">5 x 1</option>
                                <option value="capacity3">6 x 1</option>
                                <option value="capacity4">7 x 1</option>
                            </select>
                        </div>
                    )}
                    {vehicleCategory === 'logistics' && (
                        <div>
                            <label htmlFor="loadCapacity" className="block mb-1">
                                Load Capacity
                            </label>
                            <select id="loadCapacity" className="form-select text-white-dark" required onChange={handleLoadCapacityChange}>
                                <option value="">Select Load Capacity</option>
                                <option value="loadCapacity1">5 Tons</option>
                                <option value="loadCapacity2">10 Tons</option>
                                <option value="loadCapacity3">15 Tons</option>
                                <option value="loadCapacity4">20 Tons</option>
                            </select>
                        </div>
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    {vehicleCategory === 'passenger' &&
                        (seatingCapacityType === 'capacity1' || seatingCapacityType === 'capacity2' || seatingCapacityType === 'capacity3' || seatingCapacityType === 'capacity4') && (
                            <div>
                                <label htmlFor="bootSpace" className="block mb-1">
                                    Boot Space
                                </label>
                                <select id="bootSpace" className="form-select text-white-dark" required onChange={(e) => setBootSpace(e.target.value)} value={details.bootSpace}>
                                    <option value="">Select Boot Space</option>
                                    <option value="space1">200 Lts.</option>
                                    <option value="space2">400 Lts.</option>
                                    <option value="space3">600 Lts.</option>
                                    <option value="space4">800 Lts.</option>
                                </select>
                            </div>
                        )}
                    {vehicleCategory === 'logistics' &&
                        (loadCapacityType === 'loadCapacity1' || loadCapacityType === 'loadCapacity2' || loadCapacityType === 'loadCapacity3' || loadCapacityType === 'loadCapacity4') && (
                            <div>
                                <label htmlFor="bodyDimension" className="block mb-1">
                                    Body Dimension
                                </label>
                                <select id="bodyDimension" className="form-select text-white-dark" required onChange={(e) => setBodyDimension(e.target.value)} value={details.bodyDimension}>
                                    <option value="">Select Body Dimension</option>
                                    <option value="body1">6 x 8</option>
                                    <option value="body2">7 x 4</option>
                                    <option value="body3">8 x 4</option>
                                    <option value="body4">5 x 2</option>
                                </select>
                            </div>
                        )}
                </div>
            </div> */}

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehBrandName" className="block mb-1">
                        Vehicle Brand Name
                    </label>
                    {viewSpecific && <input name="vehBrandName" type="text" id="vehBrandName" className="form-input w-full pointer-events-none" value={'Innova'} readOnly />}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehType" className="block mb-1">
                        Vehicle Type
                    </label>
                    {viewSpecific && <input name="vehType" type="text" id="vehType" className="form-input w-full pointer-events-none" value={'SUV'} readOnly />}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehBrandModel" className="block mb-1">
                        Vehicle Brand Model
                    </label>
                    {viewSpecific && <input name="vehBrandModel" type="text" id="vehBrandModel" className="form-input w-full pointer-events-none" value={'TOYOTA 2019'} readOnly />}
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehColor" className="block mb-1">
                        Vehicle Color
                    </label>
                    {viewSpecific && <input name="vehColor" type="text" id="vehColor" placeholder="Enter Vehicle Color" className="form-input w-full pointer-events-none" value={'White'} readOnly />}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehFuelType" className="block mb-1">
                        Vehicle Fuel Type
                    </label>
                    {viewSpecific && (
                        <input name="vehFuelType" type="text" id="vehFuelType" placeholder="Enter Vehicle Fuel Type" className="form-input w-full pointer-events-none" value={'Petrol'} readOnly />
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

                    {viewSpecific && (
                        <input name="fk_serviceCity" type="text" id="fk_serviceCity" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={'Banglore'} readOnly />
                    )}
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="ctnEmail" className="block mb-1">
                        Vehicle Manufacturing Date
                    </label>
                    {viewSpecific && <Flatpickr value={'12/03/2019'} options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" readOnly />}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehRegistrationDate" className="block mb-1">
                        Vehicle Registration Date
                    </label>
                    {viewSpecific && (
                        <Flatpickr
                            value={'12/03/2024'} // Combining vehRegistrationDate and date1 into an array
                            options={{ dateFormat: 'Y-m-d' }}
                            className="form-input"
                            readOnly
                        />
                    )}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="vehAge" className="block mb-1">
                        Vehicle Age
                    </label>
                    <input
                        name="vehAge"
                        type="text"
                        id="vehAge"
                        placeholder={`${viewSpecific ? `` : `Vehicle Age`}`}
                        className={`${viewSpecific ? `form-input w-full pointer-events-none` : `form-input w-full`}`}
                        value={'3 Years'}
                        readOnly={viewSpecific}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="fk_adminTeam" className="block mb-1">
                        Country
                    </label>
                    {viewSpecific && <input name="country" type="tel" id="country" className="form-input w-full pointer-events-none" value={'India'} readOnly />}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="fk_adminTeam" className="block mb-1">
                        State
                    </label>
                    {viewSpecific && <input name="state" type="tel" id="state" className="form-input w-full pointer-events-none" value={'Karnataka'} readOnly />}
                </div>
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="fk_adminTeam" className="block mb-1">
                        City
                    </label>
                    {viewSpecific && <input name="city" type="tel" id="city" className="form-input w-full pointer-events-none" value={'Bangalore'} readOnly />}
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="loanBanker" className="block mb-1">
                        Loan Banker
                    </label>
                    {viewSpecific && <input name="loanBanker" type="text" id="loanBanker" placeholder="Enter Loan Banker" className="form-input w-full pointer-events-none" value={'SBI'} />}
                </div>

                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="loanAccNumber" className="block mb-1">
                        Loan Account Number
                    </label>
                    {viewSpecific && <input name="loanAccNumber" type="number" id="loanAccNumber" className="form-input w-full pointer-events-none" value={'32165468978'} />}
                </div>

                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="emiAmt" className="block mb-1">
                        EMI Amount
                    </label>
                    {viewSpecific && <input name="emiAmt" type="number" id="emiAmt" placeholder="Enter EMI Amount" className="form-input w-full pointer-events-none" value={'4000.00'} />}
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="ctnEmail" className="block mb-1">
                        EMI Date
                    </label>
                    {viewSpecific && <Flatpickr value={'20/3/2023'} options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input pointer-events-none" />}
                </div>

                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="currLocation" className="block mb-1">
                        Current Location
                    </label>
                    {viewSpecific && (
                        <input name="currLocation" type="text" id="currLocation" placeholder="Enter Current Location" className="form-input w-full pointer-events-none" value={'Bangalore'} />
                    )}
                </div>

                <div className={`${viewSpecific ? `lg:w-1/3 pointer-events-none` : `lg:w-1/3`}`}>
                    <label htmlFor="archive" className="block mb-1">
                        Allow To Rider Later
                    </label>
                    {viewSpecific && <input name="archive" placeholder="Archive" type="text" id="archive" className="form-input w-full pointer-events-none" value={'ACTIVE'} readOnly />}
                </div>
            </div>
        </>
    );
};

export default VehicleProfileSection;
