import mongoose from "mongoose";

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
// @ts-ignore
const db = mongoose.connect('mongodb://localhost:27017/stockmanager', options).
    then(() => console.log('successfully connected to the db')).
    catch((error: any) => console.error({ error}));

export default db;
