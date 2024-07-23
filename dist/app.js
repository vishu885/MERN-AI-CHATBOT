import express from 'express'; //1.use express framework
import { config } from 'dotenv';
config(); //2.with this u can connect to mongodb
const app = express(); //1.1 provide express functionality to app
app.use(express.json()); //Returns middleware that only parses json and only looks 
//at requests where the Content-Type header matches the type option. 
//to access json data in request body of post and put http request
export default app;
//# sourceMappingURL=app.js.map