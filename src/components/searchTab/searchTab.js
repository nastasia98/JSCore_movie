import { Space } from 'antd'
import PropTypes from 'prop-types'

import CardList from '../cardList/cardList'
import MovieSearch from '../movieSearch/movieSearch'
import Pagination from '../pagination/pagination'

function SearchTab(props) {
  const { movies, status, searchMovies, rateMovie, total, page, selectPage } = props
  return (
    <Space direction="vertical" align="center">
      <MovieSearch searchMovies={searchMovies} />
      {movies && <CardList movies={movies} status={status} rateMovie={rateMovie} />}
      {movies.length !== 0 && <Pagination total={total} page={page} selectPage={selectPage} />}
    </Space>
  )
}

SearchTab.defaultProps = {
  movies: [],
  status: '',
  total: 0,
  page: 0,
}

SearchTab.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
  total: PropTypes.number,
  page: PropTypes.number,
  searchMovies: PropTypes.func.isRequired,
  rateMovie: PropTypes.func.isRequired,
  selectPage: PropTypes.func.isRequired,
}

export default SearchTab
