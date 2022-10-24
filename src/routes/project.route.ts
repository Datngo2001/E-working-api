import Project from "../models/project.model";
import express from "express";
import { RequestWithUser } from "interfaces/auth.interface";
import needloginMiddleware from "../middlewares/needlogin.middleware";
import validateMiddleware from "../middlewares/validate.middleware";

const ProjectRouter = express.Router();

// Have to login to use all endpoint
ProjectRouter.use(needloginMiddleware);

ProjectRouter.get("/:id", async (req: RequestWithUser, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      $or: [{ creator: req.user.uid }, { members: req.user.uid }],
    });
    res.json(project);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

ProjectRouter.get("/:id/members", async (req: RequestWithUser, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      $or: [{ creator: req.user.uid }, { members: req.user.uid }],
    }).populate("members");
    res.json(project.members);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

ProjectRouter.get("/my/all", async (req: RequestWithUser, res) => {
  try {
    const projects = await Project.find({ creator: req.user.uid });
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

ProjectRouter.get("/my/joined", async (req: RequestWithUser, res) => {
  try {
    const projects = await Project.find({
      $or: [{ members: req.user.uid }],
    });
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

ProjectRouter.post("/", async (req: RequestWithUser, res) => {
  try {
    const project = new Project(req.body);
    project.creator = req.user.uid;
    project.members.push(req.user.uid);

    const result = await project?.save();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

ProjectRouter.put("/:projectId", async (req: RequestWithUser, res) => {
  try {
    if (req.body.members) {
      req.body.members = [...new Set(req.body.members)];
    }
    const result = await Project.findOneAndUpdate(
      {
        _id: req.params.projectId,
        creator: req.user.uid,
      },
      {
        ...req.body,
      },
      {
        new: true,
      }
    );
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

ProjectRouter.delete("/:projectId", async (req: RequestWithUser, res) => {
  try {
    const result = await Project.findOneAndDelete({
      _id: req.params.projectId,
      creator: req.user.uid,
    });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default ProjectRouter;
