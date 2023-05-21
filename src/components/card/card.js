import { Tag, Typography, Rate } from 'antd'
import { format } from 'date-fns'
import PropTypes from 'prop-types'

import cutText from '../../services/cutText'
import noPost from '../../image/no_image.jpg'
import { GenreConsumer } from '../../services/genreContext'
import Progress from '../progress/progress'

import './card.css'

const { Title } = Typography

function Card(props) {
  const { id, title, imgUrl, description, genre, vote, date, rateMovie, rateValue } = props

  let formatDate
  if (date) {
    formatDate = format(new Date(date), 'MMMM d, yyyy')
  } else {
    formatDate = 'unknown date of release'
  }

  let voteColor = ''
  if (vote < 3) {
    voteColor = '#E90000'
  } else if (vote >= 3 && vote <= 5) {
    voteColor = '#E97E00'
  } else if (vote > 5 && vote <= 7) {
    voteColor = '#E9D100'
  } else {
    voteColor = '#66E900'
  }

  let srcImg = ''
  if (imgUrl) {
    srcImg = `https://image.tmdb.org/t/p/w500${imgUrl}`
  } else {
    srcImg = noPost
  }

  return (
    <div className="card">
      <img className="image" src={srcImg} alt="example" />
      <div className="info">
        <header className="header">
          <Title className="title" level={5}>
            {title}
          </Title>
          <Progress percent={vote * 10} color={voteColor} />
        </header>
        <div className="date">{formatDate}</div>
        <div className="genres">
          <GenreConsumer>
            {(genres) =>
              genre.map((genreId) => {
                const tag = genres.filter((item) => item.id === genreId)
                return (
                  <Tag className="genre" key={genreId}>
                    {tag[0].name}
                  </Tag>
                )
              })
            }
          </GenreConsumer>
        </div>
      </div>
      <section className="content">{cutText(description)}</section>
      <Rate
        className="stars"
        allowHalf
        defaultValue={0}
        value={rateValue}
        count={10}
        onChange={(value) => rateMovie(id, value)}
      />
    </div>
  )
}

Card.defaultProps = {
  date: null,
  id: 0,
  vote: 0,
  title: '',
  imgUrl: '',
  description: '',
  rateValue: null,
}

Card.propTypes = {
  id: PropTypes.number,
  vote: PropTypes.number,
  title: PropTypes.string,
  imgUrl: PropTypes.string,
  description: PropTypes.string,
  rateMovie: PropTypes.func.isRequired,
  rateValue: PropTypes.number,
  date: PropTypes.string,
}

export default Card
