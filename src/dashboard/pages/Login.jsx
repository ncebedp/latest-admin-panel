import React, { useState, useEffect, useContext } from 'react';
import { base_url } from "../../config/config";
import axios from "axios";
import toast from "react-hot-toast";
import StoreContext from '../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Lock, Eye, EyeOff, Building } from 'lucide-react';

const Login = () => {
    const [loader, setLoader] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isFloating, setIsFloating] = useState(true);
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const { dispatch } = useContext(StoreContext);
    const navigate = useNavigate();

    // Floating animation for admin icon
    useEffect(() => {
        const interval = setInterval(() => {
            setIsFloating(prev => !prev);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const inputHandle = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const submit = async (e) => {
        e.preventDefault();
        setLoader(true);

        try {
            const { data } = await axios.post(`${base_url}/api/login`, state);
            setLoader(false);

            localStorage.setItem('newsToken', data.token);
            toast.success(data.message);

            dispatch({
                type: "login_success",
                payload: {
                    token: data.token,
                }
            });

            navigate('/dashboard');
        } catch (error) {
            setLoader(false);
            toast.error(error.response?.data?.message || "Login failed");
            console.log('Login error:', error);
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4'>
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, #374151 1px, transparent 0)',
                    backgroundSize: '20px 20px'
                }}></div>
            </div>

            <div className='relative bg-white shadow-2xl rounded-2xl w-full max-w-md mx-auto border border-gray-200'>
                <div className='px-8 pt-8 pb-6 border-b border-gray-100'>
                    <div className='flex justify-center mb-6 relative'>
                        <div className={`relative transition-all duration-2500 ease-in-out transform ${isFloating ? 'translate-y-[-6px]' : 'translate-y-[6px]'}`}>
                            <div className="absolute inset-0 bg-blue-600/10 rounded-full blur-md scale-110"></div>
                            <div className='relative bg-blue-600 p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300'>
                                <Shield className='w-10 h-10 text-white' />
                            </div>
                        </div>
                        <div className="absolute top-2 left-2 w-1 h-1 bg-blue-300 rounded-full animate-ping delay-500"></div>
                        <div className="absolute bottom-1 right-3 w-1.5 h-1.5 bg-gray-300 rounded-full animate-ping delay-1000"></div>
                    </div>

                    <div className='text-center'>
                        <h1 className='text-2xl font-bold text-gray-800 mb-1'>
                            Admin Portal
                        </h1>
                        <p className='text-gray-500 text-sm flex items-center justify-center gap-1'>
                            <Building className='w-3 h-3' />
                            Secure Dashboard Access
                        </p>
                    </div>
                </div>

                <div className='p-8'>
                    <div className='space-y-5'>
                        <div className='relative group'>
                            <label htmlFor="email" className='block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600'>
                                Email Address
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <User className='h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500' />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={state.email}
                                    onChange={inputHandle}
                                    placeholder='admin@company.com'
                                    className='w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300'
                                    required
                                />
                            </div>
                        </div>

                        <div className='relative group'>
                            <label htmlFor="password" className='block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600'>
                                Password
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500' />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={state.password}
                                    onChange={inputHandle}
                                    placeholder='Enter your password'
                                    className='w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-gray-300'
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors'
                                >
                                    {showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={submit}
                            className={`w-full relative py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] ${
                                loader 
                                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg focus:ring-4 focus:ring-blue-500/20'
                            }`}
                            disabled={loader}
                        >
                            <div className={`flex items-center justify-center space-x-2 ${loader ? 'opacity-80' : ''}`}>
                                {loader ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Authenticating...</span>
                                    </>
                                ) : (
                                    <>
                                        <Shield className='w-5 h-5' />
                                        <span>Sign In to Dashboard</span>
                                    </>
                                )}
                            </div>
                        </button>
                    </div>

                    <div className='mt-6 flex items-center justify-between text-sm'>
                        <label className='flex items-center text-gray-600'>
                            <input type="checkbox" className='w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-2 mr-2' />
                            Remember me
                        </label>
                        <a href="#" className='text-blue-600 hover:text-blue-700 hover:underline transition-colors'>
                            Forgot password?
                        </a>
                    </div>
                </div>

                <div className='px-8 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-100'>
                    <div className='flex items-center justify-center space-x-2 text-xs text-gray-500'>
                        <Shield className='w-3 h-3 text-green-500' />
                        <span>Secured with 256-bit SSL encryption</span>
                    </div>
                </div>

                <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl'></div>
            </div>
        </div>
    );
};

export default Login;
