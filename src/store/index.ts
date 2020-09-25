import { v4 as uuidv4 } from "uuid";
import { Task } from "~components/Task";
import { Listener, TaskItems, TaskStatus } from "~types";

class State {
  protected listeners: Listener[] = [];
  private tasks: TaskItems = [];
  private static instance: State;

  static getInstance() {
    return this.instance || new State();
  }

  addProject(title: string, description: string, list: TaskStatus): void {
    this.tasks.push(new Task(uuidv4(), title, description, list));
    this.updateListeners();
  }

  addListener(fn: Listener) {
    this.listeners.push(fn);
  }

  moveProject(projectId: string, newStatus: TaskStatus) {
    const project = this.tasks.find(prj => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listener of this.listeners) {
      listener(this.tasks.slice());
    }
  }
}

export const state = State.getInstance();
