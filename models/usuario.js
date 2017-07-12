var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/demoDb');
mongoose.set('debug', true);

// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = {
    "userEmail" :     { type: String, required: false },
    "userPassword" :  { type: String, required: false },
    "userName" :      { type: String, required: true, index: { unique: true } },
    "ultimoNome" :    { type: String, required: false, index: { unique: true } },
    "idade" :         { type: String, required: false, index: { unique: true } }
};
// create model if not exists.
module.exports = mongoose.model('usuario',userSchema);
