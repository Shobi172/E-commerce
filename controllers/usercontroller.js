const User = require('../models/usermodel');
const bcrypt = require('bcrypt');

const securePassword = async(password)=>{

    try {

      const passwordHash = await bcrypt.hash(password, 10);
      return passwordHash;
        
    } catch (error) {

        console.log(error.message);
        
    }
}

// User Register


const loadRegister = async(req,res)=>{
    console.log("hello");

    try {
        console.log("entered")

        res.render('registration');
        

    } catch (error) {

        console.log(error);
        
    }
}


const insertUser = async(req,res)=>{
 console.log("problem")
    try {

        const spassword = await securePassword(req.body.password);

        const user = new User({

            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            phone:req.body.phone,
            password:spassword,
            cpassword:spassword,
            is_admin:0,
        });


        const userData = await user.save();

        if (userData) {
            res.render('login',{message:"Registration successfull"});
            
        }
        else{
            res.render('registration',{message:"Registration failed"});
        }
        

    } catch (error) {

        console.log(error.message);
        
    }
}



// user login methods

const loginLoad = async(req,res)=>{

    try{

        

            res.render('login',{user:true,admin:false});    
        
       

        



    }catch(error){
        console.log(error.message);
    }
}

// verify user login


const verifyLogin = async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;


      const userData = await User.findOne({email:email});
    
    

      if (userData) {

        const passwordMatch = await bcrypt.compare (password,userData.password)

        if(passwordMatch) { 


            req.session.user_id = userData._id;
            res.render('users/home');
            console.log(req.session.user_id);


            // if(userData.is_varified === 0){
            //     res.render('login',{message:"Please verify mail"});
            // }
            // else{
            //     req.session.user_id = userData._id;
            //     res.redirect('/home');
            // }

        }
            else{

                res.redirect('/',{message:"Invalid login detials"});
                

            }

    }
    else{

        res.render('login',{message:"Invalid login detials"});

    }
}

    catch(error){
        console.log(error.message);
    }
}
    



// Home page


const loadHome = async(req,res)=>{
    try{


        if (req.session.user_id) {

            res.render('home');    
        }
        else{
            res.redirect('/');
        }

        
     
    }
    catch(error){

        console.log(error.message);

    }
}

// shop

const loadShop = async(req,res)=>{
    try{


        if (req.session.user_id) {

            res.render('users/shop',{user:true,admin:false});    
        }
        else{
            res.redirect('/');
        }

        
     
    }
    catch(error){

        console.log(error.message);

    }
}

// logout


const userLogout = async(req,res)=>{
    try {

        req.session.destroy();
        res.redirect('/');
        
    } catch (error) {
        console.log(error.message);
        
    }
}


module.exports = {

    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    loadShop,
    userLogout
}