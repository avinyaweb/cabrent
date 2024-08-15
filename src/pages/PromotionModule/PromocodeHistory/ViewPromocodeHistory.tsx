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
import toast from 'react-hot-toast';
import { successAlert } from '@/utils/Toast';
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';
import { downloadExcel } from '@/utils/Excel';

interface PromocodeHistoryData {
    id: string;
    promocodeId: string;
    driverId: string;
    promocodeStatus: string;
    archive: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    fullName: string;
    licenseNumber: string;
    vehicleNumber: string;
    contactNumber: string;
    email: string;
    address: string;
    dob: string;
    gender: string;
    serviceProviderType: string;
    channelPartnerType: string;
    TravelAgency: string;
    firstName: string;
    middleName: string;
    lastName: string;
    fatherName: string;
    mobileNumber: string;
    altMobileNumber: string;
    country: string;
    state: string;
    city: string;
    dlNumber: string;
    dlValidity: string;
    policeVerNumber: string;
    batchNumber: string;
    batchValidity: string;
    password: string;
    permanentAddress: string;
    presentAddress: string;
    fk_serviceCity: string;
    remark: string;
    promoCode: string;
    discountType: string;
    validityStart: string;
    validityEnd: string;
    startTime: string;
    endTime: string;
    usage: string;
    usageLimit: string;
    perUsageLimit: string;
    tripType: string;
    days: string;
}

export const staticPromocodeHistoryData = [
    {
        id: '1',
        promocodeId: '123',
        driverId: 'DRV001',
        promocodeStatus: 'False',
        archive: 'APPROVED',
        approvedBy: 'John Doe',
        approvedAt: '2024-01-08T09:00:00Z',
        createdBy: 'Alice',
        createdAt: '2024-01-08T08:30:00Z',
        updatedBy: 'Alice',
        updatedAt: '2024-01-08T09:15:00Z',
        fullName: 'John Doe',
        licenseNumber: 'ABC123',
        vehicleNumber: 'XYZ456',
        contactNumber: '9876543210',
        email: 'john.doe@example.com',
        address: '123 Main St, City, Country',
        dob: '1990-01-01',
        gender: 'Male',
        serviceProviderType: 'TypeA',
        channelPartnerType: 'ChannelA',
        TravelAgency: 'AgencyX',
        firstName: 'John',
        middleName: 'Robert',
        lastName: 'Doe',
        fatherName: 'Michael Doe',
        mobileNumber: '1234567890',
        altMobileNumber: '9876543210',
        country: 'USA',
        state: 'California',
        city: 'Los Angeles',
        dlNumber: 'DL123456',
        dlValidity: '2025-01-01',
        policeVerNumber: 'PV789',
        batchNumber: 'B123',
        batchValidity: '2024-12-31',
        password: 'dummyPassword',
        permanentAddress: '456 Park Ave, City, Country',
        presentAddress: '789 Elm St, City, Country',
        fk_serviceCity: 'New York',
        remark: 'Lorem ipsum dolor sit amet',
        promoCode: 'FREEDELIVERY',
        discountType: 'Fixed',
        validityStart: '2024-02-15',
        validityEnd: '2024-03-15',
        startTime: '09:00',
        endTime: '21:00',
        usage: 'Unlimited use',
        usageLimit: '500',
        perUsageLimit: '5',
        tripType: 'One Way',
        days: 'All days',
    },
    {
        id: '2',
        promocodeId: '456',
        driverId: 'DRV002',
        promocodeStatus: 'True',
        archive: 'HOLD',
        approvedBy: 'Jane Smith',
        approvedAt: '2024-01-10T11:20:00Z',
        createdBy: 'Bob',
        createdAt: '2024-01-10T10:45:00Z',
        updatedBy: 'Bob',
        updatedAt: '2024-01-10T11:30:00Z',
        fullName: 'Jane Smith',
        licenseNumber: 'DEF456',
        vehicleNumber: 'UVW789',
        contactNumber: '9876543210',
        email: 'jane.smith@example.com',
        address: '456 Elm St, City, Country',
        dob: '1985-05-15',
        gender: 'Female',
        serviceProviderType: 'TypeB',
        channelPartnerType: 'ChannelB',
        TravelAgency: 'AgencyY',
        firstName: 'Jane',
        middleName: 'Marie',
        lastName: 'Smith',
        fatherName: 'William Smith',
        mobileNumber: '9876543210',
        altMobileNumber: '1234567890',
        country: 'USA',
        state: 'New York',
        city: 'New York City',
        dlNumber: 'DL789012',
        dlValidity: '2026-01-01',
        policeVerNumber: 'PV456',
        batchNumber: 'B456',
        batchValidity: '2025-12-31',
        password: 'strongPassword',
        permanentAddress: '789 Park Ave, City, Country',
        presentAddress: '123 Main St, City, Country',
        fk_serviceCity: 'Los Angeles',
        remark: 'Lorem ipsum dolor sit amet',
        promoCode: 'DISCOUNT25',
        discountType: 'Percentage',
        validityStart: '2024-03-01',
        validityEnd: '2024-03-31',
        startTime: '08:00',
        endTime: '20:00',
        usage: 'Limited use',
        usageLimit: '100',
        perUsageLimit: '2',
        tripType: 'Round Trip',
        days: 'Weekdays',
    },
];

const ViewPromocodeHistory = ({ tabs }: { tabs: boolean }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [modal3, setmodal3] = useState(false);
    const [ChannelPartnerData, setChannelPartnerData] = useState<PromocodeHistoryData[]>(staticPromocodeHistoryData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<PromocodeHistoryData[]>([]);
    const [recordsData, setRecordsData] = useState<PromocodeHistoryData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<PromocodeHistoryData[]>([]);
    const [search, setSearch] = useState('');
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

    // Dynamic Data
    // useEffect(() => {
    //   dispatch(setPageTitle('View Promocode History'));

    //   const fetchChannelPartnerData = async () => {
    //     try {
    //       const { data } = await getChannelPartnerData();
    //       if (data?.ChannelPartners) {
    //         // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //         const newData = data.ChannelPartners.map(({
    //           _id: id,
    //           ...rest
    //         }) => ({
    //           id,
    //           ...rest
    //         }))
    //         //setChannelPartnerData(newData);
    //         setChannelPartnerData(staticPromocodeHistoryData);
    //       }
    //     } catch (error: any) {
    //       console.error('Error fetching Promocode History data:', error.message);
    //     }
    //   };
    //   fetchChannelPartnerData();
    // }, [dispatch]);

    useEffect(() => {
        if (ChannelPartnerData.length > 0) {
            const sortedData = ChannelPartnerData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof PromocodeHistoryData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [ChannelPartnerData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                promocodeId = '',
                driverId = '',
                promocodeStatus = '',
                archive = '',
                approvedBy = '',
                approvedAt = '',
                createdBy = '',
                createdAt = '',
                updatedBy = '',
                updatedAt = '',
                fullName = '',
                licenseNumber = '',
                vehicleNumber = '',
                contactNumber = '',
                email = '',
                address = '',
                dob = '',
                gender = '',
                serviceProviderType = '',
                channelPartnerType = '',
                TravelAgency = '',
                firstName = '',
                middleName = '',
                lastName = '',
                fatherName = '',
                mobileNumber = '',
                altMobileNumber = '',
                country = '',
                state = '',
                city = '',
                dlNumber = '',
                dlValidity = '',
                policeVerNumber = '',
                batchNumber = '',
                batchValidity = '',
                password = '',
                permanentAddress = '',
                presentAddress = '',
                fk_serviceCity = '',
                remark = '',
                promoCode = '',
                discountType = '',
                validityStart = '',
                validityEnd = '',
                startTime = '',
                endTime = '',
                usage = '',
                usageLimit = '',
                perUsageLimit = '',
                tripType = '',
                days = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                promocodeId?.toLowerCase().includes(searchString) ||
                driverId?.toLowerCase().includes(searchString) ||
                promocodeStatus?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                approvedAt?.toLowerCase().includes(searchString) ||
                createdBy?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedBy?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString) ||
                fullName?.toLowerCase().includes(searchString) ||
                licenseNumber?.toLowerCase().includes(searchString) ||
                vehicleNumber?.toLowerCase().includes(searchString) ||
                contactNumber?.toLowerCase().includes(searchString) ||
                email?.toLowerCase().includes(searchString) ||
                address?.toLowerCase().includes(searchString) ||
                dob?.toLowerCase().includes(searchString) ||
                gender?.toLowerCase().includes(searchString) ||
                serviceProviderType?.toLowerCase().includes(searchString) ||
                channelPartnerType?.toLowerCase().includes(searchString) ||
                TravelAgency?.toLowerCase().includes(searchString) ||
                firstName?.toLowerCase().includes(searchString) ||
                middleName?.toLowerCase().includes(searchString) ||
                lastName?.toLowerCase().includes(searchString) ||
                fatherName?.toLowerCase().includes(searchString) ||
                mobileNumber?.toLowerCase().includes(searchString) ||
                altMobileNumber?.toLowerCase().includes(searchString) ||
                country?.toLowerCase().includes(searchString) ||
                state?.toLowerCase().includes(searchString) ||
                city?.toLowerCase().includes(searchString) ||
                dlNumber?.toLowerCase().includes(searchString) ||
                dlValidity?.toLowerCase().includes(searchString) ||
                policeVerNumber?.toLowerCase().includes(searchString) ||
                batchNumber?.toLowerCase().includes(searchString) ||
                batchValidity?.toLowerCase().includes(searchString) ||
                password?.toLowerCase().includes(searchString) ||
                permanentAddress?.toLowerCase().includes(searchString) ||
                presentAddress?.toLowerCase().includes(searchString) ||
                fk_serviceCity?.toLowerCase().includes(searchString) ||
                remark?.toLowerCase().includes(searchString) ||
                promoCode?.toLowerCase().includes(searchString) ||
                discountType?.toLowerCase().includes(searchString) ||
                validityStart?.toLowerCase().includes(searchString) ||
                validityEnd?.toLowerCase().includes(searchString) ||
                startTime?.toLowerCase().includes(searchString) ||
                endTime?.toLowerCase().includes(searchString) ||
                usage?.toLowerCase().includes(searchString) ||
                usageLimit?.toLowerCase().includes(searchString) ||
                perUsageLimit?.toLowerCase().includes(searchString) ||
                tripType?.toLowerCase().includes(searchString) ||
                days?.toLowerCase().includes(searchString)
            );
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search, initialRecords, pageSize]);

    // State to manage hidden columns
    const [hiddenColumns, setHiddenColumns] = useState<string[]>(['id']);

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

    const columns: DataTableColumn<PromocodeHistoryData>[] = [
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
                                    const editUrl = `/PromotionModule/PromocodeHistory/EditPromocodeHistory/${rowData.id}`;
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
                                    const viewUrl = `/PromotionModule/PromocodeHistory/ViewSpecificPromocodeHistory/${rowData.id}`;
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
        { accessor: 'promocodeId', title: 'Promo code', sortable: true, hidden: hiddenColumns.includes('promocodeId') },
        { accessor: 'driverId', title: 'Driver', sortable: true, hidden: hiddenColumns.includes('driverId') },
        { accessor: 'promocodeStatus', title: 'Promocode Status', sortable: true, hidden: hiddenColumns.includes('promocodeStatus') },
        { accessor: 'archive', title: 'Update Profile Status', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
        // New fields
        { accessor: 'fullName', title: 'Full Name', sortable: true, hidden: hiddenColumns.includes('fullName') },
        { accessor: 'licenseNumber', title: 'License Number', sortable: true, hidden: hiddenColumns.includes('licenseNumber') },
        { accessor: 'vehicleNumber', title: 'Vehicle Number', sortable: true, hidden: hiddenColumns.includes('vehicleNumber') },
        { accessor: 'contactNumber', title: 'Contact Number', sortable: true, hidden: hiddenColumns.includes('contactNumber') },
        { accessor: 'email', title: 'Email', sortable: true, hidden: hiddenColumns.includes('email') },
        { accessor: 'address', title: 'Address', sortable: true, hidden: hiddenColumns.includes('address') },
        { accessor: 'dob', title: 'Date of Birth', sortable: true, hidden: hiddenColumns.includes('dob') },
        { accessor: 'gender', title: 'Gender', sortable: true, hidden: hiddenColumns.includes('gender') },
        { accessor: 'serviceProviderType', title: 'Service Provider Type', sortable: true, hidden: hiddenColumns.includes('serviceProviderType') },
        { accessor: 'channelPartnerType', title: 'Channel Partner Type', sortable: true, hidden: hiddenColumns.includes('channelPartnerType') },
        { accessor: 'TravelAgency', title: 'Travel Agency', sortable: true, hidden: hiddenColumns.includes('TravelAgency') },
        { accessor: 'firstName', title: 'First Name', sortable: true, hidden: hiddenColumns.includes('firstName') },
        { accessor: 'middleName', title: 'Middle Name', sortable: true, hidden: hiddenColumns.includes('middleName') },
        { accessor: 'lastName', title: 'Last Name', sortable: true, hidden: hiddenColumns.includes('lastName') },
        { accessor: 'fatherName', title: "Father's Name", sortable: true, hidden: hiddenColumns.includes('fatherName') },
        { accessor: 'mobileNumber', title: 'Mobile Number', sortable: true, hidden: hiddenColumns.includes('mobileNumber') },
        { accessor: 'altMobileNumber', title: 'Alternate Mobile Number', sortable: true, hidden: hiddenColumns.includes('altMobileNumber') },
        { accessor: 'country', title: 'Country', sortable: true, hidden: hiddenColumns.includes('country') },
        { accessor: 'state', title: 'State', sortable: true, hidden: hiddenColumns.includes('state') },
        { accessor: 'city', title: 'City', sortable: true, hidden: hiddenColumns.includes('city') },
        { accessor: 'dlNumber', title: "Driver's License Number", sortable: true, hidden: hiddenColumns.includes('dlNumber') },
        { accessor: 'dlValidity', title: "Driver's License Validity", sortable: true, hidden: hiddenColumns.includes('dlValidity') },
        { accessor: 'policeVerNumber', title: 'Police Verification Number', sortable: true, hidden: hiddenColumns.includes('policeVerNumber') },
        { accessor: 'batchNumber', title: 'Batch Number', sortable: true, hidden: hiddenColumns.includes('batchNumber') },
        { accessor: 'batchValidity', title: 'Batch Validity', sortable: true, hidden: hiddenColumns.includes('batchValidity') },

        { accessor: 'permanentAddress', title: 'Permanent Address', sortable: true, hidden: hiddenColumns.includes('permanentAddress') },
        { accessor: 'presentAddress', title: 'Present Address', sortable: true, hidden: hiddenColumns.includes('presentAddress') },
        { accessor: 'fk_serviceCity', title: 'Service City', sortable: true, hidden: hiddenColumns.includes('fk_serviceCity') },
        { accessor: 'remark', title: 'Remark', sortable: true, hidden: hiddenColumns.includes('remark') },
        { accessor: 'promoCode', title: 'Promo Code', sortable: true, hidden: hiddenColumns.includes('promoCode') },
        { accessor: 'discountType', title: 'Discount Type', sortable: true, hidden: hiddenColumns.includes('discountType') },
        { accessor: 'validityStart', title: 'Validity Start', sortable: true, hidden: hiddenColumns.includes('validityStart') },
        { accessor: 'validityEnd', title: 'Validity End', sortable: true, hidden: hiddenColumns.includes('validityEnd') },
        { accessor: 'startTime', title: 'Start Time', sortable: true, hidden: hiddenColumns.includes('startTime') },
        { accessor: 'endTime', title: 'End Time', sortable: true, hidden: hiddenColumns.includes('endTime') },
        { accessor: 'usage', title: 'Usage', sortable: true, hidden: hiddenColumns.includes('usage') },
        { accessor: 'usageLimit', title: 'Usage Limit', sortable: true, hidden: hiddenColumns.includes('usageLimit') },
        { accessor: 'perUsageLimit', title: 'Per Usage Limit', sortable: true, hidden: hiddenColumns.includes('perUsageLimit') },
        { accessor: 'tripType', title: 'Trip Type', sortable: true, hidden: hiddenColumns.includes('tripType') },
        { accessor: 'days', title: 'Days', sortable: true, hidden: hiddenColumns.includes('days') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: PromocodeHistoryData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: PromocodeHistoryData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${row.id}`);
    };
    // add update archive
    const handleAddUpdateArchive = (selectedArchive: any[], id: string) => {
        successAlert('Archive Updated Succesfully');
        // handle update archive
    };
    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/PromotionModule/PromocodeHistory/EditPromocodeHistory/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'updateArchive' && selectedRecords.length >= 1) {
            setmodal3(true);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'Promocode History');
        } else {
            toast.error('Please Select from Table.');
        }
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    const setCurrent = (path: string) => {
        setCurrentPage(path);
    };

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Promocode History',
            to: '/PromotionModule/PromocodeHistory/ViewPromocodeHistory',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/PromotionModule/PromocodeHistory/ViewPromocodeHistory' ? 'text-blue-600' : ''
            }`,
        },
    ];

    const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);

    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    // date vise sorting.
    // useEffect(() => {
    //     const fetchAdminData = async () => {
    //         try {
    //             const { data } = await getAllAdminRoles();
    //             if (data?.Archives) {
    //                 const filteredData = data.Archives.filter((item: MoneyRequestData) => {
    //                     if (!selectedDateRange) return true;
    //                     const createdAtTimestamp = new Date(item.createdAt).getTime();
    //                     const startDate = selectedDateRange[0]?.getTime() || 0;
    //                     const endDate = selectedDateRange[1]?.getTime() || Number.MAX_SAFE_INTEGER;
    //                     return createdAtTimestamp >= startDate && createdAtTimestamp <= endDate;
    //                 });
    //                 setMoneyRequestData(filteredData);
    //             }
    //         } catch (error: any) {
    //             console.error('Error fetching admin data:', error.message);
    //         }
    //     };
    //     fetchAdminData();
    // }, [selectedDateRange]);

    // const handleDateChange = (date: Date | null) => {
    //   setSelectedDateRange(date);
    // };

    return (
        <>
            {!tabs && <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />}

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    {/* <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
            <Link to="/promotionModule/promocodeHistory/createPromocodeHistory" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
              Create Promocode History
            </Link>
          </div> */}

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
                            <option value="">Action Dropdown</option>
                            <option value="edit">Edit</option>
                            <option value="updateArchive">Update Profile Status</option>
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
                        totalRecords={ChannelPartnerData.length}
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
                <UpdateArchivePopUp event={modal3} closeModal={() => setmodal3(false)} onSubmit={handleAddUpdateArchive} />
            </div>
        </>
    );
};

export default ViewPromocodeHistory;
