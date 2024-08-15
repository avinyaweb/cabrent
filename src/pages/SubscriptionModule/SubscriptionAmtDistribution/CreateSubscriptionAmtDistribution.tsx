import React, { useState, ChangeEvent } from 'react';
import Select, { MultiValue, ActionMeta } from 'react-select';
import SubscriptionAmtDistributionModule from './SubscriptionAmtDistributionModule';

interface FormValues {
    id: string;
    cgst: string;
    sgst: string;
    processingFee: string;
    planAmount: string;
    distributorcommision: string;
    fk_platformFee: string;
    platformName: string;
    platformAmount: string;
    amountAddOrSub: string;
    vehicleTypeName: string;
    vehicleTypeAmount: string;
    fk_vehicleTypeFee: string;
    pgCharges: string;
    totalAmount: string;
    fk_serviceCity: string;
    city: string;
    archive: string;
    changeType: string;
}

const CreateSubscriptionAmtDistribution: React.FC<{ viewSpecific?: string; onInputChange?: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void }> = ({
    viewSpecific,
    onInputChange,
}) => {
    const initialFormValues: FormValues = {
        id: '',
        cgst: '',
        sgst: '',
        processingFee: '',
        planAmount: '',
        distributorcommision: '',
        fk_platformFee: '',
        platformName: '',
        platformAmount: '',
        vehicleTypeName: '',
        vehicleTypeAmount: '',
        amountAddOrSub: '',
        fk_vehicleTypeFee: '',
        pgCharges: '',
        totalAmount: '',
        fk_serviceCity: '',
        city: '',
        archive: '',
        changeType: '',
    };

    const [formData, setFormData] = useState<FormValues>(initialFormValues);
    const [selectedVehicles, setSelectedVehicles] = useState<{ value: string; label: string }[]>([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState<{ value: string; label: string }[]>([]);

    const vehicleOptions = [
        { value: 'Mini', label: 'Mini' },
        { value: 'Sidan', label: 'Sidan' },
        { value: 'Suv', label: 'Suv' },
        { value: 'Hatchback', label: 'Hatchback' },
    ];

    const platformOptions = [
        { value: 'CARRENT', label: 'CARRENT' },
        { value: 'channelpartner', label: 'Channel Partner' },
        { value: 'phonepay', label: 'PhonePay' },
    ];

    const handleVehicleChange = (selectedOptions: MultiValue<{ value: string; label: string }>, actionMeta: ActionMeta<{ value: string; label: string }>) => {
        const mutableSelectedOptions = Array.from(selectedOptions);
        setSelectedVehicles(mutableSelectedOptions);
    };

    const handlePlatformChange = (selectedOptions: MultiValue<{ value: string; label: string }>, actionMeta: ActionMeta<{ value: string; label: string }>) => {
        const mutableSelectedOptions = Array.from(selectedOptions);
        setSelectedPlatforms(mutableSelectedOptions);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your submit logic here
        console.log('Form data submitted:', formData);
    };

    const handleCancel = () => {
        setFormData(initialFormValues);
        setSelectedVehicles([]);
        setSelectedPlatforms([]);
    };

    return (
        <>
            <div className="panel mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="vehicleType" className="block mb-1 text-md font-bold">
                        Select Vehicle Type
                    </label>
                    <Select id="vehicleType" isMulti options={vehicleOptions} className="form-select text-white-dark" name="vehicleType" onChange={handleVehicleChange} />
                </div>

                {selectedVehicles.map((vehicle) => (
                    <div key={vehicle.value} className="panel mt-6">
                        <h1 className="text-4xl font-bold">{vehicle.label} Vehicle</h1>
                        <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                            <div className="lg:w-1/3">
                                <label htmlFor={`${vehicle.value}VehicleAmount`} className="block mb-1 text-md font-bold">
                                    {vehicle.label} Vehicle Fee
                                </label>
                                <input
                                    name="vehicleTypeAmount"
                                    type="number"
                                    id={`${vehicle.value}VehicleAmount`}
                                    placeholder="Enter Vehicle Type Amount"
                                    className="form-input w-full"
                                    value={formData.vehicleTypeAmount}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="lg:w-1/3">
                                <label htmlFor={`${vehicle.value}ChangeType`} className="block mb-1 text-md font-bold">
                                    Change Type
                                </label>
                                <select name="changeType" id={`${vehicle.value}ChangeType`} className="form-select w-full" onChange={handleInputChange} value={formData.changeType}>
                                    <option value="">Select Change Type</option>
                                    <option value="Addition">Addition</option>
                                    <option value="Subtraction">Subtraction</option>
                                </select>
                            </div>

                            <div className="lg:w-1/3">
                                <label htmlFor={`${vehicle.value}Type`} className="block mb-1 text-md font-bold">
                                    Flat or Percentage
                                </label>
                                <div className="form-radio-group flex flex-col">
                                    <label className="inline-flex items-center mb-2">
                                        <input type="radio" className="form-radio" name={`${vehicle.value}Type`} value="FLAT" onChange={handleInputChange} />
                                        <span className="ml-2">Flat</span>
                                    </label>
                                    <label className="inline-flex items-center mb-2">
                                        <input type="radio" className="form-radio" name={`${vehicle.value}Type`} value="PERCENTAGE" onChange={handleInputChange} />
                                        <span className="ml-2">Percentage</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="panel mt-6">
                <div className="lg:w-1/3">
                    <label htmlFor="platformname" className="block mb-1 text-md font-bold">
                        Select Platform Name
                    </label>
                    <Select id="platformname" isMulti options={platformOptions} className="form-select text-white-dark" name="platformname" onChange={handlePlatformChange} />
                </div>

                {selectedPlatforms.map((platform) => (
                    <div key={platform.value} className="panel mt-6">
                        <h1 className="text-4xl font-bold">{platform.label} Platform</h1>
                        <div className="grid grid-cols-1 sm:flex justify-between gap-5 mt-6">
                            <div className="lg:w-1/3">
                                <label htmlFor={`${platform.value}PlatformFee`} className="block mb-1 text-md font-bold">
                                    {platform.label} Platform Fee
                                </label>
                                <input
                                    name={`${platform.value}PlatformFee`}
                                    type="text"
                                    id={`${platform.value}PlatformFee`}
                                    placeholder="Enter Platform Fee"
                                    className="form-input w-full"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="lg:w-1/3">
                                <label htmlFor={`${platform.value}PlatformAmount`} className="block mb-1 text-md font-bold">
                                    Platform Amount
                                </label>
                                <input
                                    name={`${platform.value}PlatformAmount`}
                                    type="number"
                                    id={`${platform.value}PlatformAmount`}
                                    placeholder="Enter Platform Amount"
                                    className="form-input w-full"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="lg:w-1/3">
                                <label htmlFor={`${platform.value}ChangeType`} className="block mb-1 text-md font-bold">
                                    Change Type
                                </label>
                                <select name={`${platform.value}ChangeType`} id={`${platform.value}ChangeType`} className="form-select w-full" onChange={handleInputChange}>
                                    <option value="">Select Change Type</option>
                                    <option value="Addition">Addition</option>
                                    <option value="Subtraction">Subtraction</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="panel mt-6">
                <h1 className="text-4xl font-bold">Tax *</h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <SubscriptionAmtDistributionModule details={formData} onInputChange={handleInputChange} showStatus={false} />
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="btn btn-primary !mt-6 mr-4">
                            Submit
                        </button>
                        <button type="button" className="btn btn-danger !mt-6" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateSubscriptionAmtDistribution;
