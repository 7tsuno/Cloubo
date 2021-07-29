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
  withStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(2)
  }
}))

const StyledTableCell = withStyles(() => ({
  head: {
    fontWeight: 'bold'
  }
}))(TableCell)

const DataTable = ({ title, titleVariant, dense, headers, contents }) => {
  const classes = useStyles()
  return (
    <>
      {title && (
        <Typography variant={titleVariant} className={classes.title}>
          {title}
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table size={dense ? 'small' : 'medium'} className={classes.table}>
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

export default React.memo(DataTable)
