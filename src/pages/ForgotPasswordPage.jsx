import { useTheme } from "../contex/ThemeContext.jsx";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {supabase } from "../lib/supabaseClient.js";

import InfoIcon from "../components/icons/InfoIcon.jsx"


const ForgotPasswordPage = () => {
   const { resolvedTheme, fontTheme, theme, setTheme } = useTheme();
       const [formError, setFormError] = useState("");
   const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

      const navigate = useNavigate();
   const handleSubmit = async (event) => { 
         event.preventDefault();
         setFormError("") ;
          setSuccessMessage("")
               const email= new FormData(event.currentTarget).get("email")
        
          const emailInput = event.currentTarget.elements.email;
          if (emailInput.validity.valueMissing) { setEmailError("Email address is required"); return; }
          if (emailInput.validity.typeMismatch) { setEmailError("Please enter a valid email address"); return; }
          setEmailError("");
          setIsSubmitting(true);
          try {const { data, error } = 
               await supabase.auth.resetPasswordForEmail( email, {redirectTo: window.location.origin + "/reset"}  );
          
            if (error) { setFormError(error.message); return; }
              setSuccessMessage("If an account with this email exists, you will receive a password recovery email.");
            
               }
                catch (error) {console.error("Login error:", error.message);
                                      
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
                 className="absolute top-4 right-4 z-10 px-3 py-2 rounded-lg bg-app-background 
                 text-app-bright-text border border-app-border"> Тема</button>
        <section className=" relative flex flex-col gap-4 w-[343px] md:w-[522px] lg:w-[540px]
                         bg-app-background rounded-xl  border border-app-border
                         py-10 px-4 md:px-8 md:py-12 lg:px-12 text-preset-5 text-app-bright-text ">

             <header className="flex flex-col items-center mx-auto">
               <img className="w-24 text-center mb-4"
                src={theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
                alt="Notes" />
               <h2 className="text-preset-1 font-bold mb-2">Forgotten your password?</h2>
               <span className="text-center text-app-text-muted-semi leading-[1.3] " >
                    Enter your email below, and we'll send you a link to reset it. 
               </span>
            </header>

          <form noValidate
                onSubmit={handleSubmit}
                action=""
                className="flex flex-col gap-4 text-app-border pt-6">

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
                           className="w-full bg-transparent hover:bg-app-hover-input
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

                                {formError && <p role="alert" className="text-red-500">{formError}</p>}
                 {successMessage && <p role="status" className="text-green-500">{successMessage}</p>}


                {/* BLOCK button Send Reset Link*/}
                 <button disabled={isSubmitting}
                         type="submit"
                         className="w-full flex justify-center items-center py-3 
                                    text-preset-2 rounded-lg hover:cursor-pointer
                                   bg-blue-500 text-neutral-0 
                                   focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-app-background">
                      Send Reset Link
                 </button>

            

              
               
               
          </form>
       

        </section>
    
    </div>
     )


}

export default ForgotPasswordPage;