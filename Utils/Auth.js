const jwt = require('jsonwebtoken');
const {userModel} = require('../Controller/UserCreation/UserModel');
const secretKey = process.env.secretKey

module.exports.Auth = async (req, res, next) => {

    // try {

    //     const token = req.headers.authorization;

    //     const decode = jwt.verify(token, secretKey);

    //     const data = await userModel.findOne({_id:decode.username});
        
    //     if(data) {
    //         req.user = data;
    //         next();
    //     } else {
    //         res.send({
    //             status : false,
    //             message :"Authentication Error"
    //         });
    //     }       
    // } catch (error) {
    //     if(error) {
    //         res.send({
    //             status: false,
    //             msg: "Please Login To Continue"
    //         })
    //     }
    // }


    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Missing token. Please log in to continue."
            });
        }

        const decoded = jwt.verify(token, secretKey);

        const data = await userModel.findOne({ _id: decoded.username });

        if (data) {
            
            const currentTime = Math.floor(Date.now() / 1000);
            const expirationTime = decoded.exp;

            if (expirationTime - currentTime <= 60) {
                const newToken = jwt.sign({ username: decoded.username }, secretKey, { expiresIn: '1m' });
                res.setHeader('Authorization', newToken);
            }

            req.user = data;
            next();
        } else {
            res.status(401).json({
                status: false,
                message: "Authentication Error"
            });
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({
                status: false,
                message: "Token has expired. Please log in again."
            });
        } else {
            res.status(401).json({
                status: false,
                message: "Invalid token. Please log in to continue."
            });
        }
    }

}