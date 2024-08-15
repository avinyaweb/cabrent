import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import IconEye from './Icon/IconEye';
import Tippy from '@tippyjs/react';
import { getAdminTicketsData } from '@/services/AdminTicketsService';
import { IRootState } from '@/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import IconCaretDown from './Icon/IconCaretDown';
import { getAdminData } from '@/services/AdminService';
import { assignTeamToMultipleAdmin, getAdminListData } from '@/services/AdminTeamsService';
import toast from 'react-hot-toast';

interface AddTicketModalProps {
    adminTeamsId: string;
    id: any;
}

const AddTicketModal: React.FC<AddTicketModalProps> = ({ adminTeamsId, id }) => {
    interface AdminData {
        id: string;
        firstName: string;
        email: string;
        fk_serviceCity: string;
        fk_roleType: string;
    }

    const navigate = useNavigate();

    // State to manage hidden columns
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [hiddenColumns, setHiddenColumns] = useState<string[]>(['reportsTo', 'teamManager', 'fk_serviceCity', 'Remarks']);
    const [AdminData, setAdminData] = useState<AdminData[]>([]);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<AdminData[]>([]);
    const [recordsData, setRecordsData] = useState<AdminData[]>([]);
    const [search, setSearch] = useState('');
    const [selectedRecords, setSelectedRecords] = useState<AdminData[]>([]);

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

    useEffect(() => {
        if (AdminData.length > 0) {
            const sortedData = AdminData.slice().sort((a, b) => {
                const accessor = sortStatus.columnAccessor as keyof AdminData;
                if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
                if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
                return 0;
            });
            setInitialRecords(sortedData);
            setRecordsData(sortedData.slice(0, pageSize));
        }
    }, [AdminData, sortStatus, pageSize]);

    const sortedData = recordsData;

    const handleRowClick = (row: AdminData) => {
        const isSelected = selectedRecords.some((selectedRow) => selectedRow.id === row.id);

        let updatedSelectedRecords: AdminData[] = [];

        if (isSelected) {
            updatedSelectedRecords = selectedRecords.filter((selectedRow) => selectedRow.id !== row.id);
        } else {
            updatedSelectedRecords = [...selectedRecords, row];
        }

        setSelectedRecords(updatedSelectedRecords);

        // Redirect to view specific page upon row click
        navigate(`/AdminModule/Admin/ViewSpecificAdmin/${row.id}`);
    };

    // Dynamic Data
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const { data } = await getAdminData(page, pageSize);
                if (data?.admins) {
                    const newData = data.admins.map(({ _id: id, ...rest }: { _id: string; [key: string]: any }) => ({
                        id,
                        ...rest,
                    }));
                    const filteredData = newData.filter((admin: any) => !admin.fk_adminTeam || admin.fk_adminTeam !== adminTeamsId);
                    setAdminData(filteredData);
                }
            } catch (error: any) {
                console.error('Error fetching admin data:', error.message);
            }
        };
        fetchAdminData();
    }, []);

    const columns: DataTableColumn<AdminData>[] = [
        { accessor: 'firstName', title: 'first Name', sortable: true, hidden: hiddenColumns.includes('firstName') },
        { accessor: 'email', title: 'email', sortable: true, hidden: hiddenColumns.includes('email') },
        { accessor: 'fk_serviceCity', title: 'serviceCity', sortable: true, hidden: hiddenColumns.includes('fk_serviceCity') },
        { accessor: 'fk_roleType', title: 'roleType', sortable: true, hidden: hiddenColumns.includes('fk_roleType') },
    ];

    useEffect(() => {
        const filteredData = initialRecords.filter((item) => {
            const { firstName = '', email = '', fk_serviceCity = '', fk_roleType = '' } = item || {};

            const searchString = search ? search.toLowerCase() : ''; // Ensure search is defined and convert to lowercase
            return (
                firstName?.toLowerCase().includes(searchString) ||
                email?.toLowerCase().includes(searchString) ||
                fk_serviceCity?.toLowerCase().includes(searchString) ||
                fk_roleType?.toLowerCase().includes(searchString)
            );
        });

        setRecordsData(filteredData.slice(0, pageSize));
    }, [search, initialRecords, pageSize]);

    const handleSubmit = async () => {
        try {
            const adminMasterId = [];
            for (let i = 0; i < selectedRecords.length; i++) {
                adminMasterId.push(selectedRecords[i]?.id);
            }
            const response = await assignTeamToMultipleAdmin(adminTeamsId, adminMasterId);
            if (response?.message) {
                toast.success(response.message);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <>
            <dialog id={id} className="modal w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/3 xl:w-1/2 rounded-xl ">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl mb-4 text-center">Add Admin</h3>
                    <div className="modal-action">
                        <form method="dialog">
                            <div className="overflow-x-auto h-[400px]">
                                <div className="mt-10">
                                    <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                                        <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                                            <div className="lg:w-1/4 sm:w-full mb-4 sm:mb-0">
                                                <input type="text" className="form-input w-full sm:w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <DataTable
                                            columns={columns}
                                            minHeight={200}
                                            highlightOnHover
                                            records={sortedData}
                                            totalRecords={AdminData.length}
                                            recordsPerPage={pageSize}
                                            page={page}
                                            sortStatus={sortStatus}
                                            onSortStatusChange={setSortStatus}
                                            onPageChange={(p) => setPage(p)}
                                            recordsPerPageOptions={PAGE_SIZES}
                                            onRecordsPerPageChange={setPageSize}
                                            selectedRecords={selectedRecords}
                                            onSelectedRecordsChange={(selectedRows) => setSelectedRecords(selectedRows)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    className="btn mr-2 bg-blue-700 text-white"
                                    onClick={handleSubmit}
                                    disabled={selectedRecords.length === 0} // Disable the button if no admins are selected
                                >
                                    Add
                                </button>
                                <button type="button" className="btn btn-secondary">
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default AddTicketModal;
