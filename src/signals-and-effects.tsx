import { createSignal, createEffect } from "./reactive";

const [count, setCount] = createSignal(1);

const foo = () => count() * 2;

createEffect(foo);
createEffect(foo);


// setCount(10);
