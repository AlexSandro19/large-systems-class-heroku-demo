const { Schema, model, Types } = require("mongoose");

const schema= new Schema({
   
    items:[
        {
            type:Types.ObjectId,
            ref:"Furniture"
        }
    ],
    totalValue:{type:Number},
    sent:{type:String},
    delivered:{type:String},
    ordered:{type:String},
    message:{type:String},
    userId:{type:String},
    orderPaid:{type:Boolean},
    paypalOrderId:{type:String}
    }, 
    {
    timestamps: true,
    
    })


module.exports = model("Order", schema);