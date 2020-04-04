import * as mongoose from "mongoose";
import {Schema, Types} from "mongoose";
import {check, validationResult} from "express-validator";

const errors = {
    UsersErrors : [
        check ('email', 'Email is required').not ().isEmail(),
        check ('password', 'Password must contain 6 characters').isLength({min:  6}),
        check ('username', 'Username is required').not ().isEmpty (),
        check ('lastName', 'LastName is required').not ().isEmpty (),
        check ('firstName', 'FirstName is required').not ().isEmpty (),
        check ('ref', 'Reference is Required').not ().isEmpty ()
    ],
    ProductErrors : [
        check ('ref', 'Product reference is required').isEmpty (),
        check ('designation', 'Designation is required').not ().isEmpty (),
        check ('qte', 'Quantity is required').not ().isEmpty (),
        check ('price', 'Price is required').not ().isEmpty (),
    ],
    AuthError: [
        check ('email', 'Email is required').isEmail(),
        check ('password', 'Password must contain 6 characters').exists(),
    ],
    OrderError: [
        check('reference', 'Reference is required').not().isEmpty(),
    ],
    CustomerError: [
        check('reference', 'Reference is required').not().isEmpty(),
        check('firstName', 'FirstName is required').not().isEmpty(),
        check('lastName', 'LastName is required').not().isEmpty(),
        check('email', 'Email is required').not().isEmpty()
    ]
};
export default errors;
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
    });
    return arr
}

export function errorsValidation (req: any, resp: any) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        resp.status(400).json(errors)
    }
}
