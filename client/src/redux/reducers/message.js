import {HIDE_MESSAGE} from "../constants/user"
const initialState={
    text:"",
    severity:"",
    scenario:false,
    errors:[],
    isOpen:false,
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case "SUCCESS":
            return{
            text:action.message.text,
            severity:action.message.severity,
            errors:[],
            scenario:true,
            isOpen:true
            }
        case "FAILURE":
            return{
                text:action.message.text,
                scenario:false,
                severity:action.message.severity,
                errors:action.errors,
                isOpen:true
            }
        case HIDE_MESSAGE:
            return{
                text:"",
                severity:"",
                scenario:false,
                isOpen:false,
                errors:[]
            }
        default: 
        return state;
    }

}

export default reducer