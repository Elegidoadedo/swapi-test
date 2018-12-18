import React from "react";
import PeopleList from "./PeopleList";
import swapi from "../swapi/client";

export default class PeopleListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            data: {results: []}
        };
    }

    componentDidMount() {
        this.loadList();
    }

    loadList() {
        swapi.getPeople(this.state.currentPage, (response) => {
            this.setState({
                data: response
            });
        });
    }

    changePage(modifier) {
        
        this.setState({
            currentPage: this.state.currentPage+modifier,
        },this.loadList)     
    }

    render() {
        const {next,previous,results} = this.state.data
        return (
            <div className="people-list">
                <PeopleList people={results}/>
                <div className="flex">
                    {previous ? <button onClick={()=>{this.changePage(-1)}}>Previous Page</button> : null}
                    {next ? <button onClick={()=>{this.changePage(+1)}}>Next Page</button> : null }
                </div>
            </div>
        );
    }
}
