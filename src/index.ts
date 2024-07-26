
import app from './app.js';
import  {connectToDatabase}  from "./db/connection.js";

const PORT= process.env.PORT || 5000;

 try {
  connectToDatabase()
  .then(()=>{
  app.listen(PORT,()=>
    console.log("SERVER STARTED AND CONNECTED TO DATABASE")); //1.2 setting up port connections and listeners
})
 } 
 catch (error) {
    console.error(error);
    throw new Error("ERROR");
 }
