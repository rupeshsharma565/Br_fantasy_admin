import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { settingConstants } from '../../_constants';
import { CONST } from '../../_config';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href={CONST.MAIN_URL}>{settingConstants.TITLE}</a> &copy; 2020 .</span>
        <span className="ml-auto">Powered by <a href={CONST.MAIN_URL}>{settingConstants.TITLE}</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
