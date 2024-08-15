import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate, Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import { SiMicrosoftazure } from 'react-icons/si';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import { FiServer } from 'react-icons/fi';
import logo from '@/assets/images/logo.png';

import {
    MdAccountBalanceWallet,
    MdAccountBox,
    MdElectricalServices,
    MdLocalTaxi,
    MdOutlineAccountBalanceWallet,
    MdOutlineAccountBox,
    MdOutlineApps,
    MdOutlineBusinessCenter,
    MdOutlineDesignServices,
    MdOutlineModeOfTravel,
    MdOutlineTravelExplore,
    MdPalette,
    MdSos,
    MdSpaceDashboard,
    MdSupervisorAccount,
    MdTravelExplore,
} from 'react-icons/md';

// Admin Module React Icons
import { RiAdminFill, RiSecurePaymentLine, RiUserSettingsFill } from 'react-icons/ri';
import { RiUser3Fill } from 'react-icons/ri';
import { RiTeamFill } from 'react-icons/ri';
import {
    IoAccessibility,
    IoAlertCircle,
    IoAdd,
    IoAlert,
    IoApps,
    IoBag,
    IoBan,
    IoBicycle,
    IoBook,
    IoBookmark,
    IoCar,
    IoCard,
    IoCash,
    IoEarth,
    IoHome,
    IoLockOpen,
    IoLogoFirebase,
    IoMail,
    IoMap,
    IoNewspaper,
    IoNewspaperSharp,
    IoNotifications,
    IoPaperPlane,
    IoQrCode,
    IoReload,
    IoServer,
    IoStar,
    IoTicket,
    IoPerson,
    IoShareSocialSharp,
} from 'react-icons/io5';
import {
    FaAnchorCircleExclamation,
    FaCashRegister,
    FaCircleUser,
    FaHandshakeSimple,
    FaKipSign,
    FaLanguage,
    FaLessThanEqual,
    FaMapPin,
    FaMessage,
    FaMoneyBillWave,
    FaPeopleGroup,
    FaRegComment,
    FaRegHand,
    FaWallet,
} from 'react-icons/fa6';
import { TbApiApp, TbBusinessplan, TbMoneybag, TbReportMoney } from 'react-icons/tb';

// Business Profile Module React Icons
import { MdBusinessCenter } from 'react-icons/md';
import { BsFillBackspaceReverseFill, BsFillTaxiFrontFill, BsGoogle, BsPersonVcardFill, BsTaxiFrontFill } from 'react-icons/bs';
import { HiMiniBuildingOffice } from 'react-icons/hi2';
import { FaTaxi } from 'react-icons/fa';

// Subscription Module React Icons
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { HiMiniSquare3Stack3D } from 'react-icons/hi2';
import { FaHistory } from 'react-icons/fa';
import { FaFileInvoice } from 'react-icons/fa6';

// Transaction Module React Icons
import { FaCoins } from 'react-icons/fa';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { BiCar, BiPlus, BiSolidBank } from 'react-icons/bi';
import { GrEmergency, GrTransaction } from 'react-icons/gr';
import { FaMoneyBillAlt } from 'react-icons/fa';

// Promotion Module React Icons
import { FaMoneyCheck } from 'react-icons/fa';
import { BiSolidCoupon } from 'react-icons/bi';
import { TbTransfer } from 'react-icons/tb';
import { FaTags } from 'react-icons/fa6';

// Trips Module React Icons
import { FaMoneyBill } from 'react-icons/fa';
import { BiTrip } from 'react-icons/bi';
import { FaSortAmountUp } from 'react-icons/fa';

// Settings Module React Icons
import { IoSettingsSharp } from 'react-icons/io5';

// Utility Module React Icons
import { FaGlobe } from 'react-icons/fa6';
import { BsGlobeAsiaAustralia } from 'react-icons/bs';
import { FaCity } from 'react-icons/fa6';
import { FaMountainCity } from 'react-icons/fa6';
import { IoArchive } from 'react-icons/io5';
import { FaUserPlus } from 'react-icons/fa';
import { MdOutlineRequestQuote, MdViewModule } from 'react-icons/md';
import { FaFileAlt } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import { FaCar } from 'react-icons/fa';
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from 'react-icons/gi';
import {
    AiFillBuild,
    AiFillCalendar,
    AiFillCarryOut,
    AiFillCheckSquare,
    AiFillCloud,
    AiFillCompass,
    AiFillContainer,
    AiFillCopy,
    AiFillFolderOpen,
    AiFillFund,
    AiFillMail,
    AiFillPieChart,
    AiFillPushpin,
    AiFillSave,
    AiFillSchedule,
    AiOutlineAccountBook,
} from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import { PiHeadsetFill } from 'react-icons/pi';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    const navigate = useNavigate();

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);
    const [isBusinessProfileMenuOpen, setBusinessProfileMenuOpen] = useState(false);
    const [isSubscriptionsMenuOpen, setSubscriptionsMenuOpen] = useState(false);
    const [isTransactionsMenuOpen, setTransactionsMenuOpen] = useState(false);
    const [isPromotionsMenuOpen, setPromotionsMenuOpen] = useState(false);
    const [isTripsMenuOpen, setTripsMenuOpen] = useState(false);
    const [isRiderUserMenuOpen, setRiderMenuOpen] = useState(false);
    const [isSettingsMenuOpen, setSettingsMenuOpen] = useState(false);
    const [isUtilityMenuOpen, setUtilityMenuOpen] = useState(false);
    const [isServerConfigMenuOpen, setServerConfigMenuOpen] = useState(false);
    const [isPagesMenuOpen, setPagesMenuOpen] = useState(false);
    const [isDispatchOpen, setDispatchOpen] = useState(false);
    const [isMapViewOpen, setMapViewOpen] = useState(false);
    const [isRatingsReviewOpen, setRatingsReviewOpen] = useState(false);
    const [isAPPCMSOpen, setAPPCMSOpen] = useState(false);
    const [isSendNotificationsOpen, setSendNotificationsOpen] = useState(false);
    const [isCommunityOpen, setCommunityOpen] = useState(false);
    const [isSOSModuleOpen, setSOSModuleOpen] = useState(false);
    const [isReportsOpen, setReportsOpen] = useState(false);
    const [isUserManagementOpen, setUserManagementOpen] = useState(false);

    const [isServiceTypeMenuOpen, setServiceTypeMenuOpen] = useState(false);

    const closeAllMenus = () => {
        setAdminMenuOpen(false);
        setBusinessProfileMenuOpen(false);
        setSubscriptionsMenuOpen(false);
        setTransactionsMenuOpen(false);
        setPromotionsMenuOpen(false);
        setTripsMenuOpen(false);
        setRiderMenuOpen(false);
        setSettingsMenuOpen(false);
        setUtilityMenuOpen(false);
        setServerConfigMenuOpen(false);
        setPagesMenuOpen(false);
        setDispatchOpen(false);
        setMapViewOpen(false);
        setRatingsReviewOpen(false);
        setAPPCMSOpen(false);
        setSendNotificationsOpen(false);
        setReportsOpen(false);
        setUserManagementOpen(false);
        setServiceTypeMenuOpen(false);
    };

    const toggleAdminMenu = () => {
        closeAllMenus();
        setAdminMenuOpen(!isAdminMenuOpen);
    };

    const toggleBusinessProfileMenu = () => {
        closeAllMenus();
        setBusinessProfileMenuOpen(!isBusinessProfileMenuOpen);
    };

    const toggleSubscriptionsMenu = () => {
        closeAllMenus();
        setSubscriptionsMenuOpen(!isSubscriptionsMenuOpen);
    };

    const toggleTransactionsMenu = () => {
        closeAllMenus();
        setTransactionsMenuOpen(!isTransactionsMenuOpen);
    };

    const togglePromotionsMenu = () => {
        closeAllMenus();
        setPromotionsMenuOpen(!isPromotionsMenuOpen);
    };

    const toggleSettingsMenu = () => {
        closeAllMenus();
        setSettingsMenuOpen(!isSettingsMenuOpen);
    };
    const toggleTripsMenu = () => {
        closeAllMenus();
        setTripsMenuOpen(!isTripsMenuOpen);
    };
    const toggleRiderUserMenu = () => {
        closeAllMenus();
        setRiderMenuOpen(!isRiderUserMenuOpen);
    };

    const toggleServiceTypeMenu = () => {
        closeAllMenus();
        setRiderMenuOpen(!isServiceTypeMenuOpen);
    };

    const toggleUtilityMenu = () => {
        closeAllMenus();
        setUtilityMenuOpen(!isUtilityMenuOpen);
    };

    const toggleServerConfigMenu = () => {
        closeAllMenus();
        setServerConfigMenuOpen(!isServerConfigMenuOpen);
    };

    const togglePagesMenu = () => {
        closeAllMenus();
        setPagesMenuOpen(!isPagesMenuOpen);
    };

    const toggleDispatchMenu = () => {
        closeAllMenus();
        setDispatchOpen(!isDispatchOpen);
    };

    const toggleMapViewMenu = () => {
        closeAllMenus();
        setMapViewOpen(!isMapViewOpen);
    };

    const toggleRatingsReviewMenu = () => {
        closeAllMenus();
        setRatingsReviewOpen(!isRatingsReviewOpen);
    };

    const toggleAPPCMSMenu = () => {
        closeAllMenus();
        setAPPCMSOpen(!isAPPCMSOpen);
    };

    const toggleSendNotificationsMenu = () => {
        closeAllMenus();
        setSendNotificationsOpen(!isSendNotificationsOpen);
    };

    const toggleSOSMenu = () => {
        closeAllMenus();
        setSOSModuleOpen(!isSOSModuleOpen);
    };

    const toggleCommunityMenu = () => {
        closeAllMenus();
        setCommunityOpen(!isCommunityOpen);
    };

    const toggleReportsMenu = () => {
        closeAllMenus();
        setReportsOpen(!isReportsOpen);
    };

    const toggleUserManagement = () => {
        closeAllMenus();
        setUserManagementOpen(!isUserManagementOpen);
    };

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            {/* <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="logo" /> */}
                            <img className="w-14 ml-[5px] flex-none" src={logo} alt="logo" />
                            <span className="text-2xl ltr:ml-5 rtl:mr-5 font-semibold align-middle lg:inline dark:text-white-light">CABRENT</span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            {/* <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                    <div className="flex items-center">
                                        <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('dashboard')}</span>
                                    </div>

                                    <div className={currentMenu !== 'dashboard' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/">{t('sales')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li> */}

                            {/* DASHBOARD MODULE */}
                            <div>
                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative">
                                    <Link to="/">
                                        <div className="flex items-center">
                                            <IconMenuDashboard className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                            <span>{t('dashboard')}</span>
                                        </div>
                                    </Link>
                                </h2>
                            </div>

                            {/* ADMIN MODULE */}
                            <div>
                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative" onClick={toggleAdminMenu}>
                                    <div className="flex items-center">
                                        <RiUser3Fill className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                        <span>{t('admin')}</span>
                                    </div>

                                    <div className={`absolute right-7 transform ${isAdminMenuOpen ? '' : 'rtl:rotate-90 -rotate-90'}`}>
                                        <IconCaretDown />
                                    </div>
                                </h2>

                                {isAdminMenuOpen && (
                                    <ul className="list-none p-0">
                                        {/* ROLES MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'roles' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('roles');
                                                    navigate('/AdminModule/Roles/ViewRoles');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <RiUserSettingsFill className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Roles')}</span>
                                                </div>
                                            </button>
                                        </li> */}
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'roles' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('roles')}>
                                                <div className="flex items-center">
                                                    <RiAdminFill className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Roles')}</span>
                                                </div>

                                                <div className={currentMenu !== 'roles' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'roles' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/AdminModule/Roles/CreateRoles">{t('Create Roles')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/Roles/ViewRoles">{t('View Roles')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        {/* ADMIN MODULE */}
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'admin' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('admin')}>
                                                <div className="flex items-center">
                                                    <RiUser3Fill className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Admin')}</span>
                                                </div>

                                                <div className={currentMenu !== 'admin' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'admin' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/AdminModule/Admin/CreateAdmin">{t('Create Admin')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/Admin/ViewAdmin">{t('View Admin')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/Admin/PendingAdmin">{t('Pending Admin')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        {/* ADMIN TEAMS MODULE */}
                                        <li className="nav-item">
                                            <button type="button" className={`${currentMenu === 'adminTeams' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('adminTeams')}>
                                                <div className="flex items-center">
                                                    <RiTeamFill className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Admin Teams')}</span>
                                                </div>

                                                <div className={currentMenu !== 'adminTeams' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={currentMenu === 'adminTeams' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/AdminModule/AdminTeams/CreateAdminTeams">{t('Create Admin Team')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/AdminTeams/ViewAdminTeams">{t('View Admin Team')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/AdminTeams/MyTeam/ViewMyTeam">{t('My Team')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        {/* ADMIN TICKETS MODULE */}
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'adminTickets' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('adminTickets')}>
                                                <div className="flex items-center">
                                                    <IoTicket className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Admin Tickets')}</span>
                                                </div>

                                                <div className={currentMenu !== 'adminTickets' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'adminTickets' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/adminModule/adminTickets/createAdminTickets">{t('Create Admin Tickets')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/AdminTickets/ViewAdminTickets">{t('View Admin Tickets')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/AdminTickets/PendingAdminTickets">{t('Pending Tickets')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/AdminTickets/RaisedAgainstMeTickets/ViewRaisedAgainstMeTickets">{t('Raised Against me')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/AdminTickets/RaisedByMeTickets/ViewRaisedByMeTickets">{t('Raised By me')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/AdminTickets/ClosedTickets/ViewClosedTickets">{t('Closed Tickets')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/AdminTickets/OpenTickets/ViewOpenTickets">{t('Open Tickets')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/AdminTickets/ReopenTickets/ViewReopenTickets">{t('Reopen Tickets')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/AdminTickets/InProgressTickets/ViewInProgressTickets">{t('InProgress Tickets')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/AdminTickets/UnresolvedTickets/ViewUnresolvedTickets">{t('Unresolved Tickets')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/AdminTickets/CompletedTickets/ViewCompletedTickets">{t('Completed Tickets')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/AdminTickets/TicketsRaisedByAdmin/ViewTicketsRaisedByAdmin">{t('Ticket raised by Admin')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/AdminTickets/ChannelPartnerTickets/ViewChannelPartnerTickets">{t('ChannelPartner Tickets')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/AdminTickets/DriverTickets/ViewDriverTickets">{t('Driver Tickets')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/AdminTickets/TravelAgencyTickets/ViewTravelAgencyTickets">{t('TravelAgency Tickets')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/AdminTickets/DistributorTickets/ViewDistributorTickets">{t('Distributor Tickets')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        {/* CHANNEL PARTNER MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'channelPartner' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('channelPartner');
                                                    navigate('/AdminModule/ChannelPartner/ViewChannelPartner');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaHandshakeSimple className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Channel Partner')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* Distributor MODULE */}

                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'Distributor' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('Distributor');
                                                    navigate('/AdminModule/Distributor/ViewDistributor');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaCircleUser className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Distributor')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'Distributor' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Distributor')}>
                                                <div className="flex items-center">
                                                    <FaCircleUser className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Distributor')}</span>
                                                </div>

                                                <div className={currentMenu !== 'Distributor' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'Distributor' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/AdminModule/Distributor/CreateDistributor">{t('Create Distributor')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/Distributor/ViewDistributor">{t('View Distributor')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/Distributor/DistributorSettings/ViewDistributorSettings">{t('Distributor Settings')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/Distributor/SubDistributor/ViewSubDistributor">{t('Sub Distributor')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        {/* CHANNEL PARTNER API MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'channelPartnerAPI' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('channelPartnerAPI');
                                                    navigate('/AdminModule/ChannelPartnerAPI/ViewChannelPartnerAPI');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <TbApiApp className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Channel Partner API')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'channelPartnerAPI' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('channelPartnerAPI')}>
                                                <div className="flex items-center">
                                                    <TbApiApp className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('channelPartnerAPI')}</span>
                                                </div>

                                                <div className={currentMenu !== 'channelPartnerAPI' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'channelPartnerAPI' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/AdminModule/ChannelPartnerAPI/ViewChannelPartnerAPI">{t('ChannelPartner API')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="">{t('Report')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li> */}

                                        <li className="menu nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'channelPartnerAPI' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => toggleMenu('channelPartnerAPI')}
                                            >
                                                <div className="flex items-center">
                                                    <FaCircleUser className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Channel Partner API')}</span>
                                                </div>

                                                <div className={currentMenu !== 'channelPartnerAPI' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'channelPartnerAPI' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/AdminModule/ChannelPartnerAPI/CreateChannelPartnerAPI">{t('Create Channelpartner API')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/ChannelPartnerAPI/ViewChannelPartnerAPI">{t('Channelpartner API')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/AdminModule/ChannelPartnerAPI/ViewChannelPartnerAPIReport">{t('Booking Request History')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        {/* CHANNEL PARTNER API CONFIG MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'channelPartnerAPIConfig' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('channelPartnerAPIConfig');
                                                    navigate('/AdminModule/ChannelPartnerAPIConfig/ViewChannelPartnerAPIConfig');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <TbApiApp className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Channel Partner API Config')}</span>
                                                </div>
                                            </button>
                                        </li> */}
                                    </ul>
                                )}
                            </div>

                            {/* BUSINESS PROFILE MODULE */}
                            <div>
                                <h2
                                    className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative"
                                    onClick={toggleBusinessProfileMenu}
                                >
                                    <div className="flex items-center">
                                        <MdBusinessCenter className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                        <span>{t('business profile')}</span>
                                    </div>

                                    <div className={`absolute right-7 transform ${isBusinessProfileMenuOpen ? '' : 'rtl:rotate-90 -rotate-90'}`}>
                                        <IconCaretDown />
                                    </div>
                                </h2>

                                {isBusinessProfileMenuOpen && (
                                    <ul className="list-none p-0">
                                        {/* TRAVEL AGENCY MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'Travel Agency' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('fleetOwner');
                                                    navigate('/BusinessModule/FleetOwner/ViewFleetOwner');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <HiMiniBuildingOffice className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Travel Agency')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'fleetOwner' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('fleetOwner')}>
                                                <div className="flex items-center">
                                                    <HiMiniBuildingOffice className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Travel Agency')}</span>
                                                </div>

                                                <div className={currentMenu !== 'fleetOwner' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'fleetOwner' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/BusinessModule/FleetOwner/CreateFleetOwner">{t('Create TravelAgency')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/BusinessModule/FleetOwner/ViewFleetOwner">{t('View TravelAgency')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/BusinessModule/FleetOwner/ViewPendingFleetOwner">{t('Pending TravelAgency')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/BusinessModule/FleetOwner/TravelAgencySettings/ViewTravelAgencySettings">{t('Travel Agency Settings')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        {/* <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'Travel Agency' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('fleetOwner')}>
                                                <div className="flex items-center">
                                                    <HiMiniBuildingOffice className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Travel Agency')}</span>
                                                </div>

                                                <div className={currentMenu !== 'Travel Agency' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'Travel Agency' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/BusinessModule/VehicleProfile/ViewVehicleProfile">{t('Create Travel Agency')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/BusinessModule/VehicleProfile/ViewVehicleProfile">{t('View Travel Agency')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/BusinessModule/VehicleProfile/ViewVehicleProfile">{t('Pending Travel Agency')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/BusinessModule/VehicleProfile/ViewVehicleProfile">{t('Travel Agency Settings')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li> */}

                                        {/* VEHICLE  MODULE */}

                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'vehicle' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('vehicle')}>
                                                <div className="flex items-center">
                                                    <FaTaxi className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Vehicle')}</span>
                                                </div>

                                                <div className={currentMenu !== 'vehicle' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'vehicle' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/BusinessModule/VehicleProfile/ViewVehicleProfile">{t('View Vehicle')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/BusinessModule/ServiceProvider/PendingServiceProvider">{t('Pending Vehicle')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/BusinessModule/VehicleProfile/ViewVehicleProfile">{t('Unassigned Vehicle')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        {/* Driver MODULE */}
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'Driver' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('serviceProvider')}>
                                                <div className="flex items-center">
                                                    <BsPersonVcardFill className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Driver')}</span>
                                                </div>

                                                <div className={currentMenu !== 'serviceProvider' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'serviceProvider' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/BusinessModule/ServiceProvider/ViewServiceProvider">{t('View Driver')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/BusinessModule/ServiceProvider/PendingServiceProvider">{t('Pending Driver')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/BusinessModule/ServiceProvider/ViewServiceProvider">{t('Unassigned Driver')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    </ul>
                                )}
                            </div>

                            {/* SUBSCRIPTION MODULE */}
                            <div>
                                <h2
                                    className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative"
                                    onClick={toggleSubscriptionsMenu}
                                >
                                    <div className="flex items-center">
                                        <FaMoneyBillTransfer className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                        <span>{t('subscription')}</span>
                                    </div>

                                    <div className={`absolute right-7 transform ${isSubscriptionsMenuOpen ? '' : 'rtl:rotate-90 -rotate-90'}`}>
                                        <IconCaretDown />
                                    </div>
                                </h2>

                                {isSubscriptionsMenuOpen && (
                                    <ul className="list-none p-0">
                                        {/* SUBSCRIPTION CREATION MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'createSubscription' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('createSubscription');
                                                    navigate('/SubscriptionModule/Subscription/CreateSubscription');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaFileInvoice className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Create Subscription')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* SUBSCRIPTION MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'subscription' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('subscription');
                                                    navigate('/SubscriptionModule/Subscription/ViewSubscription');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaMoneyBillTransfer className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('View Subscription')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* SUBSCRIPTION AMOUNT DISTRIBUTION MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'subscriptionAmount' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('subscriptionAmount');
                                                    navigate('/SubscriptionModule/SubscriptionAmtDistribution/ViewSubscriptionAmtDistribution');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <HiMiniSquare3Stack3D className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Sub. Amt. Distri. history')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'vehicleSubsSettings' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('vehicleSubsSettings');
                                                    navigate('/SubscriptionModule/VehicleSubsSettings/ViewVehicleSubsSettings');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <HiMiniSquare3Stack3D className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Vehicle Subs. Settings')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* SUBSCRIPTION HISTORY MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'subscriptionHistory' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('subscriptionHistory');
                                                    navigate('/SubscriptionModule/SubscriptionHistory/ViewSubscriptionHistory');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaHistory className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Subscription History')}</span>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>

                            {/* WALLET MODULE */}
                            <div>
                                <h2
                                    className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative"
                                    onClick={toggleTransactionsMenu}
                                >
                                    <div className="flex items-center">
                                        <FaCoins className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                        <span>{t('Wallet')}</span>
                                    </div>

                                    <div className={`absolute right-7 transform ${isTransactionsMenuOpen ? '' : 'rtl:rotate-90 -rotate-90'}`}>
                                        <IconCaretDown />
                                    </div>
                                </h2>

                                {isTransactionsMenuOpen && (
                                    <ul className="list-none p-0">
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'walletList' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('walletList');
                                                    navigate('/WalletModule/WalletList/ViewWalletList');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaCashRegister className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Wallet List')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'transactionHistroy' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('transactionHistroy');
                                                    navigate('/WalletModule/TransactionHistory/ViewTransactionHistory');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaMoneyBill className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Transaction History')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* BANK ACCOUNT DETAILS MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'bankAccount' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('bankAccount');
                                                    navigate('/WalletModule/BankAccountDeatails/ViewBankAccount');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <BiSolidBank className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Bank Account Details')}</span>
                                                </div>
                                            </button>
                                        </li>
                                        {/* 
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'addMoneyForWallet' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('addMoneyForWallet');
                                                    navigate('/WalletModule/AddMoneyToWallet/ViewAddMoneyToWalletPage');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <GiPayMoney className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Add Wallet Money')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'withdrawWalletMoney' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('withdrawWalletMoney');
                                                    navigate('/WalletModule/WithdrawMoneyFromWallet/ViewWithdrawMoneyFromWallet');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <GiReceiveMoney className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Withdraw Wallet')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* WALLET HISTORY MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'walletTransactionHistroy' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('walletTransactionHistroy');
                                                    navigate('/WalletModule/WalletTransactionHistory/ViewWalletHistory');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaHistory className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Wallet Transaction History')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'subscriptionHistory' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('subscriptionHistory');
                                                    navigate('/WalletModule/SubscriptionWalletHistroy/ViewSubscriptionWalletHistroy');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <TbReportMoney className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Subs. Transaction history')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* PG TRANSACTIONS MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'pgTransactions' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('pgTransactions');
                                                    navigate('/WalletModule/PGTransactions/ViewPGTransactionsPage');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <GrTransaction className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('PG Transactions')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* TRIP TRANSACTIONS MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'tripTransaction' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('tripTransaction');
                                                    navigate('/WalletModule/TripTransaction/ViewTripTransaction');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaMoneyBillWave className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Trip Transactions')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* DISTRIBUTOR TRANSACTIONS MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'distributorTransaction' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('distributorTransaction');
                                                    navigate('/WalletModule/DistributorTransaction/ViewDistributorTransaction');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <TbMoneybag className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Distributor Transactions')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* CHANNEL PARTNER TRANSACTIONS MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'channelPartnerTransaction' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('channelPartnerTransaction');
                                                    navigate('/WalletModule/ChannelPartnerTransaction/ViewChannelPartnerTransaction');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <GiTakeMyMoney className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('ChannelPartner Transactions')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* <li className="menu nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TownerCoinsTransaction' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => toggleMenu('TownerCoinsTransaction')}
                                            >
                                                <div className="flex items-center">
                                                    <FaCircleUser className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Towner Coins Transaction')}</span>
                                                </div>

                                                <div className={currentMenu !== 'TownerCoinsTransaction' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'internalUserTransaction' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/WalletModule/InternerUserTransaction/SendMoney/ViewSendMoney">{t('Send Money')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/WalletModule/InternerUserTransaction/RequestMoney/ViewRequestMoney">{t('Request Money')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li> */}

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TownerCoinsTransaction' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TownerCoinsTransaction');
                                                    navigate('/WalletModule/TownerCoinsTransaction/ViewTownerCoins');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaUserPlus className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Towner Coins Transactions')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* MONEY REQUEST MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'internalUserTransaction' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('internalUserTransaction');
                                                    navigate('/TransactionModule/internalUserTransaction/ViewinternalUserTransaction');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaMoneyBillTrendUp className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Internal User Transaction')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* WALLET MASTER MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'walletMaster' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('walletMaster');
                                                    navigate('/TransactionModule/WalletMaster/ViewWalletMaster');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaWallet className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Wallet Master')}</span>
                                                </div>
                                            </button>
                                        </li> */}
                                    </ul>
                                )}
                            </div>

                            {/* PROMOTION MODULE */}
                            <div>
                                <h2
                                    className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative"
                                    onClick={togglePromotionsMenu}
                                >
                                    <div className="flex items-center">
                                        <FaTags className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                        <span>{t('Towner Coins')}</span>
                                    </div>

                                    <div className={`absolute right-7 transform ${isPromotionsMenuOpen ? '' : 'rtl:rotate-90 -rotate-90'}`}>
                                        <IconCaretDown />
                                    </div>
                                </h2>

                                {isPromotionsMenuOpen && (
                                    <ul className="list-none p-0">
                                        {/* APPLICATION OFFERED MONEY MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'appOfferedMoney' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('appOfferedMoney');
                                                    navigate('/PromotionModule/AppOfferedMoney/ViewAppOfferedMoney');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaMoneyBillAlt className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('App. Offered Money')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* APPLICATION OFFERED MONEY HISTORY MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'appOfferedMoneyHistory' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('appOfferedMoneyHistory');
                                                    navigate('/PromotionModule/AppOfferedMoneyHistory/ViewAppOfferedMoneyHistory');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaMoneyBillAlt className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('App. Offered Money History')}</span>
                                                </div>
                                            </button>
                                        </li>
                                        {/* BONUS MASTER MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'bonusMaster' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('bonusMaster');
                                                    navigate('/PromotionModule/BonusMaster/ViewBonusMaster');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaMoneyCheck className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Bonus Master')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* BONUS HISTORY MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'bonusHistory' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('bonusHistory');
                                                    navigate('/PromotionModule/BonusHistory/ViewBonusHistory');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaHistory className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Bonus History')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* COUPON MASTER MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'couponMaster' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('couponMaster');
                                                    navigate('/PromotionModule/CouponMaster/ViewCouponMaster');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <BiSolidCoupon className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Coupon Master')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* COUPON HISTORY MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'couponHistory' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('couponHistory');
                                                    navigate('/PromotionModule/CouponHistory/ViewCouponHistory');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaHistory className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Coupon History')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* REFFERAL MASTER MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'refferalMaster' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('refferalMaster');
                                                    navigate('/PromotionModule/RefferalMaster/ViewRefferalMaster');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <TbTransfer className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Refferal Master')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* REFFERAL HISTORY MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'refferalHistory' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('refferalHistory');
                                                    navigate('/PromotionModule/RefferalHistory/ViewRefferalHistory');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaHistory className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Refferal History')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* PROMOCODE MASTER MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'promocodeMaster' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('promocodeMaster');
                                                    navigate('/PromotionModule/PromocodeMaster/ViewPromocodeMaster');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaTags className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Promocode Master')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* PROMOCODE HISTORY MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'promocodeHistory' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('promocodeHistory');
                                                    navigate('/PromotionModule/PromocodeHistory/ViewPromocodeHistory');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaHistory className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Promocode History')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'walletHistroy' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('walletHistroy');
                                                    navigate('/PromotionModule/WalletHistory/ViewWalletHistoryPage');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaHistory className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Wallet History')}</span>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>

                            {/* TRIPS MODULE */}
                            <div>
                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative" onClick={toggleTripsMenu}>
                                    <div className="flex items-center">
                                        <FaCar className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                        <span>{t('trips')}</span>
                                    </div>

                                    <div className={`absolute right-7 transform ${isTripsMenuOpen ? '' : 'rtl:rotate-90 -rotate-90'}`}>
                                        <IconCaretDown />
                                    </div>
                                </h2>

                                {isTripsMenuOpen && (
                                    <ul className="list-none p-0">
                                        {/* VEHICLE TYPES MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'vehicleTypes' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('vehicleTypes');
                                                    navigate('/TripModule/VehicleTypes/ViewVehicleTypes');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaCar className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Vehicle Types')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* VEHICLE FARE MASTER MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'vehicleFareMaster' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('vehicleFareMaster');
                                                    navigate('/TripModule/VehicleFareMaster/ViewVehicleFareMaster');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaMoneyBill className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Vehicle Fare Master')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* BOOKING MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'bookings' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('bookings');
                                                    navigate('/TripModule/Bookings/ViewBookings');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaTaxi className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Bookings')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* TRIPS MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'trips' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('trips');
                                                    navigate('/TripModule/Trips/ViewTrips');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <BiTrip className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Trips')}</span>
                                                </div>
                                            </button>
                                        </li> */}
                                        {/* TRIPS MODULE */}

                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'tripHistory' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('tripHistory')}>
                                                <div className="flex items-center">
                                                    <MdOutlineTravelExplore className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Trips')}</span>
                                                </div>

                                                <div className={currentMenu !== 'tripHistory' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'tripHistory' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/TripModule/Trips/ViewTrips">{t('All trips')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/TripModule/Trips/OnGoingTrips/ViewOnGoingTrips">{t('OnGoing Trips')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/TripModule/Trips/PastTrips/ViewPastTrips">{t('Past Trips')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/TripModule/Trips/SheduledTrips/ViewSheduleTrips">{t('Scheduled Trips')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/TripModule/Trips/NoResponseTrips/ViewNoResponse">{t('No Responce Trips')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/TripModule/Trips/CancelledTrips/ViewCancelledTrips">{t('Cancelled Trips')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/TripModule/Trips/HailTrips/ViewHailTrips">{t('Hail Trip')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/TripModule/Tickets/ViewTickets">{t('Trip Tickets')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/TripModule/TripRatings/ViewTripRatings">{t('Trip Ratings')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'tripSettings' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('tripSettings')}>
                                                <div className="flex items-center">
                                                    <CiSettings className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Trip Settings')}</span>
                                                </div>

                                                <div className={currentMenu !== 'tripSettings' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'tripSettings' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/TripModule/TripSettings/ServiceCity/ViewServiceCity">{t('Service City')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/TripModule/TripSettings/VehicleTypes/ViewVehicleTypes">{t('Vehicle Types')}</NavLink>
                                                    </li>

                                                    <li>
                                                        <NavLink to="/TripModule/TripSettings/CancellationReason/ViewCancellationReason">{t('cancellation reason')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/TripModule/TripSettings/FeedBackReason/ViewFeedBackReason">{t('Feedback reason')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/TripModule/TripSettings/CancellationSettings/ViewCancellationSettings">{t('cancellation Setttings')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'serviceType' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('serviceType')}>
                                                <div className="flex items-center">
                                                    <MdOutlineDesignServices className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Service Type')}</span>
                                                </div>

                                                <div className={currentMenu !== 'serviceType' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'serviceType' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/TripModule/ServiceType/Daily/ViewDaily">{t('Daily')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/TripModule/ServiceType/Rental/ViewRental">{t('Rental')}</NavLink>
                                                    </li>

                                                    <li>
                                                        <NavLink to="/TripModule/ServiceType/Outstation/ViewOutstation">{t('Outstation')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'mapView' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('mapView')}>
                                                <div className="flex items-center">
                                                    <FaMapPin className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Map View')}</span>
                                                </div>

                                                <div className={currentMenu !== 'mapView' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'mapView' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/TripModule/MapView/HeatMap/ViewHeatMap">{t('Heat Map')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/TripModule/MapView/GodsView/ViewGodsView">{t('Gods View')}</NavLink>
                                                    </li>

                                                    <li>
                                                        <NavLink to="/TripModule/MapView/DriverTracking/ViewDriverTracking">{t('Driver Tracking')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'Dispatch' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Dispatch')}>
                                                <div className="flex items-center">
                                                    <PiHeadsetFill className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Dispatch')}</span>
                                                </div>

                                                <div className={currentMenu !== 'Dispatch' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'Dispatch' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/TripModule/Dispatch/ManualTaxiDispatch/ManualTaxiDispatch">{t('Manual Taxi Dispatch')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/TripModule/Dispatch/PendingRequest/ViewPendingRequest">{t('Pending Request')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/TripModule/Dispatch/ScheduledBooking/ViewScheduledBooking">{t('Scheduled Bookings')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        {/* BOOKING AMOUNT DISTRIBUTION MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'bookingAmtDistribution' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('bookingAmtDistribution');
                                                    navigate('/TripModule/BookingAmtDistribution/ViewBookingAmtDistribution');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaSortAmountUp className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Booking Amt Distribution')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* TICKETS MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'tickets' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('tickets');
                                                    navigate('/TripModule/Tickets/ViewTickets');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoTicket className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Tickets')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* TRIPS INVOICE MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'tripsInvoice' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('tripsInvoice');
                                                    navigate('/TripModule/TripsInvoice/ViewTripsInvoice');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaFileInvoice className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Trips Invoice')}</span>
                                                </div>
                                            </button>
                                        </li> */}
                                    </ul>
                                )}
                            </div>

                            {/* Rider MODULE */}
                            {/* <div>
                                <h2
                                    className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative"
                                    onClick={toggleRiderUserMenu}
                                >
                                    <div className="flex items-center">
                                        <IoPaperPlane className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                        <span>{t('Rider')}</span>
                                    </div>

                                    <div className={`absolute right-7 transform ${isRiderUserMenuOpen ? '' : 'rtl:rotate-90 -rotate-90'}`}>
                                        <IconCaretDown />
                                    </div>
                                </h2>

                                {isRiderUserMenuOpen && (
                                    <ul className="list-none p-0">
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'RiderUser' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('RiderUser');
                                                    navigate('/RiderModule/RiderUsers/ViewRiderUsers');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoMail className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Rider User')}</span>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div> */}

                            {/* SETTINGS MODULE */}
                            <div>
                                <h2
                                    className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative"
                                    onClick={toggleSettingsMenu}
                                >
                                    <div className="flex items-center">
                                        <IoSettingsSharp className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                        <span>{t('settings')}</span>
                                    </div>

                                    <div className={`absolute right-7 transform ${isSettingsMenuOpen ? '' : 'rtl:rotate-90 -rotate-90'}`}>
                                        <IconCaretDown />
                                    </div>
                                </h2>

                                {isSettingsMenuOpen && (
                                    <ul className="list-none p-0">
                                        {/* SETTINGS PANEL MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'settingsPanel' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('settingsPanel');
                                                    navigate('/SettingsModule/SettingsPanel/ViewSettingsPanel');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoSettingsSharp className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Settings Panel')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* Email Template MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'EmailTemplate' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('EmailTemplate');
                                                    navigate('/SettingsModule/EmailTemplate/ViewEmailTemplate');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoMail className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Email Template')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* RESET PASSWORD MODULE */}

                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'ResetPassword' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('ResetPassword');
                                                    navigate('/ResetPassword');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoNewspaper className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Reset Password')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'CancellationSettings' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('CancellationSettings');
                                                    navigate('/CancellationSettings');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoLockOpen className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Cancellation Settings')}</span>
                                                </div>
                                            </button>
                                        </li> */}
                                        {/* Referral Settings MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'ReferralSettings' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('ReferralSettings');
                                                    navigate('/SettingsModule/ReferralSettings/ViewReferralSettings');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoQrCode className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Referral Settings')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* SERVER CONFIG */}
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'Server Config' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Server Config')}>
                                                <div className="flex items-center">
                                                    <FiServer className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Server Config')}</span>
                                                </div>

                                                <div className={currentMenu !== 'Server Config' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'Server Config' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    {/* <li>
                                                        <NavLink to="/ServerConfigModule/FirebaseSettings/ViewFirebaseSettings">{t('Firebase')}</NavLink>
                                                    </li> */}

                                                    <li>
                                                        <NavLink to="/ServerConfigModule/EmailConfigurations/ViewEmailConfigurations">{t('Email Config')}</NavLink>
                                                    </li>

                                                    {/* <li>
                                                        <NavLink to="/ServerConfigModule/PaymentGatewayConfigurations/ViewPaymentGatewayConfigurations">{t('PaymentGateway Config')}</NavLink>
                                                    </li> */}

                                                    <li>
                                                        <NavLink to="/ServerConfigModule/GeneralSettings/ViewGeneralSettings">{t('General Settings')}</NavLink>
                                                    </li>

                                                    <li>
                                                        <NavLink to="/ServerConfigModule/SMSConfigurations/ViewSMSConfigurations" className="nav-link">
                                                            {t('SMS Configurations')}
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        {/* GOOGLE */}

                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'google' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('google')}>
                                                <div className="flex items-center">
                                                    <BsGoogle className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Google')}</span>
                                                </div>

                                                <div className={currentMenu !== 'google' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'google' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/SettingsModule/Google/Map/ViewMap">{t('Map')}</NavLink>
                                                    </li>

                                                    <li>
                                                        <NavLink to="/SettingsModule/Google/FireBase/ViewFireBase">{t('Fire Base')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        {/* PAYMENT GATEWAY */}
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'paymentGateWay' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('paymentGateWay')}>
                                                <div className="flex items-center">
                                                    <RiSecurePaymentLine className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Payment Gateway')}</span>
                                                </div>

                                                <div className={currentMenu !== 'paymentGateWay' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'paymentGateWay' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/SettingsModule/PaymentGateway/Collect/ViewCollect">{t('Collect')}</NavLink>
                                                    </li>

                                                    <li>
                                                        <NavLink to="/SettingsModule/PaymentGateway/PayOut/ViewPayOut">{t('Payout')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        {/* AZURE */}

                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'azure' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('azure')}>
                                                <div className="flex items-center">
                                                    <SiMicrosoftazure className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Azure')}</span>
                                                </div>

                                                <div className={currentMenu !== 'azure' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'azure' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/SettingsModule/Azure/Cloud/ViewCloud">{t('Cloud')}</NavLink>
                                                    </li>

                                                    <li>
                                                        <NavLink to="/SettingsModule/Azure/DocVerification/ViewDocVerification">{t('Document Verification')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        {/* THIRD PARTY */}

                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'thirdParty' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('thirdParty')}>
                                                <div className="flex items-center">
                                                    <MdOutlineApps className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Third Party')}</span>
                                                </div>

                                                <div className={currentMenu !== 'thirdParty' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'thirdParty' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/SettingsModule/ThirdParty/Document/ViewDocument">{t('Documents')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    </ul>
                                )}
                            </div>

                            {/* UTILITY MODULE */}
                            <div>
                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative" onClick={toggleUtilityMenu}>
                                    <div className="flex items-center">
                                        <FaGlobe className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                        <span>{t('utility')}</span>
                                    </div>

                                    <div className={`absolute right-7 transform ${isUtilityMenuOpen ? '' : 'rtl:rotate-90 -rotate-90'}`}>
                                        <IconCaretDown />
                                    </div>
                                </h2>

                                {isUtilityMenuOpen && (
                                    <ul className="list-none p-0">
                                        {/* COUNTRY MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'country' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('country');
                                                    navigate('/UtilityModule/Country/ViewCountry');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaGlobe className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Country')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* STATE MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'state' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('state');
                                                    navigate('/UtilityModule/State/ViewState');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <BsGlobeAsiaAustralia className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('State')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* CITY MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'city' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('city');
                                                    navigate('/UtilityModule/City/ViewCity');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaCity className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('City')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* STATUS MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'status' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('status');
                                                    navigate('/UtilityModule/Status/ViewStatus');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoArchive className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Status')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* SERVICE CITY MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'serviceCity' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('serviceCity');
                                                    navigate('/UtilityModule/ServiceCity/ViewServiceCity');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaMountainCity className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Service City')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* TICKET TYPE MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'ticketType' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('ticketType');
                                                    navigate('/UtilityModule/TicketType/ViewTicketType');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoTicket className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Ticket Type')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* ADMIN ROLE MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'adminRole' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('adminRole');
                                                    navigate('/UtilityModule/AdminRole/ViewAdminRole');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaUserPlus className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Admin Role')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* MODULE MASTER MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'moduleMaster' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('moduleMaster');
                                                    navigate('/UtilityModule/ModuleMaster/ViewModuleMaster');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <MdViewModule className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Module Master')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* DOCUMENT TYPE MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'documentType' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('documentType');
                                                    navigate('/UtilityModule/DocumentType/ViewDocumentType');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaFileAlt className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Document Type')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* CHANNEL PARTNER TYPE MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'channelPartnerType' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('channelPartnerType');
                                                    navigate('/UtilityModule/ChannelPartnerType/ViewChannelPartnerType');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaHandshakeSimple className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Channel Partner Type')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* EMPLOYEE LEVEL MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'employeeLevel' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('employeeLevel');
                                                    navigate('/UtilityModule/EmployeeLevel/ViewEmployeeLevel');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <MdWork className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Employee Level')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* COMPANY TYPE MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'companyType' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('companyType');
                                                    navigate('/UtilityModule/CompanyType/ViewCompanyType');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <HiBuildingOffice2 className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Company Type')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* VEHICLE UTILITY MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'vehicleUtility' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('vehicleUtility');
                                                    navigate('/UtilityModule/VehicleUtility/ViewVehicleUtility');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaCar className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Vehicle Utility')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* APP LANGUAGE UTILITY MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'AppLaguage' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('AppLaguage');
                                                    navigate('/UtilityModule/AppLaguage/ViewAppLaguage');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaLanguage className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('App Laguage')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* Cancellation Reasons UTILITY MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'CancellationReasons' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('CancellationReasons');
                                                    navigate('/UtilityModule/CancellationReasons/ViewCancellationReasons');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaAnchorCircleExclamation className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Cancellation Reasons')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* Feedback Reasons UTILITY MODULE */}
                                        {/* <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'FeedbackReasons' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('FeedbackReasons');
                                                    navigate('/UtilityModule/FeedbackReasons/ViewFeedbackReasons');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaMessage className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Feedback Reasons')}</span>
                                                </div>
                                            </button>
                                        </li> */}

                                        {/* Currency Management UTILITY MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'CurrencyManagement' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('CurrencyManagement');
                                                    navigate('/UtilityModule/CurrencyManagement/ViewCurrencyManagement');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <FaMoneyBill className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Currency Management')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* Office Details UTILITY MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'OfficeDetails' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('OfficeDetails');
                                                    navigate('/UtilityModule/OfficeDetails/ViewOfficeDetails');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoAlertCircle className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Office Details')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'VehicleColor' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('VehicleColor');
                                                    navigate('/UtilityModule/VehicleColor/ViewVehicleColor');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <MdPalette className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Vehicle Color')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'VehicleFuel' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('VehicleFuel');
                                                    navigate('/UtilityModule/VehicleFuel/ViewVehicleFuel');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <BiCar className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Vehicle Fuel')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* PRIORITY  UTILITY MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'Priority' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('Priority');
                                                    navigate('/UtilityModule/Priority/ViewPriority');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoBookmark className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Priority')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'adminUtility' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('adminUtility')}>
                                                <div className="flex items-center">
                                                    <FaCircleUser className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Admin Utilites')}</span>
                                                </div>

                                                <div className={currentMenu !== 'adminUtility' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'adminUtility' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <NavLink to="/UtilityModule/EmployeeLevel/ViewEmployeeLevel">{t('Emplyee Level')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/UtilityModule/AdminRole/ViewAdminRole">{t('Admin Roles')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/UtilityModule/DistributorRoleType/ViewDistributorRoleType">{t('Distributor Role Type')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/UtilityModule/CompanyType/ViewCompanyType">{t('Company Type')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    </ul>
                                )}
                            </div>

                            {/* Reports MODULE */}
                            <div>
                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative" onClick={toggleReportsMenu}>
                                    <div className="flex items-center">
                                        <IoPaperPlane className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                        <span>{t('Reports')}</span>
                                    </div>

                                    <div className={`absolute right-7 transform ${isReportsOpen ? '' : 'rtl:rotate-90 -rotate-90'}`}>
                                        <IconCaretDown />
                                    </div>
                                </h2>

                                {isReportsOpen && (
                                    <ul className="list-none p-0">
                                        {/* Trip Payments MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TripPayments' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TripPayments');
                                                    navigate('/ReportsModule/TripPayments/ViewTripPayments');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoMail className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Trip Payments')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* Driver Duty Report MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'DriverDutyReport' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('DriverDutyReport');
                                                    navigate('/ReportsModule/DriverDutyReport/ViewDriverDutyReport');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoNotifications className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Driver Duty Report')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* Trip Promo Discounts MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TripPromoDiscounts' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TripPromoDiscounts');
                                                    navigate('/ReportsModule/TripPromoDiscounts/ViewTripPromoDiscounts');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <AiFillContainer className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Trip Promo Discounts')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* Driver Payments MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'DriverPayments' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('DriverPayments');
                                                    navigate('/ReportsModule/DriverPayments/ViewDriverPayments');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <AiFillCopy className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Driver Payments')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalTrip' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalTrip');
                                                    navigate('/ReportsModule/TotalTrip/TotalTrip');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <AiFillCompass className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Total Trips')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalCancelledTrips' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalCancelledTrips');
                                                    navigate('/ReportsModule/TotalCancelledTrips/TotalCancelledTrips');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <AiFillCheckSquare className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Total Cancelled Trips')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalScheduledTrips' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalScheduledTrips');
                                                    navigate('/ReportsModule/TotalScheduledTrips/TotalScheduledTrips');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <AiFillBuild className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Total Scheduled Trips')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalKmsTraveled' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalKmsTraveled');
                                                    navigate('/ReportsModule/TotalKmsTraveled/TotalKmsTraveled');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <AiFillSave className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Total Kilometers Travelled')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalTripAmount' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalTripAmount');
                                                    navigate('/ReportsModule/TotalTripAmount/TotalTripAmount');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <AiFillSchedule className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Total Trip Amount')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalAiRecognitions' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalAiRecognitions');
                                                    navigate('/ReportsModule/TotalAiRecognitions/TotalAiRecognitions');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <AiFillPushpin className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Total AI Recognitions')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalDriverEarned' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalDriverEarned');
                                                    navigate('/ReportsModule/TotalDriverEarned/TotalDriverEarned');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <AiFillPieChart className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Total Driver Earned')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalDaysWithTowner' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalDaysWithTowner');
                                                    navigate('/ReportsModule/TotalDaysWithTowner/TotalDaysWithTowner');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <AiFillFund className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Total Days with Towner')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalWalletAddedAmount' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalWalletAddedAmount');
                                                    navigate('/ReportsModule/TotalWalletAddedAmount/TotalWalletAddedAmount');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <AiFillFolderOpen className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Total Wallet Added Amount')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalCouponClaimed' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalCouponClaimed');
                                                    navigate('/ReportsModule/TotalCouponClaimed/TotalCouponClaimed');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <AiFillCloud className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Total Coupons Claimed')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalWalletBonusRecived' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalWalletBonusRecived');
                                                    navigate('/ReportsModule/TotalWalletBonusRecived/TotalWalletBonusRecived');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <AiFillCarryOut className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Total Wallet Bonus Received')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalSubscription' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalSubscription');
                                                    navigate('/ReportsModule/TotalSubscription/TotalSubscription');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <MdTravelExplore className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Total Subscription')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalRatingsGivenByHim' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalRatingsGivenByHim');
                                                    navigate('/ReportsModule/TotalRatingsGivenByHim/TotalRatingsGivenByHim');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <MdOutlineModeOfTravel className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Total Ratings Given</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalRatingRecived' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalRatingRecived');
                                                    navigate('/ReportsModule/TotalRatingRecived/TotalRatingRecived');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <AiFillMail className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Total Ratings Received</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalRefferalBonus' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalRefferalBonus');
                                                    navigate('/ReportsModule/TotalRefferalBonus/TotalRefferalBonus');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <TbBusinessplan className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Total Referral Bonus</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalFriendsInvitedTrips' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalFriendsInvitedTrips');
                                                    navigate('/ReportsModule/TotalFriendsInvitedTrips/TotalFriendsInvitedTrips');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <MdOutlineBusinessCenter className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Total Friends Invited</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalTicketsRised' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalTicketsRised');
                                                    navigate('/ReportsModule/TotalTicketsRised/TotalTicketsRised');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <MdSupervisorAccount className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Total Tickets Raised</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'DiscountsGiven' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('DiscountsGiven');
                                                    navigate('/ReportsModule/DiscountsGiven/DiscountsGiven');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <AiFillCalendar className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Discounts Given</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalWorkingHours' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalWorkingHours');
                                                    navigate('/ReportsModule/TotalWorkingHours/TotalWorkingHours');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <AiOutlineAccountBook className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Total Working Hours</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalPasswordReset' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalPasswordReset');
                                                    navigate('/ReportsModule/TotalPasswordReset/TotalPasswordReset');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <MdOutlineAccountBox className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Total Password Reset</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalExpence' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalExpence');
                                                    navigate('/ReportsModule/TotalExpence/TotalExpence');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <MdOutlineAccountBalanceWallet className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Total Expense</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalProfileRegistered' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalProfileRegistered');
                                                    navigate('/ReportsModule/TotalProfileRegistered/TotalProfileRegistered');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <MdAccountBox className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Total Profile Registered</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalWalletPayRecived' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalWalletPayRecived');
                                                    navigate('/ReportsModule/TotalCountOfWalletPayRecived/TotalCountOfWalletPayRecived');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <MdAccountBalanceWallet className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Wallet Pay Received Count</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'TotalWalletPaySent' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('TotalWalletPaySent');
                                                    navigate('/ReportsModule/TotalCountOfWalletPaySent/TotalCountOfWalletPaySent');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <MdAccountBalanceWallet className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Wallet Pay Sent Count</span>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>

                            {/* Pages MODULE */}
                            <div>
                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative" onClick={togglePagesMenu}>
                                    <div className="flex items-center">
                                        <IoBook className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                        <span>{t('Pages')}</span>
                                    </div>

                                    <div className={`absolute right-7 transform ${isPagesMenuOpen ? '' : 'rtl:rotate-90 -rotate-90'}`}>
                                        <IconCaretDown />
                                    </div>
                                </h2>

                                {isPagesMenuOpen && (
                                    <ul className="list-none p-0">
                                        {/* Rentails TnC MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'RentailsTnC' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('RentailsTnC');
                                                    navigate('/PagesModule/RentailsTnC/ViewRentailsTnC');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoBag className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Rentails TnC')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* Pages MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'OutstationsTnc' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('OutstationsTnc');
                                                    navigate('/PagesModule/OutstationsTnc/ViewOutstationsTnc');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoHome className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Outstations Tnc')}</span>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>

                            {/* PASS RESET MODULE */}
                            {/* <div>
                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative">
                                    <Link to="/ResetPassword">
                                        <div className="flex items-center">
                                            <IoLockOpen className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                            <span>{t('Reset Password')}</span>
                                        </div>
                                    </Link>
                                </h2>
                            </div> */}

                            {/* Cancellation Settings MODULE */}

                            {/* <div>
                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative">
                                    <Link to="/CancellationSettings">
                                        <div className="flex items-center">
                                            <IoNewspaper className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                            <span>{t('Cancellation Settings')}</span>
                                        </div>
                                    </Link>
                                </h2>
                            </div> */}

                            {/* Demographics MODULE */}
                            {/* <div>
                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative">
                                    <Link to="/Demographics">
                                        <div className="flex items-center">
                                            <IoEarth className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                            <span>{t('Demographics')}</span>
                                        </div>
                                    </Link>
                                </h2>
                            </div> */}

                            {/* Rental Package MODULE */}
                            {/* <div>
                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative">
                                    <Link to="/RentalPackage">
                                        <div className="flex items-center">
                                            <IoCash className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                            <span>{t('Rental Package')}</span>
                                        </div>
                                    </Link>
                                </h2>
                            </div> */}

                            {/* Outstation Package MODULE */}
                            {/* <div>
                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative">
                                    <Link to="/OutstationPackage">
                                        <div className="flex items-center">
                                            <IoCard className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                            <span>{t('Outstation Package')}</span>
                                        </div>
                                    </Link>
                                </h2>
                            </div> */}

                            {/* Hail Trip MODULE */}
                            {/* <div>
                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative">
                                    <Link to="/HailTrip">
                                        <div className="flex items-center">
                                            <IoCar className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                            <span>{t('Hail Trip')}</span>
                                        </div>
                                    </Link>
                                </h2>
                            </div> */}

                            {/* Dispatch MODULE */}
                            {/* <div>
                                <h2
                                    className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative"
                                    onClick={toggleDispatchMenu}
                                >
                                    <div className="flex items-center">
                                        <IoAccessibility className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                        <span>{t('Dispatch')}</span>
                                    </div>

                                    <div className={`absolute right-7 transform ${isPagesMenuOpen ? '' : 'rtl:rotate-90 -rotate-90'}`}>
                                        <IconCaretDown />
                                    </div>
                                </h2>

                                {isDispatchOpen && (
                                    <ul className="list-none p-0">
                                     
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'ManualTaxiDispatch' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('ManualTaxiDispatch');
                                                    navigate('/DispatchModule/ManualTaxiDispatch/viewManualTaxiDispatch');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoBicycle className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Manual Taxi Dispatch')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'PendingRequests' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('PendingRequests');
                                                    navigate('/DispatchModule/PendingRequests/viewPendingRequests');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoReload className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Pending Requests')}</span>
                                                </div>
                                            </button>
                                        </li>

                                
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'ScheduleTrip' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('ScheduleTrip');
                                                    navigate('/DispatchModule/ScheduleTrip/viewScheduleTrip');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoNewspaperSharp className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Schedule Trip')}</span>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div> */}

                            {/* MAP VIEW MODULE */}
                            {/* <div>
                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative" onClick={toggleMapViewMenu}>
                                    <div className="flex items-center">
                                        <IoMap className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                        <span>{t('Map View')}</span>
                                    </div>

                                    <div className={`absolute right-7 transform ${isMapViewOpen ? '' : 'rtl:rotate-90 -rotate-90'}`}>
                                        <IconCaretDown />
                                    </div>
                                </h2>

                                {isMapViewOpen && (
                                    <ul className="list-none p-0">
                               
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'HeatMap' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('HeatMap');
                                                    navigate('/MapViewModule/HeatMap/ViewHeatMap');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoBicycle className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Heat Map')}</span>
                                                </div>
                                            </button>
                                        </li>

                                    
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'GodsView' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('GodsView');
                                                    navigate('/MapViewModule/GodsView/ViewGodsView');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoNewspaperSharp className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Gods View')}</span>
                                                </div>
                                            </button>
                                        </li>

                                    
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'DriversTracking' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('DriversTracking');
                                                    navigate('/MapViewModule/DriversTracking/ViewDriversTracking');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoReload className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Drivers Tracking')}</span>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div> */}

                            {/* Ratings & Review MODULE */}
                            {/* <div>
                                <h2
                                    className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative"
                                    onClick={toggleRatingsReviewMenu}
                                >
                                    <div className="flex items-center">
                                        <IoStar className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                        <span>{t('Ratings & Review')}</span>
                                    </div>

                                    <div className={`absolute right-7 transform ${isRatingsReviewOpen ? '' : 'rtl:rotate-90 -rotate-90'}`}>
                                        <IconCaretDown />
                                    </div>
                                </h2>

                                {isRatingsReviewOpen && (
                                    <ul className="list-none p-0">
                                       
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'Driver' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('Driver');
                                                    navigate('/RatingsReviewModule/Driver/viewDriver');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoBicycle className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Driver')}</span>
                                                </div>
                                            </button>
                                        </li>

                                   
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'Rider' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('Rider');
                                                    navigate('/RatingsReviewModule/Rider/viewRider');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoNewspaperSharp className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Rider')}</span>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div> */}

                            {/* APP CMS MODULE */}
                            <div>
                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative" onClick={toggleAPPCMSMenu}>
                                    <div className="flex items-center">
                                        <IoApps className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                        <span>{t('APP CMS')}</span>
                                    </div>

                                    <div className={`absolute right-7 transform ${isAPPCMSOpen ? '' : 'rtl:rotate-90 -rotate-90'}`}>
                                        <IconCaretDown />
                                    </div>
                                </h2>

                                {isAPPCMSOpen && (
                                    <ul className="list-none p-0">
                                        {/* Colors MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'Colors' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('Colors');
                                                    navigate('/APPCMSModule/Colors/ViewColors');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoBicycle className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Colors')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* Years MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'Years' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('Years');
                                                    navigate('/APPCMSModule/Years/ViewYears');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoNewspaperSharp className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Years')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* About Us MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'AboutUs' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('AboutUs');
                                                    navigate('/APPCMSModule/AboutUs/ViewAboutUs');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoNewspaperSharp className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('About Us')}</span>
                                                </div>
                                            </button>
                                        </li>
                                        {/* Rider Privacy MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'RiderPrivacy' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('RiderPrivacy');
                                                    navigate('/APPCMSModule/RiderPrivacy/ViewRiderPrivacy');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoNewspaperSharp className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Rider Privacy')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* Rider Terms And Conditions MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'RiderTermsAndConditions' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('RiderTermsAndConditions');
                                                    navigate('/APPCMSModule/RiderTermsAndConditions/ViewRiderTermsAndConditions');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoNewspaperSharp className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Rider Terms And Conditions')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* Driver Terms and Conditions MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'DriverTermsandConditions' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('DriverTermsandConditions');
                                                    navigate('/APPCMSModule/DriverTermsandConditions/ViewDriverTermsandConditions');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoNewspaperSharp className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Driver Terms and Conditions')}</span>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>

                            {/* Send Notifications MODULE */}
                            <div>
                                <h2
                                    className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative"
                                    onClick={toggleSendNotificationsMenu}
                                >
                                    <div className="flex items-center">
                                        <IoNotifications className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                        <span>{t('Send Notifications')}</span>
                                    </div>

                                    <div className={`absolute right-7 transform ${isSendNotificationsOpen ? '' : 'rtl:rotate-90 -rotate-90'}`}>
                                        <IconCaretDown />
                                    </div>
                                </h2>

                                {isSendNotificationsOpen && (
                                    <ul className="list-none p-0">
                                        {/* Email MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'Email' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('Email');
                                                    navigate('/SendNotificationsModule/Email/ViewEmail');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoMail className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Email')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        {/* Notification MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'Notification' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('Notification');
                                                    navigate('/SendNotificationsModule/Notification/ViewNotification');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoNotifications className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Notification')}</span>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>

                            {/* SOS MODULE */}
                            <div>
                                <h2 className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative" onClick={toggleSOSMenu}>
                                    <div className="flex items-center">
                                        <MdSos className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                        <span>{t('SOS')}</span>
                                    </div>

                                    <div className={`absolute right-7 transform ${isSOSModuleOpen ? '' : 'rtl:rotate-90 -rotate-90'}`}>
                                        <IconCaretDown />
                                    </div>
                                </h2>

                                {isSOSModuleOpen && (
                                    <ul className="list-none p-0">
                                        {/* SOS MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'SOS' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('SOS');
                                                    navigate('/SOSModule/SOS/ViewSOS');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <GrEmergency className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('SOS')}</span>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>

                            {/* Community MODULE */}
                            <div>
                                <h2
                                    className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative"
                                    onClick={toggleCommunityMenu}
                                >
                                    <div className="flex items-center">
                                        <FaPeopleGroup className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                        <span>{t('Community')}</span>
                                    </div>

                                    <div className={`absolute right-7 transform ${isCommunityOpen ? '' : 'rtl:rotate-90 -rotate-90'}`}>
                                        <IconCaretDown />
                                    </div>
                                </h2>

                                {isCommunityOpen && (
                                    <ul className="list-none p-0">
                                        {/* Community */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'SOS' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('Community');
                                                    navigate('/CommunityModule/Community/ViewCommunity');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoShareSocialSharp className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Community')}</span>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>

                            {/* USER MANAGEMENT MODULE */}
                            <div>
                                <h2
                                    className="py-3 px-7 flex items-center uppercase font-extrabold dark:bg-dark dark:bg-opacity-[0.08] -mx-6 mb-1 cursor-pointer relative"
                                    onClick={toggleUserManagement}
                                >
                                    <div className="flex items-center">
                                        <IoPerson className="group-hover:!text-primary text-xl shrink-0 mr-3" />
                                        <span>{t('User Management')}</span>
                                    </div>

                                    <div className={`absolute right-7 transform ${isUserManagementOpen ? '' : 'rtl:rotate-90 -rotate-90'}`}>
                                        <IconCaretDown />
                                    </div>
                                </h2>

                                {isUserManagementOpen && (
                                    <ul className="list-none p-0">
                                        {/* USERS SUB MODULE */}
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'Users' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('Users');
                                                    navigate('/UserManagement/Users/ViewUsers');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoPerson className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Users')}</span>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`${currentMenu === 'Category' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => {
                                                    toggleMenu('Category');
                                                    navigate('/UserManagement/Category/ViewCategory');
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <IoPerson className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Category')}</span>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>

                            {/* <h2 className="py-3 px-7 flex items-center uppercase font-extrabold  dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('apps')}</span>
                            </h2>

                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/apps/chat" className="group">
                                            <div className="flex items-center">
                                                <IconMenuChat className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('chat')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/apps/mailbox" className="group">
                                            <div className="flex items-center">
                                                <IconMenuMailbox className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('mailbox')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/apps/todolist" className="group">
                                            <div className="flex items-center">
                                                <IconMenuTodo className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('todo_list')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/apps/notes" className="group">
                                            <div className="flex items-center">
                                                <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('notes')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/apps/scrumboard" className="group">
                                            <div className="flex items-center">
                                                <IconMenuScrumboard className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('scrumboard')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/apps/contacts" className="group">
                                            <div className="flex items-center">
                                                <IconMenuContacts className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('contacts')}</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'invoice' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('invoice')}>
                                            <div className="flex items-center">
                                                <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('invoice')}</span>
                                            </div>

                                            <div className={currentMenu !== 'invoice' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'invoice' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/apps/invoice/list">{t('list')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/preview">{t('preview')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/add">{t('add')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/apps/invoice/edit">{t('edit')}</NavLink>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/apps/calendar" className="group">
                                            <div className="flex items-center">
                                                <IconMenuCalendar className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('calendar')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold  dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('user_interface')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'component' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('component')}>
                                    <div className="flex items-center">
                                        <IconMenuComponents className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('components')}</span>
                                    </div>

                                    <div className={currentMenu !== 'component' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'component' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/components/tabs">{t('tabs')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/accordions">{t('accordions')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/modals">{t('modals')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/cards">{t('cards')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/carousel">{t('carousel')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/countdown">{t('countdown')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/counter">{t('counter')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/sweetalert">{t('sweet_alerts')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/timeline">{t('timeline')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/notifications">{t('notifications')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/media-object">{t('media_object')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/list-group">{t('list_group')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/pricing-table">{t('pricing_tables')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/components/lightbox">{t('lightbox')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'element' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('element')}>
                                    <div className="flex items-center">
                                        <IconMenuElements className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('elements')}</span>
                                    </div>

                                    <div className={currentMenu !== 'element' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'element' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/elements/alerts">{t('alerts')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/avatar">{t('avatar')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/badges">{t('badges')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/breadcrumbs">{t('breadcrumbs')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/buttons">{t('buttons')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/buttons-group">{t('button_groups')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/color-library">{t('color_library')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/dropdown">{t('dropdown')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/infobox">{t('infobox')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/jumbotron">{t('jumbotron')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/loader">{t('loader')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/pagination">{t('pagination')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/popovers">{t('popovers')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/progress-bar">{t('progress_bar')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/search">{t('search')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/tooltips">{t('tooltips')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/treeview">{t('treeview')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/elements/typography">{t('typography')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <NavLink to="/charts" className="group">
                                    <div className="flex items-center">
                                        <IconMenuCharts className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('charts')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="menu nav-item">
                                <NavLink to="/widgets" className="group">
                                    <div className="flex items-center">
                                        <IconMenuWidgets className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('widgets')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="menu nav-item">
                                <NavLink to="/font-icons" className="group">
                                    <div className="flex items-center">
                                        <IconMenuFontIcons className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('font_icons')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="menu nav-item">
                                <NavLink to="/dragndrop" className="group">
                                    <div className="flex items-center">
                                        <IconMenuDragAndDrop className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('drag_and_drop')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold  dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('tables_and_forms')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <NavLink to="/tables" className="group">
                                    <div className="flex items-center">
                                        <IconMenuTables className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('tables')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'datalabel' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('datalabel')}>
                                    <div className="flex items-center">
                                        <IconMenuDatatables className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('datatables')}</span>
                                    </div>

                                    <div className={currentMenu !== 'datalabel' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'datalabel' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/datatables/basic">{t('basic')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/advanced">{t('advanced')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/skin">{t('skin')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/order-sorting">{t('order_sorting')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/multi-column">{t('multi_column')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/multiple-tables">{t('multiple_tables')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/alt-pagination">{t('alt_pagination')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/checkbox">{t('checkbox')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/range-search">{t('range_search')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/export">{t('export')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/datatables/column-chooser">{t('column_chooser')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'forms' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('forms')}>
                                    <div className="flex items-center">
                                        <IconMenuForms className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('forms')}</span>
                                    </div>

                                    <div className={currentMenu !== 'forms' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'forms' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/forms/basic">{t('basic')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/input-group">{t('input_group')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/layouts">{t('layouts')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/validation">{t('validation')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/input-mask">{t('input_mask')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/select2">{t('select2')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/touchspin">{t('touchspin')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/checkbox-radio">{t('checkbox_and_radio')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/switches">{t('switches')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/wizards">{t('wizards')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/file-upload">{t('file_upload')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/quill-editor">{t('quill_editor')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/markdown-editor">{t('markdown_editor')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/date-picker">{t('date_and_range_picker')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/forms/clipboard">{t('clipboard')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold  dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('user_and_pages')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'users' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('users')}>
                                    <div className="flex items-center">
                                        <IconMenuUsers className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('users')}</span>
                                    </div>

                                    <div className={currentMenu !== 'users' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'users' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/users/profile">{t('profile')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/users/user-account-settings">{t('account_settings')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'page' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('page')}>
                                    <div className="flex items-center">
                                        <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('pages')}</span>
                                    </div>

                                    <div className={currentMenu !== 'page' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'page' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/pages/knowledge-base">{t('knowledge_base')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pages/contact-us-boxed" target="_blank">
                                                {t('contact_us_boxed')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pages/contact-us-cover" target="_blank">
                                                {t('contact_us_cover')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pages/faq">{t('faq')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pages/coming-soon-boxed" target="_blank">
                                                {t('coming_soon_boxed')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/pages/coming-soon-cover" target="_blank">
                                                {t('coming_soon_cover')}
                                            </NavLink>
                                        </li>
                                        <li className="menu nav-item">
                                            <button
                                                type="button"
                                                className={`${
                                                    errorSubMenu ? 'open' : ''
                                                } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                onClick={() => setErrorSubMenu(!errorSubMenu)}
                                            >
                                                {t('error')}
                                                <div className={`${errorSubMenu ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                    <IconCaretsDown fill={true} className="w-4 h-4" />
                                                </div>
                                            </button>
                                            <AnimateHeight duration={300} height={errorSubMenu ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <a href="/pages/error404" target="_blank">
                                                            {t('404')}
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/pages/error500" target="_blank">
                                                            {t('500')}
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/pages/error503" target="_blank">
                                                            {t('503')}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        <li>
                                            <NavLink to="/pages/maintenence" target="_blank">
                                                {t('maintenence')}
                                            </NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'auth' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('auth')}>
                                    <div className="flex items-center">
                                        <IconMenuAuthentication className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('authentication')}</span>
                                    </div>

                                    <div className={currentMenu !== 'auth' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'auth' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/auth/boxed-signin" target="_blank">
                                                {t('login_boxed')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/auth/boxed-signup" target="_blank">
                                                {t('register_boxed')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/auth/boxed-lockscreen" target="_blank">
                                                {t('unlock_boxed')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/auth/boxed-password-reset" target="_blank">
                                                {t('recover_id_boxed')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/auth/cover-login" target="_blank">
                                                {t('login_cover')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/auth/cover-register" target="_blank">
                                                {t('register_cover')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/auth/cover-lockscreen" target="_blank">
                                                {t('unlock_cover')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/auth/cover-password-reset" target="_blank">
                                                {t('recover_id_cover')}
                                            </NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li> */}

                            {/* <h2 className="py-3 px-7 flex items-center uppercase font-extrabold  dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('supports')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <NavLink to="https://vristo.sbthemes.com" target="_blank" className="nav-link group">
                                    <div className="flex items-center">
                                        <IconMenuDocumentation className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('documentation')}</span>
                                    </div>
                                </NavLink>
                            </li> */}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
