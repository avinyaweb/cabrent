import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';

interface FirebaseProps {
    details: {
        id: string;
        ProjectID: string;
        DefaultAppName: string;
        AuthDomain: string;
        DatabaseURL: string;
        StorageBucket: string;
        FCMServer: string;
        GoogleAPIKey: string;
    };
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    showStatus?: boolean;
    isEditable?: boolean;
}

const FirebaseSettingsModule: React.FC<FirebaseProps> = ({ details, onInputChange, showStatus = true, isEditable = true }) => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // Add your dropdown options here
    const statusOptions = ['APPROVED', 'REJECETD', 'SUSPENDED', 'ONHOLD'];

    return (
        <>
            <div>
                <h1>Firebase Settings</h1>
                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="projectId" className="block mb-1">
                            Project ID
                        </label>
                        <input name="projectId" type="text" id="projectId" placeholder="Enter Project ID" className="form-input w-full" onChange={onInputChange} />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="defaultAppName" className="block mb-1">
                            Default App Name
                        </label>
                        <input name="defaultAppName" type="text" id="defaultAppName" placeholder="Enter Default App Name" className="form-input w-full" onChange={onInputChange} />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="authDomain" className="block mb-1">
                            Auth Domain
                        </label>
                        <input name="authDomain" type="text" id="authDomain" placeholder="Enter Auth Domain" className="form-input w-full" onChange={onInputChange} />
                    </div>
                </div>
                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="databaseURL" className="block mb-1">
                            Database URL
                        </label>
                        <input name="databaseURL" type="text" id="databaseURL" placeholder="Enter Database URL" className="form-input w-full" onChange={onInputChange} />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="storageBucket" className="block mb-1">
                            Storage Bucket
                        </label>
                        <input
                            name="storageBucket"
                            type="text"
                            id="storageBucket"
                            placeholder="Enter Storage Bucket"
                            className="form-input w-full"
                            // value={details.storageBucket}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="lg:w-1/3">
                        <label htmlFor="fcmServer" className="block mb-1">
                            FCM Server
                        </label>
                        <input name="fcmServer" type="text" id="fcmServer" placeholder="Enter FCM Server" className="form-input w-full" onChange={onInputChange} />
                    </div>
                </div>
                <div className="grid grid-divs-1 sm:flex justify-between gap-5 mt-6">
                    <div className="lg:w-1/3">
                        <label htmlFor="googleApiKey" className="block mb-1">
                            Google API KEY
                        </label>
                        <input name="googleApiKey" type="text" id="googleApiKey" placeholder="Enter Google API KEY" className="form-input w-full" onChange={onInputChange} />
                    </div>
                    {/* Add similar divs for other settings */}
                </div>
            </div>

            {showStatus ? (
                <div className="lg:w-1/3">
                    <label htmlFor="archive" className="block mb-1">
                        Status
                    </label>
                    <select
                        name="archive"
                        id="archive"
                        className="form-select w-full"
                        // value={details.archive}
                        //  onChange={onInputChange}
                        disabled={!isEditable}
                    >
                        {statusOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                <div className="lg:w-1/3" />
            )}
        </>
    );
};

export default FirebaseSettingsModule;
