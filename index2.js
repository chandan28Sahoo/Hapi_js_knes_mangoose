'use strict'
const Hapi=require('hapi');

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/mongoa', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    },(err , link)=>{
        if (err) throw err;
    console.log("DB connect success....")
});

const bios=mongoose.model("bio",({name:{type:String},class:{type:Number}}))

const server = Hapi.server({    
    port: 3000,    
    host: 'localhost'
});


server.route({
    path: '/',
    method: 'GET',
    handler: (request,h) => {
      return ('Hello, world');
    }

});


// post
server.route({
    path: '/stud1',
    method: 'POST',
    handler: async(req,h) => { 
        try{
            return await bios.insertMany(req.payload)
        }catch (error) {
            console.log(error);    
        }
    }   
});

// get
server.route({
    path: '/stud1/{name}',
    method: 'GET',
    handler: async(req,h) => { 
        try{
            return await bios.find({name:req.params.name})
        }catch (error) {
            console.log(error);    
        }
    }   
});

// put
server.route({
    path: '/stud1',
    method: 'PUT',
    handler: async(req,h) => { 
        try{
            let puting = await bios.updateOne({class:12},{ $set: { name: 'thaman' } });
            return ("update secuessfully!")
        }catch (error) {
            console.log(error);    
        }
    }   
});

// delete
server.route({
    path: '/stud1',
    method: 'DELETE',
    handler: async(req,h) => { 
        try{
            let puting = await bios.deleteMany({class:1});
            return ("delete secuessfully!")
        }catch (error) {
            console.log(error);    
        }
    }   
});

server.start((err)=>{
    if(err){
        throw err;
    }
})
console.log(`server running at : ${server.info.uri}`)