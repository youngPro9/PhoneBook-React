import React, { Component } from 'react';
import './App.css';
import PhoneForm from './PhoneForm';
import PhoneInfoList from './PhoneInfoList';

class App extends Component {
  id = 2;
  state = {
    information: [
      {
        id: 0,
        name: 'Youngsu',
        phone: '703-111-1111'
      },
      {
        id: 1,
        name: 'Woori',
        phone: '703-122-2222'
      }
    ],
    keyword: ''
  }

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value
    })
  }

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({
         id: this.id++, 
         name: data.name, 
         phone: data.phone
      })
    })
  }

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter( info => info.id !== id )
    })
  }

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => info.id === id ? {...info, ...data} : info
      )
    })
  }

  render() {
    const { information, keyword } = this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    );

    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
        <p>
          <input
            placeholder="Search By Name" 
            onChange={this.handleChange} 
            value={keyword} 
          />
        </p>
        <hr/>
        <PhoneInfoList  
          data={filteredList}
          onRemove={this.handleRemove} 
          onUpdate={this.handleUpdate} 
        />
      </div>
    );
  }
}

export default App;
