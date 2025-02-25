import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

const otpStore : Record<string, string>={};

//@ts-ignore
app.post('/generate-otp', (req, res) => {
    const email = req.body.email

    if(!email){
        return res.status(404).json({message: "Email is required"});
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp

    console.log(`OTP for ${email}: ${otp}`)
    res.status(200).json({ message: "OTP generated and logged."})
});

// @ts-ignore
app.post('/reset-password', (req, res) => {
    const {email, otp, newPassword} = req.body;
    if(!email || !otp || !newPassword ){
        return res.status(400).json({message: "Email, Otp, newPassword is required."})
    }

    if(otpStore[email]===otp){
        console.log(`Password for ${email} has been reset to: ${newPassword}`);
        delete otpStore[email];
        res.status(200).json({message: "Password has been reset successfully."})
    } else {
        res.status(401).json({ message : "Invalid Otp. "})
    }
})

app.listen(PORT, ()=> {
    console.log("the server is running on port : ", PORT)
});