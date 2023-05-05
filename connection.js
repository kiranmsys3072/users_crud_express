const mongoose=require('mongoose')
  
const connectionStr = "mongodb://localhost:27017/UsersApi";

mongoose.connect(
   connectionStr, 
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  );

// ...
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// mongoose.set("strictQuery", true);
// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// };
  
// mongoose.connect(connectionStr,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useMongoClient:true
// }, (error, connection) => {
//     if (error) {
//         console.error("Error connecting to MongoDB:", error);
//     } else {
//         console.log("Connected to MongoDB!");
//     }
// });