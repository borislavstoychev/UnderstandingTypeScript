//autobind decorator
function autobind(_: any, _2: string, desctiptior: PropertyDescriptor) {
  const originalMethod = desctiptior.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

//Project input class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const inportedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = inportedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    this.titleInput = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionInput = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInput = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.configure();
    this.attach();
  }
  @autobind
  private submitHandler(e: Event) {
    e.preventDefault();
    console.log(this.titleInput.value);
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler); //.bind(this)
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const input = new ProjectInput();
