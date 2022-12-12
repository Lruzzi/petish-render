const toDoModel = require("../models/toDo");
const user = require("../models/users");

const taskToday = async (req, res) => {
    const id = req.user.id;
    const isUser = await user.findById(id);
    if (!isUser) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    const isTask = await toDoModel.find({owner: req.user.id});
    if(!isTask) return res.status(404).json({message: "Task not found or No task today"})
    var timeNow = new Date()
    var today = timeNow.getDate();
    var notif = [];
    for(var i = 0; i < isTask.length; i++){
        var date = new Date(isTask[i].date).getDate();
        if(isTask[i].repeat === "daily"){
                notif.push(isTask[i]);
        }
        else if(isTask[i].repeat === "weekly"){
            var weekly = today - date;
            if(weekly%7 === 0){
                notif.push(isTask[i]);
            }
        }
        else if(isTask[i].repeat === "monthly"){
            var monthly = today - date;
            if((monthly%30) === 0){
                notif.push(isTask[i]);
            }
        }
        else{
            if(date === today){
                notif.push(isTask[i]);
            }
        }
    }
    if(notif.length == 0) return res.status(404).json({message: "No task today"})
    return res.status(200).json({success:true, message: "Task found", task: notif})
}

module.exports = {taskToday};