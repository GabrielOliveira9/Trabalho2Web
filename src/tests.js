import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from './app.js';

const testJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.vYHN1AnpQpdig7rFNy7K3b8DKhAOpz70tB9blw7qvKs';

const postRegisterTest = {
    title: 'New Test Register',
    date: '24/12/2009',
    description: 'successful posting test'
}

const putRegisterTest = {
    title: 'Updated Test Register',
    date: '25/11/2005',
    description: 'This register has been updated'
}

describe('###Tests for Server Configuration', async(t) => {
    test('Testing options configuration file', async (t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });

        deepEqual(options.stage, 'test');
        deepEqual(options.port, '3000');
        deepEqual(options.host, '127.0.0.1');
        deepEqual(options.jwt_secret, 'Abcd@1234');
        deepEqual(options.db_url, 'mongodb://127.0.0.1:27017/schedule');
    });
});

describe('###Tests for Unauthenticated Routes', async(t) => {
    
    describe('##Success Requests', async(t) => {
        test('# GET /registers', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/registers'
            });
            
            equal(response.statusCode, 200);
        });
        
        test('# GET /registers/:id', async(t) => {
            const app = await build(options);
            
            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/registers/6627123484ea3a78ac4cad85'
            });
            
            equal(response.statusCode, 200);
        });
        
    });

    describe('##Bad Requests', async(t) => {
        
        test('# Not found', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            
            const response = await app.inject({
                method: 'GET',
                url: '/notfound'
            });
            equal(response.statusCode, 404);
        });
        
        test('# Error', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });

            const response = await app.inject({
                method: 'GET',
                url: '/error'
            });
            equal(response.statusCode, 501);
        });

        test('# NO TOKEN', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });

            const response = await app.inject({
                method: 'POST',
                url: '/registers',
                body: postRegisterTest,
                headers: {
                }
            });
            equal(response.statusCode, 401);
        });
        
        test('# INVALID TOKEN', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });

            const response = await app.inject({
                method: 'POST',
                url: '/registers',
                body: postRegisterTest,
                headers: {
                    'x-access-token': "asdjaisf"
                }
            });
            equal(response.statusCode, 401);
        });

    });
});

describe('###Tests for Authenticated routes', async(t) => {
    describe('##Success Requests', async(t) => {

        test('# POST /registers', async(t) => {
            const app = await build(options);
        
            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/registers',
                body: postRegisterTest,
                headers: {
                    'x-access-token': testJWT
                }
            });
            equal(response.statusCode, 201);
        });

        test('# DELETE /registers:id', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'DELETE',
                url: '/registers/6627128a84ea3a78ac4cad86',
                headers: {
                    'x-access-token': testJWT
                }
            });

            equal(response.statusCode, 204);
        });

        test('# PUT /registers:id', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'PUT',
                url: '/registers/662712da84ea3a78ac4cad87',
                body: putRegisterTest,
                headers: {
                    'x-access-token': testJWT
                }
            });
            equal(response.statusCode, 204);
        });

    });
});