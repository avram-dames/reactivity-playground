# Reactive Programming

**Declaratively** express the relationship between values that change over time.

Fine-Grained Reactivity consists of 3 concepts:
- Signals
- Derivations
- Effects

![Reactivity Diagram](./diagrams/Reactivity%20Diagram.png)

[source](https://frontendmasters.com/courses/reactivity-solidjs/reactivity-overview/)

---

## Implementation

### Problem Specification

Given,
```javascript
let val = 1

const foo = () val * 2

foo() // run and subscribe to changes.
```

we want `foo()` to run every time `val` updates.

### Solution

![Reactivity Implementation](./diagrams/Reactive%20System%20Implementation.png)

```js
let val = createSignal(1)

const foo = () val.read() * 2

createEffect(foo()) // runs foo() once and subscribes to changes

val.write(2) // triggers foo()
```


## Examples
- Spreadsheets
- JS
	- Signals (Fine-Grained Reactivity), 
	- Reactive Steams (RxJS)

## References
