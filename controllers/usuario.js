var mongoose = require('mongoose'),
Usuario = mongoose.model('usuario');

exports.encontraUsuarios = function(req, res){

  Usuario.find({},function(err, results) {
    if(err) {
        response = {"error" : true,"message" : "Error fetching data"};
    } else {
        response = {"error" : false,"message" : results};
    }
    res.json(response);
  });
};

exports.criaUsuario = function(req, res){
  console.log('Debug Header: ' + JSON.stringify(req.body));
  console.log(JSON.stringify(req.body));
  var db = new Usuario();
  var response = {};
  // fetch email and password from REST request.
  // Add strict validation when you use this in Production.
  db.userEmail = req.body.userEmail;
  // Hash the password using SHA1 algorithm.
  /*
  db.userPassword =  require('crypto')
                    .createHash('sha1')
                    .update(req.body.password)
                    .digest('base64');

  */
  db.userPassword = req.body.password ;
  db.userName = req.body.userName ;
  db.ultimoNome = req.body.ultimoNome;
  db.idade = req.body.idade;

  db.save(function(err){
  // save() will run insert() command of MongoDB.
  // it will add new data in collection.
      if(err) {
          response = {"error" : true,"message" : "Error adding data"};
      } else {
          response = {"error" : false,"message" : "Data added"};
      }
      res.json(response);
  });
};

exports.encontraPeloId = function(req, res){
  console.log('Debug Header: ' + JSON.stringify(req.body));
  console.log(JSON.stringify(req.body));
  var response = {};
  Usuario.findById(req.params.id,function(err, data){
  // This will run Mongo Query to fetch data based on ID.
      if(err) {
          response = {"error" : true,"message" : "Error fetching data"};
      } else {
        if ( data != null){
          if (data.userName === null) {
            console.log('userName = null');
          } else if (data.userName === undefined) {
            console.log('userName = undefined');
          } else if (data.userName === '') {
            console.log('userName = empty');
          } else {
            console.log('userName' , data.userName);
          }
          response = {"error" : false,"message" : data};
        } else {
          response = {"error" : false, "message" : "Registro nao encontrado"};
        }
      }
      res.json(response);
  });
}

exports.atualizaUsuario = function(req, res){
  console.log('Debug Header: ' + JSON.stringify(req.body));
  console.log(JSON.stringify(req.body));
  var response = {};
  // first find out record exists or not
  // if it does then update the record
  Usuario.findById(req.params.id,function(err,data){
      if(err) {
          response = {"error" : true,"message" : "Error fetching data"};
      } else {
      // we got data from Mongo.
      // change it accordingly.
          if(req.body.userEmail !== undefined) {
              data.userEmail = req.body.userEmail;
          }
          if(req.body.userPassword !== undefined) {
              data.userPassword = req.body.userPassword;
          }
          if(req.body.userName !== undefined) {
              data.userName = req.body.userName;
          }
          if(req.body.ultimoNome !== undefined) {
              data.ultimoNome = req.body.ultimoNome;
          }
          if(req.body.idade !== undefined) {
              data.idade = req.body.idade;
          }
          // save the data
          data.save(function(err){
              if(err) {
                  response = {"error" : true,"message" : "Error updating data"};
              } else {
                  response = {"error" : false,"message" : "Data is updated for "+req.params.id};
              }
              res.json(response);
          })
      }
  });
}

exports.apagaUsuario = function(req, res){
  console.log('Debug Header: ' + JSON.stringify(req.body));
  console.log(JSON.stringify(req.body));
  var response = {};
  // find the data
  Usuario.findById(req.params.id,function(err,data){
      if(err) {
          response = {"error" : true,"message" : "Error fetching data"};
      } else {
          // data exists, remove it.
          Usuario.remove({_id : req.params.id},function(err){
              if(err) {
                  response = {"error" : true,"message" : "Error deleting data"};
              } else {
                  response = {"error" : false,"message" : "Data associated with "+req.params.id+"is deleted"};
              }
              res.json(response);
          });
      }
  });
}
