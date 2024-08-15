import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { getAllCity } from '@/services/RolesService';
import Flatpickr from 'react-flatpickr';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import ServiceCityModal from '@/components/Models/ServiceCityModal';
import IconEdit from '@/components/Icon/IconEdit';

interface PromocodeMasterProps {
    details: {
        id: string;
        promoCode: string;
        discountType: string;
        validityStart: string;
        validityEnd: string;
        startTime: string;
        endTime: string;
        usage: string;
        usageLimit: string;
        perUserUsageLimit: string;
        fk_serviceCity: string;
        tripType: string;
        days: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    showStatus?: boolean; // New prop to conditionally show/hide status
    viewSpecific?: boolean;
    isEditPage: boolean;
}

const PromocodeMasterModule: React.FC<PromocodeMasterProps> = ({ details, onInputChange, showStatus = true, viewSpecific, isEditPage }) => {
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

    // Get today's date in the format 'YYYY-MM-DD'
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;

    const [validity1, setvalidity1] = useState<any>(formattedToday);
    const [validity2, setValidity2] = useState<any>(formattedToday);

    const [start1, setStart1] = useState<any>(formattedToday);
    const [start2, setStart2] = useState<any>(formattedToday);

    const [city, setCity] = useState(details.fk_serviceCity);
    const [cityOption, setCityOption] = useState<any[]>([]);

    const getAllCityData = async () => {
        try {
            const data = await getAllCity();
            setCityOption(data?.data?.Cities);
        } catch (error) {
            console.log(error);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        getAllCityData();
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

    const [modal6, setModal6] = useState(false);
    const [ServiceCityData, setServiceCityData] = useState<any[]>([]);
    const [addedserviceCityType, setAddedServiceCityType] = useState<any>();

    const handleAddServiceCitySubmit = (selectedServiceCity: any[], userID: string) => {
        setServiceCityData(selectedServiceCity);
        setAddedServiceCityType(userID);
    };

    return (
        <>
            {viewSpecific && (
                <>
                    <div className="flex items-center justify-end gap-5 flex-grow mb-3">
                        {/* Edit */}
                        <div
                            className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center"
                            onClick={() => navigate('/PromotionModule/PromocodeMaster/EditPromocodeMaster/1')}
                        >
                            <h3>Edit</h3>
                            <IconEdit />
                        </div>
                    </div>
                </>
            )}
            <div className="grid grid-divs-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="promoCode" className="block mb-1 pointer-events-none">
                        Promocode
                    </label>

                    {viewSpecific ? (
                        <input
                            name="promoCode"
                            type="text"
                            id="promoCode"
                            placeholder="Enter Promocode"
                            className="form-input w-full pointer-events-none"
                            value={details.promoCode}
                            onChange={onInputChange}
                        />
                    ) : (
                        <input name="promoCode" type="text" id="promoCode" placeholder="Enter Promocode" className="form-input w-full" value={details.promoCode} onChange={onInputChange} />
                    )}
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="discountType" className="block mb-1 pointer-events-none">
                        Discount Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="discountType"
                            type="text"
                            id="discountType"
                            placeholder="Enter Discount Type"
                            className="form-input w-full pointer-events-none"
                            value={details.discountType}
                            onChange={onInputChange}
                        />
                    ) : (
                        <input
                            name="discountType"
                            type="text"
                            id="discountType"
                            placeholder="Enter Discount Type"
                            className="form-input w-full "
                            value={details.discountType}
                            onChange={onInputChange}
                        />
                    )}
                </div>

                {/* <div className="lg:w-1/3">
                    <label htmlFor="validityStart" className="block mb-1">
                        Validity Start
                    </label>
                    <input name="validityStart" type="text" id="validityStart" placeholder="Enter Validity Start" className="form-input w-full" value={details.validityStart} onChange={onInputChange} />
                </div> */}

                <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="dob" className="block mb-1 text-md font-bold">
                        Validity Start
                    </label>
                    <input
                        name="validityStart"
                        type="date"
                        id="validityStart"
                        placeholder={viewSpecific ? '' : '(+91) Enter Date Of Birth'}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={viewSpecific ? '2024-01-12' : details.validityStart}
                        onChange={onInputChange}
                    />
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                {/* <div className="lg:w-1/3">
                    <label htmlFor="validityEnd" className="block mb-1">
                        Validity End
                    </label>
                    <input name="validityEnd" type="text" id="validityEnd" placeholder="Enter Validity End" className="form-input w-full" value={details.validityEnd} onChange={onInputChange} />
                </div> */}

                <div className={`lg:w-1/3 ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="validityEnd" className="block mb-1 text-md font-bold">
                        Validity End
                    </label>
                    <input
                        name="validityEnd"
                        type="date"
                        id="validityEnd"
                        placeholder={viewSpecific ? '' : 'Enter Validity End'}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={viewSpecific ? '2024-12-31' : details.validityEnd}
                        onChange={onInputChange}
                    />
                </div>

                <div className={`lg:w-1/3 ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="startTime" className="block mb-1 text-md font-bold">
                        Start Time
                    </label>
                    <input
                        name="startTime"
                        type="date"
                        id="startTime"
                        placeholder={viewSpecific ? '' : 'Enter Start Date'}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={viewSpecific ? '2024-01-01' : details.startTime}
                        onChange={onInputChange}
                    />
                </div>
                <div className={`lg:w-1/3 ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <label htmlFor="endTime" className="block mb-1 text-md font-bold">
                        End Time
                    </label>
                    <input
                        name="endTime"
                        type="date"
                        id="endTime"
                        placeholder={viewSpecific ? '' : 'Enter Start Date'}
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={viewSpecific ? '2024-01-01' : details.endTime}
                        onChange={onInputChange}
                    />
                </div>

                {/* <div className="lg:w-1/3">
                    <label htmlFor="startTime" className="block mb-1">
                        Start Time
                    </label>
                    <input name="startTime" type="text" id="startTime" placeholder="Enter Start Time" className="form-input w-full" value={details.startTime} onChange={onInputChange} />
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="endTime" className="block mb-1">
                        End Time
                    </label>
                    <input name="endTime" type="text" id="endTime" placeholder="Enter End Time" className="form-input w-full" value={details.endTime} onChange={onInputChange} />
                </div> */}
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="usage" className="block mb-1 pointer-events-none">
                        Usage
                    </label>
                    {viewSpecific ? (
                        <input name="usage" type="text" id="usage" placeholder="Enter Usage" className="form-input w-full pointer-events-none" value={details.usage} onChange={onInputChange} />
                    ) : (
                        <input name="usage" type="text" id="usage" placeholder="Enter Usage" className="form-input w-full" value={details.usage} onChange={onInputChange} />
                    )}
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="usageLimit" className="block mb-1 pointer-events-none">
                        Usage Limit
                    </label>
                    {viewSpecific ? (
                        <input
                            name="usageLimit"
                            type="text"
                            id="usageLimit"
                            placeholder="Enter Usage Limit"
                            className="form-input w-full pointer-events-none"
                            value={details.usageLimit}
                            onChange={onInputChange}
                        />
                    ) : (
                        <input name="usageLimit" type="text" id="usageLimit" placeholder="Enter Usage Limit" className="form-input w-full" value={details.usageLimit} onChange={onInputChange} />
                    )}
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="perUserUsageLimit" className="block mb-1 pointer-events-none">
                        Per User Usage Limit
                    </label>
                    {viewSpecific ? (
                        <input
                            name="perUserUsageLimit"
                            type="text"
                            id="perUserUsageLimit"
                            placeholder="Enter Per User Usage Limit"
                            className="form-input w-full pointer-events-none"
                            value="12"
                            onChange={onInputChange}
                        />
                    ) : (
                        <input
                            name="perUserUsageLimit"
                            type="text"
                            id="perUserUsageLimit"
                            placeholder="Enter Per User Usage Limit"
                            className="form-input w-full"
                            value={details.perUserUsageLimit}
                            onChange={onInputChange}
                        />
                    )}
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                {/* <div className="lg:w-1/3">
                    <label htmlFor="fk_serviceCity" className="block mb-1">
                        Service City
                    </label>
                    <input name="fk_serviceCity" type="text" id="fk_serviceCity" placeholder="Enter Service City" className="form-input w-full" value={details.fk_serviceCity} onChange={onInputChange} />
                </div> */}

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
                        </div>
                    )}
                    <ServiceCityModal event={modal6} closeModal={() => setModal6(false)} onAddServiceCity={handleAddServiceCitySubmit} />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="tripType" className="block mb-1 pointer-events-none">
                        Trip Type
                    </label>
                    {viewSpecific ? (
                        <input
                            name="tripType"
                            type="text"
                            id="tripType"
                            placeholder="Enter Trip Type"
                            className="form-input w-full pointer-events-none"
                            value={details.tripType}
                            onChange={onInputChange}
                        />
                    ) : (
                        <input name="tripType" type="text" id="tripType" placeholder="Enter Trip Type" className="form-input w-full" value={details.tripType} onChange={onInputChange} />
                    )}
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="days" className="block mb-1 pointer-events-none">
                        Days
                    </label>
                    {viewSpecific ? (
                        <input name="days" type="text" id="days" placeholder="Enter Days" className="form-input w-full pointer-events-none" value={details.days} onChange={onInputChange} />
                    ) : (
                        <input name="days" type="text" id="days" placeholder="Enter Days" className="form-input w-full" value={details.days} onChange={onInputChange} />
                    )}
                </div>
            </div>

            <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                {showStatus && (
                    <div className="lg:w-1/3">
                        <label htmlFor="archive" className="block mb-1">
                            Update Profile Status
                        </label>
                        {viewSpecific ? (
                            <input name="archive" placeholder="Archive" type="text" id="archive" className="form-input w-full pointer-events-none" value={details?.archive} readOnly />
                        ) : (
                            <select
                                id="archive"
                                name="archive"
                                className="form-select text-white-dark"
                                required
                                value={details.archive} // Update this line
                                onChange={onInputChange}
                            >
                                <option value="">Select Archive</option>
                                <option value={'PENDING'}>Pending</option>
                                <option value={'APPROVED'}>Approved</option>
                                <option value={'REJECTED'}>Rejected</option>
                                <option value={'HOLD'}>Hold</option>
                                <option value={'SUSPENDED'}>Suspended</option>
                            </select>
                        )}
                    </div>
                )}

                {/* {showStatus ? ( // Conditionally rendering based on the showStatus prop
                    <div className="lg:w-1/3">
                        <label htmlFor="archive" className="block mb-1">
                            Status
                        </label>
                        <input name="archive" type="text" id="archive" placeholder="Enter Status" className="form-input w-full" value={details.archive} onChange={onInputChange} />
                    </div>
                ) : (
                    <div className="lg:w-1/3" /> //Empty div when showStatus is false
                )} */}

                <div className="lg:w-1/3" />
                <div className="lg:w-1/3" />
            </div>
        </>
    );
};

export default PromocodeMasterModule;
