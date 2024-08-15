import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { getChannelPartnerData } from '@/services/ChannelPartnerService';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Breadcrumb from '@/pages/Auth/Breadcrumb';

import 'rsuite/dist/rsuite-no-reset.min.css';
import ViewServiceProvider from '@/pages/BusinessModule/ServiceProvider/ViewServiceProvider';
import ViewChannelPartner from '@/pages/AdminModule/ChannelPartner/ViewChannelPartner';
import ViewFleetOwner from '@/pages/BusinessModule/FleetOwner/ViewFleetOwner';
import ViewVehicleProfile from '@/pages/BusinessModule/VehicleProfile/ViewVehicleProfile';
import { successAlert } from '@/utils/Toast';
import CommonPopUp from '@/components/Models/CommonPopUp';
import { staticSubscriptionData } from '@/components/Models/PurchaseSubscriptionModal';
import { staticBonusMasterData } from '@/pages/PromotionModule/BonusMaster/ViewBonusMaster';
import { staticCouponMasterData } from '@/pages/PromotionModule/CouponMaster/ViewCouponMaster';
import { staticPromocodeMasterData } from '@/pages/PromotionModule/PromocodeMaster/ViewPromocodeMaster';
import { staticServiceCityData } from '@/components/Models/ServiceCityModal';
import { staticVehicleProfileData } from '@/components/Models/VehicleDetailsModal';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';
import UpdateServiceTypePopUp from '@/components/Models/UpdateServiceTypePopUp';
import CategoryModal from '@/components/Models/CategoryModal';

const ViewUsers = () => {
    const [selectedUserType, setSelectedUserType] = useState('Rider');
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    const navigate = useNavigate();

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'View User',
            to: '/UserManagement/Users/ViewUsers',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/PromotionModule/BonusMaster/ViewBonusMaster' ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleUserTypeChange = (selectedOption: string) => {
        setSelectedUserType(selectedOption);
    };

    // Determine which component to render based on the selected user type
    const renderUserTypeComponent = () => {
        switch (selectedUserType) {
            case 'Driver':
                return <ViewServiceProvider tabs={true} userManagementPage={false} />;
            case 'Channel Partner':
                return <ViewChannelPartner tabs={true} userManagementPage={true} />;
            case 'Vehicle':
                return <ViewVehicleProfile tabs={true} userManagementPage={false} />;
            case 'Travel Agency':
                return <ViewFleetOwner tabs={true} userManagementPage={false} />;
            default:
            // return <ViewRiderUser tabs="true" userManagementPage={false} />;
        }
    };

    // Assign subscription popup -------------->>
    const [modal2, setmodal2] = useState(false);
    const [SelectedAssignSubscription, setAssignSubscription] = useState<any[]>([]);
    const [addedAssignSubscriptionType, setAssignSubscriptionType] = useState<any>();

    const assinedSubscription: DataTableColumn<any>[] = [
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true },
        { accessor: 'planName', title: 'Plan Name', sortable: true },
        { accessor: 'planDetails', title: 'Plan Details', sortable: true },
        { accessor: 'planDuration', title: 'Plan Duration', sortable: true },
        { accessor: 'planAmount', title: 'Plan Amount', sortable: true },
        { accessor: 'planDescription', title: 'Plan Description', sortable: true },
        { accessor: 'planLiveStartTime', title: 'Plan Live Start Time', sortable: true },
        { accessor: 'planLiveEndTime', title: 'Plan Live End Time', sortable: true },
        { accessor: 'CGST', title: 'CGST', sortable: true },
        { accessor: 'SGST', title: 'SGST', sortable: true },
        { accessor: 'PlanAmount', title: 'Plan Amount', sortable: true },
        { accessor: 'ProcessingFee', title: 'Processing Fee', sortable: true },
        { accessor: 'CHPartCommission', title: 'CH Part Commission', sortable: true },
        { accessor: 'PlatformFee', title: 'Platform Fee', sortable: true },
        { accessor: 'archive', title: 'Archive', sortable: true },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true },
        { accessor: 'createdBy', title: 'Created By', sortable: true },
        { accessor: 'createdAt', title: 'Created At', sortable: true },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true },
    ];

    // Assign Bonus popup -------------->>
    const [modal3, setmodal3] = useState(false);
    const [SelectedAssignBonus, setAssignBonus] = useState<any[]>([]);
    const [addedAssignBonusType, setAssignBonusType] = useState<any>();

    const assinedBonus: DataTableColumn<any>[] = [
        { accessor: 'bonusType', title: 'Bonus Type', sortable: true },
        { accessor: 'amount', title: 'Amount', sortable: true },
        { accessor: 'bonusCode', title: 'Bonus Code', sortable: true },
        { accessor: 'startDate', title: 'Start Date', sortable: true },
        { accessor: 'endDate', title: 'End Date', sortable: true },
        { accessor: 'description', title: 'Description', sortable: true },
        { accessor: 'message', title: 'Message', sortable: true },
        { accessor: 'archive', title: 'Archive', sortable: true },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true },
        { accessor: 'createdBy', title: 'Created By', sortable: true },
        { accessor: 'createdAt', title: 'Created At', sortable: true },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true },
    ];

    // Assign Bonus popup -------------->>
    const [modal4, setmodal4] = useState(false);
    const [SelectedAssignCoupon, setAssignCoupon] = useState<any[]>([]);
    const [addedAssignCouponType, setAssignCouponType] = useState<any>();

    const assinedCoupon: DataTableColumn<any>[] = [
        { accessor: 'couponCode', title: 'Coupon Code', sortable: true },
        { accessor: 'couponName', title: 'Coupon Name', sortable: true },
        { accessor: 'couponDesc', title: 'Coupon Description', sortable: true },
        { accessor: 'usage', title: 'Usage', sortable: true },
        { accessor: 'amount', title: 'Amount', sortable: true },
        { accessor: 'benefit', title: 'Benefit', sortable: true },
        { accessor: 'archive', title: 'Archive', sortable: true },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true },
        { accessor: 'createdBy', title: 'Created By', sortable: true },
        { accessor: 'createdAt', title: 'Created At', sortable: true },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true },
    ];

    // Assign Bonus popup -------------->>
    const [modal5, setmodal5] = useState(false);
    const [SelectedAssignPromocode, setAssignPromocode] = useState<any[]>([]);
    const [addedAssignPromocodeType, setAssignPromocodeType] = useState<any>();

    const assinedPromocode: DataTableColumn<any>[] = [
        { accessor: 'promoCode', title: 'Promo Code', sortable: true },
        { accessor: 'discountType', title: 'Discount Type', sortable: true },
        { accessor: 'validityStart', title: 'Validity Start', sortable: true },
        { accessor: 'validityEnd', title: 'Validity End', sortable: true },
        { accessor: 'startTime', title: 'Start Time', sortable: true },
        { accessor: 'endTime', title: 'End Time', sortable: true },
        { accessor: 'usage', title: 'Usage', sortable: true },
        { accessor: 'usageLimit', title: 'Usage Limit', sortable: true },
        { accessor: 'perUsageLimit', title: 'Per Usage Limit', sortable: true },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true },
        { accessor: 'tripType', title: 'Trip Type', sortable: true },
        { accessor: 'days', title: 'Days', sortable: true },
        { accessor: 'archive', title: 'Archive', sortable: true },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true },
        { accessor: 'createdBy', title: 'Created By', sortable: true },
        { accessor: 'createdAt', title: 'Created At', sortable: true },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true },
    ];

    const [modal7, setmodal7] = useState(false);
    const [SelectedAssignServicecity, setAssignServicecity] = useState<any[]>([]);
    const [addedAssignServicecityType, setAssignServicecityType] = useState<any>();

    const assinedServiceCity: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID', sortable: true },
        { accessor: 'fk_stateOrProvince', title: 'State/Province', sortable: true },
        { accessor: 'cityName', title: 'City Name', sortable: true },
        { accessor: 'archive', title: 'Archive', sortable: true },
        { accessor: 'fk_country', title: 'Country Code', sortable: true },
    ];

    const [modal8, setmodal8] = useState(false);
    const [SelectedAssignAddVehicle, setAssignAddVehicle] = useState<any[]>([]);
    const [addedsetAssignAddVehicleType, setAssignAddVehicleType] = useState<any>();

    const updateAddVehicle: DataTableColumn<any>[] = [
        { accessor: 'serviceProviderType', title: 'Service Provider Type', sortable: true },
        { accessor: 'channelPartnerType', title: 'Channel Partner Type', sortable: true },
        { accessor: 'fleetManagementType', title: 'Fleet Management Type', sortable: true },
        { accessor: 'vehRegNumber', title: 'Vehicle Registration Number', sortable: true },
        { accessor: 'vehRTONumber', title: 'Vehicle RTO Number', sortable: true },
        { accessor: 'vehChasisNumber', title: 'Vehicle Chassis Number', sortable: true },
        { accessor: 'vehCategory', title: 'Vehicle Category', sortable: true },
        { accessor: 'seatCapacity', title: 'Seat Capacity', sortable: true },
        { accessor: 'bootSpace', title: 'Boot Space', sortable: true },
        { accessor: 'loadCapacity', title: 'Load Capacity', sortable: true },
        { accessor: 'bodyDimension', title: 'Body Dimension', sortable: true },
        { accessor: 'vehBrandName', title: 'Vehicle Brand Name', sortable: true },
        { accessor: 'vehType', title: 'Vehicle Type', sortable: true },
        { accessor: 'vehBrandModel', title: 'Vehicle Brand Model', sortable: true },
        { accessor: 'vehColor', title: 'Vehicle Color', sortable: true },
        { accessor: 'vehFuelType', title: 'Vehicle Fuel Type', sortable: true },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true },
        { accessor: 'vehicleRegistrationDate', title: 'Vehicle Registration Date', sortable: true },
        { accessor: 'vehicleManufacturingDate', title: 'Vehicle Manufacturing Date', sortable: true },
        { accessor: 'vehicleAge', title: 'Vehicle Age', sortable: true },
        { accessor: 'loanBanker', title: 'Loan Banker', sortable: true },
        { accessor: 'loanAccNumber', title: 'Loan Account Number', sortable: true },
        { accessor: 'emiAmt', title: 'EMI Amount', sortable: true },
        { accessor: 'emiDate', title: 'EMI Date', sortable: true },
        { accessor: 'currLocation', title: 'Current Location', sortable: true },
    ];

    // popup Assign Subscription
    const handleAddAssignSubscription = (selectedTeam: any[], id: string) => {
        successAlert('Subscription Assigned Succesfully');
        setAssignSubscription(selectedTeam);
        setAssignSubscriptionType(id);
    };

    // popup Assign Bonus
    const handleAddAssignBonus = (selectedTeam: any[], id: string) => {
        successAlert('Bonus Assigned Succesfully');
        setAssignBonus(selectedTeam);
        setAssignBonusType(id);
    };

    // popup Assign Bonus
    const handleAddAssignCoupon = (selectedTeam: any[], id: string) => {
        successAlert('Coupon Assigned Succesfully');
        setAssignCoupon(selectedTeam);
        setAssignCouponType(id);
    };

    const handleAddPromocode = (selectedTeam: any[], id: string) => {
        successAlert('Promocode Assigned Succesfully');
        setAssignPromocode(selectedTeam);
        setAssignPromocodeType(id);
    };

    const handleAddServiceCity = (selectedTeam: any[], id: string) => {
        successAlert('Service city Assigned Succesfully');
        setAssignServicecity(selectedTeam);
        setAssignServicecityType(id);
    };

    const handleAddVehicle = (selectedTeam: any[], id: string) => {
        successAlert('Vehicle Updated Succesfully');
        setAssignAddVehicle(selectedTeam);
        setAssignAddVehicleType(id);
    };

    // update archive
    const [modal6, setmodal6] = useState(false);

    // add update archive
    const handleAddUpdateArchive = (selectedArchive: any[], id: string) => {
        successAlert('Archive Updated Succesfully');
        // handle update archive
    };

    const [modal9, setmodal9] = useState(false);
    const handleAddUpdateServiceType = (selectedArchive: any[], id: string) => {
        successAlert('ServiceType Updated Succesfully');
        // handle update archive
    };

    const [modal10, setmodal10] = useState(false);
    const handleAddCategory = (selectedArchive: string, id: string) => {
        successAlert('create category Succesfully');
        // handle update archive
    };

    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit') {
            const editUrl = `/AdminModule/Admin/EditAdmin/1`;
            navigate(editUrl);
        } else if (selectedOption === 'provideSubscription') {
            setmodal2(true);
        } else if (selectedOption === 'provideBonus') {
            setmodal3(true);
        } else if (selectedOption === 'provideCoupon') {
            setmodal4(true);
        } else if (selectedOption === 'providePromocode') {
            setmodal5(true);
        } else if (selectedOption === 'customizeReferralMessage') {
            const ReferalUrl = `/PromotionModule/RefferalMaster/CreateRefferalMaster`;
            navigate(ReferalUrl);
        } else if (selectedOption === 'configureArchive') {
            setmodal6(true);
        } else if (selectedOption === 'updateServiceCity') {
            setmodal7(true);
        } else if (selectedOption === 'updateVehicleType') {
            setmodal8(true);
        } else if (selectedOption === 'updateServiceType') {
            setmodal9(true);
        }
    };

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />
            <div className="panel mt-3 flex  flex-row gap-3 justify-end">
                <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                    <button className="btn btn-primary block w-full sm:inline-block text-center mt-0" onClick={() => setmodal10(true)}>
                        Create Category
                    </button>
                </div>

                {/* <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                    <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                        <option value="">Action Dropdown</option>
                        <option value="provideSubscription">Provide Subscription</option>
                        <option value="provideBonus">Provide Bonus</option>
                        <option value="provideCoupon">Provide Coupon</option>
                        <option value="providePromocode">Provide Promocode</option>
                        <option value="customizeReferralMessage">Customize Referral Message</option>
                        <option value="configureArchive">Configure Archive</option>
                        <option value="updateServiceCity">Update Service City</option>
                        <option value="updateVehicleType">Update Vehicle Type</option>
                        <option value="updateServiceType">Update Service Type</option>
                    </select>
                </div> */}

                <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                    <select id="userTypeSelect" className="form-select text-white-dark" onChange={(e) => handleUserTypeChange(e.target.value)} required>
                        <option value="Rider">Rider</option>
                        <option value="Driver">Driver</option>
                        <option value="Channel Partner">Channel Partner</option>
                        <option value="Vehicle">Vehicle</option>
                        <option value="Travel Agency">Travel Agency</option>
                    </select>
                </div>
            </div>
            {/* Conditional rendering based on selected user type */}
            {renderUserTypeComponent()}
            <CommonPopUp
                title={'Assign Subscription'}
                columns={assinedSubscription}
                data={staticSubscriptionData}
                event={modal2}
                closeModal={() => setmodal2(false)}
                onSubmit={handleAddAssignSubscription}
            />{' '}
            <CommonPopUp title={'Assign Bonus'} columns={assinedBonus} data={staticBonusMasterData} event={modal3} closeModal={() => setmodal3(false)} onSubmit={handleAddAssignBonus} />{' '}
            <CommonPopUp title={'Assign Coupon'} columns={assinedCoupon} data={staticCouponMasterData} event={modal4} closeModal={() => setmodal4(false)} onSubmit={handleAddAssignCoupon} />{' '}
            <CommonPopUp title={'Assign Promocode'} columns={assinedPromocode} data={staticPromocodeMasterData} event={modal5} closeModal={() => setmodal5(false)} onSubmit={handleAddPromocode} />{' '}
            <CommonPopUp title={'Assign Service city'} columns={assinedServiceCity} data={staticServiceCityData} event={modal7} closeModal={() => setmodal7(false)} onSubmit={handleAddServiceCity} />{' '}
            <CommonPopUp title={'Assign Vehicle'} columns={updateAddVehicle} data={staticVehicleProfileData} event={modal8} closeModal={() => setmodal8(false)} onSubmit={handleAddVehicle} />{' '}
            <CategoryModal event={modal10} closeModal={() => setmodal10(false)} onSubmit={handleAddCategory} />
            <UpdateArchivePopUp event={modal6} closeModal={() => setmodal6(false)} onSubmit={handleAddUpdateArchive} />
            <UpdateServiceTypePopUp event={modal9} closeModal={() => setmodal9(false)} onSubmit={handleAddUpdateServiceType} />
        </>
    );
};

export default ViewUsers;
