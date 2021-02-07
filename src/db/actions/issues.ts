import Issue, { IssueModel } from "../models/Issue";
import { Types } from "mongoose";

// create new issue entry
export async function createIssue(issue: Issue) {
  const now = new Date();
  issue.createdAt = now;
  issue.updatedAt = now;
  const issueModel = await IssueModel.create(issue);
  const savedIssue = await issueModel.save();
  return savedIssue;
}

// get one issue by id
async function findIssue(id: string) {
  const issueId = Types.ObjectId(id);
  const issueModel = IssueModel.findById(issueId);
  const issue = issueModel.populate("location").populate("magazine").exec();
  return issue;
}

// update an issue
export async function updateIssue(id: string, updates: {}) {
  const updatedIssue = await IssueModel.findOneAndUpdate(
    { _id: Types.ObjectId(id) },
    { ...updates }
  );

  return updatedIssue;
}

export async function deleteIssue(id: string) {
  const issueId = Types.ObjectId(id);
  const deleted = IssueModel.findByIdAndDelete(issueId);
  return deleted;
}

const issues = {
  createIssue,
  findIssue,
  updateIssue,
  deleteIssue,
};

export default issues;
