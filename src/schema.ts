import mongoose from "mongoose";;
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

const userDetails = new Schema({
    uid:String,
    f_name:String,
    l_name:String,
    street_address:String,
    apt_num:String,
    state:String,
    zip:String
})

export const userDetailsModel=mongoose.model("userDetails",userDetails);
