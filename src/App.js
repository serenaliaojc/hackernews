import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';

const list = [{
    title: 'React',
    url: 'https://facebook.github.io/react',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux - title',
    url: 'https://facebook.github.io/react',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

const largeColumn = {
  width: '40%',
};
const midColumn = {
  width: '30%',
};
const smallColumn = {
  width: '10%',
};

function isSearched(searchTerm) {
  return function(item) {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: list,
      searchTerm: '',
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({
      list: updatedList
    });
  }

  render() {
    const { list, searchTerm } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
          </Search>
        </div>
        <Table 
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
      );
  }
}

class Button extends Component {
  render() {
    const {
      onClick,
      className='',
      children
    } = this.props;

    return (
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    );
  }
}

const Search = ({ value, onChange, children }) => {
  return (
    <form>
      {children} <input 
        type="text"
        value={value}
        onChange={onChange}
      />
    </form>
  );
}

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      <div className="table">
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID} className="table-row">
            <span style={largeColumn}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={midColumn}>{item.author}</span>
            <span style={smallColumn}>{item.num_comments}</span>
            <span style={smallColumn}>{item.points}</span>
            <span style={smallColumn}>
              <Button 
                onClick={()=>onDismiss(item.objectID)}
                className="button-inline"
              >
                Dismiss
              </Button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default App;