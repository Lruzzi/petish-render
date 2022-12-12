const toDoModel = require("../models/toDo");
const user = require("../models/users");

const { inputTaskSer } = require("../services/inputTaskService");
const { updateTaskSer } = require("../services/updateTaskService");
const { deleteTaskSer } = require("../services/deleteTaskService");
const { find } = require("../models/users");
const { taskToday } = require("../services/getTaskTodayService");

async function inputTask(req, res) {
  const result = await inputTaskSer(req, res);
  return result;
}

async function updateTask(req, res) {
  const { id } = req.body;
  const isTask = await toDoModel.findById(id);
  if (!isTask)
    return res.status(404).json({
      message: "Task not found",
    });
  if (req.user.id !== isTask.owner.toString()) {
    return res.status(404).json({
      success: false,
      message: "Not Authorized",
    });
  }
  const result = await updateTaskSer(req, res);
  return result;
}

async function deleteTask(req, res) {
  const id = req.body.id;
  const isTask = await toDoModel.findById(id);
  if (!isTask)
    return res.status(404).json({
      message: "Task not found",
    });
  if (req.user.id !== isTask.owner.toString()) {
    return res.status(404).json({
      success: false,
      message: "Not Authorized",
    });
  }
  const result = await deleteTaskSer(req, res);
  return result;
}

const getTask = async (req, res) => {
  const { id } = req.body;
  const isTask = await toDoModel.findById(id);
  if (!isTask)
    return res.status(404).json({
      message: "Task not found",
    });
  if (isTask.owner.toString() !== req.user.id) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Task found",
    task: isTask,
  });
};

const getTaskToday = async (req, res) => {
    const result = await taskToday(req, res);
    return result;
}

const getAllTask = async (req, res) => {
  try{const result = await toDoModel.find({owner: req.user.id});
  return res.status(200).json({
    success: true,
    message: "All task found",
    task: result,
  });}
  catch(err){
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};


module.exports = {
  inputTask,
  updateTask,
  deleteTask,
  getTask,
  getTaskToday,
  getAllTask,
};
