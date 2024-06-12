const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();


//Middleware 
app.use((cors()));
app.use(express.json())

//Connect to MongoDb
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('mongoDB Connected'))
.catch(err => console.log(err));

//Routes
const userRoutes = require('./routes/user.js')
const blogRoutes = require('./routes/blog.js')
const commentRoutes = require('./routes/comment.js')

app.use('/api/users/', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes)


app.get('/', (req, res) => {
    res.send('Welcome to the Blog API!');
});
 

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
