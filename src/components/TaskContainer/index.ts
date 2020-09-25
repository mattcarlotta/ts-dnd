import { BaseComponent } from "~components/BaseComponent";
import { TaskItem } from "~components/TaskItem";
import { state } from "~store";
import { Droppable, TaskItems } from "~types";

// Task Container
export class TaskContainer
  extends BaseComponent<HTMLDivElement, HTMLElement>
  implements Droppable {
  assignedTasks: TaskItems = [];

  constructor(private type: "active" | "completed") {
    super("task-list", "container", false, `${type}-tasks`);

    this.dragLeave = this.dragLeave.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.init();
    this.renderContent();
  }

  init(): void {
    this.element.addEventListener("dragover", this.dragOver);
    this.element.addEventListener("dragleave", this.dragLeave);
    this.element.addEventListener("drop", this.onDrop);

    state.addListener((tasks: TaskItems) => {
      const filteredProjects = tasks.filter(project =>
        this.type === "active"
          ? project.status === "active"
          : project.status === "completed"
      );
      this.assignedTasks = filteredProjects;
      this.renderTasks();
    });
  }

  dragLeave(): void {
    const listEl = this.element.querySelector("ul");
    if (listEl) listEl.classList.remove("droppable");
  }

  dragOver(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault(); // allow a drop -- default is false
      const listEl = this.element.querySelector("ul");
      if (listEl) listEl.classList.add("droppable");
    }
  }

  onDrop(event: DragEvent): void {
    if (event && event.dataTransfer) {
      const projectId = event.dataTransfer.getData("text/plain");

      state.moveProject(
        projectId,
        this.type === "active" ? "active" : "completed"
      );
      this.dragLeave();
    }
  }

  renderContent(): void {
    const listId = `${this.type}-tasks-list`;
    const listEl = this.element.querySelector("ul");
    const titleEl = this.element.querySelector("h2");

    if (listEl) listEl.id = listId;
    if (titleEl) titleEl.textContent = this.type.toUpperCase().concat(" TASKS");
  }

  private renderTasks() {
    const listEl = <HTMLUListElement>(
      document.getElementById(`${this.type}-tasks-list`)
    );
    listEl.innerHTML = "";
    for (const task of this.assignedTasks) {
      const containerEl = this.element.querySelector("ul");
      if (containerEl) new TaskItem(containerEl.id, task);
    }
  }
}
