import React from 'react'
import { Space } from 'antd'
import PropTypes from 'prop-types'

import CardList from '../cardList/cardList'
import Pagination from '../pagination/pagination'
import Loader from '../../helpers/loader'

class RatesTab extends React.Component {
  constructor() {
    super()
    this.state = {
      page: 1,
    }
  }

  componentDidMount() {
    const { showRateMovies } = this.props
    const { page } = this.state
    showRateMovies(page)
  }

  onSelectPage = (pageNum) => {
    const { showRateMovies } = this.props
    this.setState({ page: pageNum })
    showRateMovies(pageNum)
  }

  render() {
    const { moviesRated, loading, error, errorMessage, totalRated } = this.props
    const { page } = this.state
    return (
      <Space direction="vertical" align="center">
        {moviesRated ? (
          <CardList movies={moviesRated} loading={loading} error={error} errorMessage={errorMessage} />
        ) : (
          <Loader />
        )}
        {moviesRated.length && !loading ? (
          <Pagination total={totalRated} page={page} selectPage={this.onSelectPage} />
        ) : null}
      </Space>
    )
  }
}

RatesTab.defaultProps = {
  moviesRated: [],
  loading: true,
  error: false,
  errorMessage: null,
  totalRated: 0,
}

RatesTab.propTypes = {
  moviesRated: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  totalRated: PropTypes.number,
}

export default RatesTab
