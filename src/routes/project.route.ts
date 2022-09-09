import Project from "../models/project.model";
import express from "express";
import { RequestWithUser } from "interfaces/auth.interface";
import needloginMiddleware from "../middlewares/needlogin.middleware";
import validateMiddleware from "../middlewares/validate.middleware";

const ProjectRouter = express.Router();

// Have to login to use all endpoint
ProjectRouter.use(needloginMiddleware);

ProjectRouter.get("/my/all", async (req: RequestWithUser, res) => {
  try {
    const projects = await Project.find({ creator: req.user._id });
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

ProjectRouter.post("/", async (req: RequestWithUser, res) => {
  try {
    const project = new Project(req.body);
    project.creator = req.user._id;
    project.admins.push(req.user._id);

    const result = await project?.save();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

ProjectRouter.put("/:projectId", async (req: RequestWithUser, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      creator: req.user._id,
    });
    project?.$set(req.body);
    const result = await project?.save();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

ProjectRouter.delete("/:projectId", async (req: RequestWithUser, res) => {
  try {
    const result = await Project.findOneAndDelete({
      _id: req.params.projectId,
      creator: req.user._id,
    });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default ProjectRouter;
