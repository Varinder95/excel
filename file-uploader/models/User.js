const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String }
},
{
  timestamps: true
});

module.exports = model('User', userSchema);