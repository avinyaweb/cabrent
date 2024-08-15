import React from 'react';

import ReactApexChart from 'react-apexcharts';
import IconBitcoin from '@/components/Icon/IconBitcoin';
import IconEthereum from '@/components/Icon/IconEthereum';
import IconLitecoin from '@/components/Icon/IconLitecoin';
import IconBinance from '@/components/Icon/IconBinance';
import IconTether from '@/components/Icon/IconTether';
import IconSolana from '@/components/Icon/IconSolana';

const StatusOfTickets = () => {
    //bitcoinoption
    const bitcoin: any = {
        series: [
            {
                data: [21, 9, 36, 12, 44, 25, 59, 41, 25, 66],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#00ab55'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //ethereumoption
    const ethereum: any = {
        series: [
            {
                data: [44, 25, 59, 41, 66, 25, 21, 9, 36, 12],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#e7515a'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //litecoinoption
    const litecoin: any = {
        series: [
            {
                data: [9, 21, 36, 12, 66, 25, 44, 25, 41, 59],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#00ab55'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //binanceoption
    const binance: any = {
        series: [
            {
                data: [25, 44, 25, 59, 41, 21, 36, 12, 19, 9],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#e7515a'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //tetheroption
    const tether: any = {
        series: [
            {
                data: [21, 59, 41, 44, 25, 66, 9, 36, 25, 12],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#00ab55'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //solanaoption
    const solana: any = {
        series: [
            {
                data: [21, -9, 36, -12, 44, 25, 59, -41, 66, -25],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ['#e7515a'],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    return (
        <div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/*  Favorites  */}
                <div>
                    <div className="flex items-center mb-5 font-bold">
                        <span className="text-lg">Status Of tickets</span>
                        <button type="button" className="ltr:ml-auto rtl:mr-auto text-primary hover:text-black dark:hover:text-white-dark"></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:mb-5 ">
                        {/*  Bitcoin  */}
                        <div className="panel">
                            <div className="flex items-center font-semibold mb-5">
                                <div className="shrink-0 w-10 h-10 rounded-full grid place-content-center">
                                    <IconBitcoin />
                                </div>
                                <div className="ltr:ml-2 rtl:mr-2">
                                    <h6 className="text-dark dark:text-white-light">Closed</h6>
                                    {/* <p className="text-white-dark text-xs">Bitcoin</p> */}
                                </div>
                            </div>
                            <div className="mb-5 overflow-hidden">
                                <ReactApexChart series={bitcoin.series} options={bitcoin.options} type="line" height={45} />
                            </div>
                            <div className="flex justify-between items-center font-bold text-base">
                                55<span className="text-success font-normal text-sm"></span>
                            </div>
                        </div>
                        {/*  Ethereum*/}
                        <div className="panel">
                            <div className="flex items-center font-semibold mb-5">
                                <div className="shrink-0 w-10 h-10 bg-warning rounded-full grid place-content-center p-2">
                                    <IconEthereum />
                                </div>
                                <div className="ltr:ml-2 rtl:mr-2">
                                    <h6 className="text-dark dark:text-white-light">Open</h6>
                                    {/* <p className="text-white-dark text-xs">Ethereum</p> */}
                                </div>
                            </div>
                            <div className="mb-5 overflow-hidden">
                                <ReactApexChart series={ethereum.series} options={ethereum.options} type="line" height={45} />
                            </div>
                            <div className="flex justify-between items-center font-bold text-base">
                                44<span className="text-danger font-normal text-sm"></span>
                            </div>
                        </div>
                        {/*  Litecoin*/}
                        <div className="panel">
                            <div className="flex items-center font-semibold mb-5">
                                <div className="shrink-0 w-10 h-10 rounded-full grid place-content-center">
                                    <IconLitecoin />
                                </div>
                                <div className="ltr:ml-2 rtl:mr-2">
                                    <h6 className="text-dark dark:text-white-light">Completed</h6>
                                    {/* <p className="text-white-dark text-xs">Litecoin</p> */}
                                </div>
                            </div>
                            <div className="mb-5 overflow-hidden">
                                <ReactApexChart series={litecoin.series} options={litecoin.options} type="line" height={45} />
                            </div>
                            <div className="flex justify-between items-center font-bold text-base">
                                13 <span className="text-success font-normal text-sm"></span>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Prices  */}
                <div>
                    <div className="flex items-center mb-5 font-bold">
                        <span className="text-lg">Sample</span>
                        <button type="button" className="ltr:ml-auto rtl:mr-auto text-primary hover:text-black dark:hover:text-white-dark"></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 mt-6">
                        <div className="panel">
                            <div className="flex items-center font-semibold mb-5">
                                <div className="shrink-0 w-10 h-10 rounded-full grid place-content-center">
                                    <IconBinance />
                                </div>
                                <div className="ltr:ml-2 rtl:mr-2">
                                    <h6 className="text-dark dark:text-white-light">Reopen</h6>
                                    {/* <p className="text-white-dark text-xs">Binance</p> */}
                                </div>
                            </div>
                            <div className="mb-5 overflow-hidden">
                                <ReactApexChart series={binance.series} options={binance.options} type="line" height={45} />
                            </div>
                            <div className="flex justify-between items-center font-bold text-base">
                                22 <span className="text-danger font-normal text-sm"></span>
                            </div>
                        </div>

                        <div className="panel">
                            <div className="flex items-center font-semibold mb-5">
                                <div className="shrink-0 w-10 h-10 rounded-full grid place-content-center">
                                    <IconTether />
                                </div>
                                <div className="ltr:ml-2 rtl:mr-2">
                                    <h6 className="text-dark dark:text-white-light">Inprogress</h6>
                                    {/* <p className="text-white-dark text-xs">Tether</p> */}
                                </div>
                            </div>
                            <div className="mb-5 overflow-hidden">
                                <ReactApexChart series={tether.series} options={tether.options} type="line" height={45} />
                            </div>
                            <div className="flex justify-between items-center font-bold text-base">
                                34<span className="text-success font-normal text-sm"></span>
                            </div>
                        </div>

                        <div className="panel">
                            <div className="flex items-center font-semibold mb-5">
                                <div className="shrink-0 w-10 h-10 bg-warning rounded-full p-2 grid place-content-center">
                                    <IconSolana />
                                </div>
                                <div className="ltr:ml-2 rtl:mr-2">
                                    <h6 className="text-dark dark:text-white-light">Unresolved</h6>
                                    {/* <p className="text-white-dark text-xs">Solana</p> */}
                                </div>
                            </div>
                            <div className="mb-5 overflow-hidden">
                                <ReactApexChart series={solana.series} options={solana.options} type="line" height={45} />
                            </div>
                            <div className="flex justify-between items-center font-bold text-base">
                                21<span className="text-danger font-normal text-sm"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusOfTickets;
