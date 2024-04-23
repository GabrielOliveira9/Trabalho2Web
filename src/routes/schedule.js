/** @type{import('fastify').FastifyPluginAsync<>}*/
import createError from '@fastify/error';

export default async function schedule(app, options){
    const InvalidRegisterError = createError('InvalidRegisterError', 'Registro inválido', 400);

    const registers = app.mongo.db.collection('registers');

    app.get('/registers',
        {
            config: {
                logMe: true
            }
        },
        async (request, reply) => {
            return await registers.find().toArray();
        }
    );

    app.get('/registers/:id', async(request, reply) => {
        let id = request.params.id;
        let register = await registers.findOne({_id: new app.mongo.ObjectId(id)});

        return register;
    });

    app.post('/registers', {
        schema : {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    title: { type: 'string' },
                    date: { type: 'string' },
                    description: { type: 'string' }
                },
                required: ['title', 'date']
               }       
            },
            config: {
                requireAuthentication: true
            }
    }, async (request, reply) => {
        let register = request.body;
        
        await registers.insertOne(register);
        
        return reply.code(201).send();
    });

    app.delete('/registers/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id = request.params.id;
        
        await registers.deleteOne({_id: new app.mongo.ObjectId(id)});
        
        return reply.code(204).send();
    });

    app.put('/registers/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id = request.params.id;
        let register = request.body;

        await registers.updateOne({_id: new app.mongo.ObjectId(id)}, { 
            $set: {
                title: register.title,
                date: register.date
            }
        });

        return reply.code(204).send();
    });
}