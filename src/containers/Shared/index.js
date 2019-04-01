import React from "react";
import { Icon, Empty } from "antd";
import MermCard from "../../components/MermCard";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../actions/searchActions";
import { bindActionCreators } from "redux";
import { Grid, Row, Col } from "react-flexbox-grid";

class Shared extends React.Component {
  componentDidMount() {
    this.getSharedMerms();
  }

  componentWillUnmount() {
    this.props.actions.clearSharedMerms();
  }

  getSharedMerms = () => {
    this.props.actions.getSharedMerms();
  };

  addExtraCols = (numExtra = 3) => {
    const cols = [];

    for (let i = 0; i < numExtra; i++) {
      cols.push(<Col style={{ width: "310px" }} key={100 + i} />);
    }

    return cols;
  };

  render() {
    const { loading } = this.props.requestStatus;
    const { shared } = this.props;
    return loading === true ? (
      <Icon
        type="loading"
        style={{
          fontSize: "100px",
          marginTop: "125px"
        }}
      />
    ) : (
      <div className="search-results-container">
        <Grid fluid>
          <Row className="search-result-row" between="xs">
            {shared.length === 0 ? (
              <Empty description="No Merms Shared With You!" />
            ) : (
              shared.map(merm => (
                <Col key={merm.id}>
                  <MermCard
                    id={merm.id}
                    key={merm.id}
                    title={merm.name}
                    shared={merm.shared}
                    time={merm.last_accessed}
                    user={merm.user}
                    resourceUrl={merm.resource_url}
                    contentType={merm.content_type}
                    tags={merm.tags}
                  />
                </Col>
              ))
            )}
            {this.addExtraCols()}
          </Row>
        </Grid>
      </div>
    );
  }
}

Shared.propTypes = {
  actions: PropTypes.object.isRequired,
  shared: PropTypes.array.isRequired,
  requestStatus: PropTypes.object.isRequired,
  userObject: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    shared: state.shared,
    requestStatus: state.requestStatus,
    userObject: state.userObject
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shared);
