const axios = require("axios");

module.exports = {
    login: (req,res)=>{
        const db = req.app.get("db");

        const payload = {
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            grant_type: "authorization_code",
            code: req.query.code,
            redirect_uri: `http://${req.headers.host}/auth`
        }

        function tradeCodeForAccessToken(){
            return axios.post(`https://${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`,payload)
        }
        function tradeAccessTokenForUserInfo(accessTokenResponse){
            const accessToken = accessTokenResponse.data.access_token;
            return axios.get(`https://${process.env.REACT_APP_AUTH_DOMAIN}/userinfo/?access_token=${accessToken}`)
        }
        function storeUserInfoInDB(userInfoResponse){
            const userData = userInfoResponse.data;
            // console.log(userData);
            db.get_user(userData.sub).then((user)=>{
                if(user.length){
                    req.session.user = user[0];
                    res.redirect("/#/home")
                }else{
                    const newUser = [userData.sub,userData.email,userData.name]
                    db.create_user(newUser).then(newUser=>{
                        req.session.user = newUser[0];
                        res.redirect("/#/home");
                    })
                }
            })

        }

        tradeCodeForAccessToken()
        .then(tradeAccessTokenForUserInfo)
        .then(storeUserInfoInDB)
        .catch(err=>(console.log(err)))

    },
    logout: (req,res,next)=>{
        req.session.destroy();
        res.status(200).json(req.session);
    
    },
    getUserData(req,res){
        res.status(200).json(req.session.user);
    }

}