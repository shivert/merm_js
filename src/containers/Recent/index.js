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
              <Col>
                <MermCard
                  id={merm.id}
                  key={merm.id}
                  title={merm.name}
                  lastAccessed={merm.lastAccessed}
                  sharedTime="Jan 12, 2018"
                  owner={`${merm.user.firstName} ${merm.user.lastName}`}
                  sharer="Veryvery long named Person"
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  tags={merm.tags}
                />
              </Col>
            ))}
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
