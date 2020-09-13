'use strict'
const Hapi=require('hapi');
const Qs = require('qs');
const knex=require('./knex');
// const routes = require('./routes');




const server = Hapi.server({    
    port: 3000,    
    host: 'localhost',
    query: {
        parser: (query) => Qs.parse(query)
    }
});



server.route({
    path: '/',
    method: 'GET',
    handler: (request,h) => {
      return ('Hello, hapi!');
    }

});

server.route({
    path: '/stud',
    method: 'GET',
    handler: async(request,h) => { 
        try {
            let student= await knex.select("name").from("students1").where("stud_id",1)
            return student[0].name
        } catch (error) {
            return error   
        }
    }
});

// create table 
server.route({
    path: '/create',
    method: 'GET',
    handler: async(request,h) => { 
        try {
            await knex.schema.createTable('users', function (table) {
                table.increments();
                table.string('name',100);
                table.integer('age');
              })
            return ("secuessfully done");
        } catch (error) {
            return error   
        }
    }
});

// post data into the table
server.route({
    path: '/create',
    method: ['POST'],
    handler: async(request,h) => { 
        const payload = request.payload;
        try {
            await knex('users').insert(payload)
            return ("secuessfully done");
        } catch (error) {
            return error   
        }
    }
});


// get user by name ,id,age
server.route({
    path: '/create/{name}',
    method: ['GET'],
    handler: async(request,h) => { 
        try {
            let user=await knex('*').from('users').where("name",request.params.name)
            return user;
        }catch(error) {
            return error   
        }
    }
});

// 
server.route({
    path: '/create/{name}',
    method: ['PUT'],
    handler: async(request,h) => { 
        const payload = request.payload;
        try {
            let user=await knex('*').from('users').where("name",request.params.name)
            .update(payload)
            return ("secuessfully update !");
        }catch(error) {
            return error 
        }
    }
});

server.start((err)=>{
    if(err){
        throw err;
    }
})
console.log(`server running at : ${server.info.uri}`)