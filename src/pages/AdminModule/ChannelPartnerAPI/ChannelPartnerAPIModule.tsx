import React, { useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { Link } from 'react-router-dom';

import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import ServiceCityModal from '@/components/Models/ServiceCityModal';

interface ChannelPartnerAPIProps {
    details: {
        id: string;
        cpAPIKey: string;
        apiName: string;
        apiURL: string;
        permissions: string;
        archive: string;
        status: string;
        accessKey: string;
        bookingType: string;
        serviceType: string;
        limitedCalls: string;
        serviceCity: string;
        leadCharges: string;
        tax: string;
        channelPartnerId: string;
        totalCalls: string;
    };
    onInputChange?: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific?: boolean;
    isEditPage?: boolean;
}

const ChannelPartnerAPIModule: React.FC<ChannelPartnerAPIProps> = ({ details, onInputChange, showStatus = true, viewSpecific, isEditPage }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // Dynamic roles data fetching
    {
        /*
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getRoleData();
                const rolesData = response.data.roles;

                if (Array.isArray(rolesData)) {
                    // Extract role names from the fetched data and update roleOptions state
                    const roles = rolesData.map((fk_roleType: any) => ({
                        label: fk_roleType.roleName,
                        value: fk_roleType.roleId // Assuming roleId exists to uniquely identify the role
                    }));
                    setRoleOptions(roles);
                } else {
                    console.error('Invalid data format:', rolesData);
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        fetchRoles();
    }, []); 
    */
    }

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
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="cpAPIKey" className="block mb-1 text-md font-bold">
                        Channel Partner API Key
                    </label>
                    <input
                        name="cpAPIKey"
                        type="text"
                        id="cpAPIKey"
                        // placeholder={!viewSpecific && details.cpAPIKey.length === 0 ? 'Enter Channel partner API key' : ''}
                        // className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        placeholder="Enter Channel partner API key"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.cpAPIKey}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="apiName" className="block mb-1 text-md font-bold">
                        API Name
                    </label>
                    <input
                        name="apiName"
                        type="text"
                        id="apiName"
                        placeholder="Enter API Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.apiName}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="apiURL" className="block mb-1 text-md font-bold">
                        API URL
                    </label>
                    <input
                        name="apiURL"
                        type="text"
                        id="apiURL"
                        placeholder="Enter API URL"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.apiURL}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="permissions" className="block mb-1 text-md font-bold">
                        Permissions
                    </label>
                    <input
                        name="permissions"
                        type="text"
                        id="permissions"
                        placeholder="Enter Permissions"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.permissions}
                        onChange={onInputChange}
                    />
                </div>
                {/* <div className="lg:w-1/3">
                    <label htmlFor="status" className="block mb-1 text-md font-bold">
                        Channel partner api Status
                    </label>
                    <input
                        name="status"
                        type="text"
                        id="status"
                        placeholder="Enter status"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.status}
                        onChange={onInputChange}
                    />
                </div> */}
                <div className="lg:w-1/3">
                    <label htmlFor="accessKey" className="block mb-1 text-md font-bold">
                        Accsess Key
                    </label>
                    <input
                        name="accessKey"
                        type="text"
                        id="accessKey"
                        placeholder="Enter accessKey"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.accessKey}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="bookingType" className="block mb-1 text-md font-bold">
                        Booking Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="bookingType"
                            type="text"
                            id="bookingType"
                            placeholder="Enter booking type"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.bookingType}
                            onChange={onInputChange}
                        />
                    ) : (
                        <select
                            name="bookingType"
                            id="bookingType"
                            className={`form-select text-white-dark w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details.bookingType}
                            onChange={onInputChange}
                            required
                        >
                            <option value="">Select booking type</option>
                            <option value="online booking">Online Booking</option>
                            <option value="scheduled booking">Scheduled Booking</option>
                            <option value="qr code booking">QR Code Booking</option>
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="serviceType" className="block mb-1 text-md font-bold">
                        Service Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="serviceType"
                            type="text"
                            id="serviceType"
                            placeholder="Enter service type"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            readOnly={viewSpecific}
                            value={details.serviceType}
                            onChange={onInputChange}
                        />
                    ) : (
                        <select
                            name="serviceType"
                            id="serviceType"
                            className={`form-select text-white-dark w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details.serviceType}
                            onChange={onInputChange}
                            required
                        >
                            <option value="">Select service type</option>
                            <option value="daily">Daily</option>
                            <option value="rental">Rental</option>
                            <option value="outstation">Outstation</option>
                        </select>
                    )}
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="limitedCalls" className="block mb-1 text-md font-bold">
                        Limited Calls
                    </label>
                    <input
                        name="limitedCalls"
                        type="text"
                        id="limitedCalls"
                        placeholder="Enter limited calls"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.limitedCalls}
                        onChange={onInputChange}
                    />
                </div>

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
                        <input name="serviceCity" type="text" id="serviceCity" className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`} value={details.serviceCity} readOnly />
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
                                        value={details.serviceCity}
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
                <div className="lg:w-1/3">
                    <label htmlFor="leadCharges" className="block mb-1 text-md font-bold">
                        Lead Charges
                    </label>
                    <input
                        name="leadCharges"
                        type="text"
                        id="leadCharges"
                        placeholder="Enter lead charges"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.leadCharges}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="tax" className="block mb-1 text-md font-bold">
                        Tax
                    </label>
                    <input
                        name="tax"
                        type="text"
                        id="tax"
                        placeholder="Enter tax"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.tax}
                        onChange={onInputChange}
                    />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="channelPartnerId" className="block mb-1 text-md font-bold">
                        Channel Partner ID
                    </label>
                    <input
                        name="channelPartnerId"
                        type="text"
                        id="channelPartnerId"
                        placeholder="Enter channel partner ID"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.channelPartnerId}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="totalCalls" className="block mb-1 text-md font-bold">
                        Total Calls
                    </label>
                    <input
                        name="totalCalls"
                        type="text"
                        id="totalCalls"
                        placeholder="Enter total calls"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details.totalCalls}
                        onChange={onInputChange}
                    />
                </div>

                {
                    showStatus ? ( // Conditionally rendering based on the showStatus prop
                        <div className="lg:w-1/3">
                            <label htmlFor="archive" className="block mb-1 text-md font-bold">
                                Archive
                            </label>
                            {viewSpecific ? (
                                <input
                                    name="status"
                                    type="text"
                                    id="status"
                                    className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
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
                <div className="lg:w-1/3"></div>
            </div>
        </>
    );
};

export default ChannelPartnerAPIModule;
