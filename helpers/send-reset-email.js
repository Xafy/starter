const sendEmail = require('./send-email');

const sendPasswordResetEmail = async(email, resetToken, origin) => {
    let message;

    console.log(origin)

    if(origin) {
        const resetUrl = `${origin}/api/v1/users/reset-password?token=${resetToken}&email=${email}`;
        message = `<h1>PASSWORD RESET</h1>
                    <p> Please click the below link to reset your password </p>
                    <p><a href=${resetUrl}>${resetUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to reset your password with the <code>/api/v1/users/reset-password</code> api route:</p>
                    <p><code>${resetToken}</code></p>`;
    }

    try{
        await sendEmail({
            email: email,
            subject: "reset your password",
            html: message
        });
    } catch (err) {
        console.log(err.message);
    }
    
}

module.exports = sendPasswordResetEmail