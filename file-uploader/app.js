var express     = require('express');  
var mongoose    = require('mongoose');  
var multer      = require('multer');  
var path        = require('path');  
const cors = require('cors')
var dataModel    = require('./models/Data');  
var uploadModel    = require('./models/Uploads');  
var excelToJson = require('convert-excel-to-json');
var bodyParser  = require('body-parser'); 
const config = require('./config');
var storage = multer.diskStorage({  
destination:(req,file,cb)=>{  
    cb(null,'./public/uploads');  
},  
filename:(req,file,cb)=>{  
    cb(null,Date.now() + '-' + file.originalname);  
}  
});  
var upload = multer({storage:storage});  
//connect to db  
mongoose.connect(process.env.Mongo_URL || config.connectionString,{useNewUrlParser:true})  
.then(()=>console.log('connected to db'))  
.catch((err)=>console.log(err))  
//init app  
var app = express();  
//set the template engine  
app.set('view engine','ejs');  
//registering cors
app.use(cors());
//fetch data from the request  
app.use(bodyParser.urlencoded({extended:false}));  
//static folder  
app.use(express.static(path.resolve(__dirname,'public')));  
//route for Home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// Upload excel file and 
app.post('/uploadfile', upload.single("uploadfile"), (req, res) =>{
    const fileData = importExcelData2MongoDB(__dirname + '/public/uploads/' + req.file.filename);
    const data2 = {FileName:req.file.filename};
    for (let i = 0; i < fileData.length; i++) {
        fileData[i] = Object.assign(fileData[i], data2);
    }
    const jsonData = JSON.stringify(fileData);
    res.end(jsonData);

});
//fetch data from the request  
app.use(bodyParser.json()); 
// import data to mongodb
app.post('/uploaddata', (req, res) => {
    // Insert Json-Object to MongoDB
    console.log(req.body);
    const uploadData = req.body;
    dataModel.insertMany(uploadData.NewData,(err,data)=>{  
        if(err){
            res.end('Error in uploading Data');
            console.log(err);  
        }else{  
            const dataLength = data.length;
            uploadModel.create({ 
                UploadName: uploadData.UploadName,
                FileName: uploadData.FileName,
                NoOfEntries: dataLength,
                UploadedBy: uploadData.UploadedBy
            },(err,data)=>{  
                if(err){
                    res.end('Error in uploading Data');
                    console.log(err);  
                }else{ 
                    res.end('Successful');
                    console.log(dataLength);
                    console.log(data);
                }
            });
        }  
    }); 
});
// Import Excel File to MongoDB database
function importExcelData2MongoDB(filePath){
// -> Read Excel File to Json Data
    const excelData = excelToJson({
        sourceFile: filePath,
        // Header Row -> be skipped and will not be present at our result object.
        header:{
            rows: 1
        },
        // Mapping columns to keys
        columnToKey: {
            A: 'Business',
            B: 'Address_1',
            C: 'Address_2',
            D: 'Address_3',
            E: 'County',
            F: 'Region',
            G: 'Postcode',
            H: 'Supplier',
            I: 'Decision_Maker',
            J: 'Telephone_1',
            K: 'Telephone_2',
            L: 'PC',
            M: 'MTC',
            N: 'LLF',
            O: 'MPRN',
            P: 'MPAN',
            Q: 'EAC',
            R: 'CED',
        }
    });
    
    return excelData.Sheet1;
}
//assign port  
var port = process.env.PORT || config.port;  
app.listen(port,()=>console.log('server run at port '+port));

module.exports = app;
