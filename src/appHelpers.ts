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


/**
 * from: The target collection.
 * localField: The local join field.
 * foreignField: The target join field.
 * as: The name for the results.
 * pipeline: The pipeline to run on the joined collection.
 * let: Optional variables to use in the pipeline field stages.
 */

export function lookup(from: string, localField: string, foreignField: string, as: string) {
    // @ts-ignore
    return aggregate.lookup({ from: from, localField: localField, foreignField: foreignField, as: from });
}
