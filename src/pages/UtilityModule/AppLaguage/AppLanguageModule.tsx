import React, { ChangeEvent } from 'react';

interface AppLanguageModuleProp {
    details: {
        companyTypeName: string;
        id: string;
        appResLanCode: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    viewSpecific?: boolean;
}

const AppLanguageModule: React.FC<AppLanguageModuleProp> = ({ details, onInputChange, showStatus = true, viewSpecific }) => {
    // future code ->>
    // const [moduleDetails, setModuleDetails] = useState(details);
    // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target;
    //     setModuleDetails({ ...moduleDetails, [name]: value });
    //     onInputChange(event); // Pass the event to the parent component
    // };

    return (
        <div className="grid grid-cols-1 sm:flex justify-between gap-5">
            <div className="lg:w-1/3">
                <label htmlFor="companyTypeName" className="block mb-1">
                    App Response Language Code
                </label>

                {viewSpecific ? (
                    <input
                        name="companyTypeName"
                        type="text"
                        id="companyTypeName"
                        placeholder="Enter Company Type Name"
                        className="form-input w-full pointer-events-none"
                        value={details?.companyTypeName}
                        readOnly
                    />
                ) : (
                    <input
                        name="companyTypeName"
                        type="text"
                        id="companyTypeName"
                        placeholder="Enter Company Type Name"
                        className="form-input w-full"
                        value={details?.companyTypeName}
                        onChange={onInputChange}
                    />
                )}
            </div>

            <div className="lg:w-1/2">
                <label htmlFor="profileImage" className="block mb-1">
                    Upload Json File
                </label>
                {viewSpecific ? (
                    <input
                        name="profileImage"
                        type="text"
                        id="profileImage"
                        placeholder="Enter Profile Image URL"
                        className="form-input w-full pointer-events-none"
                        //   value={profileDetails.profileImage}
                        //   onChange={onProfileInputChange}
                        readOnly
                    />
                ) : (
                    <input
                        id="profileImage"
                        type="file"
                        name="profileImage"
                        className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                        required
                        //   onChange={handleProfileFileChange}
                        accept="image/*"
                    />
                )}
            </div>
            <div className="lg:w-1/3"></div>
        </div>
    );
};

export default AppLanguageModule;
