module.exports = {
    createChart: (req,res)=>{
        const {user_id,valueOne,valueTwo,depression,anxiety,bipolar,schizophrenia,ptsd,q1,q2,q3,q4} = req.body;
        console.log(req.body);
        const db = req.app.get("db");
        db.create_chart([user_id,valueOne,valueTwo,depression,anxiety,bipolar,schizophrenia,ptsd,q1,q2,q3,q4]).then(newChart=>{
            res.json(newChart)
        }).catch(err=>{
            console.log(err)
            res.status(500).json(err.detail)})
    },
    getChart: (req,res)=>{
        const db = req.app.get("db");
        db.get_chart().then(chart=>{
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
    editChart: (req,res)=>{
        const db = req.app.get("db");
        db.edit_user_chart().then(updatedChart=>{
            res.status(200).json(updatedChart)
        }).catch(err=>res.status(500).json(err.detail))
    },
    deleteChart: (req,res)=>{
        const db = req.app.get("db");
        db.delete_user_chart().then(response=>{
            res.status(200).json(response)
        }).catch(err=>res.status(500).json(err.detail))
    }
}