import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useState } from "react";
import { TextField,ButtonBase,Grid,Divider, Typography,Button, TableHead, TableCell,TableBody,TableRow,Table, TableFooter, TablePagination, Tab } from "@mui/material";
import { NavLink } from "react-router-dom";
import { DateTime } from "luxon";
import {Tooltip} from "@mui/material";
import {Loader} from "../components/Loader";
const useStyles=makeStyles(()=>({
    back:{
        margin:"1%",
        backgroundColor:"#D7CD79",
        flexGrow:2,
        width: '600px',
        height: '100%',
        paddingBottom:"7%",
    },
    card:{
       
        marginTop:"10%",
        marginLeft:"5%",
        width:"90%",
    },
    carousel:{
        margin:"1%",
        backgroundColor:"#D7CD79",
        flexGrow:2,
        width: '600px',
        height: '100%',
        paddingBottom:"7%",
    },

}))

export const Profile=({adminOrders,setForm,setEnable,enable,formErrors,getCurrentOrder,setCurrentItem,handleDeleteOrderOpen,handleDeleteItemOpen,user,form,sendProfileUpdateForm,changeHandler,items})=>{
const classes=useStyles();
// if(!user.orders){
//     <Loader></Loader>
//   }

const [orderPage,setOrderPage]= useState(0);
const [rowsPerPageOrders,setRowsPerPageOrders] = useState(5);
const [page,setPage]=useState(0);
const [rowsPerPage,setRowsPerPage]=useState(5);
const handlePageChangeOrders=(event,newPage)=>{
    setOrderPage(newPage);
}
const handleChangeRowsPerPageOrders=(event)=>{
    setRowsPerPageOrders(parseInt(event.target.value,5));
    setOrderPage(0);
}
const handlePageChange=(event,newPage)=>{
    setPage(newPage);
}
const handleChangeRowsPerPage=(event)=>{
    setRowsPerPage(parseInt(event.target.value,5));
    setPage(0);
}
const setItem=(item)=>{
    setCurrentItem(items,item)
}

const setOrder=(orderId)=>{
    getCurrentOrder(orderId,user.token);
}
const emptyRowsOrders = rowsPerPageOrders - Math.min(rowsPerPageOrders,adminOrders.length - orderPage*rowsPerPageOrders)

const printDate=(initialFormat)=>{
    const date = DateTime.fromFormat(initialFormat, 'dd-MM-yyyy')
    return date.toFormat('MMMM dd, yyyy')
}

const emptyRows=rowsPerPage - Math.min(rowsPerPage,items.length-page*rowsPerPage);
if(user.role === "ADMIN"){
    return(
        <div>
           <Box component="form"
           autoComplete="off"
           width="1400px"
           >
               
               <div>
               <Grid container spacing={4}>
                <Grid item xs={12}><Typography style={{width:"100%",textAlign:"center"}} variant="h2">Items</Typography></Grid>
                <Grid item xs={12}> <Tooltip title="Add item to the catalogue" arrow><Button component={NavLink} to={"/createItem"} style={{color:"black",backgroundColor:"#FDFFEE",borderRadius: "6px",marginLeft:"90%"}}>Add Item</Button></Tooltip></Grid>
                <Grid item xs={12}>
                    <Table>
                        <TableHead>
                        <TableRow></TableRow>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>NAME</TableCell>
                            <TableCell>DESCRIPTION</TableCell>
                            <TableCell>CATEGORY</TableCell>
                            <TableCell>MATERIAL</TableCell>
                            <TableCell>WARRANTY</TableCell>
                            <TableCell>PRICE</TableCell>
                            <TableCell>QUANTITY</TableCell>
                            <TableCell>STOCK</TableCell>
                            <TableCell>POPULAR</TableCell>
                            <TableCell>RATING</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {items.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage).map((item,index)=>{
                            return(
                                <TableRow key={index+1}>
                                    <TableCell>
                                        {index+1}
                                    </TableCell>
                                    <TableCell>
                                        {item.name}
                                    </TableCell>
                                    <TableCell>
                                        {item.description}
                                    </TableCell>
                                    <TableCell>
                                        {item.categoryArray[0]},{item.categoryArray[1]}
                                    </TableCell>
                                    <TableCell>
                                        {item.materialArray[0]},{item.materialArray[1]}
                                    </TableCell>
                                    
                                {item.hasWarranty ?(<TableCell>YES</TableCell>):(<TableCell>NO</TableCell>)}
                                <TableCell>{item.price} DKK</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                {item.stock ?(<TableCell>YES</TableCell>):(<TableCell>NO</TableCell>)}
                                {item.isPopular ?(<TableCell>YES</TableCell>):(<TableCell>NO</TableCell>)}
                                <TableCell>{item.ratings.medianValueRating}</TableCell>
                                <TableCell>
                                <Button component={NavLink} to={"/editItem"} onClick={()=>setItem(item)}  style={{color:"black",backgroundColor:"#FDFFEE",borderRadius: "6px",marginRight:"3%",marginBottom:"4%"}}>Edit Item</Button>
                                <Button onClick={()=>handleDeleteItemOpen(item)}  style={{color:"black",backgroundColor:"#FD6464",borderRadius: "6px",marginRight:"3%"}}>Remove Item</Button>
                            </TableCell>
                                </TableRow>
                            )
                        })}
                        {emptyRows>0 &&(<TableRow style={{height:80*emptyRows}}>
                            <TableCell colSpan={6}></TableCell>
                        </TableRow>)}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                page={page}
                                rowsPerPage={rowsPerPage}
                                count={items.length}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                >
                                    
                                </TablePagination>
                                
                            </TableRow>
           
                        </TableFooter>
                    </Table>
                </Grid>
                </Grid>
              
               
               <Grid container spacing={2}>
                   <Grid item xs={12}> 
                   <Typography style={{width:"100%",textAlign:"center"}} variant="h2">ORDERS</Typography>
                   <Table>
                       <TableHead>
                           <TableRow>
                               <TableCell>ID </TableCell>
                               <TableCell>Paid </TableCell>
                               <TableCell>Date ordered </TableCell>
                               <TableCell>Date sent </TableCell>
                               <TableCell>Date delivered </TableCell>
                               <TableCell>Total Value </TableCell>
                               <TableCell>Message </TableCell>
                               <TableCell>Items </TableCell>
                           </TableRow>
                       </TableHead>
                       <TableBody>
                       {adminOrders.slice(orderPage*rowsPerPageOrders,orderPage*rowsPerPageOrders+rowsPerPageOrders).map((order,index)=>{
                        return(
                            <TableRow>
                                <TableCell>{index+1}</TableCell>
                                <TableCell> {order.orderPaid ? ("Yes"):("No")}</TableCell>
                                <TableCell>{printDate(order.ordered)}</TableCell>
                                {(order.sent) ? 
                                    <TableCell>{printDate(order.sent)}</TableCell>
                                :
                                    <TableCell>Order not sent</TableCell>
                                }
                                {(order.delivered) ?
                                    <TableCell>{printDate(order.delivered)}</TableCell>
                                :
                                    <TableCell>Order not delivered</TableCell>
                                }
                                <TableCell>{order.totalValue}</TableCell>
                              { order.message === "" ?(<TableCell>No message provided</TableCell>):(<TableCell>{order.message}</TableCell>)}
                              <TableCell>
                                  <Button onClick={()=>setOrder(order._id)} component={NavLink} to={"/viewOrder"} style={{color:"black",backgroundColor:"#FDFFEE",borderRadius: "6px",marginRight:"2%"}}>View Items</Button>
                                  <Button onClick={()=>setOrder(order._id)} component={NavLink} to={"/editOrder"} style={{color:"black",backgroundColor:"#FDFFEE",borderRadius: "6px",marginRight:"2%"}}>Edit Order</Button>
                                  <Button onClick={()=>handleDeleteOrderOpen(order._id)} style={{color:"black",backgroundColor:"#FD6464",borderRadius: "6px",marginRight:"2%"}}>Delete Order</Button>
                            </TableCell>
                            </TableRow>
                        )
    
                         })}
                        {emptyRowsOrders>0 &&(<TableRow style={{height:100*emptyRowsOrders}}>
                        <TableCell colSpan={6}></TableCell>
                        </TableRow>)}
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                page={orderPage}
                                rowsPerPage={rowsPerPageOrders}
                                count={adminOrders.length}
                                onPageChange={handlePageChangeOrders}
                                onRowsPerPageChange={handleChangeRowsPerPageOrders}
                                >
                                    
                                </TablePagination>
                                
                            </TableRow>
                            <TableRow>
                           
                            </TableRow>
                        </TableFooter>
                       </TableBody>
                   </Table>
                </Grid>
                
                <Divider style={{margin:"5%"}} />
               
       
               <Grid item xs={12}><Typography style={{width:"100%",textAlign:"center"}} variant="h2">UPDATE</Typography></Grid>
               <Grid item xs={12}>{enable ? (<Button hidden={!enable} variant="contained" color="primary" onClick={()=>{setEnable(false)}} >UNLOCK</Button>):(<></>)}</Grid>
               <Grid item xs={12}><TextField disabled={enable} type="email" value={form.email} onChange={changeHandler} style={{width:"100%"}} required label="Email" id="email" name="email" error={!!formErrors["email"]}helperText={formErrors["email"] ? formErrors["email"] : ""}></TextField></Grid>
               <Grid item xs={12}><TextField disabled={enable} type="text" value={form.username} onChange={changeHandler} style={{width:"100%"}}  required label="Username" id="username" name="username"error={!!formErrors["username"]}helperText={formErrors["username"] ? formErrors["username"] : ""}> </TextField></Grid>
               <Grid item xs={6}><TextField disabled={enable} type="text" value={form.firstName} onChange={changeHandler} style={{width:"100%"}} required  label="First Name" id="firstName" name="firstName" error={!!formErrors["firstName"]}helperText={formErrors["firstName"] ? formErrors["firstName"] : ""}></TextField></Grid>
               <Grid item xs={6}><TextField disabled={enable} type="text" value={form.lastName} onChange={changeHandler} style={{width:"100%"}} required  label="Last Name" id="lastName" name="lastName" error={!!formErrors["lastName"]}helperText={formErrors["lastName"] ? formErrors["lastName"] : ""}></TextField></Grid>
               <Grid item xs={6}><TextField disabled={enable} type="password" value={form.password} onChange={changeHandler} style={{width:"100%"}}  required label="Password" id="password" name="password"error={!!formErrors["password"]}helperText={formErrors["password"] ? formErrors["password"] : ""} ></TextField></Grid>
               <Grid item xs={6}><TextField disabled={enable} type="password" value={form.passwordConfirm} onChange={changeHandler} style={{width:"100%"}}  required label="Confirm password" id="passwordConfirm" name="passwordConfirm" error={!!formErrors["passwordConfirm"]}helperText={formErrors["passwordConfirm"] ? formErrors["passwordConfirm"] : ""} ></TextField></Grid>
               <Grid item xs={12}><TextField disabled={enable} type="tel" value={form.phone} onChange={changeHandler} style={{width:"100%"}} required label="Phone number" id="phone" name="phone" error={!!formErrors["phone"]}helperText={formErrors["phone"] ? formErrors["phone"] : ""} ></TextField></Grid>               
               <Grid item xs={12}><TextField disabled={enable} type="text" required onChange={changeHandler} multiline value={form.address} style={{width:"100%"}}  label="Address" id="address" name="address"  error={!!formErrors["address"]}helperText={formErrors["address"] ? formErrors["address"] : ""}></TextField></Grid>
               <Grid item xs={12}>
               {!enable ? (<div><Button 
               variant="contained"
               color="primary" 
               type="submit"
               hidden={enable}
               onClick={sendProfileUpdateForm}
               >
                   Update
               </Button>
               <Button 
               variant="contained" 
               color="primary"
               onClick={()=>{setEnable(true); setForm({
                   email: user.email,
                username:user.username,
                firstName:user.firstName,
                lastName:user.lastName,
                password:"",
                passwordConfirm:"",
                phone:user.phone,
                address:user.address,  }) }}>Cancel</Button></div>):(<></>)}
               </Grid>
       
               </Grid>
               <Divider/>
               </div>
               
           </Box>
           </div>
    
       
    )
    
    
}else if(user.role ==="USER") {
    const orderList=[...user.orders];
    return(
        <div> 
           <Box component="form"
           autoComplete="off"
           width="1000px"
           onSubmit={sendProfileUpdateForm}
           >
               <Grid container spacing={4}>
                <Divider style={{margin:"5%"}} />
               <Grid item xs={12}>
               <Typography style={{width:"100%",textAlign:"center"}} variant="h2">ORDERS</Typography>
               <Table>
                   <TableHead>
                 
                       <TableRow>
                           <TableCell>ID </TableCell>
                           <TableCell>Paid </TableCell>
                           <TableCell>Date ordered </TableCell>
                           <TableCell>Date sent </TableCell>
                           <TableCell>Date delivered </TableCell>
                           <TableCell>Total Value </TableCell>
                           <TableCell>Message </TableCell>
                           <TableCell>Items </TableCell>
                       </TableRow>
                   </TableHead>
                   <TableBody>
                   {orderList.slice(orderPage*rowsPerPageOrders,orderPage*rowsPerPageOrders+rowsPerPageOrders).map((order,index)=>{
                    return(
                        <TableRow>
                                <TableCell>{index + 1}</TableCell>
                                {(order.orderPaid) ? 
                                    <TableCell>Yes</TableCell>
                                :
                                    <TableCell>No</TableCell>

                                }
                                <TableCell>{printDate(order.ordered)}</TableCell>
                                {(order.sent) ? 
                                    <TableCell>{printDate(order.sent)}</TableCell>
                                :
                                    <TableCell>Order not sent</TableCell>
                                }
                                {(order.delivered) ?
                                    <TableCell>{printDate(order.delivered)}</TableCell>
                                :
                                    <TableCell>Order not delivered</TableCell>
                                }
                            <TableCell>{order.totalValue}</TableCell>
                          { order.message === "" ?(<TableCell>No message provided</TableCell>):(<TableCell>{order.message}</TableCell>)}
                          <TableCell>
                              <Button onClick={()=>setOrder(order._id)} component={NavLink} to={"/viewOrder"}  style={{color:"black",backgroundColor:"#FDFFEE",borderRadius: "6px"}}>View Items</Button>
                        </TableCell>
                        </TableRow>
                    )

                     })}
                    {emptyRowsOrders>0 &&(<TableRow style={{height:100*emptyRowsOrders}}>
                        <TableCell colSpan={6}></TableCell>
                        </TableRow>)}
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                page={orderPage}
                                rowsPerPage={rowsPerPageOrders}
                                count={adminOrders.length}
                                onPageChange={handlePageChangeOrders}
                                onRowsPerPageChange={handleChangeRowsPerPageOrders}
                                >
                                    
                                </TablePagination>
                                
                            </TableRow>
                            <TableRow>
                           
                            </TableRow>
                        </TableFooter>
                       </TableBody>
               </Table>
            </Grid>
            
            <Divider style={{margin:"5%"}} />
           
   
           <Grid item xs={12}><Typography style={{width:"100%",textAlign:"center"}} variant="h2">UPDATE</Typography></Grid>
           <Grid item xs={12}>{enable ? (<Button hidden={!enable} variant="contained" color="primary" onClick={()=>{setEnable(false)}} >UNLOCK</Button>):(<></>)}</Grid>
           <Grid item xs={12}><TextField disabled={enable} type="email" value={form.email} onChange={changeHandler} style={{width:"100%"}} required label="Email" id="email" name="email"  error={!!formErrors["email"]}helperText={formErrors["email"] ? formErrors["email"] : ""} ></TextField></Grid>
           <Grid item xs={12}><TextField disabled={enable} type="text" value={form.username} onChange={changeHandler} style={{width:"100%"}}  required label="Username" id="username" name="username"  error={!!formErrors["username"]}helperText={formErrors["username"] ? formErrors["username"] : ""}></TextField></Grid>
           <Grid item xs={6}><TextField disabled={enable} type="text" value={form.firstName} onChange={changeHandler} style={{width:"100%"}} required  label="First Name" id="firstName" name="firstName"  error={!!formErrors["firstName"]}helperText={formErrors["firstName"] ? formErrors["firstName"] : ""}></TextField></Grid>
           <Grid item xs={6}><TextField disabled={enable} type="text" value={form.lastName} onChange={changeHandler} style={{width:"100%"}} required  label="Last Name" id="lastName" name="lastName"  error={!!formErrors["lastName"]}helperText={formErrors["lastName"] ? formErrors["lastName"] : ""}></TextField></Grid>
           <Grid item xs={12}><TextField disabled={enable} type="password" value={form.password} onChange={changeHandler} style={{width:"100%"}}  required label="Password" id="password" name="password"  error={!!formErrors["password"]}helperText={formErrors["password"] ? formErrors["password"] : ""} ></TextField></Grid>
           <Grid item xs={12}><TextField disabled={enable} type="password" value={form.passwordConfirm} onChange={changeHandler} style={{width:"100%"}}  required label="Confirm password" id="passwordConfirm" name="passwordConfirm"  error={!!formErrors["passwordConfirm"]}helperText={formErrors["passwordConfirm"] ? formErrors["passwordConfirm"] : ""} ></TextField></Grid>
           <Grid item xs={12}><TextField disabled={enable} type="tel" value={form.phone} onChange={changeHandler} style={{width:"100%"}} required label="Phone number" id="phone" name="phone" error={!!formErrors["phone"]} helperText={formErrors["phone"] ? formErrors["phone"] : ""}></TextField></Grid>
           <Grid item xs={12}><TextField disabled={enable} type="text" onChange={changeHandler} multiline value={form.address} style={{width:"100%"}} required  label="Address" id="address" name="address" error={!!formErrors["address"]}helperText={formErrors["address"] ? formErrors["address"] : ""}></TextField></Grid>
           <Grid item xs={12}>
           {!enable ? 
           (<div><Button                 
           variant="contained"                
           color="primary"                 
           type="submit"                
           hidden={enable}                
           onClick={sendProfileUpdateForm}                
           >                    
           Update                
           </Button>                
           <Button                 
           variant="outlined"                                 
           onClick={()=>{setEnable(true); setForm({email: user.email,username:user.username,firstName:user.firstName,lastName:user.lastName,password:"",passwordConfirm:"",phone:user.phone,address:user.address,  }) }}>
           Cancel
           </Button>
           </div>
           )
           :
           (<></>)}
           </Grid>
   
           </Grid>
           <Divider/>
           </Box>
           </div>
    )
    
}
else{
    return(
        <Loader></Loader>
    );
}


}