import React from "react";
import { Card, Tag, Icon, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import PropTypes from "prop-types";

const { Meta } = Card;

const MermCard = ({
  shared,
  user,
  id,
  time,
  contentType,
  title,
  tags,
  resourceUrl,
  logAccess
}) => {
  const link = shared
    ? `/merm/${id}/overview?shared=true`
    : `/merm/${id}/overview`;

  const mermMetaData = (
    <div style={{ padding: "0px 0px 4px" }}>
      <Button
        className="merm-card-button-link"
        href={resourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => logAccess(id)}
      >
        <Icon className="merm-card-link" type="link" />
      </Button>
      <Link to={link}>
        <>
          <div className="merm-meta-desc">
            <strong>{shared ? "Shared" : "Last Accessed"}:</strong>{" "}
            <Moment fromNow>{time}</Moment>
          </div>
          <div className="merm-meta-desc">
            <strong>{shared ? "Shared By" : "Owner"}:</strong> {user.fullname}
          </div>
        </>
      </Link>
    </div>
  );

  const cover = (
    <Link to={link}>
      <div className="cover-icon-container">
        <FontAwesomeIcon
          icon={["fab", contentType]}
          className={`cover-icon ${contentType}`}
          size="5x"
        />
      </div>
    </Link>
  );

  return (
    <Card hoverable className="merm-card-outer" cover={cover}>
      <Meta
        title={<Link to={link}>{title}</Link>}
        description={mermMetaData}
      />
      <Link to={link}>
        <Card className="merm-card-inner">
          {tags.map(tag => (
            <Tag key={tag.name}>{tag.name}</Tag>
          ))}
        </Card>
      </Link>
    </Card>
  );
};

MermCard.propTypes = {
  id: PropTypes.number.isRequired,
  resourceUrl: PropTypes.string.isRequired,
  contentType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shared: PropTypes.bool,
  user: PropTypes.object.isRequired,
  time: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  logAccess: PropTypes.func
};

export default MermCard;
