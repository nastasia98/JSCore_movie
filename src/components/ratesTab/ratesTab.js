import React from 'react'
import { Space } from 'antd'
import PropTypes from 'prop-types'

import CardList from '../cardList/cardList'
import Pagination from '../pagination/pagination'

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
    const { moviesRated, status, totalRated } = this.props
    const { page } = this.state
    return (
      <Space direction="vertical" align="center">
        {moviesRated && <CardList movies={moviesRated} status={status} />}
        {moviesRated.length !== 0 && <Pagination total={totalRated} page={page} selectPage={this.onSelectPage} />}
      </Space>
    )
  }
}

RatesTab.defaultProps = {
  moviesRated: [],
  status: '',
  totalRated: 0,
}

RatesTab.propTypes = {
  moviesRated: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
  totalRated: PropTypes.number,
}

export default RatesTab
