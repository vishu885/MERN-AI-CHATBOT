import { connect, disconnect } from "mongoose"; // connect function inside mongoose is used to connet to MOngoDb
                                    //mongoose is ODM(object data model)to convert object to db

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL); //to access variables in .env files
    } catch (error) {
        console.log(error);
        throw new Error("ERROR CONNECTING TO MONGODB")
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("ERROR DISCONNECTING FROM MONGODB")
    }
}

export  {connectToDatabase, disconnectFromDatabase};