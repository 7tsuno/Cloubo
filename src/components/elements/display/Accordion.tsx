import React from 'react'
import {
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { Accordion as AccordionMUI } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { Variant } from '@material-ui/core/styles/createTypography'

const useStyles = makeStyles(() => ({
  accordion: {
    boxShadow: 'none',
  },
  accordionSummary: {
    padding: 0,
  },
  accordionDetails: {
    padding: 0,
  },
}))

const Accordion: React.FC<AccordionProps> = ({
  title,
  titleVariant,
  content,
}) => {
  const classes = useStyles()
  return (
    <AccordionMUI square={true} className={classes.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMore color="primary" />}
        className={classes.accordionSummary}
      >
        <Typography variant={titleVariant}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {content}
      </AccordionDetails>
    </AccordionMUI>
  )
}

interface AccordionProps {
  title: string
  titleVariant?: 'inherit' | Variant
  content: React.ReactNode
}

export default React.memo(Accordion)
