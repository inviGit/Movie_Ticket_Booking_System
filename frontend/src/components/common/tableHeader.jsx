import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAlphaUp, faSortAlphaDownAlt, faSort } from '@fortawesome/free-solid-svg-icons'


// columns: array
// sortColumn: object
// onSort: function

class tableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) =>{
        const {sortColumn} = this.props;
      if(column.path !== sortColumn.path) return <FontAwesomeIcon icon={faSort}/>;
      if(sortColumn.order==='asc') return <FontAwesomeIcon icon={faSortAlphaUp}/>
      else return <FontAwesomeIcon icon={faSortAlphaDownAlt}/>
  }

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
            
          ))}
        </tr>
      </thead>
    );
  }
}

export default tableHeader;
