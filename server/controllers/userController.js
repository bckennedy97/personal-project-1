module.exports = {
    getAllUsers: (req,res) => {
        const db = req.app.get("db");
        db.get_all_users().then(users =>{
            res.status(200).json(users)
        }).catch(err=>console.log(err));
    },
    getUser: (req,res) => {
        const db = req.app.get("db");
        db.get_user().then(users =>{
            res.status(200).json(users)
        }).catch(err=>console.log(err));
    }
    
}
