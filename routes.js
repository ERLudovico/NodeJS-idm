module.exports = function(app){
    var usuario = require('./controllers/usuario');

    //app.get('/users', usuario.findAll);
    app.get('/users', usuario.encontraUsuarios);
    app.get('/users/:id', usuario.encontraPeloId);
    app.post('/users', usuario.criaUsuario);
    app.put('/users/:id', usuario.atualizaUsuario);
    app.delete('/users/:id', usuario.apagaUsuario);
}
