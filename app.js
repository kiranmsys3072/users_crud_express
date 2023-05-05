
const express=require('express');
const mongoose=require('mongoose')
const app=express()
//db connection
require('./connection')
//userSchmamodel
const userModel=require('./models/user')

//body parser middleware
app.use(express.json())
//get all users
app.get('/users',(req,res)=>{

    userModel.find({deleted: {$ne:true}}).then((users)=>{
        if(users.length>=1){
            res.status(200).json({
                succes:true,
                payload:users
            })


        }else{
            res.status(401).json({
                succes:false,
                msg:"users not found"
            })

        }
    }).catch(err=>{
        res.status(500).json({
            succes:false,
            msg:err
        })
    })
   
})

//createUsers
app.post('/user',(req,res)=>{
         const data=req.body
  //console.log(data)
    const newUser=new userModel(data)
    newUser.save().then((user)=>{
        res.json({
            success:true,
            msg:"user created successfully",
            payload:user
        })
    }).catch((err)=>{
        res.status(500).json({
            success:false,
            msg:err.message
        })
    })

})

//getuserbyname
app.get('/user/:name',async(req,res)=>{
    try{
        const name=req.params.name
        const user=await userModel.find({name:name})
       if(user.length>=1){
        res.json({
                    succes:true,
                     payload:user
                 })

       }
        return  res.json({
            succes:false,
             msg:"user not found"
         })
       

    }
  catch(err){
    res.status(500).json({
        succes:false,
        msg:err.message
     })
  }

  

})

//update

app.put('/user/:userid',(req,res)=>{
    const userid=req.params.userid
    const data=req.body

    userModel.find({_id:new mongoose.Types.ObjectId(userid)}).then((user)=>{
        if(user.length>= 1){
                userModel.updateOne({_id:new mongoose.Types.ObjectId(userid)},data,(err,data)=>{
                    if(err){
                        res.status(404).json({
                            succes:false,
                            msg:err
                        })
                    }else{
                        res.status(200).json({
                            succes:true,
                            msg:"user updated successfully",
                            payload:data
                        })
                    }
                })

            


        }else{
            res.status(404).json({
                succes:false,
                msg:"user not found"
            })

        }

    }).catch(err=>{
        res.status(500).json({
            succes:false,
            msg:err.message
        })
    })

})


app.delete('/user/:userid',(req,res)=>{
    const userid=req.params.userid
    const data={deleted:true}

    userModel.find({_id:new mongoose.Types.ObjectId(userid)}).then((user)=>{
        if(user.length>= 1){
                userModel.updateOne({_id:new mongoose.Types.ObjectId(userid)},data,(err,data)=>{
                    if(err){
                        res.status(404).json({
                            succes:false,
                            msg:err
                        })
                    }else{
                        res.status(200).json({
                            succes:true,
                            msg:"user deleted successfully",
                            payload:data
                        })
                    }
                })

            


        }else{
            res.status(404).json({
                succes:false,
                msg:"user not found"
            })

        }

    }).catch(err=>{
        res.status(500).json({
            succes:false,
            msg:err.message
        })
    })

})


app.listen(3030,()=>{
    console.log(`server running on port 3030`)
})