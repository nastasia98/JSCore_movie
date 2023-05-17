import { Space } from 'antd'
import PropTypes from 'prop-types'

import CardList from '../cardList/cardList'
import MovieSearch from '../movieSearch/movieSearch'
import Pagination from '../pagination/pagination'
import Loader from '../../helpers/loader'

function SearchTab(props) {
  const { movies, loading, error, errorMessage, searchMovies, rateMovie, total, page, selectPage } = props
  return (
    <Space direction="vertical" align="center">
      <MovieSearch searchMovies={searchMovies} />
      {movies ? (
        <CardList movies={movies} loading={loading} error={error} errorMessage={errorMessage} rateMovie={rateMovie} />
      ) : (
        <Loader />
      )}
      {movies.length && !loading ? <Pagination total={total} page={page} selectPage={selectPage} /> : null}
    </Space>
  )
}

SearchTab.defaultProps = {
  movies: [],
  loading: true,
  error: false,
  errorMessage: null,
  total: 0,
  page: 0,
}

SearchTab.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  total: PropTypes.number,
  page: PropTypes.number,
  searchMovies: PropTypes.func.isRequired,
  rateMovie: PropTypes.func.isRequired,
  selectPage: PropTypes.func.isRequired,
}

export default SearchTab
