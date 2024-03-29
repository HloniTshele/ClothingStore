import { useState} from "react";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utility/firebase/firebase.util";
import FormInput from "../form-Input/form-input.component";

const defaultFormFields ={
    email:'',
    password:''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email,password} = formFields;
   

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }
    
    const handleSubmit =  async (event) =>{
        event.preventDefault();
       
        try{
            await signInAuthUserWithEmailAndPassword(email,password);
            resetFormFields();
        }catch(err){
            switch(err.code){
                case 'auth/invalid-login-credentials':
                    alert('Incorrect email/password');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default:
                    console.log(err);        
            }
        }
        
    }
        const  signInWithGoogle = async ()=>{
        await signInWithGooglePopup();
        
    }
  
    const handleChange = (event ) =>{
        const{name, value} = event.target;
        setFormFields({...formFields, [name]:value})
    }
    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password </span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type ="email" required onChange={handleChange} name ="email"  value={email}/>
                <FormInput label="Password" type ="password" required onChange={handleChange} name ="password"  value={password}/>
                <div className="buttons-container">
                    <Button  type= "submit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
                
            </form>
        </div>
    )
    };


export default SignInForm;