const mongoose = require('mongoose');
const Joi = require('joi');

const employeeSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },

    lastName : {
        type: String,
        required : true,
        minlength : 4,
        maxlength : 20
    },

    email : {
        type: String,
        required: true
    },

    departmentId : {
        type: String,
        required: true
    },

    createdAt : {
        type: Date,
    },

    updatedAt : {
        type: Date,
    }
    
})

const Employee = mongoose.model('Employee' , employeeSchema)





function validateData(employee){
  const schema = Joi.object({
    firstName : Joi.string().min(3).max(20).required(),
    lastName : Joi.string().min(4).max(20).required(),
    email : Joi.string().required(),
    departmentId : Joi.string().required(),
    createdAt : Date.now(),
    updatedAt : Date.now()
  })
  return schema.validate(employee)
}


exports.Employee = Employee
exports.validate = validateData

