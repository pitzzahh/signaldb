import React, { useMemo, useState } from 'react'
import type { Collection } from '@signaldb/core'
import styled from 'styled-components'
import UnstyledCollectionList from '../components/CollectionList'
import Table from '../components/Table'
import dataStore from '../models/dataStore'
import useCollectionQueries from '../utils/useCollectionQueries'

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: 'list items';
  grid-template-columns: 200px 1fr;
  overflow: hidden;
  height: 100%;
`
const CollectionList = styled(UnstyledCollectionList)`
  grid-area: list;
`
const Items = styled(Table)`
  grid-area: items;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
`

const Queries: React.FC = () => {
  const [collectionName, setCollectionName] = useState<string>()
  const collectionsItem = dataStore.useItem('collections')
  const collection = useMemo(
    () => collectionsItem?.items.find(c => c.name === collectionName) as Collection<any>,
    [collectionsItem, collectionName],
  )
  const items = useCollectionQueries(collectionName || '')
  const queries = useMemo(() => items.map(item => ({
    id: item.id,
    count: item.count.toString(),
    selector: JSON.stringify(item.selector, null, 2),
    options: JSON.stringify(item.options, null, 2),
    lastTime: item.lastTime.toLocaleString(),
  })), [items])

  return (
    <Wrapper>
      <CollectionList
        value={collectionName}
        onChange={name => setCollectionName(name)}
      />
      {collection
        ? (
          <Items
            items={queries}
            columns={[{
              name: 'lastTime',
              label: 'Last Exec',
            }, {
              name: 'count',
              label: 'Count',
            }, {
              name: 'selector',
              label: 'Selector',
            }, {
              name: 'options',
              label: 'Options',
            }]}
          />
        )
        : (
          <Items
            items={[]}
            columns={[]}
            placeholder="Select a collection on the left"
          />
        )}
    </Wrapper>
  )
}

export default Queries
