import { Col, Row } from 'antd'
import PropTypes from 'prop-types'

import Card from '../card/card'
import Loader from '../loader/loader'
import Error from '../error/error'

import './cardList.css'

export default function CardList({ movies, status, rateMovie }) {
  const movieCards = movies.map((movie) => (
    <Col lg={12} xs={24} key={movie.id}>
      <Card {...movie} rateMovie={rateMovie} />
    </Col>
  ))

  let content
  if (status === 'loading') {
    content = <Loader />
  } else if (status === 'error') {
    content = <Error />
  } else {
    content = movieCards
  }

  return (
    <div className="list">
      <Row gutter={[16, 16]}>{content}</Row>
    </div>
  )
}

CardList.defaultProps = {
  movies: [],
  status: '',
  rateMovie: () => {},
}

CardList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
  rateMovie: PropTypes.func,
}
