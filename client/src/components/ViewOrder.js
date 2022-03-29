
import { Card, Grid, Typography,Button, TableHead, TableCell,TableBody,TableRow,Table, TableFooter, TablePagination, } from "@mui/material"
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { DateTime } from "luxon";

export const ViewOrder=({currentOrder})=>{

    const orderItems = currentOrder.items;

    const [page,setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(5);
    const emptyRows=rowsPerPage - Math.min(rowsPerPage,currentOrder.items.length-page*rowsPerPage);
    
    const countSameItems = (receivedItem) => {
      const sameItemArray = orderItems.filter(item => receivedItem._id === item._id);
      return sameItemArray.length;
    } 


    const itemsToDisplay = []
    if (orderItems.length){
      for (let i = 0; i < orderItems.length; i++){

        const item = orderItems[i]

        const numberOfDuplicates = countSameItems(item) - 1

        itemsToDisplay.push(item)
        i += numberOfDuplicates
  
      }


    }

    const handlePageChange=(event,newPage)=>{
        setPage(newPage);
    }
    const handleChangeRowsPerPage=(event)=>{
        setRowsPerPage(parseInt(event.target.value,5));
        setPage(0);
    }

    const printDate=(initialFormat)=>{
        const date = DateTime.fromFormat(initialFormat, 'dd-MM-yyyy')
        return date.toFormat('MMMM dd, yyyy')
    }

    const history=useHistory();
    const goBack=()=>{
        history.push("/profile");
    }
    return(

        <div >
        <Card style={{background:"#D7CD79", marginBottom: "20px", padding:"7px"}}>
            <Grid container> 
            <Grid item xs={6}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            {(currentOrder.orderPaid) ? 
                <Typography variant="h5" >Order Paid: Yes</Typography>
                :
                <Typography variant="h5" >Order Paid: No</Typography>
            }
            </Grid>
            <Grid item xs={12}>
            {currentOrder.message === "" ?(<Typography variant="h5">   Message: No message was given for the order.</Typography>):(<Typography variant="h5">   Message:  {currentOrder.message}</Typography>)}
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}><Typography style={{width:"100%",textAlign:"right"}} variant="h2">ITEMS</Typography></Grid>
            <Grid item xs={12}>
            <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>NAME</TableCell>
                            <TableCell>DESCRIPTION</TableCell>
                            <TableCell>CATEGORY</TableCell>
                            <TableCell>MATERIAL</TableCell>
                            <TableCell>WARRANTY</TableCell>
                            <TableCell>QUANTITY</TableCell>
                            <TableCell>UNIT PRICE</TableCell>
                            <TableCell>TOTAL PRICE</TableCell>
                            <TableCell>RATING</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {itemsToDisplay.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage).map((item,index)=>{
                            return(
                                <TableRow key={index}>
                                    <TableCell>
                                        {index}
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
                                <TableCell>{countSameItems(item)}</TableCell>
                                <TableCell>{item.price} DKK</TableCell>
                                <TableCell>{item.price * countSameItems(item)} DKK</TableCell>
                                <TableCell>{item.ratings.medianValueRating}</TableCell>
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
                                count={itemsToDisplay.length}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ></TablePagination>
                            </TableRow>
                        </TableFooter>
                    </Table>

            </Grid>
            </Grid>
            </Grid>
            <Grid item xs={6}>
            <Grid container spacing={2}>
            {(currentOrder.ordered) && (
                <Grid item xs={12}>
                <Typography variant="h5" >Order date : {printDate(currentOrder.ordered)} </Typography>
                </Grid>
            )}
            {(currentOrder.sent) ? 
                <Grid item xs={12}>
                <Typography variant="h5">Sent date : {printDate(currentOrder.sent)} </Typography>
                </Grid>
                : 
                <Grid item xs={12}>
                <Typography variant="h5">Order not sent</Typography>
                </Grid>
            }
            {(currentOrder.delivered) ?
                <Grid item xs={12}>
                <Typography variant="h5">Delivery date : {printDate(currentOrder.delivered)} </Typography>
                </Grid>
                :
                <Grid item xs={12}>
                <Typography variant="h5">Order not delivered</Typography>
                </Grid>
            }
            </Grid>
            </Grid>
            </Grid>
        </Card>
            <Grid item xs={12}> <Button onClick={goBack} variant="outlined">Back</Button></Grid>
        </div>
    )
}