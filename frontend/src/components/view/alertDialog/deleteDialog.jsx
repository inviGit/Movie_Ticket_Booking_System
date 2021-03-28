import React, { Component } from "react";
import AlertDialog from "../../common/alertDialog";
import { Button } from "@material-ui/core";

export class DeleteDialog extends Component {
  data = [
    {
      key:"title",
      title: this.props.title,
    },
    {
      key:"content",
      content: this.props.content,
    },
    {
      key:"action",
      action: (
        <div>
          <Button color="primary" onClick={this.props.onCancel}>
            Cancel
          </Button>
          <Button color="primary" onClick={this.props.onConfirm}>
            Confirm
          </Button>
        </div>
      ),
    },
  ];

  render() {
    const { open, onCancel, onConfirm } = this.props;
    return (
      <div>
        <AlertDialog
          open={open}
          data={this.data}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      </div>
    );
  }
}

export default DeleteDialog;
