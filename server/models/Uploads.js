const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const uploadsSchema = new Schema({
    UploadName: { type: String },
    FileName: { type: String, unique: true },
    NoOfEntries: { type: String },
    UploadedBy: { type: String }
},
{
  timestamps: true
});
uploadsSchema.plugin(mongoosePaginate);

module.exports = model('Uploads', uploadsSchema);