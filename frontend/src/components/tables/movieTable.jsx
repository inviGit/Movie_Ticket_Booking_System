import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Table from './../common/table';

export class MovieTable extends Component {
      columns = [
            {
              path: "movieName", 
              label: "Name",
              content: (movie) => <Link to={{
                pathname: `/movie/${movie.id}/shows`,
                
              }}
              >{movie.movieName}</Link>,
            },
            { path: "actor", label: "Actor" },
            { path: "actress", label: "Actress" },
            { path: "director", label: "Director" },
            { path: "language", label: "Language" },
            { path: "genre", label: "Genre" },
            { path: "activeStatus", label: "Active status"},
          ];
        
          render() {
            const { movies, onSort, sortColumn } = this.props;
        
            return (
              <div>
                <Table
                  columns={this.columns}
                  data={movies}
                  sortColumn={sortColumn}
                  onSort={onSort}
                />
              </div>
            );
          }
}

export default MovieTable
