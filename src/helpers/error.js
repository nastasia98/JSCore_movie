import { Alert } from 'antd'
import PropTypes from 'prop-types'

export default function Error({ message }) {
  return <Alert className="error" message="Error" description={message} type="error" showIcon />
}

Error.defaultProps = {
  message: '',
}

Error.propTypes = {
  message: PropTypes.string,
}
