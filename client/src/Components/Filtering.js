import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

class Filtering extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-md-7 py-4">
            <div className="col-md-6">
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
      </div>
    )
  }
}

export default Filtering;





