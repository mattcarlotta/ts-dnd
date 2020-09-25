"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskContainer = void 0;
var BaseComponent_1 = require("~components/BaseComponent");
var TaskItem_1 = require("~components/TaskItem");
var _store_1 = require("~store");
var TaskContainer = (function (_super) {
    __extends(TaskContainer, _super);
    function TaskContainer(type) {
        var _this = _super.call(this, "task-list", "container", false, type + "-tasks") || this;
        _this.type = type;
        _this.assignedTasks = [];
        _this.dragLeave = _this.dragLeave.bind(_this);
        _this.dragOver = _this.dragOver.bind(_this);
        _this.onDrop = _this.onDrop.bind(_this);
        _this.init();
        _this.renderContent();
        return _this;
    }
    TaskContainer.prototype.init = function () {
        var _this = this;
        this.element.addEventListener("dragover", this.dragOver);
        this.element.addEventListener("dragleave", this.dragLeave);
        this.element.addEventListener("drop", this.onDrop);
        _store_1.state.addListener(function (tasks) {
            var filteredProjects = tasks.filter(function (project) {
                return _this.type === "active"
                    ? project.status === "active"
                    : project.status === "completed";
            });
            _this.assignedTasks = filteredProjects;
            _this.renderTasks();
        });
    };
    TaskContainer.prototype.dragLeave = function () {
        var listEl = this.element.querySelector("ul");
        if (listEl)
            listEl.classList.remove("droppable");
    };
    TaskContainer.prototype.dragOver = function (event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            var listEl = this.element.querySelector("ul");
            if (listEl)
                listEl.classList.add("droppable");
        }
    };
    TaskContainer.prototype.onDrop = function (event) {
        if (event && event.dataTransfer) {
            var projectId = event.dataTransfer.getData("text/plain");
            _store_1.state.moveProject(projectId, this.type === "active" ? "active" : "completed");
            this.dragLeave();
        }
    };
    TaskContainer.prototype.renderContent = function () {
        var listId = this.type + "-tasks-list";
        var listEl = this.element.querySelector("ul");
        var titleEl = this.element.querySelector("h2");
        if (listEl)
            listEl.id = listId;
        if (titleEl)
            titleEl.textContent = this.type.toUpperCase().concat(" TASKS");
    };
    TaskContainer.prototype.renderTasks = function () {
        var listEl = (document.getElementById(this.type + "-tasks-list"));
        listEl.innerHTML = "";
        for (var _i = 0, _a = this.assignedTasks; _i < _a.length; _i++) {
            var task = _a[_i];
            var containerEl = this.element.querySelector("ul");
            if (containerEl)
                new TaskItem_1.TaskItem(containerEl.id, task);
        }
    };
    return TaskContainer;
}(BaseComponent_1.BaseComponent));
exports.TaskContainer = TaskContainer;
//# sourceMappingURL=index.js.map