import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useSelector } from 'react-redux';
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

import { successAlert } from '@/utils/Toast';

import { downloadExcel } from '@/utils/Excel';
import toast from 'react-hot-toast';

interface SubscriptionData {
    id: string;
    fk_serviceCity: string;
    planName: string;
    planDetails: string;
    NumberOfDay: string;
    planAmount: string;
    planDescription: string;
    couponAmount: string;
    planLiveStartTime: string;
    planLiveEndTime: string;
    CGST: string;
    SGST: string;
    PlanAmount: string;
    ProcessingFee: string;
    CHPartCommission: string;
    PlatformFee: string;
    archive: string;
    TotalPurchase: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;

    //new fields:
    newUser: string;
    countOfUse: string;
    couponIsApplicable: string;
    useWalletMoney: string;
    vehicleType: string;
    type: string;
    remainingDaysString: string;
    categoryString: string;
}

export const staticSubscriptionData = [
    {
        id: '1',
        fk_serviceCity: 'Banglore',
        planName: 'Basic Plan',
        planDetails: 'Includes standard features',
        NumberOfDay: '30 days',
        planAmount: '$50',
        planDescription: 'Entry-level subscription',
        couponAmount: '500',
        planLiveStartTime: '2024-01-05T09:00:00Z',
        planLiveEndTime: '2024-02-04T18:00:00Z',
        CGST: '5%',
        SGST: '5%',
        PlanAmount: '$55',
        ProcessingFee: '$5',
        CHPartCommission: '2%',
        PlatformFee: '$10',
        archive: 'Pending',
        TotalPurchase: '23',
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

        //new field
        newUser: 'Yes',
        countOfUse: '22',
        couponIsApplicable: 'yes',
        useWalletMoney: 'No',
        vehicleType: 'Mini',
        type: 'Flat',
        remainingDaysString: '20',
        categoryString: 'Gold',
    },
    {
        id: '2',
        fk_serviceCity: 'Chennai',
        planName: 'Premium Plan',
        planDetails: 'Includes advanced features',
        NumberOfDay: '90 days',
        planAmount: '$150',
        planDescription: 'High-end subscription',
        couponAmount: '240',
        planLiveStartTime: '2024-01-10T10:00:00Z',
        planLiveEndTime: '2024-04-09T18:00:00Z',
        CGST: '7%',
        SGST: '7%',
        PlanAmount: '$160',
        ProcessingFee: '$10',
        CHPartCommission: '3%',
        PlatformFee: '$15',
        archive: 'Approved',
        TotalPurchase: '23',
        approvedBy: 'Manager',
        approvedAt: '2024-01-06T09:30:00Z',
        createdBy: 'User789',
        createdAt: '2024-01-06T08:45:00Z',
        updatedBy: 'UserABC',
        updatedAt: '2024-01-07T11:20:00Z',

        //new field
        newUser: 'No',
        countOfUse: '10',
        couponIsApplicable: 'no',
        useWalletMoney: 'Yes',
        vehicleType: 'SUV',
        type: 'Percentage',
        remainingDaysString: '20',
        categoryString: 'Gold',
    },
    {
        id: '3',
        fk_serviceCity: 'Mumbai',
        planName: 'Pro Plan',
        planDetails: 'Includes premium features',
        NumberOfDay: '365 days',
        planAmount: '$500',
        planDescription: 'Top-tier subscription',
        couponAmount: '333',
        planLiveStartTime: '2024-02-01T08:00:00Z',
        planLiveEndTime: '2025-01-31T18:00:00Z',
        CGST: '10%',
        SGST: '10%',
        PlanAmount: '$550',
        ProcessingFee: '$25',
        CHPartCommission: '5%',
        PlatformFee: '$20',
        archive: 'Approved',
        TotalPurchase: '23',
        approvedBy: 'Supervisor',
        approvedAt: '2024-01-07T15:00:00Z',
        createdBy: 'UserXYZ',
        createdAt: '2024-01-07T07:30:00Z',
        updatedBy: 'User123',
        updatedAt: '2024-01-08T10:15:00Z',
        //new field
        newUser: 'Yes',
        countOfUse: '5',
        couponIsApplicable: 'yes',
        useWalletMoney: 'Yes',
        vehicleType: 'Sedan',
        type: 'Flat',
        remainingDaysString: '20',
        categoryString: 'Gold',
    },
];

const TotalSubscription = ({ tabs, viewCategory }: any) => {
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [SubscriptionData, setSubscriptionData] = useState<SubscriptionData[]>(staticSubscriptionData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<SubscriptionData[]>([]);
    const [recordsData, setRecordsData] = useState<SubscriptionData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<SubscriptionData[]>([]);
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

    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    // Dynamic Data
    // useEffect(() => {
    //   dispatch(setPageTitle('View Subscription'));

    //   const fetchSubscriptionData = async () => {
    //     try {
    //       const { data } = await getSubscriptionData();
    //       if (data?.ChannelPartners) {
    //         // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //         const newData = data.ChannelPartners.map(({
    //           _id: id,
    //           ...rest
    //         }) => ({
    //           id,
    //           ...rest
    //         }))
    //         //setSubscriptionData(newData);
    //         setSubscriptionData(staticSubscriptionData);
    //       }
    //     } catch (error: any) {
    //       console.error('Error fetching subscription data:', error.message);
    //     }
    //   };
    //   fetchSubscriptionData();
    // }, [dispatch]);

    useEffect(() => {
        if (SubscriptionData.length > 0) {
            const sortedData = SubscriptionData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof SubscriptionData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [SubscriptionData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                fk_serviceCity = '',
                planName = '',
                planDetails = '',
                NumberOfDay = '',
                planAmount = '',
                planDescription = '',
                couponAmount = '',
                planLiveStartTime = '',
                planLiveEndTime = '',
                CGST = '',
                SGST = '',
                PlanAmount = '',
                ProcessingFee = '',
                CHPartCommission = '',
                PlatformFee = '',
                archive = '',
                TotalPurchase = ' ',
                approvedBy = '',
                approvedAt = '',
                createdBy = '',
                createdAt = '',
                updatedBy = '',
                updatedAt = '',
                newUser = ' ',
                countOfUse = ' ',
                couponIsApplicable = ' ',
                useWalletMoney = ' ',
                vehicleType = ' ',
                type = ' ',
                remainingDaysString = '',
                categoryString = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                fk_serviceCity?.toLowerCase().includes(searchString) ||
                planName?.toLowerCase().includes(searchString) ||
                planDetails?.toLowerCase().includes(searchString) ||
                NumberOfDay?.toLowerCase().includes(searchString) ||
                planAmount?.toLowerCase().includes(searchString) ||
                planDescription?.toLowerCase().includes(searchString) ||
                couponAmount?.toLowerCase().includes(searchString) ||
                planLiveStartTime?.toLowerCase().includes(searchString) ||
                planLiveEndTime?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                approvedAt?.toLowerCase().includes(searchString) ||
                createdBy?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedBy?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString) ||
                CGST?.toLowerCase().includes(searchString) || // Add CGST to the search logic
                SGST?.toLowerCase().includes(searchString) || // Add SGST to the search logic
                PlanAmount?.toLowerCase().includes(searchString) || // Add PlanAmount to the search logic
                ProcessingFee?.toLowerCase().includes(searchString) || // Add ProcessingFee to the search logic
                CHPartCommission?.toLowerCase().includes(searchString) || // Add CHPartCommission to the search logic
                PlatformFee?.toLowerCase().includes(searchString) ||
                TotalPurchase?.toLowerCase().includes(searchString) ||
                newUser.toLowerCase().includes(searchString) ||
                countOfUse.toLowerCase().includes(searchString) ||
                remainingDaysString.toLowerCase().includes(searchString) ||
                categoryString.toLowerCase().includes(searchString) ||
                couponIsApplicable.toLowerCase().includes(searchString) ||
                useWalletMoney.toLowerCase().includes(searchString) ||
                vehicleType.toLowerCase().includes(searchString) ||
                type.toLowerCase().includes(searchString) // Add PlatformFee to the search logic
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

    // table columns
    const columns: DataTableColumn<SubscriptionData>[] = [
        {
            accessor: 'actions',
            title: 'Actions',
            // eslint-disable-next-line react/display-name
            render: (rowData) => (
                <div className="flex items-center">
                    <Tippy content="View Specific">
                        <button
                            type="button"
                            onClick={() => {
                                if (rowData?.id) {
                                    const viewUrl = `/SubscriptionModule/Subscription/ViewSpecificSubscription/${rowData.id}`;
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
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('fk_serviceCity') },
        { accessor: 'planName', title: 'Plan Name', sortable: true, hidden: hiddenColumns.includes('planName') },
        { accessor: 'planDetails', title: 'Plan Details', sortable: true, hidden: hiddenColumns.includes('planDetails') },
        { accessor: 'NumberOfDay', title: 'Number Of Days', sortable: true, hidden: hiddenColumns.includes('NumberOfDay') },
        { accessor: 'planAmount', title: 'Plan Amount', sortable: true, hidden: hiddenColumns.includes('planAmount') },
        { accessor: 'planDescription', title: 'Plan Description', sortable: true, hidden: hiddenColumns.includes('planDescription') },
        { accessor: 'couponAmount', title: 'Coupon Amount', sortable: true, hidden: hiddenColumns.includes('couponAmount') },
        { accessor: 'planLiveStartTime', title: 'Plan Live Start Time', sortable: true, hidden: hiddenColumns.includes('planLiveStartTime') },
        { accessor: 'planLiveEndTime', title: 'Plan Live End Time', sortable: true, hidden: hiddenColumns.includes('planLiveEndTime') },

        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
        { accessor: 'CGST', title: 'CGST', sortable: true, hidden: hiddenColumns.includes('CGST') },
        { accessor: 'SGST', title: 'SGST', sortable: true, hidden: hiddenColumns.includes('SGST') },
        { accessor: 'PlanAmount', title: 'Plan Amount', sortable: true, hidden: hiddenColumns.includes('PlanAmount') },
        { accessor: 'ProcessingFee', title: 'Processing Fee', sortable: true, hidden: hiddenColumns.includes('ProcessingFee') },
        { accessor: 'CHPartCommission', title: 'CHPart Commission', sortable: true, hidden: hiddenColumns.includes('CHPartCommission') },
        { accessor: 'PlatformFee', title: 'Platform Fee', sortable: true, hidden: hiddenColumns.includes('PlatformFee') },
        { accessor: 'TotalPurchase', title: 'Total Purchase', sortable: true, hidden: hiddenColumns.includes('TotalPurchase') },
        { accessor: 'newUser', title: 'New User', sortable: true, hidden: hiddenColumns.includes('newUser') },
        { accessor: 'countOfUse', title: 'Count of Use', sortable: true, hidden: hiddenColumns.includes('countOfUse') },
        { accessor: 'couponIsApplicable', title: 'Coupon Applicable', sortable: true, hidden: hiddenColumns.includes('couponIsApplicable') },
        { accessor: 'useWalletMoney', title: 'Use Wallet Money', sortable: true, hidden: hiddenColumns.includes('useWalletMoney') },
        { accessor: 'vehicleType', title: 'Vehicle Type', sortable: true, hidden: hiddenColumns.includes('vehicleType') },
        { accessor: 'type', title: 'Type', sortable: true, hidden: hiddenColumns.includes('type') },
        { accessor: 'remainingDaysString', title: 'Remaining Days', sortable: true, hidden: hiddenColumns.includes('remainingDaysString') },
        { accessor: 'categoryString', title: 'Category', sortable: true, hidden: hiddenColumns.includes('categoryString') },

        { accessor: 'archive', title: 'Archive', sortable: true, hidden: hiddenColumns.includes('archive') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: SubscriptionData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: SubscriptionData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${row.id}`);
    };

    const [AddVehicle, setAddVehicle] = useState(false);
    const [VehicleData, setAddedVehicleData] = useState<any[]>([]);
    const [addedVehicleDataType, setVehicleDataType] = useState<any>();
    // add vehicle table columns
    const vehicleColumns: DataTableColumn<any>[] = [
        { accessor: 'serviceProviderType', title: 'Service Provider Type', sortable: true },
        { accessor: 'channelPartnerType', title: 'Channel Partner Type', sortable: true },
        { accessor: 'fleetManagementType', title: 'Fleet Management Type', sortable: true },
        { accessor: 'vehRegNumber', title: 'Vehicle Registration No', sortable: true },
        { accessor: 'vehRTONumber', title: 'Vehicle RTO Number', sortable: true },
        { accessor: 'vehChasisNumber', title: 'Vehicle Chasis Number', sortable: true },
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
        { accessor: 'loanAccNumber', title: 'Loan Acc Number', sortable: true },
        { accessor: 'emiAmt', title: 'EMI Amt', sortable: true },
        { accessor: 'emiDate', title: 'EMI Date', sortable: true },
        { accessor: 'currLocation', title: 'Curr Location', sortable: true },
    ];

    const [modal3, setModal3] = useState(false);

    // popup add vehicle
    const handleAddVehicle = (selectedTeam: any[], id: string) => {
        successAlert('Subscription Assign Succesfully');
        setAddedVehicleData(selectedTeam);
        setVehicleDataType(id);
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    // const setCurrent = (path: string) => {
    //     setCurrentPage(path);
    // };

    const navItems = !tabs
        ? [
              {
                  label: 'Home',
                  to: '/',
                  className: '',
              },
              {
                  label: 'Total Subscription',
                  to: '/SubscriptionModule/Subscription/TotalSubscription',
                  className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                      currentPath === '/SubscriptionModule/Subscription/TotalSubscription' ? 'text-blue-600' : ''
                  }`,
              },
          ]
        : [];

    //change amount  distri.

    const [modal4, setModal4] = useState(false);
    const [selectedSubscriptionAmountDist, setSelectedSubscriptionAmountDist] = useState<any[]>([]);
    const [addedSubscriptionAmountDistType, setAddedSubscriptionAmountDistType] = useState<any>();

    const subscriptionAmountDistColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID', sortable: true },
        { accessor: 'cgst', title: 'CGST', sortable: true },
        { accessor: 'sgst', title: 'SGST', sortable: true },
        { accessor: 'processingFee', title: 'Processing Fee', sortable: true },
        { accessor: 'planAmount', title: 'Plan Amount', sortable: true },
        { accessor: 'isChPartCommisionApplicable', title: 'CH Partner Comm Applicable', sortable: true },
        { accessor: 'platformFee', title: 'Platform Fee', sortable: true },
        { accessor: 'amountAddOrSub', title: 'Amount Add Or Sub', sortable: true },
        { accessor: 'pgCharges', title: 'PG Charges', sortable: true },
        { accessor: 'totalAmount', title: 'Total Amount', sortable: true },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true },
        { accessor: 'archive', title: 'archive', sortable: true },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true },
        { accessor: 'createdBy', title: 'Created By', sortable: true },
        { accessor: 'createdAt', title: 'Created At', sortable: true },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true },
    ];

    const handleAddSubscriptionAmountDist = (selectedSubscriptionAmtDist: any[], id: string) => {
        successAlert('change Subscription Amount Distribution Successfully');
        setSelectedSubscriptionAmountDist(selectedSubscriptionAmtDist);
        setAddedSubscriptionAmountDistType(id);
    };

    //POPUP FOR SUBSCRIPTION

    const [modal5, setModal5] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState<any[]>([]);
    const [addedSubscriptionType, setAddedSubscriptionType] = useState<any>();

    const subscriptionColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID', sortable: true },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true },
        { accessor: 'planName', title: 'Plan Name', sortable: true },
        { accessor: 'planDetails', title: 'Plan Details', sortable: true },
        { accessor: 'NumberOfDay', title: 'Number Of Days', sortable: true },
        { accessor: 'planAmount', title: 'Plan Amount', sortable: true },
        { accessor: 'planDescription', title: 'Plan Description', sortable: true },
        { accessor: 'couponAmount', title: 'Plan Distance', sortable: true },
        { accessor: 'planLiveStartTime', title: 'Plan Live Start Time', sortable: true },
        { accessor: 'planLiveEndTime', title: 'Plan Live End Time', sortable: true },
        { accessor: 'archive', title: 'archive', sortable: true },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true },
        { accessor: 'createdBy', title: 'Created By', sortable: true },
        { accessor: 'createdAt', title: 'Created At', sortable: true },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true },
        { accessor: 'CGST', title: 'CGST', sortable: true },
        { accessor: 'SGST', title: 'SGST', sortable: true },
        { accessor: 'PlanAmount', title: 'Plan Amount', sortable: true },
        { accessor: 'ProcessingFee', title: 'Processing Fee', sortable: true },
        { accessor: 'CHPartCommission', title: 'CHPart Commission', sortable: true },
        { accessor: 'PlatformFee', title: 'Platform Fee', sortable: true },
    ];

    const handleAddSubscription = (selectedSub: any[], id: string) => {
        successAlert('Subscription Added Successfully');
        setSelectedSubscription(selectedSub);
        setAddedSubscriptionType(id);
    };

    // add update archive
    const handleAddUpdatearchive = (selectedarchive: any[], id: string) => {
        successAlert('archive Updated Succesfully');
        // handle update archive
    };

    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'viewApp offered Money History');
        } else {
            toast.error('Please Select from Table.');
        }
    };

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0 z-50">
                        <DateRangePicker placeholder="Select Date Range" onChange={handleDateRangeChange} className="cursor-pointer" />
                    </div>
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

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <input type="text" className="form-input w-full" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                            <option value="">Action Dropdown</option>
                            <option value="export">Export</option>
                        </select>
                    </div>
                </div>

                <div className="datatables mt-6">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={sortedData}
                        columns={columns}
                        highlightOnHover
                        totalRecords={SubscriptionData.length}
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
            </div>
        </>
    );
};

export default TotalSubscription;
