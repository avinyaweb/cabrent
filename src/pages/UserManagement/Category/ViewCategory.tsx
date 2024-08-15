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

import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';
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

interface CategoryData {
    id: string;
    categoryName: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

export const staticCategoryData = [
    {
        id: '1',
        categoryName: 'Management',
        approvedBy: 'AdminXYZ',
        approvedAt: '2024-01-06T12:00:00Z',
        createdBy: 'Admin123',
        createdAt: '2024-01-05T09:30:00Z',
        updatedBy: 'Admin123',
        updatedAt: '2024-01-06T13:45:00Z',
    },
    {
        id: '2',
        categoryName: 'Finance',
        approvedBy: 'AdminABC',
        approvedAt: '2024-01-07T10:15:00Z',
        createdBy: 'Admin456',
        createdAt: '2024-01-06T14:00:00Z',
        updatedBy: 'Admin456',
        updatedAt: '2024-01-07T11:30:00Z',
    },
];

const ViewCategory = () => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [CategoryData, setCategoryData] = useState<CategoryData[]>(staticCategoryData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<CategoryData[]>([]);
    const [recordsData, setRecordsData] = useState<CategoryData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<CategoryData[]>([]);
    const [search, setSearch] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    // date sorting
    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    useEffect(() => {
        if (CategoryData.length > 0) {
            const sortedData = CategoryData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof CategoryData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [CategoryData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const { id = '', categoryName = '', approvedBy = '', approvedAt = '', createdBy = '', createdAt = '', updatedBy = '', updatedAt = '' } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                categoryName?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                approvedAt?.toLowerCase().includes(searchString) ||
                createdBy?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedBy?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString)
            );
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search, initialRecords, pageSize]);

    // State to manage hidden columns
    const [hiddenColumns, setHiddenColumns] = useState<string[]>(['id', 'approvedAt', 'approvedBy', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy']);

    // Function to toggle column visibility
    const toggleColumnVisibility = (columnAccessor: string) => {
        setHiddenColumns((prevHiddenColumns) => {
            if (prevHiddenColumns.includes(columnAccessor)) {
                return prevHiddenColumns.filter((col) => col !== columnAccessor);
            } else {
                return [...prevHiddenColumns, columnAccessor];
            }
        });
    };

    const columns: DataTableColumn<CategoryData>[] = [
        {
            accessor: 'actions',
            title: 'Actions',
            // eslint-disable-next-line react/display-name
            render: (rowData) => (
                <div className="flex items-center">
                    <Tippy content="Edit">
                        <button
                            type="button"
                            className="mr-4"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const editUrl = `/TransactionModule/PGTransactions/EditPGTransactions/${rowData.id}`;
                                    navigate(editUrl); // Navigate to the edit page URL
                                }
                            }}
                        >
                            <IconEdit />
                        </button>
                    </Tippy>
                    <Tippy content="View Specific">
                        <button
                            type="button"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const viewUrl = `/UserManagement/Category/ViewSpecificCategory/${rowData.id}`;
                                    navigate(viewUrl);
                                }
                            }}
                        >
                            <IconEye />
                        </button>
                    </Tippy>
                </div>
            ),
        },
        { accessor: 'id', title: 'ID', sortable: true, hidden: hiddenColumns.includes('id') },
        { accessor: 'categoryName', title: 'Category', sortable: true, hidden: hiddenColumns.includes('categoryName') },
        // { accessor: 'status', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('status') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: CategoryData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: CategoryData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${row.id}`);
    };

    const [selectedUserType, setSelectedUserType] = useState('');
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
            label: 'View Category',
            to: '/UserManagement/Category/ViewCategory',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/PromotionModule/BonusMaster/ViewBonusMaster' ? 'text-blue-600' : ''
            }`,
        },
    ];

    const handleUserTypeChange = (selectedOption: string) => {
        setSelectedUserType(selectedOption);
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
            {/* <div className="panel mt-3 flex  flex-row gap-3 justify-end">


                <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                    <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                        <option value="">Select Option</option>
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
                </div>

                
            </div> */}

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <div className="dropdown">
                            {/* Dropdown content */}
                            <Dropdown
                                placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                btnClassName="w-full !flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                button={
                                    <>
                                        <span className="ltr:mr-1 rtl:ml-1">Columns</span>
                                        <div className="flex items-center ml-auto">
                                            <IconCaretDown className="w-5 h-5" />
                                        </div>
                                    </>
                                }
                            >
                                <ul className="!min-w-[300px] max-h-60 overflow-y-auto">
                                    {' '}
                                    {columns.map((col, index) => (
                                        <li
                                            key={index}
                                            className="flex flex-col"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            <div className="flex items-center px-4 py-1">
                                                <label className="cursor-pointer mb-0">
                                                    <input
                                                        type="checkbox"
                                                        checked={!hiddenColumns.includes(col.accessor)}
                                                        className="form-checkbox"
                                                        defaultValue={col.accessor}
                                                        onChange={() => toggleColumnVisibility(col.accessor)}
                                                    />
                                                    <span className="ltr:ml-2 rtl:mr-2">{col.title || col.accessor}</span>
                                                </label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0 z-50">
                        <DateRangePicker placeholder="Select Date Range" onChange={handleDateRangeChange} className="cursor-pointer w-full" />
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <input type="text" className="form-input w-full " placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                            <option value="">Select Option</option>
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
                    </div>

                    {/* <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                            <option value="">Action Dropdown</option>
                            <option value="edit">Edit</option>
                            <option value="updateArchive">Update Archive</option>
                            <option value="export">Export</option>
                        </select>
 
                    </div> */}
                </div>
                <div className="datatables mt-6">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={sortedData}
                        columns={columns}
                        highlightOnHover
                        totalRecords={CategoryData.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        selectedRecords={selectedRecords}
                        onSelectedRecordsChange={(selectedRows) => setSelectedRecords(selectedRows)}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                        // onRowClick={(row) => handleRowClick(row)}
                    />
                </div>
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
                <CommonPopUp
                    title={'Assign Service city'}
                    columns={assinedServiceCity}
                    data={staticServiceCityData}
                    event={modal7}
                    closeModal={() => setmodal7(false)}
                    onSubmit={handleAddServiceCity}
                />{' '}
                <CommonPopUp title={'Assign Vehicle'} columns={updateAddVehicle} data={staticVehicleProfileData} event={modal8} closeModal={() => setmodal8(false)} onSubmit={handleAddVehicle} />{' '}
                {/* <CategoryModal event={modal10} closeModal={() => setmodal10(false)} onSubmit={handleAddCategory} /> */}
                <UpdateArchivePopUp event={modal6} closeModal={() => setmodal6(false)} onSubmit={handleAddUpdateArchive} />
                <UpdateServiceTypePopUp event={modal9} closeModal={() => setmodal9(false)} onSubmit={handleAddUpdateServiceType} />
            </div>
        </>
    );
};

export default ViewCategory;
