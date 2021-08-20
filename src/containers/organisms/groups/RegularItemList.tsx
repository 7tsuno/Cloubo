import { useAppDispatch, useAppSelector } from 'app/hooks'
import RegularItemList from 'components/organisms/groups/RegularItemList'
import React, { useCallback, useMemo } from 'react'
import { deleteRegularItem, selectRegularItems } from 'stores/regularItems'

const RegularItemListContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const { regularItems } = useAppSelector(selectRegularItems)

  const regularItemsLine = useMemo(() => {
    return regularItems.map((regularItem) => [
      regularItem.title,
      regularItem.targetDay ? `${regularItem.targetDay}日` : '-',
    ])
  }, [regularItems])

  const clickDelete = useCallback(
    (index) => {
      dispatch(deleteRegularItem(index))
    },
    [regularItems]
  )

  const props = {
    regularItems: regularItemsLine,
    clickDelete,
  }

  return <RegularItemList {...props} />
}

export default RegularItemListContainer
