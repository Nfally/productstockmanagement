import * as mongoose from "mongoose";

console.log('hello mongoose');
// @ts-ignore
const db = mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});
export default db;
