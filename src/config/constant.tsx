// get all priority in ticket management.
export const getAllTicketPriority = () => {
    return [
        { id: 1, name: 'LOW' },
        { id: 2, name: 'MEDIUM' },
        { id: 3, name: 'HIGH' },
        { id: 4, name: 'VERYHIGH' },
    ];
};

export const getAllTicketType = () => {
    return [
        { id: 1, name: 'Rolesandpermissions' },
        { id: 2, name: 'changeservicecity' },
        { id: 3, name: 'transactionRequest' },
        { id: 4, name: 'statusRequest' },
        { id: 5, name: 'billingRequest' },
        { id: 6, name: 'tripRequest' },
        { id: 7, name: 'invoiceHistory' },
        { id: 8, name: 'userHistory' },
        { id: 9, name: 'logHistory' },
        { id: 10, name: 'documentVerification' },
        { id: 11, name: 'adminStatusRequest' },
    ];
};
