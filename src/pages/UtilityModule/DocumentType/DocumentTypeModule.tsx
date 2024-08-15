import React, { useState, ChangeEvent } from 'react';
import ServiceCity from '@/pages/AdminModule/AdminTeams/ServiceCity';
import { DataTableColumn } from 'mantine-datatable';
import { Link } from 'react-router-dom';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import CommonPopUp from '@/components/Models/CommonPopUp';
import { staticServiceCityData } from '../ServiceCity/ViewServiceCity';
import Select from 'react-select';
import { IoAddSharp } from 'react-icons/io5';
import { IoCloseCircle } from 'react-icons/io5';

interface ModuleMasterModuleProps {
    details: {
        id: string;
        documentName: string;
        documentType: string;
        documentForModule: string;
        documentCondition: string;
        archive: string;
        fk_serviceCity: string;
        userType: string;
    };
    onInputChange?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
    isEditPage: boolean;
}

interface NewFieldEntry {
    id: number;
    value: string;
    type: string;
}

interface NewDocumentField {
    id: number;
    value: string;
}

const ModuleMasterModule: React.FC<ModuleMasterModuleProps> = ({ details, onInputChange, showStatus = true, viewSpecific, isEditPage }) => {
    const [moduleDetails, setModuleDetails] = useState(details);

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     const { name, value } = event.target as HTMLInputElement; // Type assertion
    //     setModuleDetails({ ...moduleDetails, [name]: value });
    //     onInputChange(event); // Pass the event to the parent component
    // };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target as HTMLInputElement; // Type assertion
        setModuleDetails({ ...moduleDetails, [name]: value });
        if (onInputChange) {
            onInputChange(event); // Pass the event to the parent component
        }
    };

    const handleCitySelection = (selectedCities: any) => {
        // Convert the selectedCities array of objects into a comma-separated string of city values
        const cityValues = selectedCities.map((city: any) => city.value).join(',');

        // Update the details or perform any other necessary actions with the city values
        setModuleDetails({ ...moduleDetails, fk_serviceCity: cityValues });
    };

    // Fleet Owner Popup Table -------------->>
    const [modal2, setmodal2] = useState(false);
    const [fk_serviceCityData, setfk_serviceCityData] = useState<any[]>([]);
    const [fk_serviceCityType, setfk_serviceCityType] = useState<any>();
    // popup service city
    const handleAddfk_serviceCitySubmit = (selectedfk_serviceCity: any[], id: string) => {
        setfk_serviceCityData(selectedfk_serviceCity);
        setfk_serviceCityType(id);
    };

    const fk_serviceCityColumns: DataTableColumn<any>[] = [
        { accessor: 'id', title: 'ID' },
        { accessor: 'country', title: 'country' },
        { accessor: 'state', title: 'state' },
        { accessor: 'city', title: 'city' },
        { accessor: 'dailyReqRadius', title: 'Daily Req Radius' },
        { accessor: 'rentalReqRadius', title: 'Rental Req Radius' },
        { accessor: 'outstationReqRadius', title: 'Outstation Req Radius' },
        { accessor: 'cityCentreLat', title: 'City Centre Lat' },
        { accessor: 'cityCentreLong', title: 'City Centre Long' },
        { accessor: 'cityBoundary', title: 'City Boundary' },
        { accessor: 'archive', title: 'Archive' },
    ];

    const options5 = [
        { value: 'PDF', label: 'PDF' },
        { value: 'JPEG', label: 'JPEG' },
        { value: 'XML', label: 'XML' },
        { value: 'PNG', label: 'PNG' },
    ];

    //testing

    const [newField, setNewFields] = useState<NewFieldEntry[]>([{} as any]);

    const handleNewFieldChange = (id: number, newValue: string) => {
        const updatedNewFieldList = newField.map((entry) => {
            if (entry.id === id) {
                return { ...entry, value: newValue };
            }
            return entry;
        });
        setNewFields(updatedNewFieldList);
    };

    const addNewField = () => {
        const newInputField: NewFieldEntry = { id: newField.length + 1, value: '', type: 'text' };
        const updatedInputField = [...newField, newInputField];
        setNewFields(updatedInputField);
    };

    const removeNewField = (id: number) => {
        const updatedNewFieldList = newField.filter((entry) => entry.id !== id);
        setNewFields(updatedNewFieldList);
    };

    const handleTypeChange = (id: number, newType: string) => {
        const updatedNewFieldList = newField.map((entry) => {
            if (entry.id === id) {
                return { ...entry, type: newType };
            }
            return entry;
        });
        setNewFields(updatedNewFieldList);
    };

    //set up for add input for document creation:

    const [documentFields, setDocumentFields] = useState<NewDocumentField[]>([{} as any]);

    const handleDocumentFieldChange = (id: number, newValue: string) => {
        const updatedDocumentFieldList = documentFields.map((field) => {
            if (field.id === id) {
                return { ...field, value: newValue };
            }
            return field;
        });
        setDocumentFields(updatedDocumentFieldList);
    };

    const addDocumentField = () => {
        const newDocumentField: NewDocumentField = { id: documentFields.length + 1, value: '' };
        const updatedDocumentFieldList = [...documentFields, newDocumentField];
        setDocumentFields(updatedDocumentFieldList);
    };

    const removeDocumentField = (id: number) => {
        const updatedDocumentFieldList = documentFields.filter((field) => field.id !== id);
        setDocumentFields(updatedDocumentFieldList);
    };

    const moduleOptions = [
        { value: 'ADMIN', label: 'Admin' },
        { value: 'BUSINESS_PROFILE', label: 'Business Profile' },
        { value: 'COMMUNITY', label: 'Community' },
    ];

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="documentName" className="block mb-1">
                        Document Name
                    </label>
                    <input
                        name="documentName"
                        type="text"
                        id="documentName"
                        placeholder="Enter Document Name"
                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                        // value={details?.documentName}
                        value={viewSpecific ? 'Aadar card' : details?.documentName}
                        onChange={handleInputChange}
                    />
                </div>

                {/* <div className="lg:w-1/3">
                    <label htmlFor="documentType" className="block mb-1">
                        Document Type
                    </label>
                        <input
                            name="documentType"
                            placeholder="Select"
                            type="text"
                            id="documentType"
                            className="form-input w-full pointer-events-none"
                            // value={moduleDetails.documentType}
                            value={'Type 1'}
                            readOnly
                        />
                  
                </div>


                <div className="lg:w-1/3">
                <label htmlFor="documentType" className="block mb-1">
                        Document Type
                    </label>
                        <div className="mb-5">
                            <Select placeholder="Select an option" options={options5} isMulti isSearchable={false} />
                        </div>
                        
                    </div> */}

                <div className="lg:w-1/3">
                    {viewSpecific ? (
                        <div>
                            <label htmlFor="documentType" className="block mb-1">
                                Document Type
                            </label>
                            <input name="documentType" placeholder="Select" type="text" id="documentType" className="form-input w-full pointer-events-none" value={'Type 1'} readOnly />
                        </div>
                    ) : (
                        <div className="mb-5">
                            <label htmlFor="documentType" className="block mb-1">
                                Document Type
                            </label>
                            <Select placeholder="Select an option" options={options5} isMulti isSearchable={false} />
                        </div>
                    )}
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="documentForModule" className="block mb-1">
                        Document For Module
                    </label>
                    {viewSpecific ? (
                        <input name="documentForModule" placeholder="Select" type="text" id="documentForModule" className="form-input w-full pointer-events-none" value={'Vehicle'} readOnly />
                    ) : (
                        <select id="documentForModule" name="documentForModule" className="form-select text-white-dark" required value={details?.documentForModule} onChange={handleInputChange}>
                            <option value="">Select Module</option>
                            {moduleOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                {/* <div className="lg:w-1/3">
                    <label htmlFor="fk_serviceCity" className="block mb-1">
                        Service City
                    </label>
                    {viewSpecific ? (
                        <input
                            name="fk_serviceCity"
                            type="tel"
                            id="fk_serviceCity"
                            className="form-input w-full pointer-events-none"
                            value={details.fk_serviceCity}
                            onChange={onInputChange}
                            readOnly
                        />
                    ) : (
                        <ServiceCity
                            options={[
                                { value: 'City A', label: 'City A' },
                                { value: 'City B', label: 'City B' },
                                { value: 'City C', label: 'City C' },
                                // Add more options in the same object structure if required
                            ]}
                            selectedCities={moduleDetails.fk_serviceCity ? moduleDetails.fk_serviceCity.split(',').map((city) => ({ value: city, label: city })) : []}
                            onCitySelection={handleCitySelection}
                            onChange={handleInputChange} // Pass the handleInputChange function
                        />
                    )}
                </div> */}
                <div className={`lg:w-1/3`}>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <label htmlFor="fk_serviceCity" className="block mb-1">
                            Service City
                        </label>
                        {viewSpecific && (
                            <Link to={'/UtilityModule/ServiceCity/ViewSpecificServiceCity/1'}>
                                <FaArrowUpRightFromSquare className="text-xs cursor-pointer text-[#4361EE] mb-1 pointer-events-auto" />
                            </Link>
                        )}
                    </div>
                    {viewSpecific ? (
                        <input
                            name="fk_serviceCity"
                            type="text"
                            id="fk_serviceCity"
                            className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                            // value={details.fk_serviceCity}
                            value={'Kochi'}
                            readOnly
                        />
                    ) : isEditPage ? (
                        <div>
                            {fk_serviceCityType === 'service city' ? (
                                <button type="button" onClick={() => setmodal2(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <div className="flex">
                                    <input
                                        name="fk_serviceCity"
                                        type="text"
                                        id="fk_serviceCity"
                                        className={`form-input w-full ${viewSpecific ? 'pointer-events-none' : ''}`}
                                        value={details.fk_serviceCity}
                                        readOnly
                                    />
                                    <button type="button" onClick={() => setmodal2(true)} className="btn btn-primary w-1/3">
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {fk_serviceCityType === 'service city' ? (
                                <button type="button" onClick={() => setmodal2(true)} className="btn btn-success w-full">
                                    Added
                                </button>
                            ) : (
                                <button type="button" onClick={() => setmodal2(true)} className="btn btn-primary w-full">
                                    Add Service City
                                </button>
                            )}
                        </div>
                    )}
                    <CommonPopUp
                        title={'Service City'}
                        columns={fk_serviceCityColumns}
                        data={staticServiceCityData}
                        event={modal2}
                        closeModal={() => setmodal2(false)}
                        onSubmit={handleAddfk_serviceCitySubmit}
                    />
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="userType" className="block mb-1">
                        User Type
                    </label>
                    {viewSpecific ? (
                        <input name="userType" placeholder="Select" type="text" id="userType" className="form-input w-full pointer-events-none" value={'Vehicle'} readOnly />
                    ) : (
                        <select id="userType" name="userType" className="form-select text-white-dark" required value={details?.userType} onChange={handleInputChange}>
                            <option value="">Select User Type</option>
                            <option value={'driver'}>Driver</option>
                            <option value={'vehicle'}>Vehicle</option>
                            <option value={'travel_agency'}>Travel Agency</option>
                        </select>
                    )}
                </div>
                <div className="lg:w-1/3">
                    <label htmlFor="documentCondition" className="block mb-1">
                        Document Condition
                    </label>
                    {viewSpecific ? (
                        <input
                            name="documentCondition"
                            placeholder="Select document condition"
                            type="text"
                            id="documentCondition"
                            className="form-input w-full pointer-events-none"
                            value={'Vehicle'}
                            readOnly
                        />
                    ) : (
                        <select id="documentCondition" name="documentCondition" className="form-select text-white-dark" required value={details?.documentCondition} onChange={handleInputChange}>
                            <option value="">Select User Type</option>
                            <option value={'optional'}>Optional</option>
                            <option value={'mandatory'}>Mandatory</option>
                        </select>
                    )}
                </div>
                {showStatus ? (
                    <div className={`lg:w-1/3   ${viewSpecific ? 'pointer-events-none' : ''}`}>
                        <label htmlFor="archive" className="block mb-1 text-md font-bold">
                            Archive
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
                ) : null}

                <div className="lg:w-1/3"></div>
            </div>

            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6 panel">
                <div className={`lg:w-1/3 ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <div className="flex gap-4 items-center">
                        <label htmlFor="newFields" className="block mb-1 text-md font-bold">
                            Write input Field name
                        </label>
                        {!viewSpecific && (
                            <span className="flex gap-2 cursor-pointer" onClick={addNewField}>
                                Add Field
                                <IoAddSharp className="bg-gray-100 text-lg rounded-full hover:bg-gray-300 transition duration-200" />
                            </span>
                        )}
                    </div>
                    {newField.map((entry) => (
                        <div className="mt-2 relative " key={entry.id}>
                            {!viewSpecific && (
                                <IoCloseCircle className="text-xl font-sans text-black/40 hover:text-black/70 absolute top-2.5 right-2 cursor-pointer" onClick={() => removeNewField(entry.id)} />
                            )}
                            <input
                                className="form-input w-full"
                                type="text"
                                id={`newFields-${entry.id}`}
                                placeholder="Enter New Field Name"
                                value={entry.value}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNewFieldChange(entry.id, e.target.value)}
                                readOnly={viewSpecific}
                            />
                            <select className="form-select mt-2" value={entry.type} onChange={(e) => handleTypeChange(entry.id, e.target.value)} disabled={viewSpecific}>
                                <option value="text">Text</option>
                                <option value="number">Number</option>
                                <option value="date">Date</option>
                            </select>
                        </div>
                    ))}
                </div>

                <div className={`lg:w-1/3 ${viewSpecific ? 'pointer-events-none' : ''}`}>
                    <div className="flex gap-4 items-center">
                        <label htmlFor="documentFields" className="block mb-1 text-md font-bold">
                            Write document Field Name
                        </label>
                        {!viewSpecific && (
                            <span className="flex gap-2 cursor-pointer" onClick={addDocumentField}>
                                Add Field
                                <IoAddSharp className="bg-gray-100 text-lg rounded-full hover:bg-gray-300 transition duration-200" />
                            </span>
                        )}
                    </div>
                    {documentFields.map((field) => (
                        <div className="mt-2 relative" key={field.id}>
                            {!viewSpecific && (
                                <IoCloseCircle className="text-xl font-sans text-black/40 hover:text-black/70 absolute top-2.5 right-2 cursor-pointer" onClick={() => removeDocumentField(field.id)} />
                            )}
                            <input
                                className="form-input w-full"
                                type="text"
                                id={`documentFields-${field.id}`}
                                placeholder="Enter the document field"
                                value={field.value}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDocumentFieldChange(field.id, e.target.value)}
                                readOnly={viewSpecific}
                            />
                        </div>
                    ))}
                </div>

                <div className={`lg:w-1/3 ${viewSpecific ? 'pointer-events-none' : ''}`}></div>
            </div>
        </>
    );
};

export default ModuleMasterModule;
