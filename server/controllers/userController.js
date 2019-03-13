module.exports = {
    getAllUsers: (req,res) => {
        const db = req.app.get("db");
        db.get_all_users().then(users =>{
            res.status(200).json(users)
        }).catch(err=>console.log(err));
    },
    getUser: (req,res) => {
        const {auth0_id} = req.params;
        const db = req.app.get("db");
        db.get_user().then(user =>{
            res.status(200).json(user)
        }).catch(err=>console.log(err));
    },
    updateUser:(req,res)=>{
        const db=req.app.get("db");
        const {id} = req.params;
        const {first,last,city,state,gender} = req.body;
        db.update_user([first,last,city,state,gender,id]).then(user=>{
            res.status(200).json(user)
        }).catch(err=>console.log(err.detail))
    }
}
