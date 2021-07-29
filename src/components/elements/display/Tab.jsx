import React from 'react'
import { Tab as TabMUI, Tabs, Box } from '@material-ui/core'

const Tab = ({ items }) => {
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
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

export default React.memo(Tab)
