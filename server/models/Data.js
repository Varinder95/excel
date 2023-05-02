const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const dataSchema = new Schema({
    Business: { type: String },
    Address_1: { type: String },
    Address_2: { type: String },
    Address_3: { type: String },
    County: { type: String },
    Region: { type: String },
    Postcode: { type: String },	
    Supplier: { type: String },
    Decision_Maker: { type: String },
    Telephone_1: { type: String },
    Telephone_2: { type: String },
    PC: { type: String },	
    MTC: { type: String },
    LLF: { type: String },
    MPRN: { type: String },
    MPAN: { type: String },
    EAC: { type: String },
    CED: { type: String },
    UploadName: { type: String },
    FileName: { type: String },
    CreatedBy: { type: String },
    AssignedTo: { type: String },
    AssignedBy: { type: String },
    AssignedOn: { type: String },
    ReportingBy: { type: String }
},
{
  timestamps: true
});

dataSchema.plugin(mongoosePaginate);

module.exports = model('Data', dataSchema);