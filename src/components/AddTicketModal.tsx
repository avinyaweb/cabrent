import { getAllTicketType } from '@/config/constant';
import { createAdminTicketAgainstTeam } from '@/services/AdminTeamsService';
import React, { useState, ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface FormValues {
    title: string;
    ticketType: string;
    priority: string;
    raisedAgainst: string | undefined;
    archive: string;
    adminTeamsType: string;
    description: string;
    remarks: string;
}

interface AddTicketModalProps {
    adminTeamsId: string | undefined;
    id: string;
}

const AddTicketModal: React.FC<AddTicketModalProps> = ({ adminTeamsId, id }) => {
    // form data initial values.
    const details: FormValues = {
        title: '',
        ticketType: '',
        priority: '',
        raisedAgainst: adminTeamsId,
        archive: 'PENDING',
        adminTeamsType: '',
        description: '',
        remarks: '',
    };

    // usestates
    const [formData, setFormData] = useState<FormValues>(details);
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState(details.description);
    const [selectedTicketType, setSelectedTicketType] = useState(details.ticketType);
    const [selectedPriority, setSelectedPriority] = useState(details.priority);
    var toolbarOptions = [
        ['bold', 'italic'],
        ['link', 'image'],
    ];

    const ticketTypes = getAllTicketType();
    const module = {
        toolbar: toolbarOptions,
    };

    // handle input event change
    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // changing the ticket type
    // const handleTicketTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const { value } = event.target;
    //     setSelectedTicketType(value);
    //     onInputChange({
    //         target: {
    //             name: 'ticketType',
    //             value: value,
    //         },
    //     });
    // };

    const handleTicketTypeChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        setSelectedTicketType(value as string); // Assuming setSelectedTicketType accepts string values
        onInputChange({
            target: {
                name: name as string,
                value: value as string,
            },
        } as React.ChangeEvent<HTMLInputElement>); // Explicitly cast to ChangeEvent<HTMLInputElement>
    };

    const handlePriorityTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedPriority(value);
        onInputChange({
            target: {
                name: 'priority',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    // hanlde description change
    const handleDescriptionChange = (content: string) => {
        setValue(content); // Update the local state when description changes
        onInputChange({
            target: {
                name: 'description',
                value: content,
            },
        } as ChangeEvent<HTMLInputElement>);
    };

    // handle form submit
    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault(); // Prevent the default behavior of the button click event
        try {
            if (adminTeamsId) {
                const response = await createAdminTicketAgainstTeam(formData, adminTeamsId);
                console.log(response.data);
                if (response.message) {
                    toast.success(response.message);
                    window.location.reload();
                }
            } else {
                throw new Error('adminTeamsId is not defined');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred while submitting the form');
        }
    };

    return (
        <>
            <dialog id={id} className="modal w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/3 xl:w-1/2 rounded-xl ">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl mb-4 text-center">Add Ticket</h3>
                    <div className="modal-action">
                        <form method="dialog">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="title" className="block mb-1">
                                        Title
                                    </label>
                                    <input name="title" type="text" id="title" placeholder="Enter Title" className="form-input w-full" value={formData.title} onChange={onInputChange} />
                                </div>
                                <div>
                                    <label htmlFor="ticketType" className="block mb-1">
                                        Ticket Type
                                    </label>
                                    <select id="ticketType" className="form-select text-white-dark" required value={selectedTicketType} onChange={handleTicketTypeChange}>
                                        <option value="">Select Ticket Type</option>
                                        {ticketTypes?.map((data) => {
                                            return (
                                                <option value={data?.name} key={data.id}>
                                                    {data?.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="priority" className="block mb-1">
                                        Priority
                                    </label>
                                    <select id="priority" className="form-select w-full" required value={formData.priority} onChange={handlePriorityTypeChange}>
                                        <option value="">Select Priority</option>
                                        <option value="LOW">LOW</option>
                                        <option value="MEDIUM">MEDIUM</option>
                                        <option value="HIGH">HIGH</option>
                                        <option value="VERYHIGH">VERYHIGH</option>
                                    </select>
                                </div>
                                {/* <div>
                                    <label htmlFor="raisedAgainst" className="block mb-1">
                                        Raised Against
                                    </label>
                                    <input
                                        name="raisedAgainst"
                                        type="text"
                                        id="raisedAgainst"
                                        placeholder="Enter Raised Against"
                                        className="form-input w-full"
                                        value={adminTeamsId}
                                        onChange={onInputChange}
                                        readOnly
                                    />
                                </div> */}
                                <div>
                                    <label htmlFor="adminTeamsType" className="block mb-1">
                                        Admin Team Type
                                    </label>
                                    <select
                                        id="adminTeamsType"
                                        className="form-select w-full"
                                        name="adminTeamsType"
                                        value={formData.adminTeamsType}
                                        //  onChange={onInputChange}
                                        required
                                    >
                                        <option value="">Select Admin Teams Type</option>
                                        <option>Admin 1</option>
                                        <option>Admin 2</option>
                                        <option>Admin 3</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="description" className="block mb-1">
                                        Description
                                    </label>
                                    <ReactQuill theme="snow" value={value} onChange={handleDescriptionChange} />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="remarks" className="block mb-1">
                                        Remarks
                                    </label>
                                    <ReactQuill theme="snow" value={formData.remarks} onChange={(content) => setFormData({ ...formData, remarks: content })} />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    type="submit"
                                    className="btn mr-2 bg-blue-700 text-white"
                                    onClick={(event) => handleSubmit(event)} // Use an inline arrow function to call handleSubmit
                                >
                                    Submit
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
