import React, {Link} from "react";
import Swapi from '../swapi/client';

export default class PeopleList extends React.Component {
  state={
    person: null,
    films:null,
  }
  handleClick = (person) =>{
    let id= person.films[0].split("/")

    Swapi.getFilm(id[id.length-2], (response) => {
      console.log(response)
      this.setState({
          films: response
      });
    });   
    this.setState ({
     person: person
    })
  }


  render() {
    const{person,films} = this.state;
    if (!this.props.people || this.props.people.length <= 0) return null;

    const list = this.props.people.map((person, index) => (
      <li key={index} onClick={() =>this.handleClick(person)}>{person.name}</li>
    ));

    return (<div>
        <ul>{list}</ul>
        {!person || !films ? null : <div>
          <p>Name:{person.name}</p> 
          <p>Height:{person.height}</p>
          <p>Films:{person.films.map(e =>{return <li>{e}</li>})}</p>
          <p>First Film: {films.title}</p>
        </div>}
    </div>)
  }
}
