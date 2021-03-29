import { Button } from "@material-ui/core";
import React from "react";

const ListGroup = (props) => {
  const { items, selectedItem, onItemSelect } = props;
  return (
    <div>
      <Button
        className="btn btn-outline-primary dropdown-toggle dropdown-toggle-split"
        color="primary"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {selectedItem ? selectedItem : items[0]}
      </Button>
      <div className="dropdown-menu">
        {items.map((item) => (
          <Button
            onClick={() => onItemSelect(item)}
            key={item}
            className={
              item === selectedItem ? "dropdown-item active " : "dropdown-item"
            }
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ListGroup;
