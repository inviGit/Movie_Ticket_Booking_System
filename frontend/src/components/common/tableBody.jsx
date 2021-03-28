import React, { Component } from "react";
import _ from "lodash";

class tableBody extends Component {
  renderCell = (item, column) => {
    const content = _.get(item, column.path);
    if (typeof content === "boolean") {
      const a = content ? "Available" : "Not available";
      return a.toString();
    }
    if (column.content) return column.content(item);
    return content;
  };

  createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };
  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default tableBody;
