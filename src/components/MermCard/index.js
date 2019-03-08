import React from "react";
import { Card, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import PropTypes from "prop-types";

const { Meta } = Card;

const MermCard = ({ id, lastAccessed, owner, contentType, title, tags }) => {
  const mermMetaData = (
    <div style={{ padding: "0px 0px 4px" }}>
      <div>
        <strong>Last Accessed:</strong> <Moment fromNow>{lastAccessed}</Moment>
      </div>
      <div>
        <strong>Owner:</strong> {owner}
      </div>
    </div>
  );

  const cover = (
    <div className="cover-icon-container">
      <FontAwesomeIcon
        icon={["fab", contentType]}
        className={`cover-icon ${contentType}`}
        size="5x"
      />
    </div>
  );

  return (
    <Link to={`/merm/${id}/overview`}>
      <Card
        hoverable
        className="merm-card-outer"
        bodyStyle={{ padding: "16px" }}
        cover={cover}
      >
        <Meta title={title} description={mermMetaData} />
        <Card className="merm-card-inner">
          {tags.map(tag => (
            <Tag key={tag.id}>{tag.name}</Tag>
          ))}
        </Card>
      </Card>
    </Link>
  );
};

MermCard.propTypes = {
  id: PropTypes.number.isRequired,
  lastAccessed: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  contentType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired
};

export default MermCard;
