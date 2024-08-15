import toast from 'react-hot-toast';

interface FormData {
    dob: string;
    fk_serviceCity: string;
    profileImage: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    passwordHash: string;
    fk_adminTeam: string;
    gender: string;
    altPhoneNumber: string;
    country: string;
    state: string;
    city: string;
    employeeLevel: string;
    aadharCard: string;
    panCard: string;
}

export const validateForm = (formData: FormData): string | null => {
    const {
        dob,
        fk_serviceCity,
        profileImage,
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        passwordHash,
        fk_adminTeam,
        gender,
        altPhoneNumber,
        country,
        state,
        city,
        employeeLevel,
        aadharCard,
        panCard,
    } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const aadharRegex = /^[0-9]{12}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (
        !dob ||
        !fk_serviceCity ||
        !profileImage ||
        !firstName ||
        !middleName ||
        !lastName ||
        !emailRegex.test(email) ||
        !phoneRegex.test(phoneNumber) ||
        !passwordHash ||
        !fk_adminTeam ||
        !gender ||
        (altPhoneNumber && !phoneRegex.test(altPhoneNumber)) ||
        !country ||
        !state ||
        !city ||
        !employeeLevel ||
        !aadharRegex.test(aadharCard) ||
        !panRegex.test(panCard)
    ) {
        toast.error('Please fill out all fields correctly.');
    }

    return null;
};
