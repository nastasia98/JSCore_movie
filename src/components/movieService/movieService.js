export default class MovieService {
  _baseUrl = 'https://api.themoviedb.org/3'

  _apiKey = '1b451b2c66b57d48c2cb7df1c03248f4'

  async getResource(url, query, page) {
    const res = await fetch(`${this._baseUrl}${url}?api_key=${this._apiKey}&query=${query}&page=${page}`)
    if (!res.ok) {
      throw new Error(`Something is going wrong, received ${res.status}`)
    }
    return await res.json()
  }

  async getMoviesForPage(query, page) {
    const data = await this.getResource('/search/movie', query, page)
    return data.results.map(this._transformData)
  }

  async getAllMovies(query) {
    const res = await fetch(`${this._baseUrl}/search/movie?api_key=${this._apiKey}&query=${query}`)
    if (!res.ok) {
      throw new Error(`Something is going wrong, received ${res.status}`)
    }
    const data = await res.json()
    return { totalResults: data.total_results }
  }

  async createGuestSession() {
    const res = await fetch(`${this._baseUrl}/authentication/guest_session/new?api_key=${this._apiKey}`)
    if (!res.ok) {
      throw new Error(`Something is going wrong, received ${res.status}`)
    }
    return await res.json()
  }

  async getRatedMovies(guestId, page) {
    const res = await fetch(
      `${this._baseUrl}/guest_session/${guestId}/rated/movies?api_key=${this._apiKey}&sort_by=created_at.desc&page=${page}`
    )
    if (!res.ok) {
      throw new Error(`Something is going wrong, received ${res.status}`)
    }
    const data = await res.json()
    return data.results.map(this._transformData)
  }

  async getAllRatedMovies(guestId) {
    const res = await fetch(`${this._baseUrl}/guest_session/${guestId}/rated/movies?api_key=${this._apiKey}`)
    if (!res.ok) {
      throw new Error(`Something is going wrong, received ${res.status}`)
    }
    const data = await res.json()
    return { totalResults: data.total_results }
  }

  async rateMovie(id, guestKey, rate) {
    const url = `${this._baseUrl}/movie/${id}/rating?api_key=${this._apiKey}&guest_session_id=${guestKey}`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: rate }),
    })
    if (!res.ok) {
      throw new Error(`Something is going wrong, received ${res.status}`)
    }
    return await res.json()
  }

  async getGenre() {
    const res = await fetch(`${this._baseUrl}/genre/movie/list?api_key=${this._apiKey}`)
    if (!res.ok) {
      throw new Error(`Something is going wrong, received ${res.status}`)
    }
    return await res.json()
  }

  _transformData(movie) {
    return {
      title: movie.title,
      id: movie.id,
      imgUrl: movie.poster_path,
      description: movie.overview,
      vote: movie.vote_average,
      date: movie.release_date,
      genre: movie.genre_ids,
      rateValue: movie.rating,
    }
  }
}
