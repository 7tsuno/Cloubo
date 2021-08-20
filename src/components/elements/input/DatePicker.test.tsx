import React from 'react'
import { render, screen } from '@testing-library/react'
import dayjs from 'dayjs'
import DatePicker from './DatePicker'
import userEvent from '@testing-library/user-event'

describe('DatePicker', () => {
  test('1月2日に変更', async () => {
    const onChange = jest.fn()

    const props = {
      label: 'TestLabel',
      onChange,
      value: dayjs().year(2021).month(0).date(1),
    }

    render(<DatePicker {...props} />)
    userEvent.click(screen.getByRole('textbox'))
    userEvent.click(screen.getAllByText('2', { selector: 'p' })[0])
    userEvent.click(screen.getByText('OK'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(
      dayjs()
        .year(2021)
        .month(0)
        .date(2)
        .isSame(onChange.mock.calls[0][0], 'day')
    ).toBeTruthy()
  })
})
