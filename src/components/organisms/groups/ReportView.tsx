import React from 'react'
import dayjs from 'dayjs'
import DipslaySlider from 'components/elements/display/DipslaySlider'
import Tab from 'components/elements/display/Tab'
import DataTable from 'components/elements/display/DataTable'

const ReportView: React.FC<ReportViewProps> = ({
  date,
  changeBackMonth,
  changeForwardkMonth,
  monthRecords,
  changeBackYear,
  changeForwardYear,
  yearRecords,
}) => {
  return (
    <Tab
      items={[
        {
          title: 'Month',
          content: (
            <>
              <DipslaySlider
                value={date.format('YYYY年M月')}
                changeBack={changeBackMonth}
                changeForward={changeForwardkMonth}
              />
              {monthRecords && (
                <DataTable
                  headers={['カテゴリ', '金額']}
                  contents={monthRecords}
                />
              )}
            </>
          ),
        },
        {
          title: 'Year',
          content: (
            <>
              <DipslaySlider
                value={date.format('YYYY年')}
                changeBack={changeBackYear}
                changeForward={changeForwardYear}
              />
              {yearRecords && (
                <DataTable
                  dense
                  headers={['年月', '支出合計']}
                  contents={yearRecords}
                />
              )}
            </>
          ),
        },
      ]}
    />
  )
}

interface ReportViewProps {
  date: dayjs.Dayjs
  changeBackMonth: () => void
  changeForwardkMonth: () => void
  monthRecords: Array<Array<string>>
  changeBackYear: () => void
  changeForwardYear: () => void
  yearRecords: Array<Array<string>>
}

export default React.memo(ReportView)
