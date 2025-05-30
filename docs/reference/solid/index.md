---
head:
- - link
  - rel: canonical
    href: https://signaldb.js.org/reference/solid/
- - meta
  - name: og:type
    content: article
- - meta
  - name: og:url
    content: https://signaldb.js.org/reference/solid/
- - meta
  - name: og:title
    content: '@signaldb/solid - SignalDB Reactivity Adapter for Solid.js'
- - meta
  - name: og:description
    content: Discover how to integrate Solid.js with SignalDB using the reactivity adapter for seamless reactive database integration.
- - meta
  - name: description
    content: Discover how to integrate Solid.js with SignalDB using the reactivity adapter for seamless reactive database integration.
- - meta
  - name: keywords
    content: SignalDB, Solid-js, reactivity adapter, real-time data, JavaScript, TypeScript, reactive primitives, integration guide, collection setup, automatic cleanup
---
# @signaldb/solid

## solidReactivityAdapter (`default`)

```js
import { Collection } from '@signaldb/core'
import solidReactivityAdapter from '@signaldb/solid'
import { createEffect } from 'solid-js'

const posts = new Collection({
  reactivity: solidReactivityAdapter,
})

createEffect(() => {
  console.log(posts.find({ author: 'John' }).count())
})
```


Reactivity adapter for usage with [solid.js](https://www.solidjs.com/docs/latest).

The API of solid-js doesn't allow [reactive scope checking](/reactivity/#reactivity-libraries).
You must manually disable reactivity when making calls outside a reactive scope to avoid memory leaks. You can do this by passing `{ reactive: false }` to your options (e.g. `<collection>.find({ ... }, { reactive: false })`).

Solid-js's integration with SignalDB leverages the power of Solid's reactive primitives to seamlessly connect with SignalDB's reactive local JavaScript database. Solid-js, known for its granular reactivity and efficient data management, provides a robust foundation for SignalDB to build upon. When using Solid-js, developers can effortlessly create and manage signals, which are core reactive primitives. These signals can then be integrated with SignalDB, allowing for real-time data updates and synchronization. This synergy between Solid-js and SignalDB ensures that developers can harness the full potential of both technologies, resulting in a more dynamic and responsive application. By utilizing Solid-js's automatic dependency tracking and SignalDB's MongoDB-like interface, developers can achieve a seamless flow of data, enhancing the overall user experience. In essence, the integration of Solid-js with SignalDB represents the convergence of two powerful technologies, offering developers a streamlined approach to building reactive applications.
