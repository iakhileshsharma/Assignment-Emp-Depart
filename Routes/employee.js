const express = require('express');
const {Employee, validate} = require('../models/employeeModel');
const router = express.Router();




router.get('/', async(req, res)=>{
    let employees = await Employee.find()
    res.send(employees);
});



router.post('/', async(req, res)=>{
    
    const {error} = validate(req.body)
    if(error) res.status(400).send(error.details[0].message)
    const employee = new Employee({
         firstName : req.body.firstName,
         lastName : req.body.lastName,
         email : req.body.email,
         departmentId : req.body.departmentId,
         createdAt : Date.now(),
         updatedAt : Date.now()
})
    await employee.save();    
    res.send(employee);
});




router.put('/:_id', async (req, res)=>{

    const {error} = validate(req.body)
    if(error) res.status(400).send(error.details[0].message)

    
    const employee = await Employee.findByIdAndUpdate(req.params._id,
         {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email},
         {new : true})

    if(!employee) return res.status(404).send('The employee with this ID was not found')

    res.send(employee);
});




router.delete('/:_id', async (req, res)=> {
    
    const employee = await Employee.findByIdAndDelete(req.params._id)

    if(!employee) return res.status(404).send('The employee  with the given ID was not found');

    
    res.send(employee);
});

 



router.get('/:_id', async (req, res)=> {
    const employee = await Employee.findById(req.params._id)
    if(!employee) return res.status(404).send('The employee with the ID was not found');

    res.send(employee);

});




module.exports = router