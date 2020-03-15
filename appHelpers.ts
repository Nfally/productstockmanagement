import * as mongoose from "mongoose";

export function match (model: mongoose.Model<any>, arg: string, field: any): any {
    return model.aggregate([
        {
            $match: {
                field: {
                    $in: [arg]
                }
            }
        }
    ])
}

export function lookup(from: string, localField: string, foreignField: string, as: string) {
    // @ts-ignore
    return aggregate.lookup({ from: from, localField: localField, foreignField: foreignField, as: from });
}
