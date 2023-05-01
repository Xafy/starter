const dotenv = require('dotenv');
const db = require('./models/index');


dotenv.config({path: './config.env'});
const {app} = require('./app');


app.listen(process.env.PORT, ()=>{
    console.log(`server connected on http://127.0.0.1:${process.env.PORT}`);
});

// db.sequelize.sync()
//             .then(()=>{console.log("Database synced successfuly")})
//             .catch((err)=>{console.log("Error Syncing :", err)})


