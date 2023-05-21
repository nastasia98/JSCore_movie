import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export default function Loader() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  return <Spin indicator={antIcon} className="loader" tip="Loading" />
}
