const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://petish:Engulfing987@petishdb.d6fgy7i.mongodb.net/petish?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB is Connected')
})
.catch((err) => console.log(err));