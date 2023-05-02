const AssignedData = require('../../models/AssignedData');
const { ApolloError } = require('apollo-server-errors');


module.exports = {
    Mutation: {
        async saveAssigned(_, { assignedEntriesInput: { UploadName, FileName, Entries, AssignedTo, AssignedBy, AssignedOn, ReportingBy } }) {
            console.log('reached')
            //build mongo model
            const newAssignedData = new AssignedData ({
                UploadName: UploadName,
                FileName: FileName,
                Entries: Entries,
                AssignedTo: AssignedTo,
                AssignedBy: AssignedBy,
                AssignedOn: AssignedOn,

            });
            // save Uploads in mongo
            const res = await newAssignedData.save();
            return {
                id: res.id,
                ...res._doc
            };
        }
    },
    Query: {
        getAssigned: async (_, {email}) => { 
            return await AssignedData.find( {AssignedTo : email }).sort ( { createdAt : 1} )
        }
    },
}