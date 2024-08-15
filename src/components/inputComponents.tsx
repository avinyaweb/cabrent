import React from 'react';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import IconEdit from '@/components/Icon/IconEdit';

interface InputItem {
    name: string;
    title: string;
    type: string;
    value: string;
}

interface InputSection {
    mainHeader: string;
    details: InputItem[];
    viewSpecific: boolean;
    viewEndPoint: string; // Optional view endpoint
    editEndPoint: string; // Optional edit endpoint
}

interface InputComponentProps {
    sections: InputSection[];
    dropdown: boolean;
}

const InputComponent: React.FC<InputComponentProps> = ({ dropdown, sections }) => {
    const navigate = useNavigate();

    const handleArrowClick = (sectionIndex: number) => {
        const currentSection = sections[sectionIndex];
        if (currentSection.viewEndPoint) {
            navigate(currentSection.viewEndPoint);
        } else {
            console.error('View endpoint not specified');
        }
    };

    const handleEditClick = (sectionIndex: number) => {
        const currentSection = sections[sectionIndex];
        if (currentSection.editEndPoint) {
            navigate(currentSection.editEndPoint);
        } else {
            console.error('Edit endpoint not specified');
        }
    };

    return (
        <div>
            {sections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                    {!dropdown && (
                        <div className="flex items-center gap-2 relative">
                            <h1 className="text-2xl p-2 font-bold">{sectionIndex === 0 ? section.mainHeader : ''}</h1>

                            <div className="flex items-center justify-end gap-5 flex-grow">
                                {/* Edit */}
                                <div className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center" onClick={() => handleEditClick(sectionIndex)}>
                                    <h3>Edit</h3>
                                    <IconEdit />
                                </div>

                                {/* View More */}
                                <div className="cursor-pointer text-blue-500 text-1xl flex flex-row gap-3 items-center justify-center" onClick={() => handleArrowClick(sectionIndex)}>
                                    <h3>View More</h3>
                                    <FaArrowUpRightFromSquare />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                        {section.details.map((item, index) => (
                            <div key={index} className="w-full sm:w-full lg:w-1/3" style={{ width: '91.333333%' }}>
                                <label htmlFor={item.name} className="block mb-1">
                                    {item.title}
                                </label>
                                {section.viewSpecific ? (
                                    <input
                                        name={item.name}
                                        type={item.type}
                                        id={item.name}
                                        placeholder={`Enter ${item.title}`}
                                        className={`form-input w-full p-2 ${section.viewSpecific ? 'pointer-events-none' : ''}`}
                                        value={item.value}
                                        readOnly
                                    />
                                ) : (
                                    <input
                                        name={item.name}
                                        type={item.type}
                                        id={item.name}
                                        placeholder={`Enter ${item.title}`}
                                        className="form-input w-full p-2"
                                        value={item.value}
                                        // You can add other attributes or event handlers as needed
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InputComponent;
