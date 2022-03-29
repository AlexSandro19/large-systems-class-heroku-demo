import { connect } from "react-redux";
import { Registration } from "../components/Registration";
import {useState,useEffect} from "react";
import {registerUser} from "../redux/actions/user"
import { useHistory } from "react-router-dom";
const RegistrationPage=({errors,scenario,registerUser})=>{
  const history = useHistory();
  const [formErrors,setFormErrors]=useState({});
  useEffect(() => {
    if (errors) {
   
    errors.forEach((error) => {
       console.log(error);
        setFormErrors((i) => ({ ...i, [error.param]: error.msg }));
      });
    }
    console.log(formErrors);
  }, [errors]);
  const [form, setForm] = useState({
    email: "",
    username:"",
    firstName:"",
    lastName:"",
    password:"",
    confirmPassword:"",
    phone:"",
    address:"",
  });
  const changeHandler = (event) => {

    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const sendRegistrationForm= (e)=>{
    e.preventDefault();
    registerUser(form);
    if(scenario){
      console.log("AETWE");
      setForm({});
      history.push("/");
      setFormErrors({});
    };
 
   
  }
  const goBack=()=>{
    history.goBack();
  }
    return(
      <div style={{marginLeft:"15%"}}>

        
        <Registration goBack={goBack} formErrors={formErrors} form={form} sendRegistrationForm={sendRegistrationForm} changeHandler={changeHandler}>

        </Registration>
      </div>
    )


}
const mapStateToProps = (state) =>({
  scenario:state.message.scenario,
  errors:state.message.errors,
  });
export default connect(mapStateToProps,{registerUser})(RegistrationPage)