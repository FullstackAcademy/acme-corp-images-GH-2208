const express = require('express');
const app = express();
const path = require('path');
const { conn, Image } = require('./db');
const fs = require('fs');

app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));
app.use(express.json());

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/images', async(req, res, next)=> {
  try {
    res.send(await Image.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/images', async(req, res, next)=> {
  try {
    res.status(201).send(await Image.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

const uploadImage = (name)=> {
  return new Promise((resolve, reject)=> {
    const fileName = `${name}.png`;
    fs.readFile(fileName, 'base64', async(err, data)=> {
      if(err){
        reject(err);
      }
      else {
        try {
          await Image.create({ name: fileName, data });
          resolve();
        }
        catch(ex){
          reject(ex);
        }
      }
    });
  });
};

const setup = async()=> {
  try {
    await conn.sync({ force: true });
    await uploadImage('excel');
    await uploadImage('git');
    await uploadImage('fullstack');
    await uploadImage('drive');
    /*
    fs.readFile('excel.png', 'base64', (err, data)=> {
      if(err){
        throw err;
      }
      else {
        Image.create({ name: 'exel.png', data });
        fs.readFile('git.png', 'base64', (err, data)=> {
          if(err){
            throw err;
          }
          else {
            Image.create({ name: 'git.png', data });
            fs.readFile('fullstack.png', 'base64', (err, data)=> {
              if(err){
                throw err;
              }
              else {
                Image.create({ name: 'fullstack.png', data });
              }
            });
          }
        });
      }
    });
    */

    const port = process.env.port || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

setup();
