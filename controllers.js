const user=require('./models.js')


const signin=async (req,res)=>{
    const {username,password}=req.body

    let k=user.findOne({username:username}) 

    if(k){
        res.status(400).json({message:'user already present '})
    }
    else{
        try{
            const salt= await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(password,salt) 

            const User=new user({
                   user:username,
                   password:hashedPassword
            })
            await user.save() 
            res.status(200).json({message:"succesful"})
        }
        catch(err){
            res.status(500).json({message:"server error"})
        }
    }

} 


const login= async (req,res)=>{

         const {username,password}=req.body 

         try{

                const User=await user.finOne({user:username})

                if(User){

                       let flag= await bcrypt.compare(password,User.password) 

                       if(flag){

                             const token= jwt({ id:username},"Raghav1234",{expiresIn:'24h'})

                             res.json({token})
                       }
                       else{
                        res.status(400).json({message:"invalid credentials"})
                       }
                }
         }
         catch(error){
            res.status(500).json({message:"server error"})
         }
}

const autenticate=(req,res,next)=>{
    const token=res.headers('autorization')?.split('')[1] 

    if(token){
  
         try{
            const flag=jwt.verify(token,"Raghav1234")
            res.flag=verified
            res.send(200).json({message:"sucessfull"})
            next();
         }
         catch(error){
            res.status(400).json({message:"invalid"})
         }
    }
    else{
        res.status(400).json({message:"invalid"})
    }
}

const home= (req,res)=>{
    res.send("hello welcome")
}

module.exports={login,signin,autenticate,home}