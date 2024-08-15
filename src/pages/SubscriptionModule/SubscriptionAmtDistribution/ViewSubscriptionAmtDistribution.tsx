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
import UpdateArchivePopUp from '@/components/Models/UpdateArchivePopUp';
import { downloadExcel } from '@/utils/Excel';

interface SubscriptionAmtDistributionData {
    id: string;
    cgst: string;
    sgst: string;
    processingFee: string;
    planAmount: string;
    isChPartCommisionApplicable: string;
    platformFee: string;
    pgCharges: string;
    amountAddOrSub: string;
    totalAmount: string;
    fk_serviceCity: string;
    ProfileStatus: string;
    changeType: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

export const staticSubscriptionAmtDistributionData = [
    {
        id: '1',
        cgst: '5%',
        sgst: '5%',
        processingFee: '$10',
        planAmount: '$100',
        isChPartCommisionApplicable: 'yes',
        platformFee: '$5',
        pgCharges: '$8',
        amountAddOrSub: 'add',
        totalAmount: '$138',
        fk_serviceCity: 'Banglore',
        ProfileStatus: 'false',
        approvedBy: 'Admin',
        changeType: 'Addition',
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
        cgst: '7%',
        sgst: '7%',
        processingFee: '$12',
        planAmount: '$150',
        isChPartCommisionApplicable: 'yes',
        platformFee: '$6',
        pgCharges: '$10',
        amountAddOrSub: 'substract',
        totalAmount: '$205',
        fk_serviceCity: 'Chennai',
        ProfileStatus: 'false',
        changeType: 'Addition',
        approvedBy: 'Manager',
        approvedAt: '2024-01-06T09:30:00Z',
        createdBy: 'User789',
        createdAt: '2024-01-06T08:45:00Z',
        updatedBy: 'UserABC',
        updatedAt: '2024-01-07T11:20:00Z',
    },
    {
        id: '3',
        cgst: '3%',
        sgst: '3%',
        processingFee: '$8',
        planAmount: '$200',
        isChPartCommisionApplicable: 'yes',
        platformFee: '$7',
        pgCharges: '$12',
        amountAddOrSub: 'add',
        totalAmount: '$255',
        fk_serviceCity: 'Mumbai',
        ProfileStatus: 'false',
        changeType: 'Substraction',
        approvedBy: 'Supervisor',
        approvedAt: '2024-01-07T15:00:00Z',
        createdBy: 'UserXYZ',
        createdAt: '2024-01-07T07:30:00Z',
        updatedBy: 'User123',
        updatedAt: '2024-01-08T10:15:00Z',
    },
];

const ViewSubscriptionAmtDistribution = () => {
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [SubscriptionAmtDistData, setSubscriptionAmtDistData] = useState<SubscriptionAmtDistributionData[]>(staticSubscriptionAmtDistributionData);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<SubscriptionAmtDistributionData[]>([]);
    const [recordsData, setRecordsData] = useState<SubscriptionAmtDistributionData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<SubscriptionAmtDistributionData[]>([]);
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

    // date sort
    const handleDateRangeChange = (range: DateRange | null) => {
        setSelectedDateRange(range);
    };

    // Dynamic Data-will use in future
    // useEffect(() => {
    //   dispatch(setPageTitle('View Service Provider'));
    //   const fetchSubscriptionAmtDistData = async () => {
    //     try {
    //       const { data } = await getSubscriptionAmtDistData();
    //       if (data?.ChannelPartners) {
    //         // pk-note: ask backend developer to change the accessor _id:id, remove the following later
    //         const newData = data.ChannelPartners.map(({
    //           _id: id,
    //           ...rest
    //         }) => ({
    //           id,
    //           ...rest
    //         }))
    //         //setSubscriptionAmtDistData(newData);
    //         setSubscriptionAmtDistData(staticSubscriptionAmtDistributionData);
    //       }
    //     } catch (error: any) {
    //       console.error('Error fetching service provider data:', error.message);
    //     }
    //   };
    //   fetchSubscriptionAmtDistData();
    // }, [dispatch]);

    useEffect(() => {
        if (SubscriptionAmtDistData.length > 0) {
            const sortedData = SubscriptionAmtDistData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof SubscriptionAmtDistributionData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [SubscriptionAmtDistData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                cgst = '',
                sgst = '',
                processingFee = '',
                planAmount = '',
                isChPartCommisionApplicable = '',
                platformFee = '',
                amountAddOrSub = '',
                pgCharges = '',
                totalAmount = '',
                fk_serviceCity = '',
                ProfileStatus = '',
                approvedBy = '',
                approvedAt = '',
                createdBy = '',
                createdAt = '',
                updatedBy = '',
                updatedAt = '',
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                cgst?.toLowerCase().includes(searchString) ||
                sgst?.toLowerCase().includes(searchString) ||
                processingFee?.toLowerCase().includes(searchString) ||
                planAmount?.toLowerCase().includes(searchString) ||
                isChPartCommisionApplicable?.toLowerCase().includes(searchString) ||
                platformFee?.toLowerCase().includes(searchString) ||
                amountAddOrSub?.toLowerCase().includes(searchString) ||
                pgCharges?.toLowerCase().includes(searchString) ||
                totalAmount?.toLowerCase().includes(searchString) ||
                fk_serviceCity?.toLowerCase().includes(searchString) ||
                ProfileStatus?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                approvedAt?.toLocaleLowerCase().includes(searchString) ||
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

    const columns: DataTableColumn<SubscriptionAmtDistributionData>[] = [
        {
            accessor: 'actions',
            title: 'Actions',
            // eslint-disable-next-line react/display-name
            render: (rowData) => (
                <div className="flex items-center">
                    {/* <Tippy content="Edit">
                        <button
                            type="button"
                            className="mr-4"
                            onClick={() => {
                                if (rowData && rowData.id) {
                                    const editUrl = `/SubscriptionModule/SubscriptionAmtDistribution/EditSubscriptionAmtDistribution/${rowData.id}`;
                                    navigate(editUrl); // Navigate to the edit page URL
                                }
                            }}
                        >
                            <IconEdit />
                        </button>
                    </Tippy> */}
                    <Tippy content="View Specific">
                        <button
                            type="button"
                            onClick={() => {
                                if (rowData?.id) {
                                    const viewUrl = `/SubscriptionModule/SubscriptionAmtDistribution/ViewSpecificSubscriptionAmtDistribution/${rowData.id}`;
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
        { accessor: 'ProfileStatus', title: 'ProfileStatus', sortable: true },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true },
        { accessor: 'createdBy', title: 'Created By', sortable: true },
        { accessor: 'createdAt', title: 'Created At', sortable: true },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    //will  Use in future

    // const handleRowClick = (row: SubscriptionAmtDistributionData) => {
    //     const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);
    //     let updatedSelectedRecords: SubscriptionAmtDistributionData[] = [];
    //     if (isSelected) {
    //         updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
    //     } else {
    //         updatedSelectedRecords = [...selectedRecords, row];
    //     }
    //     setSelectedRecords(updatedSelectedRecords);
    //     navigate(`/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${row.id}`);
    // };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/SubscriptionModule/SubscriptionAmtDistribution/EditSubscriptionAmtDistribution/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'delete' && selectedRecords.length === 1) {
            if (window.confirm('Do you really want to delete this Subscription Amt Dist?')) {
            }
        } else if (selectedOption === 'updateProfileStatus' && selectedRecords.length >= 1) {
            setModal3(true);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'Admin');
        }
    };

    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<string>(''); // Set the current page here

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to set the current page based on the path
    // const setCurrent = (path: string) => {
    //     setCurrentPage(path);
    // };

    const navItems = [
        {
            label: 'Home',
            to: '/',
            className: '',
        },
        {
            label: 'Subscription Amt Distribution Histroy',
            to: '/SubscriptionModule/SubscriptionAmtDistribution/ViewSubscriptionAmtDistribution',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '/SubscriptionModule/SubscriptionAmtDistribution/ViewSubscriptionAmtDistribution' ? 'text-blue-600' : ''
            }`,
        },
    ];

    const [modal3, setModal3] = useState(false);

    // add update ProfileStatus
    const handleAddUpdateProfileStatus = (selectedProfileStatus: any[], id: string) => {
        successAlert('ProfileStatus Updated Succesfully');
        // handle update ProfileStatus
    };

    return (
        <>
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

            <div className="panel mt-6">
                <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                    {/* <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <Link to="/SubscriptionModule/SubscriptionAmtDistribution/CreateSubscriptionAmtDistribution" className="btn btn-primary block w-full sm:inline-block text-center mt-0">
                            Create Subs. Amt
                        </Link>
                    </div> */}
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
                        <input type="text" className="form-input w-full " placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                        <select id="ctnSelect1" className="form-select text-white-dark" onChange={(e) => handleSelectChange(e.target.value)} required>
                            <option value="">Action Dropdown</option>
                            {/* <option value="edit">Edit</option>

                            <option value="updateProfileStatus">Update ProfileStatus</option> */}
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
                        totalRecords={SubscriptionAmtDistData.length}
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
                <UpdateArchivePopUp event={modal3} closeModal={() => setModal3(false)} onSubmit={handleAddUpdateProfileStatus} />
            </div>
        </>
    );
};

export default ViewSubscriptionAmtDistribution;
