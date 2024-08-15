import React, { useState, ChangeEvent } from 'react';

interface VehicleColorModuleProps {
    details: {
        vehicleColor: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
}

const VehicleColorModule: React.FC<VehicleColorModuleProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const [moduleDetails, setModuleDetails] = useState(details);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setModuleDetails({ ...moduleDetails, [name]: value });
        onInputChange(event); // Pass the event to the parent component
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-between gap-5">
                <div className="lg:w-1/3">
                    <label htmlFor="Vehiclecolor" className="block mb-1">
                        Vehicle Color
                    </label>
                    {viewSpecific ? (
                        <input
                            name="Vehiclecolor"
                            type="text"
                            id="Vehiclecolor"
                            placeholder="Enter Vehicle Color"
                            className="form-input w-full pointer-events-none"
                            // value={details?.Vehiclecolor}
                            value="Red"
                            onChange={onInputChange}
                            readOnly
                        />
                    ) : (
                        <input
                            name="Vehiclecolor"
                            type="text"
                            id="Vehiclecolor"
                            placeholder="Enter Vehicle Color"
                            className="form-input w-full"
                            value={details?.vehicleColor}
                            onChange={onInputChange}
                        />
                    )}
                </div>

                <div className="lg:w-1/3">
                    <label htmlFor="archive" className="block mb-1">
                        Archive
                    </label>
                    {viewSpecific ? (
                        <input name="archive" placeholder="Archive" type="text" id="archive" className="form-input w-full pointer-events-none" value={details?.archive} readOnly />
                    ) : (
                        <select
                            id="archive"
                            name="archive"
                            className="form-select text-white-dark"
                            required
                            value={details?.archive} // Update this line
                            onChange={handleInputChange}
                        >
                            <option value="">Select Archive</option>
                            <option value={'PENDING'}>Pending</option>
                            <option value={'APPROVED'}>Approved</option>
                            <option value={'REJECTED'}>Rejected</option>
                            <option value={'HOLD'}>Hold</option>
                            <option value={'SUSPENDED'}>Suspended</option>
                        </select>
                    )}
                </div>
                <div className="lg:w-1/3"></div>
            </div>
        </>
    );
};

export default VehicleColorModule;
