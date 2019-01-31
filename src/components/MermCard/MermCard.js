import React from "react";
import { Card, Tag, Icon, Tooltip } from "antd";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const { Meta } = Card;

const MermCard = ({
  id,
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
        <strong>Last Accessed:</strong> <Moment fromNow>{lastAccessed}</Moment>
      </div>
      <div>
        <strong>Owner:</strong> {owner}
      </div>
    </div>
  );

  const tagsToShow = 2;

  const tagsVisible = tags.slice(0, tagsToShow);
  const tagsHidden = tags.slice(tagsToShow);
  return (
    <Link to={`/merm/${id}`}>
      <Card
        hoverable
        className="merm-card-outer"
        bodyStyle={{ padding: "16px" }}
        cover={cover}
        actions={actions}
      >
        <Meta title={title} description={mermMetaData} />
        <Card className="merm-card-inner" size="small">
          {tagsVisible != null
            ? tagsVisible.map(tag => <Tag key={tag.id}>{tag.name}</Tag>)
            : ""}
          <Tooltip
            placement="bottom"
            title={
              tagsHidden != null
                ? tagsHidden.map(tag => <Tag key={tag.id}>{tag.name}</Tag>)
                : ""
            }
          >
            <Icon type="ellipsis" />
          </Tooltip>
        </Card>
      </Card>
    </Link>
  );
};

export default MermCard;
