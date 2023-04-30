
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const login = async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400).send('All Input Required');
    }

    const user = await prisma.user.findUnique({where:{email: email}});

    if(!user){
        res.status(409).send('Username or Password is Wrong');
        return;
    }

    const passwordVerification = await bcrypt.compare(password, user.password);
    if(!passwordVerification) {
        res.status(409).send('Username or Password is Wrong');
        return;
    }

    const token = jwt.sign({ userid: user._id, email}, process.env.TOKEN_KEY, {
        expiresIn: "1h"
    });

    user.token = token;
    res.status(201).json({
        name: user.name,
        email: user.email,
        token: user.token
    })

}

const register = async (req, res)=>{
    try {
        const {name, email, password } = req.body;
        if(!(name && email && password)){
            res.status(400).send('All input is required');
        }
        
        //check if user already exists
        const oldUser = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          if (oldUser) {
            return res.status(409).send('User Already Exists. Please Login');
          }


          const encryptedPassword = await bcrypt.hash(password, 3);
          const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: encryptedPassword,
                userGroup: 'user'
              }
          });
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
      
        user.token = token;
          //return user
        res.status(201).json(user);
    }
    catch(err){
        console.log(err);
    }

}
module.exports.login = login;
module.exports.register = register;
