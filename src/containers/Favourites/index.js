import React from "react";
import { Link } from "react-router-dom";
import { Icon, Button, Collapse } from "antd";
import MermCard from "../../components/MermCard";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../actions/searchActions";
import { bindActionCreators } from "redux";
import { Grid, Row, Col } from "react-flexbox-grid";
import * as queryString from "query-string";

class Favourites extends React.Component {
  componentDidMount() {
    this.getFavMerms();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.getFavMerms();
    }
  }

  componentWillUnmount() {
    this.props.actions.clearFavMerms();
  }

  getFavMerms = () => {
    this.props.actions.getFavMerms();
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
            {this.props.favourites.map(merm => (
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

Favourites.propTypes = {
  actions: PropTypes.object.isRequired,
  favourites: PropTypes.array.isRequired,
  requestStatus: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    favourites: state.favourites,
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
)(Favourites);
