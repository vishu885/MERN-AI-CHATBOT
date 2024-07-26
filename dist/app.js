import express from 'express'; //1.use express framework
import { config } from 'dotenv';
import morgan from 'morgan'; //used to log request , response
import appRouter from './routes/index.js';
config(); //2.with this u can connect to mongodb
const app = express(); //1.1 provide express functionality to app
app.use(express.json()); //Returns middleware that only parses json and only looks //at requests where the Content-Type header matches the type option. 
//to access json data in request body of post and put http request
app.use(morgan("dev")); //only use in dev mode and not in prod      
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map