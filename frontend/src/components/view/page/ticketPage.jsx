import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../../common/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import Page from "../../common/page";

export class TicketPage extends Component {
  columns = [
    {
      key: "image",
      content: () => <FontAwesomeIcon icon={faTicketAlt} />,
      type: "image",
    },
    {
      path: "seatNo",
      label: "Seat Number",
      type: "title",
      content: (ticket) => (
        <Link class="text-dark" to={`/`}>
          {/* <FontAwesomeIcon icon={faFilm} /> */}
          <h5 className="card-title">{ticket.path}</h5>
        </Link>
      ),
    },
    { path: "showTime", label: "Show Time", type: "subTitle" },
    { path: "showDate", label: "Show Date", type: "subTitle" },
  ];
  render() {
    const { ticket } = this.props;
    let show = ticket.show;
    let data = { ...ticket, ...show };

    return <Page columns={this.columns} data={data} />;
  }
}

export default TicketPage;
