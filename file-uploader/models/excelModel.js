var mongoose  =  require('mongoose');  
   
var excelSchema = new mongoose.Schema({  
    id:{  
        type:String  
    },
    name:{  
        type:String  
    },  
    email:{  
        type:String  
    },    
    age:{  
        type:String  
    }
});  
   
module.exports = mongoose.model('excelModel',excelSchema);  
