import { TaskContainer } from "~components/TaskContainer";
import { state } from "~components/State";
import "~styles/app.scss";

new TaskContainer("active");
state.addProject(
  "Class mismatch",
  "Need to fix the 'className' prop mismatch in SSR environments",
  "active"
);
new TaskContainer("completed");
state.addProject(
  "Adjust container sizing",
  "Need to adjust the container sizing to be flexible",
  "completed"
);
