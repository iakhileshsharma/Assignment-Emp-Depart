const mongoose = require('mongoose');
const Joi = require('joi');




const departmentSchema = new mongoose.Schema({
    departmentId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },


    departmentName : {
        type: String,
        required : true,
        minlength : 5,
        maxlength : 20
    },

    createdAt : {
        type: Date,
    },

    updatedAt : {
        type: Date,
    }    
        
    
})

const Department = mongoose.model('Department' , departmentSchema)




function validateData(department){
    const schema = Joi.object({
        departmentId : Joi.string().hex().length(24),
        departmentName : Joi.string().required().min(5).max(20),
        createdAt : Date.now(),
        updatedAt : Date.now()
    })
    return schema.validate(department)
}


exports.Department = Department
exports.departmentSchema = departmentSchema
exports.validate = validateData

