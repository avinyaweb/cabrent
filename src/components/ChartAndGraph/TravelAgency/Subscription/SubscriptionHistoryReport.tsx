import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import ReactApexChart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Dropdown from '@/components/Dropdown';
import IconHorizontalDots from '@/components/Icon/IconHorizontalDots';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconPlus from '@/components/Icon/IconPlus';
import IconEye from '@/components/Icon/IconEye';

const SubscriptionHistoryReport = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [loading] = useState(false);

    // pieChartOptions
    const pieChart: any = {
        series: [44, 55, 13, 43, 22],
        options: {
            chart: {
                height: 300,
                type: 'pie',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            labels: ['DriverPro Plus', 'RideReady Elite', 'CabConnect Premium', 'FleetGuardian Pro', 'DriveEase Gold'],
            colors: ['#4361ee', '#805dca', '#00ab55', '#e7515a', '#e2a03f'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                    },
                },
            ],
            stroke: {
                show: false,
            },
            legend: {
                position: 'bottom',
            },
        },
    };

    return (
        <>
            <div className="flex flex-col">
                <h5 className="font-semibold text-lg">Subscription Details</h5>
                <div className="flex flex-row items-center gap-1">
                    <div className="bg-success w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                    <h5 className=" text-sm text-green-500">Total Purchased ₹1933</h5>
                </div>
            </div>
            <div className=" mt-6 mb-6">
                <ReactApexChart series={pieChart.series} options={pieChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="pie" height={300} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">
                <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                    <div className="flex justify-between">
                        <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Total Purchased</div>
                        <div className="dropdown">
                            <Dropdown
                                offset={[0, 5]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="hover:opacity-80"
                                button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                            >
                                <ul className="text-black dark:text-white-dark">
                                    <li>
                                        <button type="button">Today</button>
                                    </li>
                                    <li>
                                        <button type="button">Weekly</button>
                                    </li>
                                    <li>
                                        <button type="button">Monthly</button>
                                    </li>
                                    <li>
                                        <button type="button">Yearly</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="flex items-center mt-5">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 5 </div>
                        <div className="badge bg-white/30">Today Report</div>
                    </div>
                    <div className="flex items-center font-semibold mt-5">
                        <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                        Kochi
                    </div>
                </div>

                {/* Sessions */}
                <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                    <div className="flex justify-between">
                        <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Active Subscription</div>
                        <div className="dropdown">
                            <Dropdown
                                offset={[0, 5]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="hover:opacity-80"
                                button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                            >
                                <ul className="text-black dark:text-white-dark">
                                    <li>
                                        <button type="button">Today</button>
                                    </li>
                                    <li>
                                        <button type="button">Weekly</button>
                                    </li>
                                    <li>
                                        <button type="button">Monthly</button>
                                    </li>
                                    <li>
                                        <button type="button">Yearly</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="flex items-center mt-5">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 25</div>
                        <div className="badge bg-white/30">Today Report</div>
                    </div>
                    <div className="flex items-center font-semibold mt-5">
                        <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                        Kochi
                    </div>
                </div>

                {/*  Time On-Site */}
                <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                    <div className="flex justify-between">
                        <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Inactive Subscription</div>
                        <div className="dropdown">
                            <Dropdown
                                offset={[0, 5]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="hover:opacity-80"
                                button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                            >
                                <ul className="text-black dark:text-white-dark">
                                    <li>
                                        <button type="button">Today</button>
                                    </li>
                                    <li>
                                        <button type="button">Weekly</button>
                                    </li>
                                    <li>
                                        <button type="button">Monthly</button>
                                    </li>
                                    <li>
                                        <button type="button">Yearly</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="flex items-center mt-5">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">3</div>
                        <div className="badge bg-white/30">Today Report</div>
                    </div>
                    <div className="flex items-center font-semibold mt-5">
                        <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                        Kochi
                    </div>
                </div>

                {/* Bounce Rate */}
                <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                    <div className="flex justify-between">
                        <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Total purchased Amount</div>
                        <div className="dropdown">
                            <Dropdown
                                offset={[0, 5]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="hover:opacity-80"
                                button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                            >
                                <ul className="text-black dark:text-white-dark">
                                    <li>
                                        <button type="button">Today</button>
                                    </li>
                                    <li>
                                        <button type="button">Weekly</button>
                                    </li>
                                    <li>
                                        <button type="button">Monthly</button>
                                    </li>
                                    <li>
                                        <button type="button">Yearly</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="flex items-center mt-5">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">1210 ₹</div>
                        <div className="badge bg-white/30">Today Report</div>
                    </div>
                    <div className="flex items-center font-semibold mt-5">
                        <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                        Kochi
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubscriptionHistoryReport;
