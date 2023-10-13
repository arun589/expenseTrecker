const expensetable=require('../model/expense');
exports.addexpense=async(req,res,next)=>{

    try{
        const price=req.body.price;
        const description=req.body.description;
        const category=req.body.category;
        
        const data=await expensetable.create({price,description,category});
        res.status(201).json({newexpense:data});

    }
    catch(err){
        res.status(500).json({
            error:err
        })
    }
}
exports.getallexpense=async(req,res,next)=>{
    try{
        const data=await expensetable.findAll();
        res.status(201).json({allexpense:data})
    }
    catch(err){
        console.log("failed",err);
        res.status(500).json({
            error:err
        })
        
    }
}
exports.deleteexpense=async(req,res,next)=>{
    const id=req.params.id;
    try{
        const data= await expensetable.findByPk(id)
        await data.destroy();
    }catch(err){
        console.log(err);
        res.status(500).json({error:err})
    }
}