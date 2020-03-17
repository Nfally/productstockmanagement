import app from './app'
import db from "./core/db";
import bodyParser from "body-parser";
import ProductRouter from "./routes/ProductUrls";
import OrderRouter from "./routes/OrderUrls";
import CustomerRouter from "./routes/CustomerUrls";
import UserRouter from "./routes/UserUrls";

const port = process.env.PORT || 3000;

db;
app.use(bodyParser.json());
app.use(CustomerRouter);
app.use(ProductRouter);
app.use(OrderRouter);
app.use(UserRouter);
app.listen(port, (err: any) => {
    if (err) {
        return console.log(err)
    }
    return console.log(`server is listening on ${port}`)
});

