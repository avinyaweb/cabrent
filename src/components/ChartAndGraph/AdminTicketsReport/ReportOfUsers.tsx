import React from 'react';

const ReportOfUsers = () => {
    return (
        <div className="panel">
            <div className="mb-5 text-lg font-bold">Users Tickets</div>
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th className="ltr:rounded-l-md rtl:rounded-r-md">ID</th>
                            <th>Name</th>
                            <th>Total Tickes</th>
                            <th>Resolved</th>
                            <th>Pending</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="font-semibold">#01</td>
                            <td className="whitespace-nowrap">Channel Partner</td>
                            <td className="whitespace-nowrap">321</td>
                            <td className="whitespace-nowrap">222</td>
                            <td className="whitespace-nowrap">120</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">#02</td>
                            <td className="whitespace-nowrap">Admin</td>
                            <td className="whitespace-nowrap">221</td>
                            <td className="whitespace-nowrap">122</td>
                            <td className="whitespace-nowrap">70</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">#03</td>
                            <td className="whitespace-nowrap">Travel Agency</td>
                            <td className="whitespace-nowrap">421</td>
                            <td className="whitespace-nowrap">322</td>
                            <td className="whitespace-nowrap">220</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">#04</td>
                            <td className="whitespace-nowrap">Driver</td>
                            <td className="whitespace-nowrap">421</td>
                            <td className="whitespace-nowrap">342</td>
                            <td className="whitespace-nowrap">120</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">#05</td>
                            <td className="whitespace-nowrap">Distributor</td>
                            <td className="whitespace-nowrap">521</td>
                            <td className="whitespace-nowrap">322</td>
                            <td className="whitespace-nowrap">220</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportOfUsers;
