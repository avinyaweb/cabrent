import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '@/store/themeConfigSlice';
import Dropdown from '@/components/Dropdown';
import { IRootState } from '@/store';
import i18next from 'i18next';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconPhoneCall from '@/components/Icon/IconPhoneCall';
import IconLockDots from '@/components/Icon/IconLockDots';
import LoginService from '@/services/LoginService';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { authUser } from '@/reducer/users/userReducer';
import logo from '@/assets/images/logo.png';

interface LoginResult {
    success: boolean;
    error?: string;
    data?: any;
}

const Login = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        dispatch(setPageTitle('Login'));
    });
    const navigate = useNavigate();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    // Fetch the flag value from local storage or use the default value from themeConfig.locale
    const storedFlag = localStorage.getItem('flag') || themeConfig.locale;
    const [flag, setFlag] = useState(storedFlag);

    const updateFlag = (newFlag: string) => {
        setFlag(newFlag);
        localStorage.setItem('flag', newFlag);
        if (newFlag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };

    const [phoneNumber, setPhoneNumber] = useState('');
    const [passwordHash, setPasswordHash] = useState('');
    const [error, setError] = useState<string | undefined>(undefined);

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Perform form validation if needed
            if (!phoneNumber || !passwordHash) {
                setError('Phone number and password are required fields.');
                return;
            }

            // const loginResult = await LoginService.login(phoneNumber, passwordHash);

            // ---- in future we need to un comment after impliment roles & permissions
            // if (loginResult.status === 200) {
            //     if (loginResult?.message === 'Admin Login successful') {
            //         dispatch(
            //             authUser({
            //                 isUserAuthenticated: true,
            //                 bearerToken: loginResult?.data?.token,
            //                 roles: [loginResult?.data?.adminData?.roleType],
            //             })
            //         );

            //         // Save user authentication details to local storage upon successful login
            //         localStorage.setItem('isUserAuthenticated', 'true');
            //         localStorage.setItem('bearerToken', loginResult?.data?.token);
            //         localStorage.setItem('roles', JSON.stringify([loginResult?.data?.adminData?.roleType]));

            //         // Save user roles and permissions to local storage
            //         localStorage.setItem('userRolesAndPermissions', JSON.stringify(loginResult?.data?.RolesAndPermissions));
            //     }

            //     // Save phone number and password to local storage upon successful login
            //     localStorage.setItem('phoneNumber', phoneNumber);
            //     localStorage.setItem('password', passwordHash);

            //     // let userRolesAndPermissions = JSON.parse(localStorage.getItem('userRolesAndPermissions') || '{}');

            //     // console.log(userRolesAndPermissions[0]["ADMIN"]["ADMINREAD"]["permissionStatus"])

            //     // Redirect to the dashboard upon successful login
            // } else {
            //     setError('Invalid phone number or password. Please try again.');
            // }
            navigate('/');
        } catch (error) {
            console.error('Login Error:', error);
            setError('Error during login. Please try again.');
        }
    };

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                            <Link to="/" className="w-48 block lg:w-72 ms-10">
                                {/* <img src="/assets/images/auth/logo-white.svg" alt="Logo" className="w-full" /> */}
                                <img className="w-24 ml-[5px] flex-none" src={logo} alt="logo" />
                            </Link>
                            <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                                <img src="/assets/images/auth/login.svg" alt="Cover Image" className="w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                        <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                            <Link to="/" className="w-8 block lg:hidden">
                                {/* <img src="/assets/images/logo.svg" alt="Logo" className="mx-auto w-10" /> */}
                                <img className="mx-auto w-10" src={logo} alt="logo" />
                            </Link>
                            <div className="dropdown ms-auto w-max">
                                <Dropdown
                                    offset={[0, 8]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                                    button={
                                        <>
                                            <div>
                                                <img src={`/assets/images/flags/IN.svg`} alt="image" className="h-5 w-5 rounded-full object-cover" />
                                            </div>
                                            <div className="text-base font-bold uppercase">{flag}</div>
                                            <span className="shrink-0">
                                                <IconCaretDown />
                                            </span>
                                        </>
                                    }
                                >
                                    <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                                        {themeConfig.languageList.map((item: any) => {
                                            return (
                                                <li key={item.code}>
                                                    <button
                                                        type="button"
                                                        className={`flex w-full hover:text-primary rounded-lg ${flag === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                        onClick={() => {
                                                            i18next.changeLanguage(item.code);
                                                            // setFlag(item.code);
                                                            setLocale(item.code);
                                                        }}
                                                    >
                                                        <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="w-5 h-5 object-cover rounded-full" />
                                                        <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your phone number and password to login</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
                                <div>
                                    <label htmlFor="phoneNumber">Phone number</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="phoneNumber"
                                            type="tel"
                                            placeholder="Enter Phone Number"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconPhoneCall fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="passwordHash"
                                            type="password"
                                            placeholder="Enter Password"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            value={passwordHash}
                                            onChange={(e) => setPasswordHash(e.target.value)}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-gradient !mt-8 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Sign in
                                </button>
                            </form>
                            {error && <p>{error}</p>}
                        </div>
                        <p className="absolute bottom-6 w-full text-center dark:text-white fonb">
                            <span className="font-bold">©</span> {new Date().getFullYear()}. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
