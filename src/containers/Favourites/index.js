import React from "react";
import { Icon, Empty } from "antd";
import MermCard from "../../components/MermCard";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as mermActions from "../../actions/mermActions";
import * as searchActions from "../../actions/searchActions";
import { bindActionCreators } from "redux";
import { Grid, Row, Col } from "react-flexbox-grid";

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
    this.props.searchActions.clearFavMerms();
  }

  getFavMerms = () => {
    this.props.searchActions.getFavMerms();
  };

  addExtraCols = (numExtra = 3) => {
    const cols = [];

    for (let i = 0; i < numExtra; i++) {
      cols.push(<Col style={{ width: "310px" }} key={100 + i} />);
    }

    return cols;
  };

  logAccess = mermId => {
    this.props.mermActions.logAccess(mermId);
  };

  render() {
    const { loading } = this.props.requestStatus;
    const { favourites } = this.props;
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
            {favourites.length === 0 ? (
              <Empty description="No Favourite Merms!" />
            ) : (
              favourites.map(merm => (
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
                    logAccess={this.logAccess}
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

Favourites.propTypes = {
  searchActions: PropTypes.object.isRequired,
  mermActions: PropTypes.object.isRequired,
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
    mermActions: bindActionCreators(mermActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourites);
