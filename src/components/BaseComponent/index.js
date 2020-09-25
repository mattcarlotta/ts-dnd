"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponent = void 0;
var BaseComponent = (function () {
    function BaseComponent(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateEl = document.getElementById(templateId);
        this.hostEl = document.getElementById(hostElementId);
        var importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId)
            this.element.id = newElementId;
        this.attachElement(insertAtStart);
    }
    BaseComponent.prototype.attachElement = function (insertAtStart) {
        this.hostEl.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.element);
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=index.js.map