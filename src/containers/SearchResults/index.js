import React from "react";
import { Icon, Empty, Button, Collapse } from "antd";
import MermCard from "../../components/MermCard";
import AdvancedSearch from "../../components/AdvancedSearch";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as mermActions from "../../actions/mermActions";
import * as searchActions from "../../actions/searchActions";
import { bindActionCreators } from "redux";
import * as queryString from "query-string";

import { Grid, Row, Col } from "react-flexbox-grid";

const Panel = Collapse.Panel;

class SearchResults extends React.Component {
  state = {
    activePanel: ""
  };

  componentDidMount() {
    this.searchMerms();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.searchMerms();
    }
  }

  searchMerms = () => {
    const queryParams = queryString.parse(this.props.location.search);
    this.setState(
      queryParams,
      this.props.searchActions.searchMerms(queryParams)
    );
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

  onChange = e => {
    this.setState({ activePanel: e });
  };

  render() {
    const count = this.props.searchResults.length;

    const { loading } = this.props.requestStatus;
    return (
      <div className="search-results-container">
        <Collapse
          bordered={false}
          className="advanced-search-collapse"
          activeKey={this.state.activePanel}
          onChange={this.onChange}
        >
          <Panel
            key="show-advanced-search"
            showArrow={false}
            header={
              <p>
                Don&apos;t see what you&apos;re looking for? Try our{" "}
                <a>Advanced Search</a>
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
            <AdvancedSearch query={this.state} />
          </Panel>
        </Collapse>
        {loading === true ? (
          <Icon
            type="loading"
            style={{
              fontSize: "100px",
              marginTop: "125px"
            }}
          />
        ) : this.props.searchResults.length == 0 ? (
          <Empty
            style={{ margin: 100 }}
            description="No Merms meet your criteria!"
          />
        ) : (
          <Grid fluid>
            <Row style={{ textAlign: "left", marginTop: "10px" }}>
              <p>Showing {count} search results...</p>
            </Row>
            <Row className="search-result-row" between="xs">
              {this.props.searchResults.map(merm => (
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
              ))}
              {this.addExtraCols()}
            </Row>
          </Grid>
        )}
      </div>
    );
  }
}

SearchResults.propTypes = {
  mermActions: PropTypes.object.isRequired,
  searchActions: PropTypes.object.isRequired,
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
    mermActions: bindActionCreators(mermActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
