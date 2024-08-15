import { IRootState } from '@/store';
import { Dialog, Transition } from '@headlessui/react';
import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import IconCaretDown from '../Icon/IconCaretDown';
import Dropdown from '../Dropdown';

interface ICommonPopup<T> {
    title: string;
    columns: DataTableColumn<T>[];
    data: T[];
    event: boolean;
    closeModal: any;
    onSubmit: any;
}

const CommonPopUp = <T,>({ title, columns, data, event, closeModal, onSubmit }: ICommonPopup<T>) => {
    // future code -->>
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
    };

    const handleSortChange = (newSortStatus: DataTableSortStatus) => {
        setSortStatus(newSortStatus);
    };

    // search
    const filteredData = data.filter((item: any) => Object.values(item).some((value) => (typeof value === 'string' ? value.toLowerCase().includes(searchTerm.toLowerCase()) : false)));

    // sort
    const sortedData = filteredData.slice().sort((a, b) => {
        const accessor = sortStatus.columnAccessor as keyof T;
        if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
        if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

    // handle Add functions
    const handleAddSubmit = async () => {
        try {
            const addedItems = [];
            const userID = title.toLowerCase();
            for (let i = 0; i < selectedRecords.length; i++) {
                addedItems.push(selectedRecords[i]?.id);
            }
            await onSubmit(addedItems, userID);
            closeModal();
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div className="mb-5">
            <div className="flex items-center justify-center gap-2">
                <div>
                    <Transition appear show={event} as={Fragment}>
                        <Dialog as="div" open={event} onClose={closeModal}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0" />
                            </Transition.Child>
                            <div className="fixed inset-0 bg-[black]/60 z-[999]">
                                <div className="flex items-center justify-center min-h-screen px-4">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-5xl my-8 text-black dark:text-white-dark">
                                            <h1 className="text-2xl mt-2 p-5 font-bold text-center">{title}</h1>
                                            <div>
                                                <div className="grid grid-cols-1 sm:flex justify-between gap-5 px-5 mt-2">
                                                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                                                        <label htmlFor="fk_serviceCity" className="block mb-1 text-sm">
                                                            Columns
                                                        </label>
                                                        <div className="dropdown">
                                                            {/* Dropdown content */}
                                                            <Dropdown
                                                                placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                                                btnClassName="w-full !flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                                                button={
                                                                    <>
                                                                        <span className="ltr:mr-1 rtl:ml-1">Choose Columns</span>
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
                                                                            // onClick={(e) => {
                                                                            //     e.stopPropagation();
                                                                            // }}
                                                                        >
                                                                            <div className="flex items-center px-4 py-1">
                                                                                <label className="cursor-pointer mb-0">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        // checked={!hiddenColumns.includes(col.accessor)}
                                                                                        className="form-checkbox"
                                                                                        defaultValue={col.accessor}
                                                                                        // onChange={() => toggleColumnVisibility(col.accessor)}
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
                                                        <label htmlFor="fk_serviceCity" className="block mb-1 text-sm">
                                                            Date sort
                                                        </label>
                                                        <DateRangePicker placeholder="Select Date Range" className="cursor-pointer" />
                                                    </div>
                                                    {/* <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                                                        <label htmlFor="fk_serviceCity" className="block mb-1 text-sm">
                                                            Actions
                                                        </label>
                                                        <select id="ctnSelect1" className="form-select text-white-dark">
                                                            <option value="">Action Dropdown</option>
                                                            <option value="edit">Edit</option>
                                                            <option value="delete">Delete</option>
                                                        </select>
                                                    </div> */}

                                                    <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                                                        <label htmlFor="fk_serviceCity" className="block mb-1 text-sm">
                                                            Search
                                                        </label>

                                                        <input type="text" className="form-input w-full" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="overflow-x-auto">
                                                    <div className="panel">
                                                        <div className="datatables">
                                                            <DataTable
                                                                className="whitespace-nowrap table-hover lg:h-[300px] h-[200]"
                                                                records={paginatedData}
                                                                columns={columns}
                                                                page={page}
                                                                highlightOnHover
                                                                totalRecords={data?.length}
                                                                onPageChange={handlePageChange}
                                                                recordsPerPage={pageSize}
                                                                onRecordsPerPageChange={handlePageSizeChange}
                                                                sortStatus={sortStatus}
                                                                onSortStatusChange={handleSortChange}
                                                                selectedRecords={selectedRecords}
                                                                onSelectedRecordsChange={(selectedRows) => setSelectedRecords(selectedRows)}
                                                                paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                                                                recordsPerPageOptions={[5, 10, 15, 20]}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-5">
                                                    <div className="flex justify-end items-center gap-5">
                                                        <button onClick={closeModal} type="button" className="btn btn-outline-danger">
                                                            Discard
                                                        </button>
                                                        <button type="button" className="btn btn-primary" onClick={handleAddSubmit}>
                                                            Add
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            </div>
        </div>
    );
};

export default CommonPopUp;
