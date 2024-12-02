import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  XCircle,
  Mail,
  Phone,
  User,
  Link,
  Calendar,
  Clock,
  CheckCircle,
} from "lucide-react";
import Card from "../components/UI/Card";
import { setProfile, setUser } from "../redux/appSlice";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { useCurrentUser } from "../components/hooks/useCurrentUser";
import { doc, setDoc, updateDoc } from "firebase/firestore";


const UserProfile = () => {
  const user = useSelector((state) => state.appSlice.user);
  const profile = useSelector((state) => state.appSlice.profile);
  const selectedMailPath = useSelector((state) => state.navSlice.selectedMailPath);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    displayName: profile?.displayName || "",
    phoneNumber: profile?.phoneNumber || "",
    photoURL: profile?.photoURL || "",
  });

  const [isEditing, setIsEditing] = useState({
    displayName: !profile?.displayName,
    phoneNumber: !profile?.phoneNumber,
    photoURL: !profile?.photoURL,
  });

  const handleVerifyEmail = async() => {
    // implement email verification logic here
    try{
      await sendEmailVerification(auth.currentUser);
      const updatedUser = useCurrentUser(auth.currentUser);
      dispatch(setUser(updatedUser));
      //dispatch(setProfile(updatedUser));
      toast.success(`Verification email sent to ${profile.email}! Please check your inbox`);
    }catch(error){
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    try{
      await updateProfile(auth.currentUser, {
        displayName: formData?.displayName,
        //phoneNumber: formData?.phoneNumber,
        photoURL: formData?.photoURL,
      });
      const updatedUser = useCurrentUser(auth.currentUser);
      await updateDoc(doc(db, profile.email, profile.email), {
        displayName: formData?.displayName,
        phoneNumber: formData?.phoneNumber,
        photoURL: formData?.photoURL,
      });
      dispatch(setUser(updatedUser));
      //dispatch(setProfile(updatedUser));
      setIsEditing({displayName: !!!formData?.displayName, phoneNumber: !!!formData?.phoneNumber, photoURL: !!!formData?.photoURL});
      toast.success("Profile updated successfully!");
    }catch(error){
      toast.error(error.message);
    }
  };

  const getInputClass = (isEditable) => `
    mt-1 block w-full p-2 rounded-lg border focus:outline-none text-sm
    ${
      isEditable
        ? "border-teal-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/50 bg-white"
        : "border-gray-200 bg-gray-50 text-gray-500"
    }
    transition-all duration-200
  `;

  const EditButton = ({ isEditing, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-11 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1
        ${isEditing 
          ? 'text-rose-600 hover:text-rose-700' 
          : 'text-teal-600 hover:text-teal-700'}`}
    >
      {isEditing ? "Cancel" : "Edit"}
    </button>
  );

  return (
    <Card>
      <div className="w-full max-w-lg p-4 mx-auto bg-white rounded-2xl shadow-xl overflow-">
        <div className="relative">
          {/* Decorative background*/}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-rose-50 opacity-50 rounded-xl " />

          {profile ? (
            <div className="relative text-center p-3">
             <div onClick={()=> navigate(`/${selectedMailPath}`)} className="absolute p-3 rounded-full hover:bg-teal-300/30 cursor-pointer transition-all duration-500"> <IoMdArrowBack size={"20px"}  /></div>
              <h2 className="text-3xl font-bold text-gray-800">
                User Profile
              </h2>
              <p className="text-gray-500">Manage your account information</p>

              {/* Email Verification Status */}
              <div
                onClick={!profile.emailVerified ? handleVerifyEmail : null} // Only adds onClick if email is not verified
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${profile.emailVerified ? "bg-teal-50 text-teal-600" : "bg-rose-50 text-rose-700 cursor-pointer hover:shadow-lg hover:scale-102 hover:bg-rose-300/40 transition-all duration-200 ease-in-out active:scale-98"}`}
              >
                {profile.emailVerified ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1.5" />
                    Email Verified
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 mr-1.5" />
                    Email Not Verified
                  </>
                )}
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-2">
                {/* Profile Display Section */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-teal-100 to-rose-100">
                      <img
                        src={profile?.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7oMra0QkSp_Z-gShMOcCIiDF5gc_0VKDKDg&s"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  <div className="flex items-center mt-1">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {profile.email}
                    </h3>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-2">
                  <div className="relative">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <User className="w-4 h-4" />
                      Display Name
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleChange}
                        placeholder="Enter your display name"
                        className={getInputClass(isEditing.displayName)}
                        disabled={!isEditing.displayName}
                      />
                      <EditButton
                        isEditing={isEditing.displayName}
                        onClick={() =>
                          setIsEditing((prev) => ({
                            ...prev,
                            displayName: !prev.displayName,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className={getInputClass(isEditing.phoneNumber)}
                        disabled={!isEditing.phoneNumber}
                      />
                      <EditButton
                        isEditing={isEditing.phoneNumber}
                        onClick={() =>
                          setIsEditing((prev) => ({
                            ...prev,
                            phoneNumber: !prev.phoneNumber,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Link className="w-4 h-4" />
                      Photo URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        name="photoURL"
                        value={formData.photoURL}
                        onChange={handleChange}
                        placeholder="Enter photo URL"
                        className={getInputClass(isEditing.photoURL)}
                        disabled={!isEditing.photoURL}
                      />
                      <EditButton
                        isEditing={isEditing.photoURL}
                        onClick={() =>
                          setIsEditing((prev) => ({
                            ...prev,
                            photoURL: !prev.photoURL,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-2 border border-gray-100">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                        <Calendar className="w-4 h-4" />
                        Account Created
                      </label>
                      <div className="text-gray-600 text-left">
                        {profile.createdAt}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-2 border border-gray-100">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                        <Clock className="w-4 h-4" />
                        Last Login
                      </label>
                      <div className="text-gray-600 text-left">
                        {profile.lastLoginAt}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                {(isEditing.displayName ||
                  isEditing.phoneNumber ||
                  isEditing.photoURL) && (
                  <button
                    type="submit"
                    className="w-full px-6 py-[0.61rem] text-sm font-medium text-white bg-gradient-to-r from-teal-400 to-rose-400 hover:from-teal-300 hover:to-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400/50 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Save Changes
                  </button>
                )}
              </form>
            </div>
          ) : (
            <div className="text-center py-16 px-4">
              <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl font-medium text-gray-700">
                Please sign in to view your profile
              </p>
              <p className="mt-2 text-gray-500">
                You'll need to authenticate to access your profile information
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UserProfile;