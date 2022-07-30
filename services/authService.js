const mongoUser = require("../models/userModel");

exports.signupUser = async (req) => {
    const { email, username } = req.body;
    let newUser = await mongoUser.findOne({ email });
    if (newUser) return "Email is not Unique";
    newUser = await mongoUser.findOne({ username });
    if (newUser) return "Username is not Unique";
    newUser = await mongoUser.create(req.body);
    return newUser;
}
exports.signinUser = async (req) => {
    const {email,password} = req.body;
    let user = await mongoUser.findOne({email}).select('password');
    if (!user) return "Incorrect Email" ;
    if (!await user.matchPasswords(password,user.password)) return "Password is not correct";
    user = await mongoUser.findById(user._id);
    return user;
}
