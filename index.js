const fs = require('node:fs');
const express = require('express');
const app     = express();
let dbkoders = JSON.parse(fs.readFileSync('db.json', 'utf-8'));

app.use( express.json());

const updateKoders = ( kodersList )=>{
    fs.writeFileSync('db.json',JSON.stringify( kodersList ));
}

let koders = [];

// listar los koders
app.get('/koders', (req, res)=>{

    res.json(dbkoders);
})

// agregar un koder
// app.post('/koders/:name', ( req, res)=>{
//     const newKoder = {
//         name: req.params.name
//     }
//     koders.push( newKoder );
//     res.json({ message: 'koder added successful', koders: koders})
// })
app.post('/koders', ( req, res)=>{

    dbkoders.push( req.body )
    updateKoders( dbkoders );
    res.json({
        message: 'added ok',
        dbkoders
    })
})

// borrando elementos con params
app.delete('/koders/:name', (req, res)=>{
    dbkoders = dbkoders.filter(( koder )=>  koder.name !== req.params.name);
    updateKoders( dbkoders );
    res.json({
        message: 'koder deleted',
        dbkoders
    });
})

// borrando elementos
app.delete('/koders', (req, res)=>{
    dbkoders = [];
    updateKoders( dbkoders );
    res.json({
        message: 'koder deleted',
        dbkoders
    });
})


app.listen( 3000, ()=>{
    console.log('Servidor iniciado en puerto 3000');
})