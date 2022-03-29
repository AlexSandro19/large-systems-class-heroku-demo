const { Schema, model, Types } = require("mongoose");

const schema = new Schema(
    {
      name: {
        type: String,
        //required: true,
        unique: true,
      },
      hasWarranty: {
        type: Boolean,
        //required: true,
      },
      isPopular:{
        type:Boolean,
        //required:true  
      },
      price: {
        type: Number,
        //required: true,
      },
      quantity: {
        type: Number,
        //required: true,
      },
      stock:{
          type:Boolean,
          //required:true,
      },
      description:{
          type:String,
          //required:true,
      },
      picturesArray:[
        {
          type:String,
          //required:true,
        }
      ],
      categoryArray:[
        {
          type:String,
          //required:true,
        }
      ],
      materialArray:[
         { 
            type:String,
            //required:true,
          }
      ],
      ratings:{
        ratingsArray:[{
          userId:Types.ObjectId,
          rating:Number
        }],
        medianValueRating:Number
      }
    },
    {
      timestamps: true,
    }
  );
module.exports = model("Furniture", schema, "furniture");