import React from 'react'
import {
  IconButton,
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
import { Delete } from '@material-ui/icons'

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
  deletable,
  clickDelete,
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
                {deletable && clickDelete && (
                  <StyledTableCell>
                    <IconButton
                      color="inherit"
                      onClick={() => clickDelete(index)}
                    >
                      <Delete />
                    </IconButton>
                  </StyledTableCell>
                )}
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
  deletable?: boolean
  clickDelete?: (index: number) => void
}

export default React.memo(DataTable)
