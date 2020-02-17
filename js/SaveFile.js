const fs = require('fs');

const SaveFile = (data)=>{
    try{
        fs.writeFileSync('timers', data);
    }
    catch(err){
        throw err;
    }
}



export default SaveFile;

