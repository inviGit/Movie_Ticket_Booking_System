import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

const Card = (props) => {
  const { data, columns } = props;
  return (
    <div className="row">
      {data.map((item) => [
        <div key={item.id} className="card">
          <div key={item.id} className="card-body">
            {columns.map((m) => {
              if (m.type === "title") {
                if (!_.isUndefined(item["activeStatus"])) {
                  if (item["activeStatus"]) {
                    return (
                      <div key={m.path}>
                        <FontAwesomeIcon icon={faVideo} /> {item[m.path]}
                        {m.content(item)}
                      </div>
                    );
                  } else {
                    return (
                      <div key={m.path}>
                        <FontAwesomeIcon icon={faVideoSlash} /> {item[m.path]}
                        {m.content(item)}
                      </div>
                    );
                  }
                } else {
                  return (
                    <h4 className="card-title" key={m.path}>
                      {item[m.path]}
                    </h4>
                  );
                }
              } else if (m.type === "subTitle") {
                return (
                  <h6 key={m.path} className="card-subtitle mb-2 ">
                    {m.label}: {item[m.path]}
                  </h6>
                );
              } else if (m.type === "boolean") {
                return (
                  <p key={m.path} className="card-subtitle mb-2 ">
                    {m.label}: {item[m.path].toString()}
                  </p>
                );
              } else if (m.content) {
                return <p key={m.key}>{m.content(item)}</p>;
              }
            })}
          </div>
        </div>,
      ])}
    </div>
  );
};

export default Card;
