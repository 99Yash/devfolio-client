import { connectDB } from '@/lib/utils/connect';
import ProjectModel from '@/models/project.model';
import UserModel, { UserDoc } from '@/models/user.model';
import { getAuth } from '@clerk/nextjs/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { userId } = getAuth(req);
      if (!userId) return res.status(401).send('You are unauthorized');
      await connectDB();
      const userToUpdate: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });
      if (!userToUpdate) return res.status(404).send("User doesn't exist");
      const { project } = req.body;
      const techStackArr = project.techStack
        .split(',')
        .map((t: string) => t.trim());
      const createdProject = await ProjectModel.create({
        ...project,
        techStack: techStackArr,
        clerkUserId: userId,
      });
      if (!userToUpdate.projects) {
        userToUpdate.projects = [];
      }
      userToUpdate.projects?.push(createdProject);
      await userToUpdate.save();
      return res.status(201).send('Project added');
    } catch (err: any) {
      console.error(err);
    }
  } else if (req.method === 'GET') {
    try {
      const { userId } = getAuth(req);
      if (!userId) return res.status(401).send('You are unauthorized');
      await connectDB();
      const projectUser: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });
      if (!projectUser) return res.status(404).send("User doesn't exist");
      const projectsArr = await ProjectModel.find({
        clerkUserId: userId,
      });
      return res.status(200).send({ projects: projectsArr });
    } catch (err: any) {
      console.error(err);
    }
  }
}