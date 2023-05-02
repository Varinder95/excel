const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    status: { type: String , default: 'User'},
    token: { type: String }
},
{
  timestamps: true
});
userSchema.plugin(mongoosePaginate);

module.exports = model('User', userSchema);