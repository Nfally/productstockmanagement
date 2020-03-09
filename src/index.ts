import app from './app'
import db from "./core/db";
import CustomerRouter  from "./routes/CustomerUrls"
import bodyParser from "body-parser";

const port = process.env.PORT || 3000;

db;
app.use(bodyParser.json())
app.use(CustomerRouter);
app.listen(port, (err: any) => {
    if (err) {
        return console.log(err)
    }
    return console.log(`server is listening on ${port}`)
});
