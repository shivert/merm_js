import React from "react";
import { Card, Tag } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

const MermCard = ({
  lastAccessed,
  sharedTime,
  owner,
  sharer,
  cover,
  actions,
  title,
  tags
}) => {
  const mermMetaData = (
    <div style={{ padding: "0px 0px 4px" }}>
      <div>
        <strong>Last Accessed:</strong> {lastAccessed}
      </div>
      <div>
        <strong>Owner:</strong> {owner}
      </div>
    </div>
  );
  return (
    <Link to={`/merm/${234}`}>
      <Card
        hoverable
        className="merm-card-outer"
        bodyStyle={{ padding: "16px" }}
        cover={cover}
        actions={actions}
      >
        <Meta title={title} description={mermMetaData} />
        <Card className="merm-card-inner" size="small">
          {tags != null
            ? tags.map(tag => (
                <Tag key={tag}>
                  {tag}
                </Tag>
              ))
            : ""}
        </Card>
      </Card>
    </Link>
  );
};

export default MermCard;
