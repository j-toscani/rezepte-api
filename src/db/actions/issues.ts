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
  const issue = IssueModel.findById(issueId);
  return issue;
}

// change location of an issue

const issues = {
  createIssue,
  findIssue,
};

export default issues;
