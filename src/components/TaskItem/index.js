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
exports.TaskItem = void 0;
var BaseComponent_1 = require("~components/BaseComponent");
var TaskItem = (function (_super) {
    __extends(TaskItem, _super);
    function TaskItem(hostId, task) {
        var _this = _super.call(this, "single-task", hostId, false, task.id) || this;
        _this.task = task;
        _this.dragStart = _this.dragStart.bind(_this);
        _this.dragEnd = _this.dragEnd.bind(_this);
        _this.init();
        _this.renderContent();
        return _this;
    }
    TaskItem.prototype.init = function () {
        this.element.addEventListener("dragstart", this.dragStart);
        this.element.addEventListener("dragend", this.dragEnd);
    };
    TaskItem.prototype.dragEnd = function (event) {
        if (event && event.dataTransfer) {
            var taskEl = document.getElementById(this.task.id);
            if (taskEl)
                taskEl.classList.remove("is-dragging");
        }
    };
    TaskItem.prototype.dragStart = function (event) {
        if (event && event.dataTransfer) {
            event.dataTransfer.setData("text/plain", this.task.id);
            event.dataTransfer.effectAllowed = "move";
            var taskEl = document.getElementById(this.task.id);
            if (taskEl)
                taskEl.classList.add("is-dragging");
        }
    };
    TaskItem.prototype.renderContent = function () {
        var titleEl = this.element.querySelector("h2");
        if (titleEl)
            titleEl.textContent = this.task.title;
        var descriptionEl = this.element.querySelector("p");
        if (descriptionEl)
            descriptionEl.textContent = this.task.description;
    };
    return TaskItem;
}(BaseComponent_1.BaseComponent));
exports.TaskItem = TaskItem;
//# sourceMappingURL=index.js.map