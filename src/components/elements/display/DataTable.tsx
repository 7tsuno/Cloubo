import React from 'react'
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from '@material-ui/core'
import { Variant } from '@material-ui/core/styles/createTypography'

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(2),
  },
}))

const StyledTableCell = withStyles(() => ({
  head: {
    fontWeight: 'bold',
  },
}))(TableCell)

const DataTable: React.FC<DataTableProps> = ({
  title,
  titleVariant,
  dense,
  headers,
  contents,
}) => {
  const classes = useStyles()
  return (
    <>
      {title && (
        <Typography variant={titleVariant} className={classes.title}>
          {title}
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table size={dense ? 'small' : 'medium'}>
          {headers && (
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <StyledTableCell key={index}>{header}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {contents.map((record, index) => (
              <TableRow key={index}>
                {record.map((value, valueIndex) => (
                  <StyledTableCell key={valueIndex}>{value}</StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export interface DataTableProps {
  title?: string
  titleVariant?: 'inherit' | Variant
  dense?: boolean
  headers?: Array<React.ReactNode>
  contents: Array<Array<string>>
}

export default React.memo(DataTable)
