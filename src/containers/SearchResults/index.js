import React from "react";
import { Icon, Button, Collapse } from "antd";
import MermCard from "../../components/MermCard";
import AdvancedSearch from "../../components/AdvancedSearch";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../actions/searchActions";
import { bindActionCreators } from "redux";
import * as queryString from "query-string";

import { Grid, Row, Col } from "react-flexbox-grid";

const Panel = Collapse.Panel;

class SearchResults extends React.Component {
  componentDidMount() {
    this.searchMerms();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.searchMerms();
    }
  }

  // componentWillUnmount() {
  //   this.props.actions.clearSearchResults();
  // }

  searchMerms = () => {
    const queryParams = queryString.parse(this.props.location.search);
    this.props.actions.searchMerms(queryParams["q"]);
  };

  render() {
    const count = this.props.searchResults.length;

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
        <Collapse bordered={false} className="advanced-search-collapse">
          <Panel
            key="show-advanced-search"
            showArrow={false}
            header={
              <p>
                Don't see what you're looking for? Try our{" "}
                <a>Advanced Search</a>!
                <Button
                  className="close-advanced"
                  type="primary"
                  shape="circle"
                  icon="close"
                  style={{ float: "right" }}
                />
              </p>
            }
          >
            <AdvancedSearch />
          </Panel>
        </Collapse>
        <Grid fluid>
          <Row style={{ textAlign: "left", marginTop: "10px" }}>
            <p>Showing {count} search results...</p>
          </Row>
          <Row className="search-result-row" between="xs">
            {this.props.searchResults.map(merm => (
              <Col>
                <MermCard
                  id={merm.id}
                  key={merm.id}
                  title={merm.name}
                  lastAccessed={merm.lastAccessed}
                  sharedTime="Jan 12, 2018"
                  owner={`${merm.user["first_name"]} ${merm.user["last_name"]}`}
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

SearchResults.propTypes = {
  actions: PropTypes.object.isRequired,
  searchResults: PropTypes.array.isRequired,
  requestStatus: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    searchResults: state.searchResults,
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
)(SearchResults);
