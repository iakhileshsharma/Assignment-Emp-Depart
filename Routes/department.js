const express = require('express');
const { Department, validate } = require('../models/departmentModel')
const router = express.Router();



router.get('/', async (req, res)=> {
    let departments = await Department.find()
     res.send(departments);
});



router.post('/', async (req, res)=> {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    console.log(req.params)
    const department = new Department({
        departmentId : req.body.departmentId,
        departmentName : req.body.departmentName,
        createdAt : Date.now(),
        updatedAt : Date.now()
    })
     await department.save();
     res.send(department);
 }); 


 
router.put('/:_id', async (req, res)=>{

    const {error} = validate(req.body)
    if(error) res.status(400).send(error.details[0].message)

    
    const department = await Department.findByIdAndUpdate(req.params._id,
         {departmentName: req.body.departmentName},
         {new : true})

    if(!department) return res.status(404).send('The department with this ID was not found')

    res.send(department);
});


router.delete('/:_id', async (req, res)=> {
    console.log(req.params);
    const department = await Department.findByIdAndDelete(req.params._id)
    if(!department) return res.status(404).send('The department  with the given ID was not found');

    
    res.send(department);
});



router.get('/:_id', async (req, res)=> {
    const department = await Department.findById(req.params._id)
    if(!department) return res.status(404).send('The department with the ID was not found');

    res.send(department); 

});




 module.exports = router