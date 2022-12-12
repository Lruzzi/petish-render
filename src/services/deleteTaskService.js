const taskModel = require('../models/toDo');

async function deleteTaskSer(req, res) {
    const { id } = req.body;
    try {
        await taskModel.findByIdAndDelete(id);
        return res.status(200).json({success: true, message: 'Task deleted successfully'});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message: 'Internal server error'});
    }
}

module.exports = { deleteTaskSer };