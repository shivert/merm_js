import React from "react";
import { Icon } from "antd";
import MermCard from "../../components/MermCard";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../actions/searchActions";
import { bindActionCreators } from "redux";
import { Grid, Row, Col } from "react-flexbox-grid";

class Recent extends React.Component {
  componentDidMount() {
    this.getRecMerms();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.getRecMerms();
    }
  }

  componentWillUnmount() {
    this.props.actions.clearRecMerms();
  }

  getRecMerms = () => {
    this.props.actions.getRecMerms();
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
            {this.props.recent.map(merm => (
              <Col key={merm.id}>
                <MermCard
                  id={merm.id}
                  key={merm.id}
                  title={merm.name}
                  lastAccessed={merm.last_accessed}
                  owner={`${merm.user.first_name} ${merm.user.last_name}`}
                  contentType={merm.content_type}
                  tags={merm.tags}
                />
              </Col>
            ))}
            {this.addExtraCols()}
          </Row>
        </Grid>
      </div>
    );
  }
}

Recent.propTypes = {
  actions: PropTypes.object.isRequired,
  recent: PropTypes.array.isRequired,
  requestStatus: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    recent: state.recent,
    requestStatus: state.requestStatus
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
)(Recent);
