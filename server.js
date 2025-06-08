const app =require('./app');
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT ,()=>{
    console.log("server running on port : "+PORT )
})