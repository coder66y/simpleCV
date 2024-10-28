import style from './index.less'
export interface IHeaderProps {
  value?: string
}
export default function ContentHeader(props: IHeaderProps) {
  const { value } = props
  return (
    <div className={style['content-header']}>{value}</div>
  )
}