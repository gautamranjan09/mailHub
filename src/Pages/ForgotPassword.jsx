import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/UI/Card';
import { BiLoader } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try{
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent successfully! Check  your email.');
    }catch(error){
      toast.error(error.message)
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <Card>

    {/* Sign in form */}
    <div className="w-full max-w-md p-8 rounded-xl relative z-10 mx-4 backdrop-blur-3xl bg-white/10 border border-white/70 shadow-xl animate-fadeIn">
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-transparent to-white/10 rounded-xl -z-10" />
      
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-slate-700">Sign up to Mail Hub</h2>
        <p className="text-slate-500 mt-2">Welcome! Please enter your details</p>
      </div>
      <div className="relative flex items-center justify-center mb-6">
        <div className="border-t border-gray-300 w-full"></div>
        <div className="border-t border-gray-300 w-full"></div>
      </div>
      
      <form onSubmit={handleForgotPassword} className='space-y-5'>
      
        <div className="relative animate-slideIn">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-gray-500 duration-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Email
          </label>
        </div>
        
        <div className="flex flex-col space-y-4 animate-slideIn">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-teal-400 to-rose-400 hover:from-teal-300 hover:to-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400/50 shadow-md transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <><BiLoader className="w-5 h-5 animate-spin mr-2" />Loading...</>
            ) : 'Forgot Password'}
          </button>
        </div>
      </form>
      <div className="text-center mt-2">
        <span className="text-gray-500 text-sm"> Remember your password?</span>
        <button disabled={isLoading} onClick={() => navigate("/") } type="button" className="ml-2 text-sm text-teal-400 hover:text-teal-500 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"> Back to Sign in</button>
      </div>
    </div>
  </Card>
  )
}

export default ForgotPassword;