import { useTheme } from "../contex/ThemeContext.jsx";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import ShowPasswordIcon from "../components/icons/ShowPasswordIcon.jsx"
import HidePasswordIcon from "../components/icons/HidePasswordIcon.jsx"
import InfoIcon from "../components/icons/InfoIcon.jsx"
import GoogleIcon from "../components/icons/GoogleIcon.jsx";
import {supabase } from "../lib/supabaseClient.js";

const ResetPage = () => {
   const { resolvedTheme, fontTheme,  setTheme } = useTheme();
    const [showNewPassword, setShowNewPassword] =  useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =  useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
   const [formError, setFormError] = useState("");
   const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

   const handleSubmit = async (event) => { 
         event.preventDefault();
          const formData = new FormData(event.currentTarget);

         const newPassword = String(formData.get("newPassword") ?? "");
         const confirmPassword = String(formData.get("confirmPassword") ?? "");
         const isPasswordTooShort = newPassword.length < 8;
          const passwordsDoNotMatch = newPassword !== confirmPassword;
         setPasswordError(isPasswordTooShort);
         setConfirmPasswordError(passwordsDoNotMatch);
         if (isPasswordTooShort || passwordsDoNotMatch) return;
        setIsSubmitting(true);
         try {const { data, error } = await supabase.auth.updateUser({ password: newPassword });
                          
                         if (error) { setFormError(error.message); return; }
                          setSuccessMessage("Пароль изменён"); 
                             navigate("/");     
                           }
                               
                       catch (error) {console.error("Login error:", error.message);
                         setFormError(error.message); }
                           
                       finally {setIsSubmitting(false)}


        };

     return(
      <div data-theme={resolvedTheme}
         data-font-theme={fontTheme}
         className="min-h-screen bg-app-login-bg flex justify-center
                    items-center">
        <button type="button"
                 onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                 className="absolute top-4 right-4 z-10 px-3 py-2 
                            rounded-lg bg-app-background text-app-bright-text
                             border border-app-border"> 
             Тема
        </button>

        <section className=" relative flex flex-col gap-4 w-[343px] md:w-[522px] lg:w-[540px]
                         bg-app-background rounded-xl  border border-app-border
                         py-10 px-4 md:px-8 md:py-12 lg:px-12 text-preset-5 text-app-bright-text ">

             <header className="flex flex-col items-center mx-auto">
               <img className="w-24 text-center mb-4"
                src={resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
                alt="Notes" />
               <h1 className="text-preset-1 font-bold mb-2">Reset Your Password</h1>
               <p className="text-center text-app-text-muted-semi leading-[1.3] " >
                    Choose a new password to secure your account. 
               </p>
             </header>

          <form noValidate
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 text-app-border pt-6">

                   {/* BLOCK New Password */}
                   <div className="form-field flex flex-col gap-1.5">
                    
                    <label htmlFor="newPassword"
                           className="text-preset-4 text-app-bright-text">
                      Password
                    </label>

                    <div className="relative">

                       <div className="bg-app-background  py-3 px-4 rounded-xl 
                                   border border-app-border
                                   hover:bg-app-hover-input hover:cursor-pointer
                                    focus-within:ring-2
                                    focus-within:border-neutral-500 focus-within:ring-offset-2">
                       <input required
                             type={showNewPassword ? "text" : "password"}
                             id="newPassword"
                             name="newPassword"
                             minLength={8}
                             className="w-full bg-transparent text-app-text-button pr-8
                                       focus:outline-none" />
                                      
                       </div>
                     
                       <button type="button"
                              onClick={() => setShowNewPassword((previous) => !previous)}
                              aria-label={showNewPassword ? "Hide password" : "Show password"}
                              aria-pressed={showNewPassword}
                              className="absolute top-1/2 -translate-y-1/2 right-4
                                          flex items-center justify-center ">
                              {showNewPassword ? <HidePasswordIcon className="block w-5 h-5" /> : <ShowPasswordIcon className="block w-5 h-5" />   }            
                              
                       </button>

                   </div>

                     <div className={`flex gap-2 items-center
                                ${passwordError ? "text-red-500" : "text-app-text-button"}`}> 
                        <InfoIcon className="block w-5 h-5 " />
                        <p className={`text-preset-6 leading-[1.4] `}> 
                           At least 8 characters 
                        </p>
                     </div>

                   </div>

                   {/* BLOCKConfirm Confirm Password */}
                   <div className="form-field flex flex-col gap-1.5">
                    
                   <label htmlFor="confirmPassword"
                           className="text-preset-4 text-app-bright-text">
                      Confirm New Password
                    </label>

                    <div className="relative">
                        
                     <div className="bg-app-background  py-3 px-4 rounded-xl 
                                   border border-app-border
                                   hover:bg-app-hover-input hover:cursor-pointer
                                    focus-within:ring-2
                                    focus-within:border-neutral-500 focus-within:ring-offset-2">
                       <input required
                             type={showConfirmPassword ? "text" : "password"}
                             id="confirmPassword"
                             name="confirmPassword"
                             minLength={8}
                             className="w-full bg-transparent text-app-text-button pr-8
                                       focus:outline-none" />
                                      
                     </div>
                     
                     
                     <button type="button"
                              onClick={() => setShowConfirmPassword((previous) => !previous)}
                              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                              aria-pressed={showConfirmPassword}
                              className="absolute top-1/2 -translate-y-1/2 right-4
                                          flex items-center justify-center ">
                              {showConfirmPassword ? <HidePasswordIcon className="block w-5 h-5" /> : <ShowPasswordIcon className="block w-5 h-5" />   }            
                              
                     </button>
                    

                    </div>
                        {confirmPasswordError && 
                        <p id="confirm-password-error"
                           role="alert"
                           className="text-red-500 text-preset-6 ">
                            Passwords do not match</p>}
                   </div>
                   {formError && <p role="alert" className="text-red-500">{formError}</p>}
                 {successMessage && <p role="status" className="text-green-500">{successMessage}</p>}

                {/* BLOCK button Send Reset Link*/}
                 <button disabled={isSubmitting}
                         type="submit"
                         className="w-full flex justify-center items-center py-3 
                                    text-preset-2 rounded-lg hover:cursor-pointer
                                   bg-blue-500 text-neutral-0 
                                   focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-app-background">
                      Reset Password
                 </button>
               
          </form>

        </section>
    
    </div>
     )}

export default ResetPage;