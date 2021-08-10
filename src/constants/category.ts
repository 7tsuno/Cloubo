export const CATEGORY = [
  '食費',
  '光熱費',
  '日用品',
  '家賃',
  '医療費',
  '財形',
  'その他',
] as const

export type Category = typeof CATEGORY[number]

export const isCategory = (param: unknown): param is Category => {
  return (
    typeof param === 'string' &&
    ['食費', '光熱費', '日用品', '家賃', '医療費', '財形', 'その他'].includes(
      param
    )
  )
}
export const initialCategory: Category = '食費'
