import React, { useState, ChangeEvent } from 'react';

interface VehicleUtilityModuleProps {
    details: {
        id: string;
        vehicleCategory: string;
        VehicleBrand: string;
        wheelType: string;
        vehicleModel: string;
        archive: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
}

const VehicleUtilityModule: React.FC<VehicleUtilityModuleProps> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    const [moduleDetails, setModuleDetails] = useState(details);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setModuleDetails({ ...moduleDetails, [name]: value });
        onInputChange(event); // Pass the event to the parent component
    };

    const [selectedVehicleCategory, setSelectedVehicleCategory] = useState(details?.vehicleCategory);

    const handleVehicleCategoryTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedVehicleCategory(value);
        onInputChange({
            target: {
                name: 'vehicleCategory',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const [selectedVehicleBrand, setSelectedVehicleBrand] = useState(details?.VehicleBrand);

    const handleVehicleBrandTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedVehicleBrand(value);
        onInputChange({
            target: {
                name: 'VehicleBrand',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const [selectedwheelType, setSelectedwheelType] = useState(details?.wheelType);

    const handlewheelTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedwheelType(value);
        onInputChange({
            target: {
                name: 'wheelType',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const [selectedVehicleModel, setSelectedVehicleModel] = useState(details?.vehicleModel);

    const handleVehicleModelTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedVehicleBrand(value);
        onInputChange({
            target: {
                name: 'vehicleModel',
                value: value,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <>
           <div className="grid grid-cols-1 sm:flex justify-between gap-5">
    <div className="lg:w-1/3">
        <label htmlFor="vehicleCategory" className="block mb-1">
            Vehicle Category
        </label>

        {viewSpecific ? (
            <input
                name="vehicleCategory"
                placeholder="Select"
                type="text"
                id="vehicleCategory"
                className="form-input w-full pointer-events-none"
                value={details?.vehicleCategory}
                readOnly
            />
        ) : (
            <input
                name="vehicleCategory"
                placeholder="Vehicle Category"
                type="text"
                id="vehicleCategory"
                className="form-input w-full"
                value={details?.vehicleCategory}
                onChange={handleInputChange}
                required
            />
        )}
    </div>

    <div className="lg:w-1/3">
        <label htmlFor="VehicleBrand" className="block mb-1">
            Vehicle Brand
        </label>

        {viewSpecific ? (
            <input
                name="VehicleBrand"
                placeholder="Select"
                type="text"
                id="VehicleBrand"
                className="form-input w-full pointer-events-none"
                value={details?.VehicleBrand}
                readOnly
            />
        ) : (
            <input
                name="VehicleBrand"
                placeholder="Vehicle Brand"
                type="text"
                id="VehicleBrand"
                className="form-input w-full"
                value={details?.VehicleBrand}
                onChange={handleInputChange}
                required
            />
        )}
    </div>

    <div className="lg:w-1/3">
        <label htmlFor="wheelType" className="block mb-1">
            Wheel Type
        </label>
        {viewSpecific ? (
            <input
                name="wheelType"
                placeholder="Select"
                type="text"
                id="wheelType"
                className="form-input w-full pointer-events-none"
                value={details?.vehicleModel}
                readOnly
            />
        ) : (
            <select
                id="wheelType"
                className="form-select text-white-dark"
                required
                value={details?.wheelType}
                // onChange={handleWheelTypeChange}
            >
                <option value="">Select Wheel Type</option>
                <option value="2 Wheeler">2 Wheeler</option>
                <option value="3 Wheeler">3 Wheeler</option>
                <option value="4 Wheeler">4 Wheeler</option>
            </select>
        )}
    </div>
</div>


            <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
            <div className="lg:w-1/3">
        <label htmlFor="vehicleModel" className="block mb-1">
            Vehicle Model
        </label>
        {viewSpecific ? (
            <input
                name="vehicleModel"
                placeholder="Select"
                type="text"
                id="vehicleModel"
                className="form-input w-full pointer-events-none"
                value={details?.vehicleModel}
                readOnly
            />
        ) : (
            <input
                name="vehicleModel"
                placeholder="Vehicle Model"
                type="text"
                id="vehicleModel"
                className="form-input w-full"
                value={details?.vehicleModel}
                onChange={handleInputChange}
                required
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

export default VehicleUtilityModule;
