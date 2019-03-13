module.exports = {
    createChart: (req,res)=>{
        const {user_id,first,last,city,state,gender} = req.body;
        const db = req.app.get("db");
        db.create_chart([user_id,first,last,city,state,gender]).then(newChart=>{
            res.json(newChart)
        }).catch(err=>{
            console.log(err)
            res.status(500).json(err.detail)})
    },
    getChart: (req,res)=>{
        const db = req.app.get("db");
        const {id} = req.params;
        db.get_chart(id).then(chart=>{
            res.status(200).json(chart)
        }).catch(err=>{
            console.log(err)
            res.status(500).json(err.detail)})
    },
    getAllCharts: (req,res)=>{
        const db = req.app.get("db");
        db.get_user_charts().then(allCharts=>{
            res.status(200).json(allCharts)
        }).catch(err=>res.status(500).json(err.detail))
    },
    // editChart: (req,res)=>{
    //     const {user_id} = req.params;
    //     const {first,last,city,state,gender} = req.body;
    //     const db = req.app.get("db");
    //     db.edit_user_chart([user_id,first,last,city,state,gender]).then(updatedChart=>{
    //         res.status(200).json(updatedChart)
    //     }).catch(err=>res.status(500).json(err.detail))
    // },
    deleteChart: (req,res)=>{
        const {user_id} = req.params;
        const db = req.app.get("db");
        db.delete_user_chart().then(response=>{
            res.status(200).json(response)
        }).catch(err=>res.status(500).json(err.detail))
    },
    addFavorite: (req,res) => {
        const db = req.app.get("db");
        const {id} = req.params;
        const {newDoctor} = req.body;
        const doc = JSON.stringify(newDoctor)
        db.add_favorite([id,doc]).then(favorites=>{
            // console.log(favorite);
            res.status(200).json(favorites)
        }).catch(err=>console.log(err))
    }
    // deleteFavorite: (req,res) => {
    //     const db = req.app.get("db");
    //     const {id} = req.params;
    //     const {doctor} = req.body;
    //     const doc = JSON.stringify(doctor)
    //     db.delete_favorite([id,doc]).then(favorites=>{
    //         // console.log(favorite);
    //         res.status(200).json(favorites)
    //     }).catch(err=>console.log(err))
    // }
}