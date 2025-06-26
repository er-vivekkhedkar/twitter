import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../context/firbase';
import twitterimg from "../../image/twitter.jpeg";
import TwitterIcon from "@mui/icons-material/Twitter";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [generatedPassword, setGeneratedPassword] = useState('');

    const generatePassword = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let password = '';
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setGeneratedPassword(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        const now = new Date().getTime();
        const lastRequest = localStorage.getItem(`passwordReset_${email}`);
        if (lastRequest && (now - lastRequest < 24 * 60 * 60 * 1000)) {
            setError('You can only request a password reset once a day.');
            setLoading(false);
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            localStorage.setItem(`passwordReset_${email}`, now.toString());
            setMessage('Password reset email sent. Check your inbox.');
        } catch (err) {
            setError('Failed to send password reset email. Please check the email address.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-5">
            <div className="hidden md:flex items-center justify-center bg-blue-100 md:col-span-3">
                <img src={twitterimg} className="w-full h-full object-cover" alt="twitterimg" />
            </div>
            <div className="flex flex-col items-center justify-center bg-blue-50 p-4 sm:p-6 md:col-span-2">
                <div className="w-full max-w-md space-y-6">
                    <TwitterIcon className="text-blue-500 w-24 h-24 mb-4" />
                    <h1 className="text-3xl font-bold">Reset your password</h1>
                    <p className="text-gray-600">Enter your email address and we will send you a link to reset your password.</p>
                    
                    {message && <p className="bg-green-500 text-white p-3 rounded">{message}</p>}
                    {error && <p className="bg-red-500 text-white p-3 rounded">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-3 rounded-full font-bold hover:bg-blue-600 disabled:opacity-50">
                            {loading ? <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mx-auto"></div> : 'Send Reset Link'}
                        </button>
                    </form>

                    <div className="mt-4 text-center border-t pt-4">
                        <p className="text-gray-600">Need a strong password?</p>
                        <button
                            type="button"
                            onClick={generatePassword}
                            className="mt-2 text-blue-500 hover:underline"
                        >
                            Generate a new password
                        </button>
                        {generatedPassword && (
                            <div className="mt-4 p-3 bg-gray-100 border rounded-lg text-left">
                                <p className="font-semibold">Generated Password:</p>
                                <p className="font-mono break-all text-sm my-2">{generatedPassword}</p>
                                <button
                                    type="button"
                                    onClick={() => navigator.clipboard.writeText(generatedPassword)}
                                    className="text-xs text-blue-500 hover:underline"
                                >
                                    Copy to clipboard
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="text-center border-t pt-4">
                        <Link to="/login" className="text-blue-500 hover:underline">Back to Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
