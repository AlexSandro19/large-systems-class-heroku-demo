import { Card, CardActionArea, CardContent,Button, Grid, Box, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {useEffect,useCallback} from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Carousel from 'react-material-ui-carousel'
import {requestAllItems,setCurrentItem} from "../redux/actions/item";
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
const HomePage=({items,requestAllItems,setCurrentItem})=>{
const classes=useStyles();
var popular=[];
var highestRated=[];
const fetchItems = useCallback(() => {
    requestAllItems()
  
}, [])
useEffect(()=>{
    fetchItems();
  
   
},[fetchItems])
  
    popular=items.filter((a)=>{
       return a.isPopular;
            
    })
     highestRated =items.sort((a,b)=>{
        const first=a.ratings.medianValueRating;
        const second = b.ratings.medianValueRating;
        return second - first ;
    })
var displayText=[
    {
        title:"More than a decade on the market",
        description:" For 12 years we make evryone’s life better by sharing what we can do best. "
    },
    {
        title:"All over the country:",
        description:"We focus on reaching everyone and believe that anyone should have access to comfort. "
    },
    {
        title:"Trust:",
        description:" We believe that a work done perfectly, and a satisfied customer is more valuable than deceiving others and earning money."
    },  
]
return(
    <div>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} xl={6} lg={6} >
            <Carousel >
                {
                   displayText.map((item)=>{
                       return(
                        <Paper  style={{backgroundColor:"#D7CD79"}}  className={classes.carousel}>
                        
                        <Typography variant="h5">{item.title}</Typography>
                        <Typography variant="body1">{item.description}</Typography>
                        </Paper>
                       )
                   })
                }

            </Carousel>
        </Grid>
        <Grid item xs={12} sm={12} md={6} xl={6} lg={6} >
        <iframe width="560" height="315" src="https://www.youtube.com/embed/YU6VqT03Lgk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Grid>

        <Grid item xs={12}>
        <Grid container  direction="row" justifyContent="center"  alignItems="center" spacing={2}>
        <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
        <Box style={{height:"600px"}}   className={classes.back}>
        <Typography variant="h4" textAlign="center">Most Popular Items Right Now</Typography>
        <Grid container spacing={1}>
        {popular.map((item)=>{
            return(
                <Grid item xs={6}>
                <Card style={{backgroundColor:"#C4C4C4",height:"210px"}} className={classes.card}>
                    <Grid container >

                    <Grid item xs={12}>
                    <CardContent>
                    <Typography variant="h4">{item.name}</Typography> 
                    <Typography variant="body1" style={{height:"60px"}}  >{item.description}</Typography>
                    <Typography variant="body2">Price: {item.price} DKK</Typography>

                    </CardContent>
                    </Grid> 
                <Grid item xs={12}>
                    <CardActionArea component={NavLink} to="/item" onClick={()=>{setCurrentItem(items,item)}} style={{width:"50%",marginLeft:"25%",backgroundColor:"#FDFFEE"}} >
                <Typography style={{textAlign:"center"}} variant="h6">VIEW</Typography>
                </CardActionArea>
                </Grid> 
                </Grid>
                </Card>
                </Grid>
            )
        })}
        </Grid>
        </Box>
        </Grid>
       
        <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
        <Box style={{height:"300px"}}   className={classes.back}>
        <Typography variant="h4" textAlign="center">Highest Rated Designs</Typography>
        <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
        <Card style={{backgroundColor:"#C4C4C4"}} className={classes.card}>
            <CardContent>
                <Typography variant="h5">Dinning Chair</Typography>
                <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo egestas nunc faucibus risus sit quisque...</Typography>
            </CardContent>
        <CardActionArea style={{width:"50%",marginLeft:"25%",backgroundColor:"#FDFFEE"}} >
        <Typography style={{textAlign:"center"}} variant="h6">CART</Typography>
        </CardActionArea>
        </Card>
        </Grid></Grid></Box>
        <Grid item xs={6}> <Box style={{height:"300px"}} className={classes.back}>     
        <Typography variant="h4" textAlign="center">Highest Rated Items</Typography>
        <Grid container >
        {highestRated.slice(0,2).map((item)=>{
            return(
                <Grid item xs={6}>
                <Card style={{backgroundColor:"#C4C4C4",height:"210px"}} className={classes.card}>
                    <CardContent>
                        <Typography variant="h4">{item.name}</Typography>
                        <Typography variant="body1">{item.description}</Typography>
                        <Typography variant="body2">Price: {item.price} DKK</Typography>

                    </CardContent>
                <CardActionArea component={NavLink} to="/item" onClick={()=>{setCurrentItem(items,item)}} style={{width:"50%",marginLeft:"25%",backgroundColor:"#FDFFEE"}} >
                <Typography style={{textAlign:"center"}} variant="h6">VIEW</Typography>
                </CardActionArea>
                </Card>
                </Grid>
            )
        })}
        </Grid>
        
        </Box></Grid>
        
        </Grid>
        </Grid>
        </Grid>
        </Grid>
    </div>
)
}
const mapStateToProps = (state) => {
    return {
        items:state.items.items
    };
  };
  
export default connect(mapStateToProps,{requestAllItems,setCurrentItem})(HomePage)