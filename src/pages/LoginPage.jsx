
import { useTheme } from "../contex/ThemeContext.jsx";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import ShowPasswordIcon from "../components/icons/ShowPasswordIcon.jsx"
import HidePasswordIcon from "../components/icons/HidePasswordIcon.jsx"
import InfoIcon from "../components/icons/InfoIcon.jsx"
import GoogleIcon from "../components/icons/GoogleIcon.jsx";
import {supabase } from "../lib/supabaseClient.js";


const LoginPage = () => {
   const { resolvedTheme, fontTheme, theme, setTheme } = useTheme();
    const [showCurrentPassword, setShowCurrentPassword] =  useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const navigate = useNavigate();

   const  handleSubmit = async(event) => { 
         event.preventDefault();
          setFormError("");
          setEmailError("");

         const email= new FormData(event.currentTarget).get("email")
        
          const emailInput = event.currentTarget.elements.email;
          if (emailInput.validity.valueMissing) { setEmailError("Email address is required"); return; }
          if (emailInput.validity.typeMismatch) { setEmailError("Please enter a valid email address"); return; }
        
          const password = new FormData(event.currentTarget).get("password");
          
          const isPasswordTooShort = password.length < 8;
          
          setPasswordError(isPasswordTooShort);
          if (isPasswordTooShort) return;
        
           setIsSubmitting(true);
             try {const { data, error } = await supabase.auth.signInWithPassword({ email, password } );
                          
                         if (error) { setFormError(error.message); return; }
                         navigate("/")    
                           }
                               
                       catch (error) {console.error("Login error:", error.message);
                         setFormError(error.message); }
                           
                       finally {setIsSubmitting(false)}

             };

               const handleGoogleLogin = async () =>{
             setFormError("");
             setIsSubmitting(true);
             try {const { error } = await  supabase.auth.signInWithOAuth({ provider: "google", 
                                                                          options:{redirectTo:"http://localhost:5173/"}} );
                 
               if (error) { setFormError(error.message); return; }
                 }
                     
             catch (error) {console.error("Google login:", error.message);
               setFormError(error.message); }
                 
             finally {setIsSubmitting(false)}

             };
             const [emailError, setEmailError] = useState("");
        
     return(
      <div data-theme={resolvedTheme}
         data-font-theme={fontTheme}
         className="min-h-screen bg-app-login-bg flex justify-center
                    items-center">
        <button type="button"
                 onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                 className="absolute top-4 right-4 z-10 px-3 py-2 rounded-lg bg-app-background text-app-bright-text border border-app-border"> Тема</button>
        <section className=" relative flex flex-col gap-4 w-[343px] md:w-[522px] lg:w-[540px]
                         bg-app-background rounded-xl  border border-app-border
                         py-10 px-4 md:py-12 md:px-8 lg:px-12 text-preset-5 text-app-bright-text ">

             <header className="flex flex-col items-center mx-auto">
               <img className="w-24 text-center mb-4"
                src={resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
                alt="Notes" />
               <h2 className="text-preset-1 font-bold mb-2">Welcome to Note</h2>
               <span className="text-center text-app-text-muted-semi leading-[1.3] " >
                    Please log in to continue. 
               </span>
            </header>

          <form noValidate
                onSubmit={handleSubmit}
                action=""
                className="flex flex-col gap-4 text-app-border">

                {/* Email+Password */}
                 <div className="flex flex-col gap-4 pt-6">

                {/* BLOCK Email */}
                   <div className="form-field flex flex-col gap-1.5">

                    <label htmlFor="email"
                           className="text-preset-4 text-app-bright-text">
                      Email Address
                    </label>

                    <div className={`bg-app-background text-app-border placeholder:text-var[--color-neutral-500] 
                                    placeholder:leading-[1.3] 
                                    hover:bg-app-hover-input hover:cursor-pointer
                                    py-3 px-4 rounded-xl border ${emailError ? "border-red-500" : "border-app-border"}
                                    focus-within:ring-2
                                    focus-within:border-neutral-500
                                     focus-within:ring-offset-2`}>
                   
                       <input required
                           aria-invalid={Boolean(emailError)}
                           aria-describedby={emailError ? "email-error" : undefined}
                           type="email" 
                           id="email" 
                           name="email"
                           placeholder="email@example.com"
                           autoComplete="email"
                           className="w-full bg-transparent border-0 outline-none hover:bg-app-hover-input
                                       focus:outline-none " />
                    </div>  
                        {emailError && 
                       <div className="text-red-500 flex gap-2 text-xs leading-[1.4] 
                                       tracking-0 items-center">
                         <InfoIcon className="block w-4 h-4 " />
                         <p id="email-error" role="alert">{emailError}</p>
                       </div>
                       }
                   </div>

                   {/* BLOCK Password */}
                   <div className="form-field flex flex-col gap-1.5">
                    
                    <div className="flex items-center justify-between gap-4">
                    <label htmlFor="password"
                           className="text-preset-4 text-app-bright-text">
                      Password
                    </label>
                    <Link to="/forgot-password" className="text-app-text-button underline 
                            text-preset-6 leading-[1.4] tracking-normal
                              hover:text-blue-500 hover:cursor-pointer">Forgot</Link>
                    </div>

                    <div className="relative">
                     <div className="bg-app-background  py-3 px-4 rounded-xl 
                                   border border-app-border
                                   hover:bg-app-hover-input hover:cursor-pointer
                                    focus-within:ring-2
                                    focus-within:border-neutral-500 focus-within:ring-offset-2">
                       <input required
                             type={showCurrentPassword ? "text" : "password"}
                             id="password" 
                             name="password" 
                             minLength={8}
                             className="w-full bg-transparent text-app-text-button
                                     placeholder:text-[var(--color-neutral-500)] placeholder:leading-[1.3]
                                       hover:bg-app-hover-input hover:cursor-pointer
                                       focus:outline-none" />
                                      
                     </div>
                     
                     
                     <button type="button"
                              onClick={() => setShowCurrentPassword((previous) => !previous)}
                              aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                              aria-pressed={showCurrentPassword}
                              className="absolute top-1/2 -translate-y-1/2 right-4
                                          flex items-center justify-center ">
                              {showCurrentPassword ? <HidePasswordIcon className="block w-5 h-5" /> : <ShowPasswordIcon className="block w-5 h-5" />   }            
                              
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

                {/* BLOCK button Login */}

                {formError && <p role="alert" className="text-red-500">{formError}</p>}
                 {/* {successMessage && <p role="status" className="text-green-500">{successMessage}</p>} */}

                 <button disabled={isSubmitting}
                         type="submit"
                         className="w-full flex justify-center items-center py-3 
                                    text-preset-2 rounded-lg hover:cursor-pointer
                                   bg-blue-500 text-neutral-0 
                                   focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-app-background">
                      Login
                 </button>

                 </div>

                {/* Google block */}
                <div className="flex flex-col items-center gap-4 pt-6 ">

                  <p className="leading-[1.3] text-preset-5 text-app-text-muted-semi">Or log in with: </p>
             
             {/* Google Button       */}
                  
                     <button onClick={handleGoogleLogin}
                             type="button"
                             disabled={isSubmitting}
                             className="w-full flex gap-4 justify-center items-center py-4 px-3
                                        border border-app-border rounded-xl
                                        text-app-bright-text
                                        hover:bg-app-hover-input hover:cursor-pointer
                                        focus:ring-2
                                       focus:ring-offset-2
                                       focus:outline-none 
                                        focus:border-neutral-500  
                                        focus:ring-offset-app-background">
                   
                                 <GoogleIcon className="w-6 h-[25px] text-app-bright-text" />
                                 <p className="text-base leading-[100%] tracking-[0.5px] 
                                       text-preset-3 ">
                                          Google
                                 </p>
                     
                      </button>
                   

              {/* {Line} */}
                     <div className="border border-app-border w-full border-t"></div>


              {/* BLOCK Already have an account? */}
                   <div className="w-full flex justify-center gap-1">
                     <p className=" text-center leading-[1.3] 
                                   text-preset-4 text-app-text-muted-semi">
                        No account yet?  </p>
                        <Link to="/signup"
                              className="text-app-bright-text text-preset-4
                              hover:text-blue-500 hover:cursor-pointer">Sign Up
                        </Link>
                     </div>

                </div>
               
          </form>
       

        </section>
    
    </div>
     )


}

export default LoginPage;