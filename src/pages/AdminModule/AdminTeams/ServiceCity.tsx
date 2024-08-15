import React, { useState } from 'react';

interface CityOption {
    value: string;
    label: string;
}

interface ServiceCityProps {
    options: CityOption[]; // Options for Service City as objects with value and label
    selectedCities: CityOption[]; // Initially selected cities as objects with value and label
    onCitySelection: (selected: CityOption[]) => void; // Callback for selected cities
}

const ServiceCity: React.FC<ServiceCityProps> = ({ options, selectedCities, onCitySelection }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [checkedCities, setCheckedCities] = useState<CityOption[]>(selectedCities);

    const toggleCheckbox = (city: CityOption) => {
        const newCheckedCities = checkedCities.some((c) => c.value === city.value) ? checkedCities.filter((c) => c.value !== city.value) : [...checkedCities, city];

        setCheckedCities(newCheckedCities);
        onCitySelection(newCheckedCities);
    };

    const handleDropdownToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevents form submission
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button onClick={handleDropdownToggle} className="border border-gray-300 rounded-md px-4 py-2 w-full text-left">
                Select Cities
            </button>
            {isOpen && (
                <div className="absolute bg-white shadow-md rounded-md mt-2 py-2 w-full">
                    {options.map((city) => (
                        <div key={city.value} className="px-4 py-2">
                            <label className="flex items-center">
                                <input type="checkbox" value={city.value} checked={checkedCities.some((c) => c.value === city.value)} onChange={() => toggleCheckbox(city)} className="mr-2" />
                                {city.label}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ServiceCity;
