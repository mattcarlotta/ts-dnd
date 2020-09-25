"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.state = void 0;
var uuid_1 = require("uuid");
var Task_1 = require("~components/Task");
var State = (function () {
    function State() {
        this.listeners = [];
        this.tasks = [];
    }
    State.getInstance = function () {
        return this.instance || new State();
    };
    State.prototype.addProject = function (title, description, list) {
        this.tasks.push(new Task_1.Task(uuid_1.v4(), title, description, list));
        this.updateListeners();
    };
    State.prototype.addListener = function (fn) {
        this.listeners.push(fn);
    };
    State.prototype.moveProject = function (projectId, newStatus) {
        var project = this.tasks.find(function (prj) { return prj.id === projectId; });
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    };
    State.prototype.updateListeners = function () {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(this.tasks.slice());
        }
    };
    return State;
}());
exports.state = State.getInstance();
//# sourceMappingURL=index.js.map