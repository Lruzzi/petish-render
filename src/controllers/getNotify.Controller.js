const { connect } = require('mongoose');
const task = require('../models/toDo');

const getNotify = async (req, res) => {
    const isTask = await task.find({owner: req.user.id});
    if(!isTask) return res.status(404).json({message: "Task not found"})
    var timeNow = new Date()
    var onlyTime = timeNow.getHours() + ":" + timeNow.getMinutes();
    var today = timeNow.getDate();
    var notif = [];
    for(var i = 0; i < isTask.length; i++){
        var date = new Date(isTask[i].date).getDate();
        var time = new Date(isTask[i].date).getHours() + ":" + new Date(isTask[i].date).getMinutes();
        if(isTask[i].repeat === "daily"){
            if(time === onlyTime){
                notif.push(isTask[i]);
            }
        }
        else if(isTask[i].repeat === "weekly"){
            var weekly = today - date;
            if((weekly%7)===0 && time === onlyTime){
                notif.push(isTask[i]);
            }
        }
        else if(isTask[i].repeat === "monthly"){
            var monthly = today - date;
            if((monthly%30) === 0 && time === onlyTime){
                notif.push(isTask[i]);
            }
        }
        else{
            if(date === today && time === onlyTime){
                notif.push(isTask[i]);
            }
        }
    }
    if(notif.length == 0) return res.status(404).json({message: "No task today"})
    return res.status(200).json({success:true, message: "Task found", task: notif})
}

module.exports = {getNotify};
