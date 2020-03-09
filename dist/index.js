"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./core/db"));
const CustomerUrls_1 = __importDefault(require("./routes/CustomerUrls"));
const body_parser_1 = __importDefault(require("body-parser"));
const ProductUrls_1 = __importDefault(require("./routes/ProductUrls"));
const port = process.env.PORT || 3000;
db_1.default;
app_1.default.use(body_parser_1.default.json());
app_1.default.use(CustomerUrls_1.default);
app_1.default.use(ProductUrls_1.default);
app_1.default.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});
