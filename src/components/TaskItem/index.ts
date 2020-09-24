import { Task } from "~components/Task";
import { BaseComponent } from "~components/BaseComponent";
import { Draggable } from "~types";

export class TaskItem
  extends BaseComponent<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private task: Task;

  constructor(hostId: string, task: Task) {
    super("single-task", hostId, false, task.id);
    this.task = task;

    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.configure();
    this.renderContent();
  }

  configure(): void {
    this.element.addEventListener("dragstart", this.dragStart);
    this.element.addEventListener("dragend", this.dragEnd);
  }

  dragEnd(event: DragEvent): void {
    if (event && event.dataTransfer) {
      const taskEl = document.getElementById(this.task.id);
      if (taskEl) taskEl.classList.remove("is-dragging");
    }
  }

  dragStart(event: DragEvent): void {
    if (event && event.dataTransfer) {
      event.dataTransfer.setData("text/plain", this.task.id);
      event.dataTransfer.effectAllowed = "move";
      const taskEl = document.getElementById(this.task.id);
      if (taskEl) taskEl.classList.add("is-dragging");
    }
  }

  renderContent(): void {
    const titleEl = this.element.querySelector("h2");
    if (titleEl) titleEl.textContent = this.task.title;
    const descriptionEl = this.element.querySelector("p");
    if (descriptionEl) descriptionEl.textContent = this.task.description;
  }
}
