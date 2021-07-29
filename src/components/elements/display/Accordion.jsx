import React from 'react'
import { AccordionDetails, AccordionSummary, makeStyles, Typography } from '@material-ui/core'
import { Accordion as AccordionMUI } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  accordion: {
    boxShadow: 'none'
  },
  accordionSummary: {
    padding: 0
  },
  accordionDetails: {
    padding: 0
  }
}))

const Accordion = ({ title, titleVariant, content }) => {
  const classes = useStyles()
  return (
    <AccordionMUI square={true} className={classes.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMore color="primary" />}
        className={classes.accordionSummary}
      >
        <Typography variant={titleVariant}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>{content}</AccordionDetails>
    </AccordionMUI>
  )
}

export default React.memo(Accordion)
