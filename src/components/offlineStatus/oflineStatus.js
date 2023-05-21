import { message } from 'antd'
import { useEffect } from 'react'
import { Detector } from 'react-detect-offline'
import PropTypes from 'prop-types'

function StatusMessage({ status }) {
  const [messageApi, contextHolder] = message.useMessage()

  const success = {
    type: 'success',
    content: 'Соеденение установлено',
  }

  const error = {
    type: 'error',
    content: 'Соединение прервано',
  }

  const reply = status ? success : error

  useEffect(() => {
    messageApi.open(reply)
  }, [status])

  return <> {contextHolder} </>
}

function ConnectionStatus() {
  return <Detector render={({ online }) => <StatusMessage status={online} />} />
}

StatusMessage.defaultProps = {
  status: null,
}

StatusMessage.propTypes = {
  status: PropTypes.bool,
}

export default ConnectionStatus
