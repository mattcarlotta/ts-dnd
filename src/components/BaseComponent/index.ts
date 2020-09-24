// Component Base
export abstract class BaseComponent<
  T extends HTMLElement,
  U extends HTMLElement
> {
  templateEl: HTMLTemplateElement;
  hostEl: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    // get template
    this.templateEl = <HTMLTemplateElement>document.getElementById(templateId);
    // get elment to host template
    this.hostEl = <T>document.getElementById(hostElementId);

    // grab template content
    const importedNode = document.importNode(this.templateEl.content, true);
    // set it to an element
    this.element = <U>importedNode.firstElementChild;
    if (newElementId) this.element.id = newElementId;

    this.attachElement(insertAtStart);
  }

  private attachElement(insertAtStart: boolean) {
    this.hostEl.insertAdjacentElement(
      insertAtStart ? "afterbegin" : "beforeend",
      this.element
    );
  }
}
