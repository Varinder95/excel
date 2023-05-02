const { gql } = require('apollo-server');

module.exports = gql`
scalar Date

type User {
    _id: ID!
    name: String
    email: String!
    password: String
    status: String
    token: String
    createdAt: String
}

type Uploads {
    _id: ID!
    UploadName: String
    FileName: String!
    NoOfEntries: String
    UploadedBy: String
    createdAt: String
}

type Data {
    _id: ID!
    Business: String
    Address_1: String
    Address_2: String
    Address_3: String
    County: String
    Region: String
    Postcode: String
    Supplier: String
    Decision_Maker: String
    Telephone_1: String
    Telephone_2: String
    PC: String	
    MTC: String
    LLF: String
    MPRN: String
    MPAN: String
    EAC: String
    CED: String
    UploadName: String
    FileName: String
    CreatedBy: String
    createdAt: String
    AssignedTo: String
    AssignedBy: String
    AssignedOn: Date
    ReportingBy: Date
}

type ReportedData {
    _id: ID!
    Business: String
    Address_1: String
    Address_2: String
    Address_3: String
    County: String
    Region: String
    Postcode: String
    Supplier: String
    Decision_Maker: String
    Telephone_1: String
    Telephone_2: String
    PC: String	
    MTC: String
    LLF: String
    MPRN: String
    MPAN: String
    EAC: String
    CED: String
    UploadName: String
    FileName: String
    ReportedBy: String
    AssignedBy: String
    ReportedOn: String
    ReportingDate: String
}

type AssignOutput {
    acknowledged: String
    modifiedCount: Int
    upsertedId: String
    upsertedCount: String
    matchedCount: String
}

type AssignedData {
    _id: ID!
    UploadName: String 
    FileName: String 
    Entries: Int 
    AssignedTo: String 
    AssignedBy: String 
    AssignedOn: Date 
    ReportingBy: Date 
    FirstOpen: String
    createdAt: String
}

input AssignInput {
    Id: ID!
    AssignTo: String
    AssignBy: String
    AssignOn: Date
    ReportBy: Date
}

input AssignedEntriesInput {
    UploadName: String 
    FileName: String!
    Entries: Int 
    AssignedTo: String 
    AssignedBy: String 
    AssignedOn: Date 
    ReportingBy: Date 
}

input RegisterInput {
    name: String
    email: String
    password: String
}

input LoginInput {
    email: String
    password: String
}

input DataInput {
    Business: String!
    Address_1: String
    Address_2: String
    Address_3: String
    County: String
    Region: String
    Postcode: String
    Supplier: String
    Decision_Maker: String
    Telephone_1: String
    Telephone_2: String
    PC: String	
    MTC: String
    LLF: String
    MPRN: String
    MPAN: String
    EAC: String
    CED: String
    UploadName: String
    FileName: String
    CreatedBy: String
    createdAt: String
}

input ReportedDataInput {
    Business: String
    Address: String
    Supplier: String
    Decision_Maker: String
    Telephone_1: String
    Telephone_2: String
    PC: String
    MTC: String
    LLF: String
    MPRN: String
    MPAN: String
    EAC: String
    CED: String
    UploadName: String
    FileName: String
    CreatedBy: String
    ReportedBy: String
    AssignedBy: String
    ReportedOn: String
    ReportingDate: String
}

input UploadsInput {
    UploadName: String
    FileName: String!
    NoOfEntries: String
    UploadedBy: String
}

input FileInput {
    FileName: String
    Email: String 
}

type Query {
    
    getUser(email: String!): User!
    getUserById(id: ID!): User!
    getUsers: [User]
    greeting: String!
    getData: [Data]
    DataByFilename(FileName: String!): [Data]
    DataAssignedToUser(fileInput: FileInput): [Data]
    getUploads: [Uploads]
    getSingleUpload(FileName: String!): Uploads!
    getAssigned(email: String!): [AssignedData]
    getSingleAssigned(id: ID!): AssignedData
}

type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    saveData(dataInput: DataInput): Data
    saveReportedData(reportedDataInput: ReportedDataInput): ReportedData
    assignData(assignInput: AssignInput): AssignOutput
    saveUploads(uploadsInput: UploadsInput): Uploads
    saveAssigned(assignedEntriesInput: AssignedEntriesInput): AssignedData!
}
`