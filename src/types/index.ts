import { Task } from "~components/Task";

export type TaskItems = Task[];

export type Listener = (items: TaskItems) => void;

export type TaskStatus = "active" | "completed";

export interface Draggable {
  dragStart(event: DragEvent): void;
  // dragEnd(event: DragEvent): void;
}

export interface Droppable {
  dragOver(event: DragEvent): void;
  onDrop(event: DragEvent): void;
  dragLeave(event: DragEvent): void;
}
