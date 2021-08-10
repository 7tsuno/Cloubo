import React from 'react'
import { Tab as TabMUI, Tabs, Box } from '@material-ui/core'

const Tab: React.FC<TabProps> = ({ items }) => {
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.ChangeEvent<unknown>, value: any) => {
    setValue(value)
  }
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        {items.map((item, index) => (
          <TabMUI key={index} label={item.title} />
        ))}
      </Tabs>
      {items.map((item, index) => (
        <div key={index} role="tabpanel" hidden={value !== index}>
          {value === index && <Box p={1}>{item.content}</Box>}
        </div>
      ))}
    </>
  )
}

export interface TabProps {
  items: Array<{
    title: string
    content: React.ReactNode
  }>
}

export default React.memo(Tab)
