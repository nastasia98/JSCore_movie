import React from 'react'
import { Row, Space, Tabs } from 'antd'

import MovieService from './components/movieService/movieService'
import { GenreProvider } from './components/movieService/genreContext'
import SearchTab from './components/searchTab/searchTab'
import RatesTab from './components/ratesTab/ratesTab'
import Info from './helpers/info'
import ConnectionStatus from './components/offlineStatus/oflineStatus'

import './App.css'

class App extends React.Component {
  movieService = new MovieService()

  constructor() {
    super()
    this.state = {
      allGenre: null,
      guestKey: '',
      movies: [],
      totalResults: 1,
      moviesRated: [],
      totalRatedResults: 1,
      title: '',
      page: 1,
      loading: false,
      error: false,
      errorMessage: '',
      info: false,
    }
  }

  componentDidMount() {
    this.movieService
      .createGuestSession()
      .then((data) => {
        this.setState({ guestKey: data.guest_session_id })
      })
      .catch((err) => this.setState({ error: true, errorMessage: err.message }))
    this.movieService
      .getGenre()
      .then((data) => this.setState({ allGenre: [data] }))
      .catch((err) => this.setState({ error: true, errorMessage: err.message }))
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
      .catch((err) => this.setState({ error: true, errorMessage: err.message }))
  }

  showMovies = (name, page) => {
    this.setState({ loading: true })
    this.movieService
      .getMoviesForPage(name, page)
      .then((data) => {
        if (!data.length) {
          return this.setState({ movies: [], info: true, loading: false })
        }
        this.setState({ movies: data, loading: false, info: false })
      })
      .catch((err) => this.setState({ error: true, errorMessage: err.message }))
  }

  showRateMovies = (page) => {
    const { guestKey } = this.state
    this.setState({ loading: true })
    this.movieService
      .getRatedMovies(guestKey, page)
      .then((data) => this.setState({ moviesRated: data, loading: false }))
      .catch((err) => this.setState({ error: true, errorMessage: err.message }))
    this.movieService
      .getAllRatedMovies(guestKey)
      .then((data) => {
        this.setState({ totalRatedResults: data.totalResults })
      })
      .catch((err) => this.setState({ error: true, errorMessage: err.message }))
  }

  searchMovies = (name) => {
    const { page } = this.state
    if (name.length > 0) {
      this.showMovies(name, page)
      this.setState({ title: name, page: 1 })
    }
    if (!name.length) {
      this.setState({ movies: [], title: name, info: false })
    }
    this.movieService
      .getAllMovies(name)
      .then((data) => {
        this.setState({ totalResults: data.totalResults })
      })
      .catch((err) => this.setState({ error: true, errorMessage: err.message }))
  }

  onSelectPage = (pageNum) => {
    const { title } = this.state
    this.setState({ page: pageNum })
    this.showMovies(title, pageNum)
  }

  render() {
    const { movies, loading, error, errorMessage, info, moviesRated, allGenre, totalResults, page, totalRatedResults } =
      this.state

    const items = [
      {
        key: '1',
        label: 'Search',
        children: (
          <SearchTab
            movies={movies}
            loading={loading}
            error={error}
            errorMessage={errorMessage}
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
            loading={loading}
            error={error}
            errorMessage={errorMessage}
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
            <GenreProvider value={allGenre}>
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
