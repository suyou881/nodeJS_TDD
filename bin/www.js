const app = require('../index');
const syncDb = require('./sync-db');
syncDb().then(()=>{
    console.log('Sync database!');
    app.listen(5050,()=>{
        console.log('Server is running on 5050 port!');
    });
    
});

