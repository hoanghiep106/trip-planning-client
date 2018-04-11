import React from 'react';
import { debounce } from '../../utils/';
import './index.css'

class SearchBar extends React.Component {
  handleChange(term) {
    this.props.search(term);
  }

  render() {
    const handleChange = debounce(term => this.handleChange(term), 600);
    return (
      <div className="input-group search-box pull-left mb-2">
        <div className="input-group-addon">
          <i className="fa fa-search" />
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="form-control"
          name="search"
          onChange={event => handleChange(event.target.value)}
          onFocus={this.props.onFocus}
        />
      </div>
    );
  }
}

export default SearchBar;
