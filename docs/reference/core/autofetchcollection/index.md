---
head:
- - link
  - rel: canonical
    href: https://signaldb.js.org/reference/core/autofetchcollection/
- - meta
  - name: og:type
    content: article
- - meta
  - name: og:url
    content: https://signaldb.js.org/reference/core/autofetchcollection/
- - meta
  - name: og:title
    content: AutoFetchCollection | SignalDB
- - meta
  - name: og:description
    content: Learn about the AutoFetchCollection in SignalDB, enabling reactive and on-demand data fetching with customizable options like purge delay and persistence adapters.
- - meta
  - name: description
    content: Learn about the AutoFetchCollection in SignalDB, enabling reactive and on-demand data fetching with customizable options like purge delay and persistence adapters.
- - meta
  - name: keywords
    content: SignalDB, AutoFetchCollection, reactive data fetching, query-based fetching, data persistence, JavaScript, TypeScript, local-first database, loading state management, on-demand data loading, persistence adapters
---
# AutoFetchCollection

```ts
import { AutoFetchCollection } from '@signaldb/core'
```

The `AutoFetchCollection` class automatically fetches data from a async source when the collection is accessed. This is useful if you want to fetch specific data on demand rather than pulling the whole dataset at app start.

The concept of the `AutoFetchCollection` is, that it calls the `fetchQueryItems` method everytime a query is executed on the collection. This way, you can fetch only the data that is needed for the query. The first time the query is executed, the query will return a empty dataset (if the data is not already fetched). After the data is fetched, the query will reactively update and return the loaded data.
While the data is fetched, the you can observe the loading state with the `isLoading` function on the collection to show a loading indicator. The `ìsLoading` function will be updated reactively.

The usage of the `AutoFetchCollection` is also really simple:

```js
const Todos = new AutoFetchCollection({
  fetchQueryItems: async (selector) => {
    // The fetchQueryItems method is for fetching data from the remote service.
    // The selector parameter is the query that is executed on the collection.
    // Use this to fetch only the data that is needed for the query.
    // Also make sure that the returned data matches the query to avoid inconsistencies

    // You can return the data directly
    // return { items: [...] }

    // Or you can return only the changes
    // return { changes: { added: [...], modified: [...], removed: [...] } }
  },

  // optional, specifie the delay in milliseconds after which the data will be
  // purged from the collection after the query is not used anymore
  // default is 10 seconds
  purgeDelay: 1000 * 10,

  push: async (changes, items) => {
    // The push method is called when the local data has changed
    // As the first parameter you get the changes in the format { added: [...], modified: [...], removed: [...] }
    // As the second parameter you also get all items in the collection, if you need them
    // in the push method, no return value is expected
  },

  // You can also optionally specify a persistence adapter
  // If a persistence adapter is used, the data is loaded first and will be updated after the server data is fetched
  // If the data will be updated, the data will be saved to the persistence adapter and pushed to the server simultaneously
  persistence: createLocalStorageAdapter('todos'),

  // Optionally you can also specify a mergeItems function to merge items
  // if they're returned by multiple fetchQueryItems calls.
  mergeItems: (itemA, itemB) => ({ ...itemA, ...itemB }),
})

// You can also observe the loading state of the collection.
const loading = Todos.isLoading()

// The isLoading method takes an optional selector parameter to observe the loading state of a specific query
const postsFromMaxLoading = Todos.isLoading({ author: 'Max' })

// It's also possible to register and unregister queries manuallly
Todos.registerQuery({ author: 'Max' })
Todos.unregisterQuery({ author: 'Max' })
```
