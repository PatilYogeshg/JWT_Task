const mongoose = require('mongoose') 
const bcrypt = require('bcrypt')
const user = new mongoose.Schema({
    Name : {
        type : String,
        require : true ,
        unique:true 
    },
    Email : {
        type : String,
        require : true ,
        unique:true 
    },
    Password : {
        type : String,
    }

},{ timestamps : true })

user.pre('save', async function(next){
    if(this.isModified('Password')){
    this.Password = await bcrypt.hash(this.Password, 10);
    }
   next();
});


exports.userModel = new mongoose.model('User_Data' , user)


const UserBlog = new mongoose.Schema({
    UserId : {
        type : mongoose.Types.ObjectId
    },
    BlogName : {
        type : String,
        require : true 
    },
    BlodData : {
        type : String
    }
})
exports.BlogDataModel = new mongoose.model('Blog_data', UserBlog)