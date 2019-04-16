import React, { Component } from 'react';

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      name: 'name',
      phone: '000-0000-0000',
      id: 0
    }
  }

  state = {
    editing: false,
    name: '',
    phone: ''
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(!this.state.editing
       && !nextState.editing
       && nextProps.info === this.props.info) {
         return false;
    }
    return true;
  }

  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
  }

  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing});
  }
  
  handleChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }

  componentDidUpdate(prevProps, prevState) {
    const { info, onUpdate } = this.props;

    // // state from editing false to editing true
    if(!prevState.editing && this.state.editing) {
      this.setState({
        name: info.name,
        phone: info.phone
      })
    }

    // state from editing true to editing false
    if (prevState.editing && !this.state.editing) {
      onUpdate( info.id, 
        {
          name: this.state.name,
          phone: this.state.phone
        }
      )
    }
  }

  render() {
    console.log("render PhoneInfo " + this.props.info.id);
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    }

    const { editing } = this.state;

    if(editing) {
      return (
        <div style={style}>
          <div>
            <input
              value={this.state.name} 
              name="name" 
              placeholder="Name" 
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              value={this.state.phone} 
              name="phone" 
              placeholder="Phone Number" 
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleToggleEdit}>Apply</button>
          <button onClick={this.handleRemove}>Delete</button>
        </div>
      );
    }

    const { 
      name, phone 
    } = this.props.info;

    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick={this.handleToggleEdit}>Edit</button>
        <button onClick={this.handleRemove}>Delete</button>
      </div>
    )
  }
}

export default PhoneInfo;
