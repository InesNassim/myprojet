import { NextResponse } from "next/server";
import  connectMongoDB  from "../../lib/mongodb";
import bcrypt from 'bcryptjs';
import User from "../../models/user";
export async function POST(req) {
    try{
        const{ firstName,lastName,email,password} = await req.json(); 
        //console.log("hello from backend",firstName)
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await connectMongoDB();
        
       // await user.create({FirstName:firstName , LastName:lastName ,email ,password :hashedPassword});
          
       const newUser=new User({FirstName:firstName,LastName:lastName,email,password:hashedPassword})
       //console.log(newUser)
       await newUser.save()
      return NextResponse.json({message:"user count."},{status:201});
    }catch (error) {
      console.log(error.message)
    return NextResponse.json({message:"an error occurred while registering the user."},
    {status:500}
    );
}
};
/*API*/
