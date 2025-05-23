import express  from "express";
import cors from "cors"
import { uid } from 'uid';
import mongoose from "mongoose";
import 'dotenv/config'
import { userDetailsModel } from "./schema";
const app=express();
app.use(cors());
app.use(express.json());
async function connectDB()
{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL as string);
        console.log("Connected to the MongoDB");
    }
    catch{
        console.log("Error in Connecting to the DB");
    }
}
connectDB()
app.post("/addPaymentsInfo",async(req,res)=>{
    const{f_name,l_name,street_address,apt_num,state,zip}=req.body;
    const newuid=uid(45)
    try{
        const user=await userDetailsModel.create({
            uid:newuid,
            f_name:f_name,
            l_name:l_name,
            street_address:street_address,
            apt_num:apt_num,
            state:state,
            zip:zip
        })
        res.send(user);
    }
    catch{
        res.json({
            message:"Some Error in Making Entry in DB"
        })
    }
   
})

app.post("/getUserAddress",async(req,res)=>{
    const data=req.body;
    console.log(data);
    const uid=data.uid;
    try{
        const user=await userDetailsModel.findOne({
            uid:uid
        });
        console.log(user);
        res.send(user)
    }
     catch{
        res.json({
            message:"Some Error in Making Entry in DB"
        })
    }
   
})

app.listen(5000);
export default app;