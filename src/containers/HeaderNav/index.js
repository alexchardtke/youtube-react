import React, { Component } from 'react';
import './HeaderNav.scss';
import { Image, Menu, Form, Input, Icon } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';

export class HeaderNav extends Component {
  constructor (props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  onInputChange = (event) => {
    this.setState({
      query: event.target.value
    });
  }

  onSubmit = () => {
    const escapedSearchQuery = encodeURI(this.state.query);
    this.props.history.push(`/results?search_query=${escapedSearchQuery}`);
  }

  render () {
    return (
      <Menu borderless className="top-menu" fixed="top">
        <Menu.Item header className="logo">
          <Link to="/">
            <Image src={logo} size="tiny" />
          </Link>
        </Menu.Item>
        <Menu.Menu className="nav-container">
          <Menu.Item className="search-input">
            <Form onSubmit={this.onSubmit}>
              <Form.Field>
                <Input
                  placeholder="Search"
                  size="small"
                  action="Go"
                  value={this.state.query}
                  onChange={this.onInputChange}
                />
              </Form.Field>
            </Form>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Icon className="header-icon" name="video camera" size="large" />
            </Menu.Item>
            <Menu.Item>
              <Icon className="header-icon" name="grid layout" size="large" />
            </Menu.Item>
            <Menu.Item>
              <Icon className="header-icon" name="chat" size="large" />
            </Menu.Item>
            <Menu.Item>
              <Icon className="header-icon" name="alarm" size="large" />
            </Menu.Item>
            <Menu.Item name="avatar">
              <Image src="http://via.placeholder.com/80x80" avatar />
            </Menu.Item>
          </Menu.Menu>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter(HeaderNav);
