import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect, useState } from 'react';
import Dropdown from '../../components/Dropdown';
import IconHorizontalDots from '../Icon/IconHorizontalDots';
import IconChrome from '../Icon/IconChrome';
import IconSafari from '../Icon/IconSafari';
import IconGlobe from '../Icon/IconGlobe';
import IconCashBanknotes from '../Icon/IconCashBanknotes';
import IconDesktop from '../Icon/IconDesktop';
import IconMail from '../Icon/IconMail';
import IconPhoneCall from '../Icon/IconPhoneCall';

const Piechart = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [loading] = useState(false);

    //Sales By Category
    const salesByCategory: any = {
        series: [985, 737, 270],
        options: {
            chart: {
                type: 'donut',
                height: 460,
                fontFamily: 'Nunito, sans-serif',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 25,
                colors: isDark ? '#0e1726' : '#fff',
            },
            colors: isDark ? ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f'] : ['#e2a03f', '#5c1ac3', '#e7515a'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 50,
                offsetY: 20,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '12px',
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '12px',
                                color: isDark ? '#bfc9d4' : undefined,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#888ea8',
                                fontSize: '12px',
                                formatter: (w: any) => {
                                    return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                                        return a + b;
                                    }, 0);
                                },
                            },
                        },
                    },
                },
            },
            labels: ['Active', 'Inactive', 'Critical'],
            states: {
                hover: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
            },
        },
    };

    return (
        <div className="pt-5">
            <div className="grid xl:grid-cols-3 gap-6 mb-6">
                <div className="panel h-full xl:col-span-2">
                    <div className="flex items-start justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Tickets Statics</h5>
                    </div>

                    <div className="panel overflow-hidden">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-lg font-bold">Development Department</div>
                                <div className="text-success"> This Week</div>
                            </div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                >
                                    <ul>
                                        <li>
                                            <button type="button">All </button>
                                        </li>
                                        <li>
                                            <button type="button">Q A </button>
                                        </li>
                                        <li>
                                            <button type="button">Finance</button>
                                        </li>
                                        <li>
                                            <button type="button">Accounting</button>
                                        </li>
                                        <li>
                                            <button type="button">Marketing</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="relative mt-10">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                                <div>
                                    <div className="text-primary">Against</div>
                                    <div className="mt-2 font-semibold text-2xl">150</div>
                                </div>
                                <div>
                                    <div className="text-primary">Rised by</div>
                                    <div className="mt-2 font-semibold text-2xl">125</div>
                                </div>
                                <div>
                                    <div className="text-primary">Completed</div>
                                    <div className="mt-2 font-semibold text-2xl">25</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="panel overflow-hidden mt-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-lg font-bold">Priority Analysis by Department</div>
                                <div className="text-success"> This Week</div>
                            </div>
                            {/* <div className="dropdown">
                        <Dropdown
                            offset={[0, 5]}
                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                            btnClassName="hover:opacity-80"
                            button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                        >
                            <ul>
                                <li>
                                    <button type="button">Low Priority</button>
                                </li>
                            </ul>
                        </Dropdown>
                    </div> */}
                        </div>
                        <div className="relative mt-10">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                                <div>
                                    <div className="text-primary">Low Priority</div>
                                    <div className="mt-2 font-semibold text-2xl">50</div>
                                </div>
                                <div>
                                    <div className="text-primary">Medium Priority</div>
                                    <div className="mt-2 font-semibold text-2xl">125</div>
                                </div>
                                <div>
                                    <div className="text-primary">High Priority</div>
                                    <div className="mt-2 font-semibold text-2xl">45</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="panel h-full">
                    <div className="flex items-center mb-5 justify-between">
                        <h5 className="font-semibold text-lg dark:text-white-light">Tickets Status Report</h5>

                        <div className="dropdown">
                            <Dropdown placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`} button={<IconHorizontalDots className="w-5 h-5 text-black/70 dark:text-white/70 hover:!text-primary" />}>
                                <ul>
                                    <li>
                                        <button type="button">Today Report</button>
                                    </li>
                                    <li>
                                        <button type="button">Weekly Report</button>
                                    </li>
                                    <li>
                                        <button type="button">Monthly Report</button>
                                    </li>
                                    <li>
                                        <button type="button">Yearly Report</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>

                    <div>
                        <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                            {loading ? (
                                <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                    <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                </div>
                            ) : (
                                <ReactApexChart series={salesByCategory.series} options={salesByCategory.options} type="donut" height={460} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Piechart;
