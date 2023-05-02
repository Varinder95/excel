const ReportedData = require('../../models/ReportedData');
const { ApolloError } = require('apollo-server-errors');


module.exports = {
    Mutation: {
        async saveReportedData(_, {dataInput: { Business ,Address, Supplier, Decision_Maker, Telephone_1, Telephone_2, PC, MTC, LLF, MPRN, MPAN, EAC, CED, UploadName, CreatedBy, FileName, ReportedBy, AssignedBy, ReportingDate, ReportedOn } }) {
            //build mongo model
            const newReportedData = new ReportedData ({
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
                CreatedBy: CreatedBy,
                ReportedBy: ReportedBy,
                AssignedBy: AssignedBy,
                ReportedOn: ReportedOn,
                ReportingDate: ReportingDate
            });
            // save data in mongo
            const res = await newReportedData.save();
            return {
                id: res.id,
                ...res._doc
            };
        }
    },
    Query: {
        getReportedData: async () => { 
            return await ReportedData.find()
        },
        ReportedByFilename: async (_, FileName) => {
            console.log(FileName)
            const uploaddata = ReportedData.find( {FileName : FileName.FileName })
            if (!uploaddata) {
                throw new Error("No Such File")
            }
            else {
                return uploaddata
            }
        }
    },
}