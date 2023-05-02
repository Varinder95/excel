const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const assignedDataSchema = new Schema({
    UploadName: { type: String },
    FileName: { type: String, required: true },
    Entries: { type: Number },
    AssignedTo: { type: String },
    AssignedBy: { type: String },
    AssignedOn: { type: String },
    ReportingBy: { type: String },
    FirstOpen: { type: String, default: true}
},
{
  timestamps: true
});

assignedDataSchema.plugin(mongoosePaginate);

module.exports = model('AssignedData', assignedDataSchema);