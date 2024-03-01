import { taskDataMapper } from '../datamappers/index.js';

const taskController = {

  getAllTasks: async (req, res) => {
    const { result, error } = await taskDataMapper.getTasks(req.user.colocId);
    if (error) {
      console.log(error);
    } else {
      res.status(200).json(result);
      console.log('All tasks => ', result);
    }
  },

  createTask: async (req, res) => {
    const { result, error } = await taskDataMapper.createTask(
      req.body,
      req.params.coloc_id,
    );
    if (error) {
      console.log(error);
    } else {
      res.status(201).json(result);
      console.log('Task successfully created ! => ', result);
    }
  },

  modifyTask: async (req, res) => {
    const taskId = req.params.task_id;
    const { result, error } = await taskDataMapper.updateTask(
      req.body,
      taskId,
      req.params.coloc_id,
    );
    if (error) {
      console.log(error);
    } else {
      res.status(200).json(result);
      console.log('Task succesfully updated ! => ', result);
    }
  },

  deleteTask: async (req, res) => {
    const { result, error } = await taskDataMapper.deleteTask(
      req.params.task_id,
    );
    if (error) {
      console.log(error);
    } else {
      res.status(200).json(result);
      console.log('Task successfully deleted!');
    }
  },
};

export default taskController;
