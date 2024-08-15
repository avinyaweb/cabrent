import CommonPopUp from '@/components/Models/CommonPopUp';
import { getAllCountry } from '@/services/RolesService';
import { getAllCountries } from '@/services/UtilityServices/CountryServices';
import { DataTableColumn } from 'mantine-datatable';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';

interface StateModuleProps {
    details: {
        fk_country: string;
        stateName: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific: boolean;
    isEditPage: boolean;
}

const StateModule: React.FC<StateModuleProps> = ({ details, onInputChange, showStatus = true, viewSpecific, isEditPage }) => {
    const [moduleDetails, setModuleDetails] = useState(details);
    const [value, setValue] = useState('');
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setModuleDetails({ ...moduleDetails, [name]: value });
        onInputChange(event); // Pass the event to the parent component
    };

    useEffect(() => {
        const getAllCountryData = async () => {
            try {
                const data = await getAllCountry();
                setModuleDetails(data?.data?.Countries);
            } catch (error) {
                console.log(error);
            }
        };
        getAllCountryData();
    }, []);

    // Fleet Owner Popup Table -------------->>
    const [modal, setModal] = useState(false);
    const [fk_CountryData, setfk_CountryData] = useState<any[]>([]);
    const [fk_CountryType, setfk_CountryType] = useState<any>();
    const [countryData, setCountryData] = useState<any[]>([]);
    // popup service city
    const handlefk_CountrySubmit = (selectedfk_Country: any[], id: string) => {
        setfk_CountryData(selectedfk_Country);
        setfk_CountryType(id);
    };
    const fk_CountryColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID' },
        { accessor: 'countryName', title: 'Country Name' },
        { accessor: 'currencyName', title: 'Currency Name' },
        { accessor: 'countryCode', title: 'Country Code' },
        { accessor: 'currencyCode', title: 'Currency Code' },
        { accessor: 'phoneCode', title: 'Phone Code' },
        { accessor: 'archive', title: 'Status (Archive)' },
    ];
    // Dynamic Data
    useEffect(() => {
        const fetchAdminTeamsData = async () => {
            try {
                const { data } = await getAllCountries();
                if (data?.Countries) {
                    const newData = data.Countries.map(({ _id: id, ...rest }: { _id: string }) => ({
                        id,
                        ...rest,
                    }));
                    setCountryData(newData);
                }
            } catch (error: any) {
                console.error('Error fetching admin data:', error.message);
            }
        };
        fetchAdminTeamsData();
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className={`${viewSpecific ? `lg:w-1/3` : `lg:w-1/2`}`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_country" className="block mb-1">
                            Country Name
                        </label>
                        {viewSpecific && (
                            <Link to={'/UtilityModule/Country/ViewSpecificCountry/6582d30a69eee3bb44e635f7'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto" />
                            </Link>
                        )}
                    </div>
                    {viewSpecific ? (
                        <input
                            name="fleetManagementType"
                            type="text"
                            id="fleetManagementType"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            value={details.fk_country}
                            readOnly
                        />
                    ) : isEditPage ? (
                        <div>
                            {fk_CountryType === 'country' ? (
                                <button type="button" onClick={() => setModal(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <div className="flex">
                                    <input
                                        name="fleetManagementType"
                                        type="text"
                                        id="fleetManagementType"
                                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                        value={details.fk_country}
                                        readOnly
                                    />
                                    <button type="button" onClick={() => setModal(true)} className="btn btn-primary w-1/3">
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {fk_CountryType === 'country' ? (
                                <button type="button" onClick={() => setModal(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <button type="button" onClick={() => setModal(true)} className="btn btn-primary w-full">
                                    Add Country
                                </button>
                            )}
                        </div>
                    )}
                    <CommonPopUp title={'Country'} columns={fk_CountryColumns} data={countryData} event={modal} closeModal={() => setModal(false)} onSubmit={handlefk_CountrySubmit} />
                </div>

                <div className={`${viewSpecific ? `lg:w-1/3` : `lg:w-1/2`}`}>
                    <label htmlFor="stateName" className="block mb-1">
                        State Name
                    </label>
                    <input
                        name="stateName"
                        type="text"
                        id="stateName"
                        placeholder="Enter State Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        readOnly={viewSpecific}
                        value={details?.stateName}
                        onChange={onInputChange}
                    />
                </div>

                {
                    showStatus ? ( // Conditionally rendering based on the showStatus prop
                        <div className="lg:w-1/3">
                            <label htmlFor="status" className="block mb-1">
                                Status
                            </label>
                            {viewSpecific ? (
                                <input
                                    name="status"
                                    type="text"
                                    id="status"
                                    className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                    value={details.archive}
                                    onChange={onInputChange}
                                />
                            ) : (
                                <select id="status" className="form-select text-white-dark" required>
                                    <option value="">Select your Status</option>
                                    <option value={'PENDING'}>PENDING</option>
                                    <option value={'APPROVED'}>APPROVED</option>
                                    <option value={'REJECTED'}>REJECTED</option>
                                    <option value={'HOLD'}>HOLD</option>
                                    <option value={'SUSPENDED'}>SUSPENDED</option>
                                </select>
                            )}
                        </div>
                    ) : null // Empty div when showStatus is false
                }
            </div>

            <div className="mt-6 mb-12">
                <label htmlFor="planDescription" className="block mb-1 text-md font-bold">
                    Remarks
                </label>
                {viewSpecific ? (
                    <div className=" w-1/2 border rounded-md text-start h-28 pointer-events-none">
                        <p className="m-2 ">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quaerat dolorem corporis numquam dolorum repellat dignissimos consectetur perspiciatis in, aliquam tenetur
                            cupiditate veniam aliquid impedit odit repudiandae asperiores nam soluta
                        </p>
                    </div>
                ) : (
                    <ReactQuill theme="snow" value={value} onChange={setValue} className={`h-24 w-1/2 ${viewSpecific ? 'pointer-events-none' : ''}`} />
                )}
            </div>
        </>
    );
};

export default StateModule;
