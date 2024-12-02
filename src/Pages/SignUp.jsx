import React, { useEffect, useState } from 'react';
import { BiLoader } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Card from '../components/UI/Card';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setProfile, setUser } from '../redux/appSlice';
import { useCurrentUser } from '../components/hooks/useCurrentUser';
import { doc, getDoc, setDoc } from 'firebase/firestore';


const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const signupWithEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Signed up
      const user = userCredential.user;
      
      // Profile update with name
      await updateProfile(user, {displayName: name});
      const docsnap = await getDoc(doc(db, user.email, user.email));
      const docdata = docsnap.exists() ? docsnap.data() : {};

      // updating redux
      const loggedInUser = useCurrentUser(user, docdata);
      createDoc(loggedInUser, email);
      dispatch(setUser(loggedInUser));
      dispatch(setProfile(loggedInUser));
      toast.success("Account created successfully!");
      //clear input field
      setEmail("");
      setName("");
      setPassword("");
      setConfirmPassword("");
    }catch(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
      toast.error(errorMessage);
    }finally{
      setIsLoading(false);
    }
  };

  const createDoc = async (loggedInUser, email) =>{
    try{
      await setDoc(doc(db, email, email), {...loggedInUser});
    }catch(error){
      console.log(error.message);
    }
  }

  useEffect(()=>{
    // Update form validity status
    const isEmailValid = email.includes("@");
    const arePasswordMatching = password === confirmPassword;
    const isPasswordValid = password.length >= 6;
    const isNameValid  = name.trim().length >= 3;

    setIsFormValid(isEmailValid && arePasswordMatching && isPasswordValid && isNameValid);

  },[email, password, confirmPassword, name]);

  return (
    <Card>
      {/* Sign in form */}
      <div className="w-full max-w-md p-8 rounded-xl relative z-10 mx-4 backdrop-blur-3xl bg-white/10 border border-white/70 shadow-xl animate-fadeIn">
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-transparent to-white/10 rounded-xl -z-10" />
        
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-slate-700">Create your account</h2>
          <p className="text-slate-500 mt-2">Welcome! Join Mailhub today</p>
        </div>

        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-gray-300 w-full"></div>
          <div className="border-t border-gray-300 w-full"></div>
        </div>
        
        <form onSubmit={signupWithEmail} className='space-y-5'>
        <div className="relative animate-slideIn">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-gray-500 duration-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Name
            </label>
          </div>
          <div className="relative animate-slideIn [animation-delay:400ms] opacity-0">
            <input
              id="email"
              type="email"
              value={email}
              onBlur={()=> setIsEmailTouched(true)}
              onChange={(e) => setEmail(e.target.value)}
              className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 peer ${isEmailTouched && !email.includes("@") && "border-rose-600 focus:border-rose-600"}`}
              placeholder=" "
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // Pattern to validate email includes @
              required
            />
            <label
              htmlFor="email"
              className={`absolute text-sm text-gray-500 duration-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${isEmailTouched && !email.includes("@") && "text-rose-600 peer-focus:text-rose-600 peer-placeholder-shown:top-6"}`}
            >
              Email
            </label>
            {isEmailTouched && !email.includes("@") && (<p className='text-rose-600 text-sm px-2'>Enter a valid Email id</p>)}
          </div>
          <div className="relative animate-slideIn [animation-delay:800ms] opacity-0">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 duration-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Password
            </label>
          </div>

          <div className="relative animate-slideIn [animation-delay:1200ms] opacity-0">
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onBlur={()=> {if(password !== confirmPassword) setIsConfirmPasswordTouched(true)}}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 peer ${isConfirmPasswordTouched && (password !== confirmPassword) && "border-rose-600 focus:border-rose-600"}`}
              placeholder=" "
              required
            />
            <label
              htmlFor="confirm-password"
              className={`absolute text-sm text-gray-500 duration-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${isConfirmPasswordTouched && (password !== confirmPassword) && "text-rose-600 peer-focus:text-rose-600 peer-placeholder-shown:top-6"}`}
            >
             Confirm Password
            </label>
            {isConfirmPasswordTouched && (password !== confirmPassword) && (<p className='text-rose-600 text-sm px-2'>Password and Confirm Password does not match.</p>)}
          </div>

          <div className="flex flex-col space-y-4 animate-slideIn [animation-delay:1600ms] opacity-0">
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-teal-400 to-rose-400 hover:from-teal-300 hover:to-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400/50 shadow-md transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <><BiLoader className="w-5 h-5 animate-spin mr-2" />Loading...</>
              ) : 'Sign up'}
            </button>

          </div>
        </form>
        <div className="text-center mt-2">
          <span className="text-gray-500 text-sm">Already have an account?</span>
          <button disabled={isLoading && !isFormValid} onClick={() => navigate("/") } type="button" className="ml-2 text-sm text-teal-400 hover:text-teal-500 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">Sign in</button>
        </div>
      </div>
    </Card>
  );
};

export default SignUp;