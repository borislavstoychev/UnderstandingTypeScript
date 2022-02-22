//autobind decorator
export function autobind(_: any, _2: string, desctiptior: PropertyDescriptor) {
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
