interface Add {
  (a: number, b: number): number;
}

let add: Add;

add = (n1, n2) => {
  return n1 + n2;
};
//with ? optional arguments!
interface Named {
  readonly name: string;
  lastName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  lastName?: string | undefined;
  age = 30;

  constructor(n: string, l?: string) {
    this.name = n;
    this.lastName = l;
  }

  greet(phrase: string) {
    if (this.lastName) {
      console.log(phrase + " " + this.name + " " + this.lastName);
    } else {
      console.log(phrase + " " + this.name);
    }
  }
}

let user1: Greetable;

user1 = new Person("Max", "Stoychev");
// user1.name = "Borcho"

user1.greet("Hi there - I am");
console.log(user1);
