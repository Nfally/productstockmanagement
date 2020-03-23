import * as mongoose from "mongoose";
import {Schema, Types} from "mongoose";

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

export function orderAggregate (reference: string) {
    return [
        {
          $match: {
            'reference': reference
          }
        },
        {
            $lookup: {
                'from': 'customers',
                'let': {
                    'ct': '$customer'
                },
                'pipeline': [
                    {
                        '$match': {
                            '$expr': {
                                '$eq': [
                                    '$_id',
                                    '$$ct'
                                ]
                            }
                        }
                    },
                    {
                        $project: {
                            '__v': 0
                        }
                    }
                ],
                as: 'customer'
            },
        },
        {
            $lookup: {
                'from': 'products',
                'let': {
                    'pr': '$products'
                },
                'pipeline': [
                    {
                        '$match': {
                            '$expr': {
                                '$in': [
                                    '$_id', '$$pr'
                                ]
                            }
                        }
                    },
                    {
                        $project: {
                            '__v': 0
                        }
                    }
                ],
                as: 'products'

            },
        },
        {
            $lookup: {
                'from': 'users',
                'let': {
                    'us': '$user'
                },
                'pipeline': [
                    {
                        '$match': {
                            '$expr': {
                                '$eq': [
                                    '$_id',
                                    '$$us'
                                ]
                            }
                        }
                    },
                    {
                        $project: {
                            '__v': 0
                        }
                    }
                ],
                as: 'user'
            },
        },
        {
            $project: {
                 '__v': 0
            }
        }
    ]
}
function f (action: string[]) {

}
export function agg(models: string[], fields: string[], alias: string[]) {
    const arr: Array<any> = [];
    for(let i: number = 0; i <= models.length - 1; i++) {
        arr.push(
            {
                $lookup: {
                    'from': models[i],
                    'let': {
                        'cu': `$${alias[i]}`
                    },
                    'pipeline':[
                        {
                            '$match': {
                                '$expr': {
                                    '$eq': [
                                        `$${fields[i]}`,
                                        '$$cu'
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                '__v': 0
                            }
                        }
                    ] ,
                    as: alias[i]
                }
            }
        )
    }
    arr.push({
        $project: {
            '__v': 0
        }
    })
    return arr
}
