const taskModel = require('../models/toDo');

async function inputTaskSer(req, res) {
    const {title, notes, date, repeat } = req.body;
    var newDate = new Date(date).getTime();

    const task = new taskModel({owner: req.user.id, title: title, notes: notes, date: newDate, repeat: repeat});
    try {
        await task.save();
        return res.status(200).json({success: true, message: 'Task added successfully', task: task});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message: 'Internal server error'});
    }
};

module.exports = { inputTaskSer };