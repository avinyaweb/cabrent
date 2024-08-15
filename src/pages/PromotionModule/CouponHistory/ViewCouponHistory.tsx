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

interface CouponHistoryData {
    id: string;
    couponId: string;
    driverId: string;
    archive: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    couponCode: string;
    couponName: string;
    couponDesc: string;
    usage: string;
    amount: string;
    benefit: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    country: string;
    state: string;
    city: string;
    serviceAvailableCity: string;
}

export const staticCouponHistoryData = [
    {
        id: '1',
        couponId: '123',
        driverId: 'Remesh',
        archive: 'HOLD',
        approvedBy: 'John Doe',
        approvedAt: '2024-01-08T09:00:00Z',
        createdBy: 'Alice',
        createdAt: '2024-01-08T08:30:00Z',
        updatedBy: 'Alice',
        updatedAt: '2024-01-08T09:15:00Z',
        couponCode: 'SOME_CODE', // Adding missing couponCode
        couponName: 'Discount 20%',
        couponDesc: 'Get a 20% discount on selected items',
        usage: 'Single use per customer',
        amount: '20',
        benefit: 'Save up to 20% on your next purchase',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
        password: '******',
        gender: 'Male',
        country: 'USA',
        state: 'California',
        city: 'Los Angeles',
        serviceAvailableCity: 'New York',
    },
    {
        id: '2',
        couponId: '456',
        driverId: 'Sonu',
        archive: 'APPROVED',
        approvedBy: 'Jane Smith',
        approvedAt: '2024-01-10T11:20:00Z',
        createdBy: 'Bob',
        createdAt: '2024-01-10T10:45:00Z',
        updatedBy: 'Bob',
        updatedAt: '2024-01-10T11:30:00Z',
        couponName: 'Discount 20%',
        couponDesc: 'Get a 20% discount on selected items',
        usage: 'Single use per customer',
        amount: '20',
        benefit: 'Save up to 20% on your next purchase',
        firstName: 'Jane',
        couponCode: 'SOME_CODE',
        lastName: 'Doe',
        email: 'janedoe@example.com',
        phone: '9876543210',
        password: '******',
        gender: 'Female',
        country: 'USA',
        state: 'California',
        city: 'San Francisco',
        serviceAvailableCity: 'Los Angeles',
    },
    {
        id: '3',
        couponId: '789',
        driverId: 'Manu',
        archive: 'PENDING',
        approvedBy: 'Eleanor Rigby',
        approvedAt: '2024-01-20T15:45:00Z',
        createdBy: 'Charlie',
        createdAt: '2024-01-20T15:00:00Z',
        updatedBy: 'Charlie',
        updatedAt: '2024-01-20T16:00:00Z',
        couponName: 'Discount 20%',
        couponDesc: 'Get a 20% discount on selected items',
        usage: 'Single use per customer',
        amount: '20',
        benefit: 'Save up to 20% on your next purchase',
        firstName: 'Manu',
        lastName: 'Chopra',
        couponCode: 'SOME_CODE',
        email: 'manuchopra@example.com',
        phone: '5555555555',
        password: '******',
        gender: 'Male',
        country: 'Canada',
        state: 'Ontario',
        city: 'Toronto',
        serviceAvailableCity: 'Vancouver',
    },
];

const ViewCouponHistory = ({ tabs }: { tabs: boolean }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [modal3, setmodal3] = useState(false);

    const [ChannelPartnerData, setChannelPartnerData] = useState<CouponHistoryData[]>(staticCouponHistoryData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<CouponHistoryData[]>([]);
    const [recordsData, setRecordsData] = useState<CouponHistoryData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<CouponHistoryData[]>([]);
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
    //   dispatch(setPageTitle('View Coupon History'));

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
    //         setChannelPartnerData(staticCouponHistoryData);
    //       }
    //     } catch (error: any) {
    //       console.error('Error fetching Wallet History data:', error.message);
    //     }
    //   };
    //   fetchChannelPartnerData();
    // }, [dispatch]);

    useEffect(() => {
        if (ChannelPartnerData.length > 0) {
            const sortedData = ChannelPartnerData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof CouponHistoryData;
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
                couponId = '',
                driverId = '',
                archive = '',
                approvedBy = '',
                approvedAt = '',
                createdBy = '',
                createdAt = '',
                updatedBy = '',
                updatedAt = '',
                couponCode = '',
                couponName = '',
                couponDesc = '',
                usage = '',
                amount = '',
                benefit = '',
                firstName = '',
                lastName = '',
                email = '',
                phone = '',
                gender = '',
                country = '',
                state = '',
                city = '',
                serviceAvailableCity = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                couponId?.toLowerCase().includes(searchString) ||
                driverId?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                approvedAt?.toLowerCase().includes(searchString) ||
                createdBy?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedBy?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString) ||
                couponCode?.toLowerCase().includes(searchString) ||
                couponName?.toLowerCase().includes(searchString) ||
                couponDesc?.toLowerCase().includes(searchString) ||
                usage?.toLowerCase().includes(searchString) ||
                amount?.toLowerCase().includes(searchString) ||
                benefit?.toLowerCase().includes(searchString) ||
                firstName?.toLowerCase().includes(searchString) ||
                lastName?.toLowerCase().includes(searchString) ||
                email?.toLowerCase().includes(searchString) ||
                phone?.toLowerCase().includes(searchString) ||
                gender?.toLowerCase().includes(searchString) ||
                country?.toLowerCase().includes(searchString) ||
                state?.toLowerCase().includes(searchString) ||
                city?.toLowerCase().includes(searchString) ||
                serviceAvailableCity?.toLowerCase().includes(searchString)
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

    const columns: DataTableColumn<CouponHistoryData>[] = [
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
                                    const editUrl = `/PromotionModule/CouponHistory/EditCouponHistory/${rowData.id}`;
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
                                    const viewUrl = `/PromotionModule/CouponHistory/ViewSpecificCouponHistory/${rowData.id}`;
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
        { accessor: 'couponId', title: 'Coupon', sortable: true, hidden: hiddenColumns.includes('couponId') },
        { accessor: 'driverId', title: 'Driver', sortable: true, hidden: hiddenColumns.includes('driverId') },
        { accessor: 'archive', title: 'Update Profile Status', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
        { accessor: 'couponName', title: 'Coupon Name', sortable: true, hidden: hiddenColumns.includes('couponName') },
        { accessor: 'couponDesc', title: 'Coupon Description', sortable: true, hidden: hiddenColumns.includes('couponDesc') },
        { accessor: 'usage', title: 'Usage', sortable: true, hidden: hiddenColumns.includes('usage') },
        { accessor: 'amount', title: 'Amount', sortable: true, hidden: hiddenColumns.includes('amount') },
        { accessor: 'benefit', title: 'Benefit', sortable: true, hidden: hiddenColumns.includes('benefit') },
        { accessor: 'firstName', title: 'First Name', sortable: true, hidden: hiddenColumns.includes('firstName') },
        { accessor: 'lastName', title: 'Last Name', sortable: true, hidden: hiddenColumns.includes('lastName') },
        { accessor: 'email', title: 'Email', sortable: true, hidden: hiddenColumns.includes('email') },
        { accessor: 'phone', title: 'Phone', sortable: true, hidden: hiddenColumns.includes('phone') },

        { accessor: 'gender', title: 'Gender', sortable: true, hidden: hiddenColumns.includes('gender') },
        { accessor: 'country', title: 'Country', sortable: true, hidden: hiddenColumns.includes('country') },
        { accessor: 'state', title: 'State', sortable: true, hidden: hiddenColumns.includes('state') },
        { accessor: 'city', title: 'City', sortable: true, hidden: hiddenColumns.includes('city') },
        { accessor: 'serviceAvailableCity', title: 'Service Available City', sortable: true, hidden: hiddenColumns.includes('serviceAvailableCity') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    const handleRowClick = (row: CouponHistoryData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: CouponHistoryData[] = [];

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
            const editUrl = `/PromotionModule/CouponHistory/EditCouponHistory/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'updateArchive' && selectedRecords.length >= 1) {
            setmodal3(true);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'Couspon History');
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
            label: 'Coupon History',
            to: '/PromotionModule/CouponHistory/ViewCouponHistory',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/PromotionModule/CouponHistory/ViewCouponHistory' ? 'text-blue-600' : ''
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
            <Link to="/PromotionModule/CouponHistory/CreateCouponHistory" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
              Create Coupon History
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

export default ViewCouponHistory;
