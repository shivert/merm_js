import React from "react";
import { Card, Tag } from "antd";
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
    <>
      <div>
        <strong>Last Accessed:</strong> {lastAccessed}
      </div>
      <div>
        <strong>Shared:</strong> {sharedTime}
      </div>
      <div>
        <strong>Owner:</strong> {owner}
      </div>
      <div>
        <strong>Shared by:</strong> {sharer}
      </div>
    </>
  );
  return (
    <Card
      style={{ width: "100%", textAlign: "left" }}
      bodyStyle={{ padding: "16px" }}
      cover={cover}
      actions={actions}
    >
      <Meta title={title} description={mermMetaData} />
      <Card
        size="small"
        style={{ width: "100%", border: "none" }}
        bodyStyle={{ padding: "8px 0 8px 0" }}
      >
        {tags != null
          ? tags.map(tag => (
              <Tag key={tag} closable>
                {tag}
              </Tag>
            ))
          : ""}
      </Card>
    </Card>
  );
};

export default MermCard;
