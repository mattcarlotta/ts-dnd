"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TaskContainer_1 = require("~components/TaskContainer");
var _store_1 = require("~store");
require("~styles/app.scss");
new TaskContainer_1.TaskContainer("active");
_store_1.state.addProject("Class mismatch", "Need to fix the 'className' prop mismatch in SSR environments", "active");
new TaskContainer_1.TaskContainer("completed");
_store_1.state.addProject("Adjust container sizing", "Need to adjust the container sizing to be flexible", "completed");
//# sourceMappingURL=index.js.map