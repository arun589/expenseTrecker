const expensetable=require('../model/expense');
exports.addexpense=async(req,res,next)=>{

    try{
        const price=req.body.price;
        const description=req.body.description;
        const category=req.body.category;
        
        const data=await expensetable.create({price,description,category,userId:req.user.id});
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
        const data=await expensetable.findAll({where:{userId:req.user.id}});
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
        expensetable.destroy({where:{id,userId:req.user.id}})
        .then(noofrows=>{
            if(noofrows===0){
                return res.status(404).json({success:false,message:"expense does not belongs to you"});
            }
            return res.status(200).json({success:true,message:"Deleted successfully"});
        })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err})
    })
}