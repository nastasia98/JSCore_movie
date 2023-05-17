import React from 'react'
import { Input } from 'antd'
import { debounce } from 'lodash/function'

import './movieSearch.css'

class MovieSearch extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
    }
  }

  setValue = debounce((newValue) => {
    const { searchMovies } = this.props
    searchMovies(newValue)
  }, 600)

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if (prevState.value !== value) {
      this.setValue(value)
    }
  }

  onChangeValue = (e) => {
    this.setState({ value: e.target.value })
  }

  render() {
    const { value } = this.state
    return <Input className="input" placeholder="Type to search..." value={value} onChange={this.onChangeValue} />
  }
}

export default MovieSearch
