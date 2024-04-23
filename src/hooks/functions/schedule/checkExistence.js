import { ALREADY_EXISTS } from "../../../libs/errors.js";
export const checkExistence = (app) => async (request, reply) => {
    const registers = app.mongo.db.collection('registers');

    let register = request.body;

    let result = await registers.count({title: register.title});

    if(result > 0) throw new ALREADY_EXISTS();
}