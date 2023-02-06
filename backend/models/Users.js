const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

// creating the schema
const userSchema = mongoose.Schema(
    {
        name: {type:String, trim:true},
        email: {type:String, unique:true, require:true},
        password: {type:String, require:true},
        pic: {type:String, default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
        isAdmin: {type:Boolean, require:true, default:false},
    },
    {timestamp:true}
)

//function for comparing the provided password from frontend and the existing password in databasae while logining the user 
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password)
}

//function for hashing the password before saving the data in database
userSchema.pre("save", async function (next){
    
    //if password is not encrypted
    if(!this.isModified){
        next()
    }

    //generating random alphabets/keywords to hash the password using bcryptjs library
    const salt = await bcryptjs.genSalt(10)
    // hasing the password by the generated salt
    this.password = await bcryptjs.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)
module.exports = User