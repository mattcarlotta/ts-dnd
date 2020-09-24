import { TaskStatus } from "~types";

export class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public status: TaskStatus
  ) {}
}
