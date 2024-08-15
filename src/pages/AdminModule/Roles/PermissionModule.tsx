import React, { useState, useEffect } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { getPermissionData, updatePermissionData } from '@/services/PermissionService';

interface PermissionModuleProps {
    viewSpecific?: boolean;
}

export const staticPermissionData = [
    {
        fieldIndex: 1,
        fieldName: 'First Name',
        fieldIsViewPermissionName: 'PENDING',
        fieldIsEditPermissionName: 'APPROVED',
        fieldIsViewPermissionStatus: true,
        fieldIsEditPermissionStatus: true,
    },
    {
        fieldIndex: 2,
        fieldName: 'Last Name',
        fieldIsViewPermissionName: 'REJECTED',
        fieldIsEditPermissionName: 'HOLD',
        fieldIsViewPermissionStatus: true,
        fieldIsEditPermissionStatus: true,
    },
    {
        fieldIndex: 3,
        fieldName: 'Email',
        fieldIsViewPermissionName: 'SUSPENDED',
        fieldIsEditPermissionName: 'PENDING',
        fieldIsViewPermissionStatus: true,
        fieldIsEditPermissionStatus: true,
    },
    {
        fieldIndex: 4,
        fieldName: 'Phone Number',
        fieldIsViewPermissionName: 'APPROVED',
        fieldIsEditPermissionName: 'REJECTED',
        fieldIsViewPermissionStatus: true,
        fieldIsEditPermissionStatus: true,
    },
    {
        fieldIndex: 5,
        fieldName: 'Address',
        fieldIsViewPermissionName: 'HOLD',
        fieldIsEditPermissionName: 'SUSPENDED',
        fieldIsViewPermissionStatus: true,
        fieldIsEditPermissionStatus: true,
    },
];

const PermissionModule: React.FC<PermissionModuleProps> = ({ viewSpecific }) => {
    const [permissions, setPermissions] = useState<any[]>([]);
    const [permissionTypes, setPermissionTypes] = useState<string[]>([]);
    const [roleName, setRoleName] = useState<string>(viewSpecific ? 'Admin' : '');
    const [employeeLevel, setEmployeeLevel] = useState<string>('');

    // dummy useEffect
    useEffect(() => {
        const permissionData = [
            {
                moduleName: 'Admin',
                permissionObj: [
                    {
                        permissionIndex: 0,
                        permissionType: '',
                        permissionName: 'ADMINCREATE1',
                        permissionDescription: 'Admin create update successfully',
                        permissionStatus: 1,
                    },
                    {
                        permissionIndex: 1,
                        permissionType: '',
                        permissionName: 'ADMINREAD',
                        permissionDescription: 'Admin read',
                        permissionStatus: 2,
                    },
                    {
                        permissionIndex: 2,
                        permissionType: '',
                        permissionName: 'ADMINUPDATE',
                        permissionDescription: 'Admin update',
                        permissionStatus: 1,
                    },
                    {
                        permissionIndex: 3,
                        permissionType: '',
                        permissionName: 'ADMINARCHIVE',
                        permissionDescription: 'Admin archive',
                        permissionStatus: 1,
                    },
                    {
                        permissionIndex: 4,
                        permissionType: '',
                        permissionName: 'ADMINDOWNLOAD',
                        permissionDescription: 'Admin download',
                        permissionStatus: 2,
                    },
                ],
                fieldObj: [
                    {
                        fieldIndex: 0,
                        fieldName: 'Role Type',
                        fieldIsViewPermissionName: 'ADMINfkroleTypeVIEW',
                        fieldIsEditPermissionName: 'ADMINfkroleTypeUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 1,
                        fieldName: 'Admin Profile Status',
                        fieldIsViewPermissionName: 'ADMINfkadminProfileStatusVIEW',
                        fieldIsEditPermissionName: 'ADMINfkadminProfileStatusUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 2,
                        fieldName: 'Service City',
                        fieldIsViewPermissionName: 'ADMINfkserviceCityVIEW',
                        fieldIsEditPermissionName: 'ADMINfkserviceCityUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 3,
                        fieldName: 'First Name',
                        fieldIsViewPermissionName: 'ADMINfirstNameVIEW',
                        fieldIsEditPermissionName: 'ADMINfirstNameUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 4,
                        fieldName: 'Middle Name',
                        fieldIsViewPermissionName: 'ADMINmiddleNameVIEW',
                        fieldIsEditPermissionName: 'ADMINmiddleNameUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 5,
                        fieldName: 'Last Name',
                        fieldIsViewPermissionName: 'ADMINlastNameVIEW',
                        fieldIsEditPermissionName: 'ADMINlastNameUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 6,
                        fieldName: 'Email',
                        fieldIsViewPermissionName: 'ADMINemailVIEW',
                        fieldIsEditPermissionName: 'ADMINemailUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 7,
                        fieldName: 'Phone Number',
                        fieldIsViewPermissionName: 'ADMINphoneNumberVIEW',
                        fieldIsEditPermissionName: 'ADMINphoneNumberUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 8,
                        fieldName: 'Date of Birth',
                        fieldIsViewPermissionName: 'ADMINdateOfBirthVIEW',
                        fieldIsEditPermissionName: 'ADMINdateOfBirthUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 9,
                        fieldName: 'Created by',
                        fieldIsViewPermissionName: 'ADMINcreatedByVIEW',
                        fieldIsEditPermissionName: 'ADMINcreatedByUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 10,
                        fieldName: 'Gender',
                        fieldIsViewPermissionName: 'ADMINgenderVIEW',
                        fieldIsEditPermissionName: 'ADMINgenderUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 11,
                        fieldName: 'Reporting Manager',
                        fieldIsViewPermissionName: 'ADMINreportingManagerVIEW',
                        fieldIsEditPermissionName: 'ADMINreportingManagerUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 12,
                        fieldName: 'Admin team',
                        fieldIsViewPermissionName: 'ADMINadminTeamVIEW',
                        fieldIsEditPermissionName: 'ADMINadminTeamUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 13,
                        fieldName: 'Team roles',
                        fieldIsViewPermissionName: 'ADMINteamRolesVIEW',
                        fieldIsEditPermissionName: 'ADMINteamRolesUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 14,
                        fieldName: 'Admin team Manager',
                        fieldIsViewPermissionName: 'ADMINadminTeamManagerVIEW',
                        fieldIsEditPermissionName: 'ADMINadminTeamManagerUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 15,
                        fieldName: 'Alternate Phone Number',
                        fieldIsViewPermissionName: 'ADMINalternatePhoneNumberVIEW',
                        fieldIsEditPermissionName: 'ADMINalternatePhoneNumberUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 16,
                        fieldName: 'Country',
                        fieldIsViewPermissionName: 'ADMINcountryVIEW',
                        fieldIsEditPermissionName: 'ADMINcountryUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 17,
                        fieldName: 'State',
                        fieldIsViewPermissionName: 'ADMINstateVIEW',
                        fieldIsEditPermissionName: 'ADMINstateUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 18,
                        fieldName: 'City',
                        fieldIsViewPermissionName: 'ADMINcityVIEW',
                        fieldIsEditPermissionName: 'ADMINcityUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 19,
                        fieldName: 'Employee Level',
                        fieldIsViewPermissionName: 'ADMINemployeeLevelVIEW',
                        fieldIsEditPermissionName: 'ADMINemployeeLevelUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 20,
                        fieldName: 'Created At',
                        fieldIsViewPermissionName: 'ADMINcreatedAtVIEW',
                        fieldIsEditPermissionName: 'ADMINcreatedAtUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 21,
                        fieldName: 'Updated At',
                        fieldIsViewPermissionName: 'ADMINupdatedAtVIEW',
                        fieldIsEditPermissionName: 'ADMINupdatedAtUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 22,
                        fieldName: 'Created By',
                        fieldIsViewPermissionName: 'ADMINcreatedByVIEW',
                        fieldIsEditPermissionName: 'ADMINcreatedByUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 23,
                        fieldName: 'Updated By',
                        fieldIsViewPermissionName: 'ADMINupdatedByVIEW',
                        fieldIsEditPermissionName: 'ADMINupdatedByUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 24,
                        fieldName: 'Profile Image',
                        fieldIsViewPermissionName: 'ADMINprofileImageView',
                        fieldIsEditPermissionName: 'ADMINprofileImageUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 25,
                        fieldName: 'AdhaarCard Number',
                        fieldIsViewPermissionName: 'ADMINadhaarCardNumberVIEW',
                        fieldIsEditPermissionName: 'ADMINadhaarCardNumberUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 26,
                        fieldName: 'AdhaarCard Photo',
                        fieldIsViewPermissionName: 'ADMINadhaarCardPhotoVIEW',
                        fieldIsEditPermissionName: 'ADMINadhaarCardPhotoUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 27,
                        fieldName: 'PanCard Number',
                        fieldIsViewPermissionName: 'ADMINpanCardNumberVIEW',
                        fieldIsEditPermissionName: 'ADMINpanCardNumberUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 28,
                        fieldName: 'PanCard Photo',
                        fieldIsViewPermissionName: 'ADMINpanCardPhotoVIEW',
                        fieldIsEditPermissionName: 'ADMINpanCardPhotoUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 29,
                        fieldName: 'Module Names List',
                        fieldIsViewPermissionName: 'ADMINmoduleNamesListView',
                        fieldIsEditPermissionName: 'ADMINmoduleNamesListUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 30,
                        fieldName: 'Role Name',
                        fieldIsViewPermissionName: 'ADMINroleNameVIEW',
                        fieldIsEditPermissionName: 'ADMINroleNameUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 31,
                        fieldName: 'Status',
                        fieldIsViewPermissionName: 'ADMINstatusVIEW',
                        fieldIsEditPermissionName: 'ADMINstatusUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 32,
                        fieldName: 'Create',
                        fieldIsViewPermissionName: 'ADMINcreateVIEW',
                        fieldIsEditPermissionName: 'ADMINcreateUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 33,
                        fieldName: 'Read',
                        fieldIsViewPermissionName: 'ADMINreadVIEW',
                        fieldIsEditPermissionName: 'ADMINreadUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 34,
                        fieldName: 'Update',
                        fieldIsViewPermissionName: 'ADMINupdateVIEW',
                        fieldIsEditPermissionName: 'ADMINupdateUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 35,
                        fieldName: 'Download',
                        fieldIsViewPermissionName: 'ADMINdownloadVIEW',
                        fieldIsEditPermissionName: 'ADMINdownloadUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 36,
                        fieldName: 'Team Name',
                        fieldIsViewPermissionName: 'ADMINteamNameVIEW',
                        fieldIsEditPermissionName: 'ADMINteamNameUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 37,
                        fieldName: 'Reporting Manager',
                        fieldIsViewPermissionName: 'ADMINreportingManagerVIEW',
                        fieldIsEditPermissionName: 'ADMINreportingManagerUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 38,
                        fieldName: 'Team Lead',
                        fieldIsViewPermissionName: 'ADMINteamLeadVIEW',
                        fieldIsEditPermissionName: 'ADMINteamLeadUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 39,
                        fieldName: 'Team Role',
                        fieldIsViewPermissionName: 'ADMINteamRoleVIEW',
                        fieldIsEditPermissionName: 'ADMINteamRoleUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 40,
                        fieldName: 'Remarks',
                        fieldIsViewPermissionName: 'ADMINremarksVIEW',
                        fieldIsEditPermissionName: 'ADMINremarksUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 41,
                        fieldName: 'Team member count',
                        fieldIsViewPermissionName: 'ADMINteamMemberCountVIEW',
                        fieldIsEditPermissionName: 'ADMINteamMemberCountUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 42,
                        fieldName: 'Status',
                        fieldIsViewPermissionName: 'ADMINstatusVIEW',
                        fieldIsEditPermissionName: 'ADMINstatusUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 43,
                        fieldName: 'Ticket Id Key',
                        fieldIsViewPermissionName: 'ADMINticketIdKeyVIEW',
                        fieldIsEditPermissionName: 'ADMINticketIdKeyUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 44,
                        fieldName: 'Ticket Type',
                        fieldIsViewPermissionName: 'ADMINticketTypeVIEW',
                        fieldIsEditPermissionName: 'ADMINticketTypeUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 45,
                        fieldName: 'Title',
                        fieldIsViewPermissionName: 'ADMINtitleVIEW',
                        fieldIsEditPermissionName: 'ADMINtitleUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 46,
                        fieldName: 'Description',
                        fieldIsViewPermissionName: 'ADMINdescriptionVIEW',
                        fieldIsEditPermissionName: 'ADMINdescriptionUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 47,
                        fieldName: 'Raised by',
                        fieldIsViewPermissionName: 'ADMINraisedByVIEW',
                        fieldIsEditPermissionName: 'ADMINraisedByUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 48,
                        fieldName: 'Raised Against',
                        fieldIsViewPermissionName: 'ADMINraisedAgainstVIEW',
                        fieldIsEditPermissionName: 'ADMINraisedAgainstUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 49,
                        fieldName: 'Raised Against Type',
                        fieldIsViewPermissionName: 'ADMINraisedAgainstTypeVIEW',
                        fieldIsEditPermissionName: 'ADMINraisedAgainstTypeUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 50,
                        fieldName: 'Closed By',
                        fieldIsViewPermissionName: 'ADMINclosedByVIEW',
                        fieldIsEditPermissionName: 'ADMINclosedByUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 51,
                        fieldName: 'Closed At',
                        fieldIsViewPermissionName: 'ADMINclosedAtVIEW',
                        fieldIsEditPermissionName: 'ADMINclosedAtUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 52,
                        fieldName: 'Priority',
                        fieldIsViewPermissionName: 'ADMINpriorityVIEW',
                        fieldIsEditPermissionName: 'ADMINpriorityUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 53,
                        fieldName: 'Status',
                        fieldIsViewPermissionName: 'ADMINstatusVIEW',
                        fieldIsEditPermissionName: 'ADMINstatusUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 54,
                        fieldName: 'Tickets Against Graph',
                        fieldIsViewPermissionName: 'ADMINticketsAgainstGraphVIEW',
                        fieldIsEditPermissionName: 'ADMINticketsAgainstGraphUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 55,
                        fieldName: 'Tickets Analysis Graph',
                        fieldIsViewPermissionName: 'ADMINticketsAnalysisGraphVIEW',
                        fieldIsEditPermissionName: 'ADMINticketsAnalysisGraphUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 56,
                        fieldName: 'Level',
                        fieldIsViewPermissionName: 'ADMINlevelVIEW',
                        fieldIsEditPermissionName: 'ADMINlevelUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 57,
                        fieldName: 'Message',
                        fieldIsViewPermissionName: 'ADMINmessageVIEW',
                        fieldIsEditPermissionName: 'ADMINmessageUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 58,
                        fieldName: 'Timestamp',
                        fieldIsViewPermissionName: 'ADMINtimestampVIEW',
                        fieldIsEditPermissionName: 'ADMINtimestampUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 59,
                        fieldName: 'Updated At',
                        fieldIsViewPermissionName: 'ADMINupdatedAtVIEW',
                        fieldIsEditPermissionName: 'ADMINupdatedAtUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 60,
                        fieldName: 'Updated By',
                        fieldIsViewPermissionName: 'ADMINupdatedByVIEW',
                        fieldIsEditPermissionName: 'ADMINupdatedByUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 61,
                        fieldName: 'Remarks',
                        fieldIsViewPermissionName: 'ADMINremarksVIEW',
                        fieldIsEditPermissionName: 'ADMINremarksUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 62,
                        fieldName: 'Verification Type',
                        fieldIsViewPermissionName: 'ADMINverificationTypeVIEW',
                        fieldIsEditPermissionName: 'ADMINverificationTypeUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 63,
                        fieldName: 'Verification Status',
                        fieldIsViewPermissionName: 'ADMINverificationStatusVIEW',
                        fieldIsEditPermissionName: 'ADMINverificationStatusUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 64,
                        fieldName: 'Verification Time',
                        fieldIsViewPermissionName: 'ADMINverificationTimeVIEW',
                        fieldIsEditPermissionName: 'ADMINverificationTimeUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 65,
                        fieldName: 'Is Verification Required',
                        fieldIsViewPermissionName: 'ADMINisVerificationRequiredVIEW',
                        fieldIsEditPermissionName: 'ADMINisVerificationRequiredUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 66,
                        fieldName: 'Remarks',
                        fieldIsViewPermissionName: 'ADMINremarksVIEW',
                        fieldIsEditPermissionName: 'ADMINremarksUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Create Admin',
                permissionObj: [
                    {
                        permissionIndex: 0,
                        permissionType: '',
                        permissionName: 'ADMINCREATE1',
                        permissionDescription: 'Admin create update successfully',
                        permissionStatus: 1,
                    },
                    {
                        permissionIndex: 1,
                        permissionType: '',
                        permissionName: 'ADMINREAD',
                        permissionDescription: 'Admin read',
                        permissionStatus: 2,
                    },
                    {
                        permissionIndex: 2,
                        permissionType: '',
                        permissionName: 'ADMINUPDATE',
                        permissionDescription: 'Admin update',
                        permissionStatus: 1,
                    },
                    {
                        permissionIndex: 3,
                        permissionType: '',
                        permissionName: 'ADMINARCHIVE',
                        permissionDescription: 'Admin archive',
                        permissionStatus: 1,
                    },
                    {
                        permissionIndex: 4,
                        permissionType: '',
                        permissionName: 'ADMINDOWNLOAD',
                        permissionDescription: 'Admin download',
                        permissionStatus: 2,
                    },
                ],
                fieldObj: [
                    {
                        fieldIndex: 0,
                        fieldName: 'Role Type',
                        fieldIsViewPermissionName: 'ADMINfkroleTypeVIEW',
                        fieldIsEditPermissionName: 'ADMINfkroleTypeUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 1,
                        fieldName: 'Admin Profile Status',
                        fieldIsViewPermissionName: 'ADMINfkadminProfileStatusVIEW',
                        fieldIsEditPermissionName: 'ADMINfkadminProfileStatusUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 2,
                        fieldName: 'Service City',
                        fieldIsViewPermissionName: 'ADMINfkserviceCityVIEW',
                        fieldIsEditPermissionName: 'ADMINfkserviceCityUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 3,
                        fieldName: 'First Name',
                        fieldIsViewPermissionName: 'ADMINfirstNameVIEW',
                        fieldIsEditPermissionName: 'ADMINfirstNameUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 4,
                        fieldName: 'Middle Name',
                        fieldIsViewPermissionName: 'ADMINmiddleNameVIEW',
                        fieldIsEditPermissionName: 'ADMINmiddleNameUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 5,
                        fieldName: 'Last Name',
                        fieldIsViewPermissionName: 'ADMINlastNameVIEW',
                        fieldIsEditPermissionName: 'ADMINlastNameUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 6,
                        fieldName: 'Email',
                        fieldIsViewPermissionName: 'ADMINemailVIEW',
                        fieldIsEditPermissionName: 'ADMINemailUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 7,
                        fieldName: 'Phone Number',
                        fieldIsViewPermissionName: 'ADMINphoneNumberVIEW',
                        fieldIsEditPermissionName: 'ADMINphoneNumberUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 8,
                        fieldName: 'Date of Birth',
                        fieldIsViewPermissionName: 'ADMINdateOfBirthVIEW',
                        fieldIsEditPermissionName: 'ADMINdateOfBirthUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 9,
                        fieldName: 'Created by',
                        fieldIsViewPermissionName: 'ADMINcreatedByVIEW',
                        fieldIsEditPermissionName: 'ADMINcreatedByUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 10,
                        fieldName: 'Gender',
                        fieldIsViewPermissionName: 'ADMINgenderVIEW',
                        fieldIsEditPermissionName: 'ADMINgenderUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 11,
                        fieldName: 'Reporting Manager',
                        fieldIsViewPermissionName: 'ADMINreportingManagerVIEW',
                        fieldIsEditPermissionName: 'ADMINreportingManagerUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 12,
                        fieldName: 'Admin team',
                        fieldIsViewPermissionName: 'ADMINadminTeamVIEW',
                        fieldIsEditPermissionName: 'ADMINadminTeamUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 13,
                        fieldName: 'Team roles',
                        fieldIsViewPermissionName: 'ADMINteamRolesVIEW',
                        fieldIsEditPermissionName: 'ADMINteamRolesUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 14,
                        fieldName: 'Admin team Manager',
                        fieldIsViewPermissionName: 'ADMINadminTeamManagerVIEW',
                        fieldIsEditPermissionName: 'ADMINadminTeamManagerUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 15,
                        fieldName: 'Alternate Phone Number',
                        fieldIsViewPermissionName: 'ADMINalternatePhoneNumberVIEW',
                        fieldIsEditPermissionName: 'ADMINalternatePhoneNumberUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 16,
                        fieldName: 'Country',
                        fieldIsViewPermissionName: 'ADMINcountryVIEW',
                        fieldIsEditPermissionName: 'ADMINcountryUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 17,
                        fieldName: 'State',
                        fieldIsViewPermissionName: 'ADMINstateVIEW',
                        fieldIsEditPermissionName: 'ADMINstateUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 18,
                        fieldName: 'City',
                        fieldIsViewPermissionName: 'ADMINcityVIEW',
                        fieldIsEditPermissionName: 'ADMINcityUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 19,
                        fieldName: 'Employee Level',
                        fieldIsViewPermissionName: 'ADMINemployeeLevelVIEW',
                        fieldIsEditPermissionName: 'ADMINemployeeLevelUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 20,
                        fieldName: 'Created At',
                        fieldIsViewPermissionName: 'ADMINcreatedAtVIEW',
                        fieldIsEditPermissionName: 'ADMINcreatedAtUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 21,
                        fieldName: 'Updated At',
                        fieldIsViewPermissionName: 'ADMINupdatedAtVIEW',
                        fieldIsEditPermissionName: 'ADMINupdatedAtUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 22,
                        fieldName: 'Created By',
                        fieldIsViewPermissionName: 'ADMINcreatedByVIEW',
                        fieldIsEditPermissionName: 'ADMINcreatedByUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 23,
                        fieldName: 'Updated By',
                        fieldIsViewPermissionName: 'ADMINupdatedByVIEW',
                        fieldIsEditPermissionName: 'ADMINupdatedByUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 24,
                        fieldName: 'Profile Image',
                        fieldIsViewPermissionName: 'ADMINprofileImageView',
                        fieldIsEditPermissionName: 'ADMINprofileImageUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 25,
                        fieldName: 'AdhaarCard Number',
                        fieldIsViewPermissionName: 'ADMINadhaarCardNumberVIEW',
                        fieldIsEditPermissionName: 'ADMINadhaarCardNumberUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 26,
                        fieldName: 'AdhaarCard Photo',
                        fieldIsViewPermissionName: 'ADMINadhaarCardPhotoVIEW',
                        fieldIsEditPermissionName: 'ADMINadhaarCardPhotoUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 27,
                        fieldName: 'PanCard Number',
                        fieldIsViewPermissionName: 'ADMINpanCardNumberVIEW',
                        fieldIsEditPermissionName: 'ADMINpanCardNumberUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 28,
                        fieldName: 'PanCard Photo',
                        fieldIsViewPermissionName: 'ADMINpanCardPhotoVIEW',
                        fieldIsEditPermissionName: 'ADMINpanCardPhotoUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 29,
                        fieldName: 'Module Names List',
                        fieldIsViewPermissionName: 'ADMINmoduleNamesListView',
                        fieldIsEditPermissionName: 'ADMINmoduleNamesListUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 30,
                        fieldName: 'Role Name',
                        fieldIsViewPermissionName: 'ADMINroleNameVIEW',
                        fieldIsEditPermissionName: 'ADMINroleNameUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 31,
                        fieldName: 'Status',
                        fieldIsViewPermissionName: 'ADMINstatusVIEW',
                        fieldIsEditPermissionName: 'ADMINstatusUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 32,
                        fieldName: 'Create',
                        fieldIsViewPermissionName: 'ADMINcreateVIEW',
                        fieldIsEditPermissionName: 'ADMINcreateUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 33,
                        fieldName: 'Read',
                        fieldIsViewPermissionName: 'ADMINreadVIEW',
                        fieldIsEditPermissionName: 'ADMINreadUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 34,
                        fieldName: 'Update',
                        fieldIsViewPermissionName: 'ADMINupdateVIEW',
                        fieldIsEditPermissionName: 'ADMINupdateUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 35,
                        fieldName: 'Download',
                        fieldIsViewPermissionName: 'ADMINdownloadVIEW',
                        fieldIsEditPermissionName: 'ADMINdownloadUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 36,
                        fieldName: 'Team Name',
                        fieldIsViewPermissionName: 'ADMINteamNameVIEW',
                        fieldIsEditPermissionName: 'ADMINteamNameUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 37,
                        fieldName: 'Reporting Manager',
                        fieldIsViewPermissionName: 'ADMINreportingManagerVIEW',
                        fieldIsEditPermissionName: 'ADMINreportingManagerUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 38,
                        fieldName: 'Team Lead',
                        fieldIsViewPermissionName: 'ADMINteamLeadVIEW',
                        fieldIsEditPermissionName: 'ADMINteamLeadUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 39,
                        fieldName: 'Team Role',
                        fieldIsViewPermissionName: 'ADMINteamRoleVIEW',
                        fieldIsEditPermissionName: 'ADMINteamRoleUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 40,
                        fieldName: 'Remarks',
                        fieldIsViewPermissionName: 'ADMINremarksVIEW',
                        fieldIsEditPermissionName: 'ADMINremarksUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 41,
                        fieldName: 'Team member count',
                        fieldIsViewPermissionName: 'ADMINteamMemberCountVIEW',
                        fieldIsEditPermissionName: 'ADMINteamMemberCountUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 42,
                        fieldName: 'Status',
                        fieldIsViewPermissionName: 'ADMINstatusVIEW',
                        fieldIsEditPermissionName: 'ADMINstatusUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 43,
                        fieldName: 'Ticket Id Key',
                        fieldIsViewPermissionName: 'ADMINticketIdKeyVIEW',
                        fieldIsEditPermissionName: 'ADMINticketIdKeyUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 44,
                        fieldName: 'Ticket Type',
                        fieldIsViewPermissionName: 'ADMINticketTypeVIEW',
                        fieldIsEditPermissionName: 'ADMINticketTypeUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 45,
                        fieldName: 'Title',
                        fieldIsViewPermissionName: 'ADMINtitleVIEW',
                        fieldIsEditPermissionName: 'ADMINtitleUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 46,
                        fieldName: 'Description',
                        fieldIsViewPermissionName: 'ADMINdescriptionVIEW',
                        fieldIsEditPermissionName: 'ADMINdescriptionUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 47,
                        fieldName: 'Raised by',
                        fieldIsViewPermissionName: 'ADMINraisedByVIEW',
                        fieldIsEditPermissionName: 'ADMINraisedByUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 48,
                        fieldName: 'Raised Against',
                        fieldIsViewPermissionName: 'ADMINraisedAgainstVIEW',
                        fieldIsEditPermissionName: 'ADMINraisedAgainstUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 49,
                        fieldName: 'Raised Against Type',
                        fieldIsViewPermissionName: 'ADMINraisedAgainstTypeVIEW',
                        fieldIsEditPermissionName: 'ADMINraisedAgainstTypeUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 50,
                        fieldName: 'Closed By',
                        fieldIsViewPermissionName: 'ADMINclosedByVIEW',
                        fieldIsEditPermissionName: 'ADMINclosedByUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 51,
                        fieldName: 'Closed At',
                        fieldIsViewPermissionName: 'ADMINclosedAtVIEW',
                        fieldIsEditPermissionName: 'ADMINclosedAtUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 52,
                        fieldName: 'Priority',
                        fieldIsViewPermissionName: 'ADMINpriorityVIEW',
                        fieldIsEditPermissionName: 'ADMINpriorityUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 53,
                        fieldName: 'Status',
                        fieldIsViewPermissionName: 'ADMINstatusVIEW',
                        fieldIsEditPermissionName: 'ADMINstatusUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 54,
                        fieldName: 'Tickets Against Graph',
                        fieldIsViewPermissionName: 'ADMINticketsAgainstGraphVIEW',
                        fieldIsEditPermissionName: 'ADMINticketsAgainstGraphUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 55,
                        fieldName: 'Tickets Analysis Graph',
                        fieldIsViewPermissionName: 'ADMINticketsAnalysisGraphVIEW',
                        fieldIsEditPermissionName: 'ADMINticketsAnalysisGraphUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 56,
                        fieldName: 'Level',
                        fieldIsViewPermissionName: 'ADMINlevelVIEW',
                        fieldIsEditPermissionName: 'ADMINlevelUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 57,
                        fieldName: 'Message',
                        fieldIsViewPermissionName: 'ADMINmessageVIEW',
                        fieldIsEditPermissionName: 'ADMINmessageUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 58,
                        fieldName: 'Timestamp',
                        fieldIsViewPermissionName: 'ADMINtimestampVIEW',
                        fieldIsEditPermissionName: 'ADMINtimestampUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 59,
                        fieldName: 'Updated At',
                        fieldIsViewPermissionName: 'ADMINupdatedAtVIEW',
                        fieldIsEditPermissionName: 'ADMINupdatedAtUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 60,
                        fieldName: 'Updated By',
                        fieldIsViewPermissionName: 'ADMINupdatedByVIEW',
                        fieldIsEditPermissionName: 'ADMINupdatedByUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 61,
                        fieldName: 'Remarks',
                        fieldIsViewPermissionName: 'ADMINremarksVIEW',
                        fieldIsEditPermissionName: 'ADMINremarksUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 62,
                        fieldName: 'Verification Type',
                        fieldIsViewPermissionName: 'ADMINverificationTypeVIEW',
                        fieldIsEditPermissionName: 'ADMINverificationTypeUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 63,
                        fieldName: 'Verification Status',
                        fieldIsViewPermissionName: 'ADMINverificationStatusVIEW',
                        fieldIsEditPermissionName: 'ADMINverificationStatusUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 64,
                        fieldName: 'Verification Time',
                        fieldIsViewPermissionName: 'ADMINverificationTimeVIEW',
                        fieldIsEditPermissionName: 'ADMINverificationTimeUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 65,
                        fieldName: 'Is Verification Required',
                        fieldIsViewPermissionName: 'ADMINisVerificationRequiredVIEW',
                        fieldIsEditPermissionName: 'ADMINisVerificationRequiredUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 66,
                        fieldName: 'Remarks',
                        fieldIsViewPermissionName: 'ADMINremarksVIEW',
                        fieldIsEditPermissionName: 'ADMINremarksUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Admin Teams',
                permissionObj: [
                    {
                        permissionIndex: 0,
                        permissionType: '',
                        permissionName: 'ADMINCREATE1',
                        permissionDescription: 'Admin create update successfully',
                        permissionStatus: 1,
                    },
                    {
                        permissionIndex: 1,
                        permissionType: '',
                        permissionName: 'ADMINREAD',
                        permissionDescription: 'Admin read',
                        permissionStatus: 2,
                    },
                    {
                        permissionIndex: 2,
                        permissionType: '',
                        permissionName: 'ADMINUPDATE',
                        permissionDescription: 'Admin update',
                        permissionStatus: 1,
                    },
                    {
                        permissionIndex: 3,
                        permissionType: '',
                        permissionName: 'ADMINARCHIVE',
                        permissionDescription: 'Admin archive',
                        permissionStatus: 1,
                    },
                    {
                        permissionIndex: 4,
                        permissionType: '',
                        permissionName: 'ADMINDOWNLOAD',
                        permissionDescription: 'Admin download',
                        permissionStatus: 2,
                    },
                ],
                fieldObj: [
                    {
                        fieldIndex: 0,
                        fieldName: 'fkroleType',
                        fieldIsViewPermissionName: 'ADMINfkroleTypeVIEW',
                        fieldIsEditPermissionName: 'ADMINfkroleTypeUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 1,
                        fieldName: 'fkserviceCity',
                        fieldIsViewPermissionName: 'ADMINfkserviceCityVIEW',
                        fieldIsEditPermissionName: 'ADMINfkserviceCityUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 2,
                        fieldName: 'profileImage',
                        fieldIsViewPermissionName: 'ADMINprofileImageVIEW',
                        fieldIsEditPermissionName: 'ADMINprofileImageUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 3,
                        fieldName: 'firstName',
                        fieldIsViewPermissionName: 'ADMINfirstNameVIEW',
                        fieldIsEditPermissionName: 'ADMINfirstNameUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 4,
                        fieldName: 'middleName',
                        fieldIsViewPermissionName: 'ADMINmiddleNameVIEW',
                        fieldIsEditPermissionName: 'ADMINmiddleNameUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 5,
                        fieldName: 'lastName',
                        fieldIsViewPermissionName: 'ADMINlastNameVIEW',
                        fieldIsEditPermissionName: 'ADMINlastNameUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Create Admin Teams',
                permissionObj: [
                    {
                        permissionIndex: 0,
                        permissionType: '',
                        permissionName: 'ADMINCREATE1',
                        permissionDescription: 'Admin create update successfully',
                        permissionStatus: 1,
                    },
                    {
                        permissionIndex: 1,
                        permissionType: '',
                        permissionName: 'ADMINREAD',
                        permissionDescription: 'Admin read',
                        permissionStatus: 2,
                    },
                    {
                        permissionIndex: 2,
                        permissionType: '',
                        permissionName: 'ADMINUPDATE',
                        permissionDescription: 'Admin update',
                        permissionStatus: 1,
                    },
                    {
                        permissionIndex: 3,
                        permissionType: '',
                        permissionName: 'ADMINARCHIVE',
                        permissionDescription: 'Admin archive',
                        permissionStatus: 1,
                    },
                    {
                        permissionIndex: 4,
                        permissionType: '',
                        permissionName: 'ADMINDOWNLOAD',
                        permissionDescription: 'Admin download',
                        permissionStatus: 2,
                    },
                ],
                fieldObj: [
                    {
                        fieldIndex: 0,
                        fieldName: 'fkroleType',
                        fieldIsViewPermissionName: 'ADMINfkroleTypeVIEW',
                        fieldIsEditPermissionName: 'ADMINfkroleTypeUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 1,
                        fieldName: 'fkserviceCity',
                        fieldIsViewPermissionName: 'ADMINfkserviceCityVIEW',
                        fieldIsEditPermissionName: 'ADMINfkserviceCityUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 2,
                        fieldName: 'profileImage',
                        fieldIsViewPermissionName: 'ADMINprofileImageVIEW',
                        fieldIsEditPermissionName: 'ADMINprofileImageUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 3,
                        fieldName: 'firstName',
                        fieldIsViewPermissionName: 'ADMINfirstNameVIEW',
                        fieldIsEditPermissionName: 'ADMINfirstNameUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 4,
                        fieldName: 'middleName',
                        fieldIsViewPermissionName: 'ADMINmiddleNameVIEW',
                        fieldIsEditPermissionName: 'ADMINmiddleNameUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                    {
                        fieldIndex: 5,
                        fieldName: 'lastName',
                        fieldIsViewPermissionName: 'ADMINlastNameVIEW',
                        fieldIsEditPermissionName: 'ADMINlastNameUPDATE',
                        fieldIsViewPermissionStatus: 1,
                        fieldIsEditPermissionStatus: 1,
                    },
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Admin Tickets',
                permissionObj: [
                    // Add permissions for Admin Tickets here
                ],
                fieldObj: [
                    // Add field permissions for Admin Tickets here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Create Admin Tickets',
                permissionObj: [
                    // Add permissions for Admin Tickets here
                ],
                fieldObj: [
                    // Add field permissions for Admin Tickets here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Distributor',
                permissionObj: [
                    // Add permissions for Distributor here
                ],
                fieldObj: [
                    // Add field permissions for Distributor here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Create Distributor',
                permissionObj: [
                    // Add permissions for Distributor here
                ],
                fieldObj: [
                    // Add field permissions for Distributor here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Channel Partner API',
                permissionObj: [
                    // Add permissions for Channel Partner API here
                ],
                fieldObj: [
                    // Add field permissions for Channel Partner API here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Create Channel Partner API',
                permissionObj: [
                    // Add permissions for Channel Partner API here
                ],
                fieldObj: [
                    // Add field permissions for Channel Partner API here
                ],
                showFieldObjects: false,
            },

            {
                moduleName: 'Travel Agency',
                permissionObj: [
                    // Add permissions for Travel Agency here
                ],
                fieldObj: [
                    // Add field permissions for Travel Agency here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Vehicle',
                permissionObj: [
                    // Add permissions for Vehicle here
                ],
                fieldObj: [
                    // Add field permissions for Vehicle here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Driver',
                permissionObj: [
                    // Add permissions for Driver here
                ],
                fieldObj: [
                    // Add field permissions for Driver here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Subscription',
                permissionObj: [
                    // Add permissions for Subscription here
                ],
                fieldObj: [
                    // Add field permissions for Subscription here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Subs. Amt. Distribution',
                permissionObj: [
                    // Add permissions for Subs. Amt. Distribution here
                ],
                fieldObj: [
                    // Add field permissions for Subs. Amt. Distribution here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Subscription History',
                permissionObj: [
                    // Add permissions for Subscription History here
                ],
                fieldObj: [
                    // Add field permissions for Subscription History here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Subscription Invoice',
                permissionObj: [
                    // Add permissions for Subscription Invoice here
                ],
                fieldObj: [
                    // Add field permissions for Subscription Invoice here
                ],
                showFieldObjects: false,
            },

            {
                moduleName: 'Money Request',
                permissionObj: [
                    // Add permissions for Money Request here
                ],
                fieldObj: [
                    // Add field permissions for Money Request here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Wallet Master',
                permissionObj: [
                    // Add permissions for Wallet Master here
                ],
                fieldObj: [
                    // Add field permissions for Wallet Master here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Wallet History',
                permissionObj: [
                    // Add permissions for Wallet History here
                ],
                fieldObj: [
                    // Add field permissions for Wallet History here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Bank Account',
                permissionObj: [
                    // Add permissions for Bank Account here
                ],
                fieldObj: [
                    // Add field permissions for Bank Account here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'PG Transactions',
                permissionObj: [
                    // Add permissions for PG Transactions here
                ],
                fieldObj: [
                    // Add field permissions for PG Transactions here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'App. Offered Money',
                permissionObj: [
                    // Add permissions for App. Offered Money here
                ],
                fieldObj: [
                    // Add field permissions for App. Offered Money here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'App. Offered Money History',
                permissionObj: [
                    // Add permissions for App. Offered Money History here
                ],
                fieldObj: [
                    // Add field permissions for App. Offered Money History here
                ],
                showFieldObjects: false,
            },

            {
                moduleName: 'Bonus Master',
                permissionObj: [
                    // Add permissions for Bonus Master here
                ],
                fieldObj: [
                    // Add field permissions for Bonus Master here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Bonus History',
                permissionObj: [
                    // Add permissions for Bonus History here
                ],
                fieldObj: [
                    // Add field permissions for Bonus History here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Coupon Master',
                permissionObj: [
                    // Add permissions for Coupon Master here
                ],
                fieldObj: [
                    // Add field permissions for Coupon Master here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Coupon History',
                permissionObj: [
                    // Add permissions for Coupon History here
                ],
                fieldObj: [
                    // Add field permissions for Coupon History here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Referral Master',
                permissionObj: [
                    // Add permissions for Referral Master here
                ],
                fieldObj: [
                    // Add field permissions for Referral Master here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Referral History',
                permissionObj: [
                    // Add permissions for Referral History here
                ],
                fieldObj: [
                    // Add field permissions for Referral History here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Promocode Master',
                permissionObj: [
                    // Add permissions for Promocode Master here
                ],
                fieldObj: [
                    // Add field permissions for Promocode Master here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Promocode History',
                permissionObj: [
                    // Add permissions for Promocode History here
                ],
                fieldObj: [
                    // Add field permissions for Promocode History here
                ],
                showFieldObjects: false,
            },

            {
                moduleName: 'Vehicle Types',
                permissionObj: [
                    // Add permissions for Vehicle Types here
                ],
                fieldObj: [
                    // Add field permissions for Vehicle Types here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Vehicle Fare Master',
                permissionObj: [
                    // Add permissions for Vehicle Fare Master here
                ],
                fieldObj: [
                    // Add field permissions for Vehicle Fare Master here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Bookings',
                permissionObj: [
                    // Add permissions for Bookings here
                ],
                fieldObj: [
                    // Add field permissions for Bookings here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Trips',
                permissionObj: [
                    // Add permissions for Trips here
                ],
                fieldObj: [
                    // Add field permissions for Trips here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Booking Amt Distribution',
                permissionObj: [
                    // Add permissions for Booking Amt Distribution here
                ],
                fieldObj: [
                    // Add field permissions for Booking Amt Distribution here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Tickets',
                permissionObj: [
                    // Add permissions for Tickets here
                ],
                fieldObj: [
                    // Add field permissions for Tickets here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Trips Invoice',
                permissionObj: [
                    // Add permissions for Trips Invoice here
                ],
                fieldObj: [
                    // Add field permissions for Trips Invoice here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Rider User',
                permissionObj: [
                    // Add permissions for Rider User here
                ],
                fieldObj: [
                    // Add field permissions for Rider User here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Settings Panel',
                permissionObj: [
                    // Add permissions for Settings Panel here
                ],
                fieldObj: [
                    // Add field permissions for Settings Panel here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Email Template',
                permissionObj: [
                    // Add permissions for Email Template here
                ],
                fieldObj: [
                    // Add field permissions for Email Template here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Reset Password',
                permissionObj: [
                    // Add permissions for Reset Password here
                ],
                fieldObj: [
                    // Add field permissions for Reset Password here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Cancellation Settings',
                permissionObj: [
                    // Add permissions for Cancellation Settings here
                ],
                fieldObj: [
                    // Add field permissions for Cancellation Settings here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Referral Settings',
                permissionObj: [
                    // Add permissions for Referral Settings here
                ],
                fieldObj: [
                    // Add field permissions for Referral Settings here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Server Config',
                permissionObj: [
                    // Add permissions for Server Config here
                ],
                fieldObj: [
                    // Add field permissions for Server Config here
                ],
                showFieldObjects: false,
            },

            {
                moduleName: 'Country',
                permissionObj: [
                    // Add permissions for Country here
                ],
                fieldObj: [
                    // Add field permissions for Country here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'State',
                permissionObj: [
                    // Add permissions for State here
                ],
                fieldObj: [
                    // Add field permissions for State here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'City',
                permissionObj: [
                    // Add permissions for City here
                ],
                fieldObj: [
                    // Add field permissions for City here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Status',
                permissionObj: [
                    // Add permissions for Status here
                ],
                fieldObj: [
                    // Add field permissions for Status here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Service City',
                permissionObj: [
                    // Add permissions for Service City here
                ],
                fieldObj: [
                    // Add field permissions for Service City here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Ticket Type',
                permissionObj: [
                    // Add permissions for Ticket Type here
                ],
                fieldObj: [
                    // Add field permissions for Ticket Type here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Admin Role',
                permissionObj: [
                    // Add permissions for Admin Role here
                ],
                fieldObj: [
                    // Add field permissions for Admin Role here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Module Master',
                permissionObj: [
                    // Add permissions for Module Master here
                ],
                fieldObj: [
                    // Add field permissions for Module Master here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Document Type',
                permissionObj: [
                    // Add permissions for Document Type here
                ],
                fieldObj: [
                    // Add field permissions for Document Type here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Channel Partner Type',
                permissionObj: [
                    // Add permissions for Channel Partner Type here
                ],
                fieldObj: [
                    // Add field permissions for Channel Partner Type here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Employee Level',
                permissionObj: [
                    // Add permissions for Employee Level here
                ],
                fieldObj: [
                    // Add field permissions for Employee Level here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Company Type',
                permissionObj: [
                    // Add permissions for Company Type here
                ],
                fieldObj: [
                    // Add field permissions for Company Type here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Vehicle Utility',
                permissionObj: [
                    // Add permissions for Vehicle Utility here
                ],
                fieldObj: [
                    // Add field permissions for Vehicle Utility here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'App Language',
                permissionObj: [
                    // Add permissions for App Language here
                ],
                fieldObj: [
                    // Add field permissions for App Language here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Cancellation Reasons',
                permissionObj: [
                    // Add permissions for Cancellation Reasons here
                ],
                fieldObj: [
                    // Add field permissions for Cancellation Reasons here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Feedback Reasons',
                permissionObj: [
                    // Add permissions for Feedback Reasons here
                ],
                fieldObj: [
                    // Add field permissions for Feedback Reasons here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Currency Management',
                permissionObj: [
                    // Add permissions for Currency Management here
                ],
                fieldObj: [
                    // Add field permissions for Currency Management here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Office Details',
                permissionObj: [
                    // Add permissions for Office Details here
                ],
                fieldObj: [
                    // Add field permissions for Office Details here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Priority',
                permissionObj: [
                    // Add permissions for Priority here
                ],
                fieldObj: [
                    // Add field permissions for Priority here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Trip Payments',
                permissionObj: [
                    // Add permissions for Trip Payments here
                ],
                fieldObj: [
                    // Add field permissions for Trip Payments here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Driver Duty Report',
                permissionObj: [
                    // Add permissions for Driver Duty Report here
                ],
                fieldObj: [
                    // Add field permissions for Driver Duty Report here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Trip Promo Discounts',
                permissionObj: [
                    // Add permissions for Trip Promo Discounts here
                ],
                fieldObj: [
                    // Add field permissions for Trip Promo Discounts here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Driver Payments',
                permissionObj: [
                    // Add permissions for Driver Payments here
                ],
                fieldObj: [
                    // Add field permissions for Driver Payments here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Rentails TnC',
                permissionObj: [
                    // Add permissions for Rentails TnC here
                ],
                fieldObj: [
                    // Add field permissions for Rentails TnC here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Outstations TnC',
                permissionObj: [
                    // Add permissions for Outstations TnC here
                ],
                fieldObj: [
                    // Add field permissions for Outstations TnC here
                ],
                showFieldObjects: false,
            },

            {
                moduleName: 'Heat Map',
                permissionObj: [
                    // Add permissions for Heat Map here
                ],
                fieldObj: [
                    // Add field permissions for Heat Map here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Gods View',
                permissionObj: [
                    // Add permissions for Gods View here
                ],
                fieldObj: [
                    // Add field permissions for Gods View here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Drivers Tracking',
                permissionObj: [
                    // Add permissions for Drivers Tracking here
                ],
                fieldObj: [
                    // Add field permissions for Drivers Tracking here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Colors',
                permissionObj: [
                    // Add permissions for Colors here
                ],
                fieldObj: [
                    // Add field permissions for Colors here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Years',
                permissionObj: [
                    // Add permissions for Years here
                ],
                fieldObj: [
                    // Add field permissions for Years here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'About Us',
                permissionObj: [
                    // Add permissions for About Us here
                ],
                fieldObj: [
                    // Add field permissions for About Us here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Rider Privacy',
                permissionObj: [
                    // Add permissions for Rider Privacy here
                ],
                fieldObj: [
                    // Add field permissions for Rider Privacy here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Rider Terms And Conditions',
                permissionObj: [
                    // Add permissions for Rider Terms And Conditions here
                ],
                fieldObj: [
                    // Add field permissions for Rider Terms And Conditions here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Driver Terms and Conditions',
                permissionObj: [
                    // Add permissions for Driver Terms and Conditions here
                ],
                fieldObj: [
                    // Add field permissions for Driver Terms and Conditions here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Email',
                permissionObj: [
                    // Add permissions for Email here
                ],
                fieldObj: [
                    // Add field permissions for Email here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Notification',
                permissionObj: [
                    // Add permissions for Notification here
                ],
                fieldObj: [
                    // Add field permissions for Notification here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'SoS',
                permissionObj: [
                    // Add permissions for SoS here
                ],
                fieldObj: [
                    // Add field permissions for SoS here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Community',
                permissionObj: [
                    // Add permissions for Community here
                ],
                fieldObj: [
                    // Add field permissions for Community here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Users',
                permissionObj: [
                    // Add permissions for Users here
                ],
                fieldObj: [
                    // Add field permissions for Users here
                ],
                showFieldObjects: false,
            },
            {
                moduleName: 'Category',
                permissionObj: [
                    // Add permissions for Category here
                ],
                fieldObj: [
                    // Add field permissions for Category here
                ],
                showFieldObjects: false,
            },
        ];
        setPermissions(permissionData);
        setPermissionTypes(['CREATE', 'READ', 'UPDATE', 'ARCHIVE', 'DOWNLOAD']);
    }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const permissionData = await getPermissionData();
    //             setPermissions(permissionData);

    //             const types = permissionData.length > 0 ? permissionData[0].permissionObj.map((permission: any) => permission.permissionType) : [];
    //             setPermissionTypes(types);
    //         } catch (error) {
    //             console.error('Error fetching permission data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const [prevPermissions, setPrevPermissions] = useState<any[]>([]);

    useEffect(() => {
        const isPermissionsChanged = JSON.stringify(prevPermissions) !== JSON.stringify(permissions);

        if (isPermissionsChanged) {
            updatePermissionData(permissions)
                .then(() => {
                    console.log('Permission data updated successfully.');
                    setPrevPermissions(permissions);
                })
                .catch((error) => {
                    console.error('Error updating permissions:', error.message);
                });
        }
    }, [permissions, prevPermissions]);

    const handlePermissionCheckboxToggle = (moduleId: string, permissionType: string) => {
        const updatedPermissions = permissions.map((module) => {
            if (module._id === moduleId) {
                module.permissionObj = module.permissionObj.map((permission: { permissionType: string; permissionStatus: boolean }) => {
                    if (permission.permissionType === permissionType) {
                        permission.permissionStatus = !permission.permissionStatus;
                    }
                    return permission;
                });
            }
            return module;
        });

        setPermissions(updatedPermissions);
    };

    const handleFieldViewCheckboxToggle = (moduleId: string, fieldName: string) => {
        const updatedPermissions = permissions.map((module) => {
            if (module._id === moduleId) {
                module.fieldObj = module.fieldObj.map((field: { fieldName: string; fieldIsViewPermissionStatus: boolean }) => {
                    if (field.fieldName === fieldName) {
                        field.fieldIsViewPermissionStatus = !field.fieldIsViewPermissionStatus;
                    }
                    return field;
                });
            }
            return module;
        });

        setPermissions(updatedPermissions);
    };

    const handleFieldEditCheckboxToggle = (moduleId: string, fieldName: string) => {
        const updatedPermissions = permissions.map((module) => {
            if (module._id === moduleId) {
                module.fieldObj = module.fieldObj.map((field: { fieldName: string; fieldIsEditPermissionStatus: boolean }) => {
                    if (field.fieldName === fieldName) {
                        field.fieldIsEditPermissionStatus = !field.fieldIsEditPermissionStatus;
                    }
                    return field;
                });
            }
            return module;
        });

        setPermissions(updatedPermissions);
    };

    const toggleFieldObjectsVisibility = (moduleId: string) => {
        const updatedPermissions = permissions.map((module) => {
            if (module._id === moduleId) {
                module.showFieldObjects = !module.showFieldObjects;
            }
            return module;
        });

        setPermissions(updatedPermissions);
    };

    const handleCheckboxSubmit = async () => {
        try {
            const updatedPermissionObj = permissions.reduce((acc, module) => {
                module.permissionObj.forEach((permission: any) => {
                    if (!acc[permission.permissionName]) {
                        acc[permission.permissionName] = 0;
                    }
                    if (permission.permissionStatus) {
                        acc[permission.permissionName] = 1;
                    }
                });
                return acc;
            }, {});

            const updatedFieldObj: any = {};
            permissions.forEach((module: any) => {
                updatedFieldObj[module._id] = module.fieldObj.map((field: any) => ({
                    fieldName: field.fieldName,
                    fieldIsViewPermissionStatus: field.fieldIsViewPermissionStatus,
                    fieldIsEditPermissionStatus: field.fieldIsEditPermissionStatus,
                }));
            });

            const payload = {
                permissionObj: updatedPermissionObj,
                fieldObj: updatedFieldObj,
                roleName,
                employeeLevel,
            };

            console.log('Updated Permissions and Field Objects Payload:', payload);

            await updatePermissionData(payload);
            console.log('Permissions and Field Objects updated successfully!');
        } catch (error: any) {
            console.error('Error updating permissions and field objects:', error.message);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:flex justify-end gap-5">
                <div className={`lg:w-1/2 mt-6 `}>
                    <label htmlFor="search" className="block mb-1 text-md font-bold">
                        Search
                    </label>
                    <input type="text" className="form-input w-full" placeholder="Search..." />
                </div>
            </div>

            <div className={`mt-4   ${viewSpecific ? 'pointer-events-none' : ''}`} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <label>Permissions and Field Objects Grid</label>
                <table className="permission-grid">
                    <thead>
                        <tr>
                            <th>Modules</th>
                            {permissionTypes.map((permissionType, index) => (
                                <th key={index}>{permissionType}</th>
                            ))}
                            {/* <th>Download</th> */}
                            <th>Show/Hide</th>
                        </tr>
                    </thead>
                    <tbody>
                        {permissions.map((module) => (
                            <React.Fragment key={module._id}>
                                <tr>
                                    <td>{module.moduleName}</td>
                                    {permissionTypes.map((permissionType, index) => (
                                        <td key={index}>
                                            <input
                                                type="checkbox"
                                                className="form-check-input form-checkbox border border-black/50"
                                                // checked={module.permissionObj.some(
                                                //     (permission: { permissionType: string; permissionStatus: boolean }) => permission.permissionType === permissionType && permission.permissionStatus,
                                                // )}
                                                // onChange={() => handlePermissionCheckboxToggle(module._id, permissionType)}
                                            />
                                        </td>
                                    ))}
                                    <td>
                                        <p className="btn btn-primary mr-4" onClick={() => toggleFieldObjectsVisibility(module._id)}>
                                            {module.showFieldObjects ? <FaAngleUp /> : <FaAngleDown />}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={permissionTypes.length + 4}>
                                        {module.showFieldObjects && (
                                            <div>
                                                <h4>Field Objects:</h4>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Field Name</th>
                                                            <th>READ</th>
                                                            <th>WRITE</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {module.fieldObj.map((field: any) => (
                                                            <tr key={field._id}>
                                                                <td>{field.fieldName}</td>
                                                                <td>
                                                                    <label className="w-12 h-6 relative">
                                                                        <input
                                                                            type="checkbox"
                                                                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                                                            checked={field.fieldIsViewPermissionStatus}
                                                                            onChange={() => handleFieldViewCheckboxToggle(module._id, field.fieldName)}
                                                                        />
                                                                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                                                    </label>
                                                                </td>
                                                                <td>
                                                                    <label className="w-12 h-6 relative">
                                                                        <input
                                                                            type="checkbox"
                                                                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                                                            checked={field.fieldIsEditPermissionStatus}
                                                                            onChange={() => handleFieldEditCheckboxToggle(module._id, field.fieldName)}
                                                                        />
                                                                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                                                    </label>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PermissionModule;
