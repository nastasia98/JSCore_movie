import { Col, Row } from 'antd'
import PropTypes from 'prop-types'

import Card from '../card/card'
import Loader from '../../helpers/loader'
import Error from '../../helpers/error'

import './cardList.css'

export default function CardList({ movies, loading, error, errorMessage, rateMovie }) {
  const movieCards = movies.map((movie) => (
    <Col lg={12} xs={24} key={movie.id}>
      <Card {...movie} rateMovie={rateMovie} />
    </Col>
  ))
  const toggleLoading = loading ? <Loader /> : movieCards
  const content = error ? <Error message={errorMessage} /> : toggleLoading

  return (
    <div className="list">
      <Row gutter={[16, 16]}>{content}</Row>
    </div>
  )
}

CardList.defaultProps = {
  movies: [],
  loading: true,
  error: false,
  errorMessage: null,
  rateMovie: () => {},
}

CardList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  rateMovie: PropTypes.func,
}
