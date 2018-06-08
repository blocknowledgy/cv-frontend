    import React, { Component } from 'react';
import ReactDOM from 'react-dom';
    import axios from 'axios';

	import logo from './blocknowledgy-logo.jpg';


    class UserForm extends Component {
      constructor() {
        super();
        this.state = {
          description: '',
          selectedFile: '',
        };
      }

      onChange = (e) => {
        const state = this.state;

        switch (e.target.name) {
          case 'selectedFile':
            state.selectedFile = e.target.files[0];
            break;
          default:
            state[e.target.name] = e.target.value;
        }

        this.setState(state);
      }

      onSubmit = (e) => {
        e.preventDefault();
        const { description, selectedFile } = this.state;
        let formData = new FormData();

        formData.append('description', description);
        formData.append('selectedFile', selectedFile);

        axios.post('/calculate-contract-hash', formData)
          .then((result) => {
            // access results...
		console.log(result);
          });
      }

      render() {
        const { description, selectedFile } = this.state;
        return (
	<div id="panel">
	  <img src={logo} className="App-logo" alt="logo" />
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="description"
              value={description}
              onChange={this.onChange}
            />
            <input
              type="file"
              name="selectedFile"
              onChange={this.onChange}
            />
            <button type="submit">Submit</button>
          </form>
	</div>
        );
      }
    }

ReactDOM.render(
  <UserForm />,
  document.getElementById('root')
);
