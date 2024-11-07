import mongoose from "mongoose"

const  messageSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId, //uniqueIdentifier
        ref:"Users",
        required:false,   //bcoz of channels
    },
    messageType:{
        type:String,
        enum:["text","file"],   //enum ka use yeh hota hai ki ham kisi field ki values ko restrict kar sakein, yani woh sirf kuch specific values hi accept kare.
        required:true,
    },
    content:{
        type:String,
        required:function(){
            return this.messageType==="text";
        },
    },
    fileUrl:{
        type:String,
        required:function(){
            return this.messageType==="file";
        },
    },
    timestamp:{
        type:Date,
        default:Date.now(),
    }
});

const Message=mongoose.model("Messages",messageSchema);

export default Message;