import DataTable from 'components/elements/display/DataTable'
import React from 'react'
import RegularItemRegisterModal from 'containers/organisms/groups/RegularItemRegisterModal'
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  titleLine: {
    display: 'flex',
  },
  title: {
    marginTop: theme.spacing(1.5),
  },
}))

const RegularItemList: React.FC<RegularItemListProps> = ({
  regularItems,
  clickDelete,
}) => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.titleLine}>
        <div className={classes.title}>
          <Typography color="inherit">定期項目リスト</Typography>
        </div>
        <RegularItemRegisterModal />
      </div>

      <DataTable contents={regularItems} deletable clickDelete={clickDelete} />
    </>
  )
}

interface RegularItemListProps {
  regularItems: Array<Array<string>>
  clickDelete: (index: number) => void
}

export default React.memo(RegularItemList)
