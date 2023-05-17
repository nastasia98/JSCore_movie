import { Pagination as Pagi } from 'antd'
import PropTypes from 'prop-types'

function Pagination({ total, page, selectPage }) {
  return (
    <Pagi
      className="pagination"
      pageSize={20}
      current={page}
      onChange={selectPage}
      total={total}
      showSizeChanger={false}
    />
  )
}

Pagination.defaultProps = {
  total: 0,
  page: 0,
}

Pagination.propTypes = {
  total: PropTypes.number,
  page: PropTypes.number,
  selectPage: PropTypes.func.isRequired,
}

export default Pagination
