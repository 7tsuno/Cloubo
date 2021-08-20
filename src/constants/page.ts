export const PAGE = {
  input: {
    path: '/',
    name: '入力',
  },
  calender: {
    path: '/calender',
    name: 'カレンダー',
  },
  report: {
    path: '/report',
    name: 'レポート',
  },
  calculation: {
    path: '/calculation',
    name: '精算',
  },
  regularItem: {
    path: '/regularItem',
    name: '定期項目',
  },
  error: {
    path: '/error',
    name: 'エラー',
  },
} as const
export interface Page {
  path: string
  name: string
}
