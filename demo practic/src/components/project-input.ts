import { autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";
import { Validatable, validate } from "../util/validators";
import { Component } from "./base-component";

//Project input class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  // templateElement: HTMLTemplateElement;
  // hostElement: HTMLDivElement;
  // element: HTMLFormElement;
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInput = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionInput = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInput = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
  //base class require
  renderContent() {}

  private getUserInput(): [string, string, number] | undefined {
    const title = this.titleInput.value;
    const description = this.descriptionInput.value;
    const people = this.peopleInput.value;

    const titleValidatable: Validatable = {
      value: title,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: description,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +people,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid input!");
      return;
    }
    return [title, description, +people];
  }
  @autobind
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.getUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
    }
    this.element.reset();
  }
}
