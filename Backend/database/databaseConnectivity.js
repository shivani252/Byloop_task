import mongoose from "mongoose"
mongoose.connect("mongodb+srv://coderhub:AEpIJXwCEo0puMp5@cluster0.nalrul7.mongodb.net/tempCar?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
});

export default mongoose.connection;