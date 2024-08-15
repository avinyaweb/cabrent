import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataTable, DataTableSortStatus, DataTableColumn } from 'mantine-datatable';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';
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

interface MoneyRequestData {
    id: string;
    moneyRequestType: string;
    amount: string;
    fk_toPerson: string;
    fk_fromPerson: string;
    remarks: string;
    archive: string;
    approvedBy: string;
    approvedAt: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    transactionType: string;
    fk_pgTransactionHistoryId: string;
    fk_walletHistoryId: string;
    transactionStatus: string;
    paidToReference: string;
    paidByReference: string;
    paymentType: string;
    transactionMode: string;
    paidToRefrenceType: string;
    paidByRefrenceType: string;
    transactionAmount: string;
    userName: string;
}

export const staticMoneyRequestData = [
    {
        id: '1',
        moneyRequestType: 'send',
        amount: '100.00',
        fk_toPerson: 'John Doe',
        fk_fromPerson: 'Alice Smith',
        remarks: 'Reimbursement for office supplies',
        archive: 'Approved',
        transactionType: 'BANK',
        fk_pgTransactionHistoryId: '150',
        fk_walletHistoryId: 'Wallet888',
        transactionStatus: 'PENDING',
        paidToReference: 'RecipientABC',
        paidByReference: 'PayerXYZ',
        paymentType: 'Direct',
        transactionMode: 'Online',
        paidToRefrenceType: 'BANK',
        paidByRefrenceType: 'WALLET',
        transactionAmount: '$1000',
        userName: 'user123',
        approvedBy: 'ManagerXYZ',
        approvedAt: '2024-01-06T12:00:00Z',
        createdBy: 'Admin123',
        createdAt: '2024-01-05T09:30:00Z',
        updatedBy: 'Admin123',
        updatedAt: '2024-01-06T13:45:00Z',
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
        moneyRequestType: 'receive',
        amount: '250.50',
        fk_toPerson: 'Alice Smith',
        fk_fromPerson: 'Jane Doe',
        remarks: 'Payment for freelance work',
        archive: 'Hold',
        approvedBy: 'ManagerABC',
        approvedAt: '2024-01-07T10:15:00Z',
        createdBy: 'Admin456',
        createdAt: '2024-01-06T14:00:00Z',
        updatedBy: 'Admin456',
        updatedAt: '2024-01-07T11:30:00Z',
        transactionType: 'WALLET',
        fk_pgTransactionHistoryId: '100',
        fk_walletHistoryId: 'Wallet123',
        transactionStatus: 'SUCCESS',
        paidToReference: 'RecipientABC',
        paidByReference: 'PayerXYZ',
        paymentType: 'Direct',
        transactionMode: 'Online',
        paidToRefrenceType: 'BANK',
        paidByRefrenceType: 'WALLET',
        transactionAmount: '$1000',
        userName: 'user123',
    },
];

const ViewRequestMoney = () => {
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [moneyRequestData, setMoneyRequestData] = useState<MoneyRequestData[]>(staticMoneyRequestData);
    const [modal3, setModal3] = useState(false);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<MoneyRequestData[]>([]);
    const [recordsData, setRecordsData] = useState<MoneyRequestData[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<MoneyRequestData[]>([]);
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
    //   dispatch(setPageTitle('View Money Request'));

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
    //         setMoneyRequestData(staticMoneyRequestData);
    //       }
    //     } catch (error: any) {
    //       console.error('Error fetching Money Request data:', error.message);
    //     }
    //   };
    //   fetchChannelPartnerData();
    // }, [dispatch]);

    useEffect(() => {
        if (moneyRequestData.length > 0) {
            const sortedData = moneyRequestData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof MoneyRequestData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [moneyRequestData, sortStatus, pageSize]);

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const {
                id = '',
                moneyRequestType = '',
                amount = '',
                fk_toPerson = '',
                fk_fromPerson = '',
                remarks = '',
                archive = '',
                approvedBy = '',
                approvedAt = '',
                createdBy = '',
                createdAt = '',
                updatedBy = '',
                updatedAt = '',
                transactionType = '',
                fk_pgTransactionHistoryId = '',
                fk_walletHistoryId = '',
                transactionStatus = '',
                paidToReference = '', // Added new field
                paidByReference = '', // Added new field
                paymentType = '', // Added new field
                transactionMode = '', // Added new field
                paidToRefrenceType = '', // Added new field
                paidByRefrenceType = '', // Added new field
                transactionAmount = '', // Added new field
                userName = '', // Added new field
            } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase

            return (
                id?.toLowerCase().includes(searchString) ||
                moneyRequestType?.toLowerCase().includes(searchString) ||
                amount?.toLowerCase().includes(searchString) ||
                fk_toPerson?.toLowerCase().includes(searchString) ||
                fk_fromPerson?.toLowerCase().includes(searchString) ||
                remarks?.toLowerCase().includes(searchString) ||
                archive?.toLowerCase().includes(searchString) ||
                approvedBy?.toLowerCase().includes(searchString) ||
                approvedAt?.toLowerCase().includes(searchString) ||
                createdBy?.toLowerCase().includes(searchString) ||
                createdAt?.toLowerCase().includes(searchString) ||
                updatedBy?.toLowerCase().includes(searchString) ||
                updatedAt?.toLowerCase().includes(searchString) ||
                transactionType?.toLowerCase().includes(searchString) ||
                fk_pgTransactionHistoryId?.toLowerCase().includes(searchString) ||
                fk_walletHistoryId?.toLowerCase().includes(searchString) ||
                transactionStatus?.toLowerCase().includes(searchString) ||
                paidToReference?.toLowerCase().includes(searchString) || // Added condition
                paidByReference?.toLowerCase().includes(searchString) || // Added condition
                paymentType?.toLowerCase().includes(searchString) || // Added condition
                transactionMode?.toLowerCase().includes(searchString) || // Added condition
                paidToRefrenceType?.toLowerCase().includes(searchString) || // Added condition
                paidByRefrenceType?.toLowerCase().includes(searchString) || // Added condition
                transactionAmount?.toLowerCase().includes(searchString) || // Added condition
                userName?.toLowerCase().includes(searchString) // Added condition
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

    const columns: DataTableColumn<MoneyRequestData>[] = [
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
                                    const viewUrl = `/WalletModule/InternerUserTransaction/RequestMoney/ViewSpecificRequestMoney/1`;
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
        { accessor: 'moneyRequestType', title: 'Money Request Type', sortable: true, hidden: hiddenColumns.includes('moneyRequestType') },
        { accessor: 'amount', title: 'Amount', sortable: true, hidden: hiddenColumns.includes('amount') },
        { accessor: 'fk_toPerson', title: 'To Person', sortable: true, hidden: hiddenColumns.includes('fk_toPerson') },
        { accessor: 'fk_fromPerson', title: 'From Person', sortable: true, hidden: hiddenColumns.includes('fk_fromPerson') },
        { accessor: 'remarks', title: 'Remarks', sortable: true, hidden: hiddenColumns.includes('remarks') },
        { accessor: 'archive', title: 'Update Profile Status', sortable: true, hidden: hiddenColumns.includes('archive') },
        { accessor: 'approvedBy', title: 'Approved By', sortable: true, hidden: hiddenColumns.includes('approvedBy') },
        { accessor: 'approvedAt', title: 'Approved At', sortable: true, hidden: hiddenColumns.includes('approvedAt') },
        { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hiddenColumns.includes('createdBy') },
        { accessor: 'createdAt', title: 'Created At', sortable: true, hidden: hiddenColumns.includes('createdAt') },
        { accessor: 'updatedBy', title: 'Updated By', sortable: true, hidden: hiddenColumns.includes('updatedBy') },
        { accessor: 'updatedAt', title: 'Updated At', sortable: true, hidden: hiddenColumns.includes('updatedAt') },
        { accessor: 'transactionType', title: 'Transaction Type', sortable: true, hidden: hiddenColumns.includes('transactionType') },
        { accessor: 'fk_pgTransactionHistoryId', title: 'PG Transaction', sortable: true, hidden: hiddenColumns.includes('fk_pgTransactionHistoryId') },
        { accessor: 'fk_walletHistoryId', title: 'Wallet Master', sortable: true, hidden: hiddenColumns.includes('fk_walletHistoryId') },
        { accessor: 'transactionStatus', title: 'Transaction Status', sortable: true, hidden: hiddenColumns.includes('transactionStatus') },
        // New Fields
        { accessor: 'paidToReference', title: 'Paid To Reference', sortable: true, hidden: hiddenColumns.includes('paidToReference') },
        { accessor: 'paidByReference', title: 'Paid By Reference', sortable: true, hidden: hiddenColumns.includes('paidByReference') },
        { accessor: 'paymentType', title: 'Payment Type', sortable: true, hidden: hiddenColumns.includes('paymentType') },
        { accessor: 'transactionMode', title: 'Transaction Mode', sortable: true, hidden: hiddenColumns.includes('transactionMode') },
        { accessor: 'paidToRefrenceType', title: 'Paid To Reference Type', sortable: true, hidden: hiddenColumns.includes('paidToRefrenceType') },
        { accessor: 'paidByRefrenceType', title: 'Paid By Reference Type', sortable: true, hidden: hiddenColumns.includes('paidByRefrenceType') },
        { accessor: 'transactionAmount', title: 'Transaction Amount', sortable: true, hidden: hiddenColumns.includes('transactionAmount') },
        { accessor: 'userName', title: 'User Name', sortable: true, hidden: hiddenColumns.includes('userName') },
    ];

    const sortedData = recordsData; // Replace this with your sorting logic

    // const handleRowClick = (row: MoneyRequestData) => {
    //     const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);
    //     let updatedSelectedRecords: MoneyRequestData[] = [];
    //     if (isSelected) {
    //         updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
    //     } else {
    //         updatedSelectedRecords = [...selectedRecords, row];
    //     }
    //     setSelectedRecords(updatedSelectedRecords);
    //     // Redirect to view specific page upon row click
    //     navigate(`/AdminModule/ChannelPartner/ViewSpecificChannelPartner/${row.id}`);
    // };

    // add update archive
    const handleAddUpdateArchive = (selectedArchive: any[], id: string) => {
        successAlert('Archive Updated Succesfully');
        // handle update archive
    };

    // Handle changes in the "Admin Actions" dropdown
    const handleSelectChange = (selectedOption: string) => {
        if (selectedOption === 'edit' && selectedRecords.length === 1) {
            const editUrl = `/TransactionModule/MoneyRequest/EditMoneyRequest/${selectedRecords[0].id}`;
            navigate(editUrl);
        } else if (selectedOption === 'updateArchive' && selectedRecords.length >= 1) {
            setModal3(true);
        } else if (selectedOption === 'export' && selectedRecords.length >= 1) {
            downloadExcel(selectedRecords, 'MoneyRequest');
        } else {
            toast.error('Please Select from Table.');
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
            label: ' Request Money',
            to: '',
            className: `before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4 sm:mb-0 whitespace-nowrap sm:whitespace-normal ${
                currentPath === '' ? 'text-blue-600' : ''
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
            <Breadcrumb navItems={navItems} currentPage={currentPath} setCurrent={setCurrentPage} />

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
                                        <button
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
                                        </button>
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
                        totalRecords={moneyRequestData.length}
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
                <UpdateArchivePopUp event={modal3} closeModal={() => setModal3(false)} onSubmit={handleAddUpdateArchive} />
            </div>
        </>
    );
};

export default ViewRequestMoney;
