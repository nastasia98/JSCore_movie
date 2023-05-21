import { Alert } from 'antd'

export default function Error() {
  return <Alert className="error" message="Error" description="Произошла ошибка" type="error" showIcon />
}
