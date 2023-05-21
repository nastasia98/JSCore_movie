import React from 'react'
import { Row, Space, Tabs } from 'antd'

import MovieService from './services/movieService'
import { GenreProvider } from './services/genreContext'
import SearchTab from './components/searchTab/searchTab'
import RatesTab from './components/ratesTab/ratesTab'
import Info from './components/info/info'
import ConnectionStatus from './components/offlineStatus/oflineStatus'

import './App.css'

class App extends React.Component {
  movieService = new MovieService()

  genres = null

  constructor() {
    super()
    this.state = {
      guestKey: '',
      movies: [],
      totalResults: 1,
      moviesRated: [],
      totalRatedResults: 1,
      title: '',
      page: 1,
      status: '',
      info: false,
    }
  }

  componentDidMount() {
    this.movieService
      .createGuestSession()
      .then((data) => {
        this.setState({ guestKey: data.guest_session_id })
      })
      .catch(() => this.setState({ status: 'error' }))
    this.movieService.getGenre().then((data) => {
      this.genres = data.genres
    })
  }

  rateMovie = (filmId, rate) => {
    const { guestKey } = this.state
    this.movieService
      .rateMovie(filmId, guestKey, rate)
      .then(() => {
        this.setState(({ movies }) => {
          const newMovieList = movies.map((movie) =>
            movie.id === filmId ? { ...movie, rateValue: rate } : { ...movie }
          )
          return { movies: newMovieList }
        })
      })
      .catch(() => this.setState({ status: 'error' }))
  }

  showMovies = (name, page) => {
    this.setState({ status: 'loading' })
    this.movieService
      .getMoviesForPage(name, page)
      .then((data) => {
        if (!data.length) {
          return this.setState({ movies: [], status: 'ok', info: true })
        }
        this.setState({ movies: data, status: 'ok', info: false })
      })
      .catch(() => this.setState({ status: 'error' }))
  }

  showRateMovies = (page) => {
    const { guestKey } = this.state
    this.setState({ status: 'loading' })
    this.movieService
      .getRatedMovies(guestKey, page)
      .then((data) => this.setState({ moviesRated: data, status: 'ok' }))
      .catch(() => this.setState({ status: 'error' }))
    this.movieService
      .getAllRatedMovies(guestKey)
      .then((data) => {
        this.setState({ totalRatedResults: data.totalResults })
      })
      .catch(() => this.setState({ status: 'error' }))
  }

  searchMovies = (name) => {
    const { page } = this.state
    this.setState({ info: false })
    if (name.length > 0) {
      this.showMovies(name, page)
      this.setState({ title: name, page: 1 })
    }
    if (!name.length) {
      this.setState({ movies: [], title: name })
    }
    this.movieService
      .getAllMovies(name)
      .then((data) => {
        this.setState({ totalResults: data.totalResults })
      })
      .catch(() => this.setState({ status: 'error' }))
  }

  onSelectPage = (pageNum) => {
    const { title } = this.state
    this.setState({ page: pageNum })
    this.showMovies(title, pageNum)
  }

  render() {
    const { movies, status, info, moviesRated, totalResults, page, totalRatedResults } = this.state

    const items = [
      {
        key: '1',
        label: 'Search',
        children: (
          <SearchTab
            movies={movies}
            status={status}
            total={totalResults}
            page={page}
            searchMovies={this.searchMovies}
            selectPage={this.onSelectPage}
            rateMovie={this.rateMovie}
          />
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: (
          <RatesTab
            moviesRated={moviesRated}
            status={status}
            totalRated={totalRatedResults}
            showRateMovies={this.showRateMovies}
          />
        ),
      },
    ]

    return (
      <>
        <Row className="app">
          <Space direction="vertical" align="center" style={{ width: '100%' }}>
            <GenreProvider value={this.genres}>
              <Tabs defaultActiveKey="1" centered destroyInactiveTabPane items={items} />
            </GenreProvider>
            {info && <Info />}
          </Space>
        </Row>
        <ConnectionStatus />
      </>
    )
  }
}

export default App
