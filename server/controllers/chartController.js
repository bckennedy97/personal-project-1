module.exports = {
    createChart: (req,res)=>{
        const db = req.app.get("db");
        db.create_chart().then(res=>{
            res.status(200).json(response)
        }).catch(err=>{console.log(err)})
    },
    editChart: (req,res)=>{
        const db = req.app.get("db");
        db.edit_user_chart().then(res=>{
            res.status(200).json(response)
        }).catch(err=>{console.log(err)})
    },
    deleteChart: (req,res)=>{
        const db = req.app.get("db");
        db.delete_user_chart().then(res=>{
            res.status(200).json(response)
        }).catch(err=>{console.log(err)})
    }
}