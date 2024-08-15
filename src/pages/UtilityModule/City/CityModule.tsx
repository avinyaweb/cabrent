import CommonPopUp from '@/components/Models/CommonPopUp';
import { getAllCountry } from '@/services/RolesService';
import { getAllStateData } from '@/services/UtilityServices/StateService';
import { DataTableColumn } from 'mantine-datatable';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';

interface CityModuleProps {
    details: {
        fk_stateOrProvince: string;
        cityName: string;
        archive: string;
        remark: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific: boolean;
    isEdit: boolean;
}

const CityModule: React.FC<CityModuleProps> = ({ details, onInputChange, showStatus = true, viewSpecific, isEdit }) => {
    const [moduleDetails, setModuleDetails] = useState(details);
    const [state, setState] = useState(details.fk_stateOrProvince);
    const [stateOption, setStateOption] = useState<any[]>([]);
    const [value, setValue] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setModuleDetails({ ...moduleDetails, [name]: value });
        onInputChange(event); // Pass the event to the parent component
    };

    // handle states
    const handleState = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setState(value);
        onInputChange({
            target: {
                name: 'fk_stateOrProvince',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    // Fleet Owner Popup Table -------------->>
    const [modal, setModal] = useState(false);
    const [fk_StateData, setfk_StateData] = useState<any[]>([]);
    const [fk_StateType, setfk_StateType] = useState<any>();
    const [allStateData, setAllStateData] = useState<any[]>([]);
    // popup service city
    const handlefk_StateSubmit = (selectedfk_State: any[], id: string) => {
        setfk_StateData(selectedfk_State);
        setfk_StateType(id);
    };
    const fk_StateColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID' },
        { accessor: 'fk_country', title: 'Country Name' },
        { accessor: 'stateName', title: 'State Name' },
        { accessor: 'archive', title: 'Status (Archive)' },
    ];
    // Dynamic Data
    useEffect(() => {
        const fetchAdminStatesData = async () => {
            try {
                const { data } = await getAllStateData();
                if (data?.States) {
                    const newData = data.States.map(({ _id: id, ...rest }: { _id: string }) => ({
                        id,
                        ...rest,
                    }));
                    setAllStateData(newData);
                }
            } catch (error: any) {
                console.error('Error fetching admin data:', error.message);
            }
        };
        fetchAdminStatesData();
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                {/* <div className="lg:w-1/3">
                    <label htmlFor="fk_State" className="block mb-1">
                        Country Name
                    </label>
                    {viewSpecific ? (
                        <input name="fk_State" type="text" id="fk_State" className="form-input w-full pointer-events-none" value={details?.fk_State} readOnly />
                    ) : (
                        <select id="fk_State" name="fk_State" className="form-select text-white-dark" required value={details?.fk_State} onChange={handleCountryfk_State}>
                            <option value="">Select Country</option>
                            {countryOption?.map((data) => {
                                return <option value={data?._id}>{data?.countryName}</option>;
                            })}
                        </select>
                    )}
                </div> */}

                <div className={`${viewSpecific ? `lg:w-1/3` : `lg:w-1/2`}`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_State" className="block mb-1">
                            State Name
                        </label>
                        {viewSpecific && (
                            <Link to={'/UtilityModule/State/ViewSpecificState/65e7541620e462ec13040530'}>
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
                            value={details.fk_stateOrProvince}
                            readOnly
                        />
                    ) : isEdit ? (
                        <div>
                            {fk_StateType === 'state' ? (
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
                                        value={details.fk_stateOrProvince}
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
                            {fk_StateType === 'state' ? (
                                <button type="button" onClick={() => setModal(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <button type="button" onClick={() => setModal(true)} className="btn btn-primary w-full">
                                    Add State
                                </button>
                            )}
                        </div>
                    )}
                    <CommonPopUp title={'State'} columns={fk_StateColumns} data={allStateData} event={modal} closeModal={() => setModal(false)} onSubmit={handlefk_StateSubmit} />
                </div>

                <div className={`${viewSpecific ? `lg:w-1/3` : `lg:w-1/2`}`}>
                    <label htmlFor="cityName" className="block mb-1">
                        City Name
                    </label>
                    {viewSpecific ? (
                        <input name="cityName" type="text" id="cityName" placeholder="Enter City Name" className="form-input w-full pointer-events-none" value={details?.cityName} readOnly />
                    ) : (
                        <input name="cityName" type="text" id="cityName" placeholder="Enter City Name" className="form-input w-full" value={details?.cityName} onChange={onInputChange} />
                    )}
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

export default CityModule;
