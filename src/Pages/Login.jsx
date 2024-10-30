import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { BiLoader } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { auth, db, provider } from "../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setProfile, setUser } from "../redux/appSlice";
import Card from "../components/UI/Card";
import { useCurrentUser } from "../components/hooks/useCurrentUser";
import { doc, onSnapshot, setDoc } from "firebase/firestore";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signedIn } = useSelector((state) => state.appSlice);
    const navigate = useNavigate();
    const dispatch = useDispatch();

   useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const loggedInUser = useCurrentUser(user);
      dispatch(setUser(loggedInUser));
      const unsubscribe = onSnapshot(
        doc(db, loggedInUser.email, loggedInUser.email),
        (doc) => {
          console.log(doc.data());
          dispatch(setProfile(doc.data()));
        },
        (error) => {
          console.error("Error fetching document:", error);
        }
      );

      toast.success("Welcome back to Mail hub! You are already logged in.");
    }
  }, []);
  
    const loginUsingEmail = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      try {
       const userCredential = await signInWithEmailAndPassword(auth, email, password);
       const loggedInUser = useCurrentUser(userCredential.user);
       dispatch(setUser(loggedInUser));
       dispatch(setProfile(loggedInUser));
       createDoc(loggedInUser, email);
       toast.success("Welcome to Mailhub!");
      }catch(error){
        toast.error(error.message);
      }finally{
        setIsLoading(false);
      }
    };

    const signinWithGoogle = async () => {
        setIsLoading(true);
        
        try{
          const result = await signInWithPopup(auth, provider);
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const  token = credential.accessToken;
  
          // The signed-in user info.
          const user = result.user;
          const loggedInUser = useCurrentUser(user);

          toast.success("Welcome to Mailhub!");
          dispatch(setUser(loggedInUser));
          dispatch(setProfile(loggedInUser));
          createDoc(loggedInUser, email);
          // console.log(user, loggedInUser);
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          toast.error(errorMessage);
        } finally{
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

  return (
    <Card>
      {/* Sign in form */}
      <div className="w-full max-w-md p-8 rounded-xl relative z-10 mx-4 backdrop-blur-3xl bg-white/10 border border-white/70 shadow-xl animate-fadeIn">
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-transparent to-white/10 rounded-xl -z-10"/>

        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-700">Sign in to Mail Hub</h2>
            <p className="text-slate-400 mt-2">Welcome back! Please enter your details</p>
        </div>

        <div className="mb-6 animate-slideIn">
            <button onClick={signinWithGoogle} disabled={isLoading} className="w-full flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium text-teal-500 bg-white hover:text-white hover:bg-gradient-to-r hover:from-rose-300 hover:to-teal-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed">
             {isLoading ? ( <><BiLoader className="w-5 h-5 animate-spin" />Loading...</> ) 
             : ( <>
                <img src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png" alt="Google" className="w-5 h-4" />
                Continue with Google
                </>)}
            </button>
        </div>
        <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-gray-300 w-full"/>
            <div className="bg-white px-4 text-sm text-gray-500">or</div>
            <div className="border-t border-gray-300 w-full"/>
        </div>
        <form onSubmit={loginUsingEmail} >
            <div className="relative animate-slideIn [animation-delay:400ms] opacity-0">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block mb-5 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 peer"
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
            <div className="flex items-center justify-end mb-6">
                <button disabled={isLoading} onClick={() => navigate("/forgotpassword") } type="button" className="text-sm text-teal-400 hover:text-teal-500 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">Forgot password?</button>
            </div>

            <div className="flex flex-col space-y-4 animate-slideIn [animation-delay:1200ms] opacity-0">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-teal-400 to-rose-400 hover:from-teal-300 hover:to-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400/50 shadow-md transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                      <><BiLoader className="w-4 h-4 animate-spin mr-2" />Loading...</>
                      ) : 'Sign in'}
                </button>
                

            </div>
        </form>
        <div className="text-center mt-2">
          <span className="text-gray-500 text-sm">or Don't Have An Account?</span>
          <button disabled={isLoading} onClick={() => navigate("/signup") } type="button" className="ml-2 text-sm text-teal-400 hover:text-teal-500 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">Sign up</button>
        </div>
      </div>
    </Card>
  );
};

export default Login;
