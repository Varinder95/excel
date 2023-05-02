const Data = require('../../models/Data');
const { ApolloError } = require('apollo-server-errors');


module.exports = {
    Mutation: {
        async saveData(_, {dataInput: { Business ,Address, Supplier, Decision_Maker, Telephone_1, Telephone_2, PC, MTC, LLF, MPRN, MPAN, EAC, CED, UploadName, CreatedBy, FileName } }) {
            // check if data exist
            const oldData =  await Data.findOne({ Business });

            // throw Data exist error
            if (oldData) {
                throw new ApolloError('Data Exist', 'DATA_ALREADY_EXISTS');
            }

            //build mongo model
            const newData = new Data ({
                Business: Business,
                Address: Address,
                Supplier: Supplier,
                Decision_Maker: Decision_Maker,
                Telephone_1: Telephone_1,
                Telephone_2: Telephone_2,
                PC: PC,
                MTC: MTC,
                LLF: LLF,
                MPRN: MPRN,
                MPAN: MPAN,
                EAC: EAC,
                CED: CED,
                UploadName: UploadName,
                FileName: FileName,
                CreatedBy: CreatedBy
            });
            // save data in mongo
            const res = await newData.save();
            return {
                id: res.id,
                ...res._doc
            };
        },
        // assign to user
        async assignData(_,{ assignInput: { Id , AssignTo, AssignBy, AssignOn, ReportBy} }) {
            const updateData = await Data.updateOne( { _id : Id }, { $set: { AssignedTo : AssignTo, AssignedBy : AssignBy, AssignedOn : AssignOn, ReportingBy : ReportBy} } );
            if (!updateData) {
                console.log(updateData)
                throw new Error("Error in assigning")
            }
            else {
                return updateData
            }
            
        }
    },
    Query: {
        getData: async () => { 
            return await Data.find()
        },
        DataByFilename: async (_, FileName) => {
            console.log(FileName)
            const uploaddata = Data.find( {FileName : FileName.FileName })
            if (!uploaddata) {
                throw new Error("No Such File")
            }
            else {
                return uploaddata
            }
        },
        DataAssignedToUser: async (_, { fileInput: { Filename , Email} }) => {
            console.log(fileInput)
            const uploaddata = Data.find( {$and: [ {FileName : Filename}, {AssignedTo : Email}]} )
            if (!uploaddata) {
                throw new Error("No Such File")
            }
            else {
                return uploaddata
            }
        }
    },
}