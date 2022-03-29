import { connect } from "react-redux";
import { Profile } from "../components/Profile";
import { useHistory } from "react-router-dom";
import {useState,useEffect, useCallback} from "react";
import { DeleteDialog } from "../components/DeleteDialog";
import {setCurrentItem,deleteItem,} from "../redux/actions/item"
import { getCurrentOrder,deleteOrder,getAllOrders } from "../redux/actions/order";
import { updateUser } from "../redux/actions/user";

const ProfilePage=({getAllOrders,adminOrders,updateUser,errors,user,items,currentItem,currentOrder,setCurrentItem,getCurrentOrder,deleteItem,deleteOrder})=>{
    const history = useHistory();
    const [formErrors,setFormErrors] = useState({});
    const [enable,setEnable] = useState(true);
    const fetchOrders = useCallback(()=>{
      if(user.role === "ADMIN"){
        getAllOrders(user.token)
      }
    },[])
    useEffect(() => {
      fetchOrders();
      if (errors) {
      errors.forEach((error) => {
         console.log(error);
          setFormErrors((i) => ({ ...i, [error.param]: error.msg }));
        });
      }
    }, [errors]);
    const [form, setForm] = useState({
      email: user.email,
      username:user.username,
      firstName:user.firstName,
      lastName:user.lastName,
      password:"",
      passwordConfirm:"",
      phone:user.phone,
      address:user.address,  
    });
    const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
    };
    const sendProfileUpdateForm= (e)=>{
      e.preventDefault();
      updateUser(form,user.token,user.exp);
      setEnable(true);
      setForm({...form, password:"", passwordConfirm:""})
    }
  
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteOrderOpen, setDeleteOrderOpen] = useState(false);
    const handleDeleteItemOpen = (item) => {
      setCurrentItem(items,item);
      setModalOpen(true);
      };
      const handleDeleteOrderOpen = (orderId) => {
        getCurrentOrder(orderId,user.token);
        setDeleteOrderOpen(true);
      };
      const submitDeleteOrder = ()=>{
        deleteOrder(currentOrder,user.token);
        setDeleteOrderOpen(false);
      }
      const submitDeleteItem = ()=>{
        deleteItem(currentItem,user.token);
        setModalOpen(false);
      }
      const handleClose = () => {
        setModalOpen(false);
        setDeleteOrderOpen(false);
      };

    return(
        <div>
        <Profile adminOrders={adminOrders} setForm={setForm} setEnable={setEnable} enable={enable} formErrors={formErrors} errros={errors} getCurrentOrder={getCurrentOrder} setCurrentItem={setCurrentItem} handleDeleteOrderOpen={handleDeleteOrderOpen}  handleDeleteItemOpen={handleDeleteItemOpen} items={items} user={user} form={form} sendProfileUpdateForm={sendProfileUpdateForm} changeHandler={changeHandler}>
        
        </Profile>
      
        <DeleteDialog text={"Item"} deleteFunction={submitDeleteItem} modalOpen={modalOpen} handleClose={handleClose}></DeleteDialog>
        <DeleteDialog text={"Order"} deleteFunction={submitDeleteOrder} modalOpen={deleteOrderOpen} handleClose={handleClose}></DeleteDialog>
        
        </div>
        )


}

const mapStateToProps = (state) => {
    return {
        user:state.user,
        items:state.items.items,
        currentItem:state.items.currentItem,
        currentOrder:state.order.currentOrder,
        errors: state.message.errors,
        adminOrders:state.order.orders,
    };
  };
  
export default connect(mapStateToProps,{getAllOrders,updateUser,setCurrentItem,getCurrentOrder,deleteItem,deleteOrder})(ProfilePage)