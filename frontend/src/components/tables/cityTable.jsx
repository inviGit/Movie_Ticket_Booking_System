import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Table from './../common/table';

export class CityTable extends Component {
      columns = [
            {
              path: "cityName", 
              label: "cityName",
              content: (city) => <Link to={{
                pathname: `/city/${city.id}/theaters`,
                state: {city}
              }}
              >{city.cityName}</Link>,
            },
            { path: "pincode", label: "Pincode" },
            { path: "stateName", label: "State" },
          ];
      render() {
            const { cities, onSort, sortColumn } = this.props;

            return (
                  <div>
        <Table
          columns={this.columns}
          data={cities}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
            )
      }
}

export default CityTable
