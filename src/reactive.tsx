let context = []; 

export function untrack(fn) {
  const prevContext = context;
  context = [];
  const res = fn();
  context = prevContext;
  return res;
}

function cleanup(observer) {
  console.log("cleanup")
  for (const dep of observer.dependencies) {
    dep.delete(observer);
  }

  observer.dependencies.clear();
}

function subscribe(observer, subscriptions) {
  console.log("subscribe start", observer, subscriptions)
  subscriptions.add(observer);
  observer.dependencies.add(subscriptions);
  console.log("subscribe end", observer, subscriptions)
}

export function createSignal(value) {
  console.log("createSignal")
  const subscriptions = new Set();

  const read = () => {
    console.log("read")
    const observer = context[context.length - 1];
    if (observer) subscribe(observer, subscriptions);
    return value;
  };

  const write = (newValue) => {
    console.log("write")
    value = newValue;
    for (const observer of [...subscriptions]) {
      observer.execute();
    }
  };

  return [read, write];
}

export function createEffect(fn) {
  console.log("createEffect")
  const effect = {
    execute() {
      console.log("execute")
      cleanup(effect);
      context.push(effect);
      fn();
      context.pop();
    },
    dependencies: new Set(),
  };

  effect.execute();
}

export function createMemo(fn) {
  const [signal, setSignal] = createSignal();
  createEffect(() => setSignal(fn()));
  return signal;
}
