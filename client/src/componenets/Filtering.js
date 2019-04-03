import React, { Component } from 'react';
import { Select, Input } from 'antd';
const Option = Select.Option;
const Search = Input.Search;

class Filtering extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row" style={{ paddingTop: '40px' }}>
            <div className="col-md-6">
              <Search
                placeholder="Search By Name"
                onSearch={value => this.props.handleSearch(value)}
                style={{ width: 200 }}
              />
            </div>
            <div className="col-md-6">
              <Select placeholder="Sort By:" style={{ width: 120 }} onChange={this.props.handleSort}>
                <Option value="user_name" key={1}>Name</Option>
                <Option value="age" key={2}>Age</Option>
                <Option value="likes" key={3}>Likes</Option>
                <Option value="comments" key={4}>Comments</Option>
              </Select>
            </div>
        </div>
      </div>
    )
  }
}

export default Filtering;





