module.exports={
    addFavorite: (req,res) => {
        const db = req.app.get("db");
        const {id} = req.params;
        const uid = req.body.uid;
        const favorite = JSON.stringify(req.body);
        db.add_to_favorites([id,uid,favorite]).then(favorites=>{
            // console.log(favorite);
            res.status(200).json(favorites)
        }).catch(err=>console.log(err))
    },
    deleteFavorite: (req,res) => {
        const db = req.app.get("db");
        const {id,uid} = req.params;
        console.log("uid",uid)
        db.delete_favorite([id,uid]).then(favorites=>{
            // console.log(favorite);
            res.status(200).json(favorites)
        }).catch(err=>console.log(err))
    },
    getFavorites: (req,res) =>{
        const db = req.app.get("db");
        const {id} = req.params;
        db.get_favorites(id).then(favorites=>{
            res.status(200).json(favorites)
        }).catch(err=>console.log(err.detail))
    }


}
