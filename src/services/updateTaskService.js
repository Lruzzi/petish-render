const taskModel = require('../models/toDo');

async function updateTaskSer(req, res) {
    const {id, title, notes, date, repeat } = req.body;
    var newDate = new Date(date).getTime();

    try {
        let task = await taskModel.findById(id);
        if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
        task.title = title;
        task.notes = notes;
        task.date = newDate;
        task.repeat = repeat;
        await task.save();
        return res.status(200).json({success: true, message: 'Task updated successfully', task: task});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message: 'Internal server error'});
    }
}

module.exports = { updateTaskSer };
