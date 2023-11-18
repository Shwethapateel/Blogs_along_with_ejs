const {Schema, model} = require('mongoose')
const validator = require('validator');
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name field cannot be empty"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email field cannot be empty"],
      lowercase: true,
      unique: true,
      validate : [validator.isEmail,'Please enter proper email']
    },
    role: {
      type: String,
      enum: ["user", "admin", "author"],
      default: "admin",
    },
    password: {
      type: String,
      required: [true, "Password field cannot be empty"],
      minlength: [8, "Password should contain above 8 charaters"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm Password field cannot be empty"],
      /////Custom validation
      validate: {
        validator: function () {
          return this.password === this.confirmPassword; /////This will return boolean
        },
        message : 'Password doesnot match, Please type proper password'
      },
    },
  },
  {
    timestamps: true,
  }
);
// userSchema.pre("save", function(){
//   return this.password === this.confirmPassword    /////This will return boolean
// })
module.exports = model('user', userSchema)