import React from 'react';
import { injectIntl } from '@edx/frontend-platform/i18n';
import { Link } from 'react-router-dom';
import './stylesTerms.css';
import PropTypes from 'prop-types';

import messages from './messages';

const TermsOfUse = ({ intl }) => (
  <div className="content-terms">
    <Link to="/" className="button-back">
      Back
    </Link>
    <h1 className="title-terms"> {intl.formatMessage(messages.terms)}</h1>
    <p>
      <strong>{intl.formatMessage(messages.subtitle1)}</strong>
    </p>

    <p>{intl.formatMessage(messages.point1)}</p>
    <br />
    <p>
      <strong>{intl.formatMessage(messages.subtitle2)}</strong>
    </p>
    <ul>
      <li>
        <p>{intl.formatMessage(messages.point2_1)}</p>
      </li>
      <li>
        <p>
          {intl.formatMessage(messages.point2_2)}
          <a className="link-mail" href="mailto:panorama@aulasneo.com">panorama@aulasneo.com </a>
          {intl.formatMessage(messages.point2_3)}
        </p>
      </li>
    </ul>

    <p>
      <strong>{intl.formatMessage(messages.subtitle3)}</strong>
    </p>
    <ul>
      <li>
        <p>{intl.formatMessage(messages.point3_1)}</p>
      </li>
      <li>
        <p>{intl.formatMessage(messages.point3_2)}</p>
      </li>
      <li>
        <p>{intl.formatMessage(messages.point3_3)}</p>
      </li>
    </ul>

    <p>
      <strong>{intl.formatMessage(messages.subtitle4)}</strong>
    </p>
    <ul>
      <li>
        <p>{intl.formatMessage(messages.point4_1)}</p>
      </li>
      <li>
        <p>{intl.formatMessage(messages.point4_2)}</p>
      </li>
      <li>
        <p>{intl.formatMessage(messages.point4_3)}</p>
      </li>
    </ul>

    <p>
      <strong>{intl.formatMessage(messages.subtitle5)}</strong>
    </p>
    <ul>
      <li>
        <p>{intl.formatMessage(messages.point5_1)}</p>
      </li>
      <li>
        <p>{intl.formatMessage(messages.point5_2)}</p>
      </li>
    </ul>

    <p>
      <strong>{intl.formatMessage(messages.subtitle6)}</strong>
    </p>
    <ul>
      <li>
        <p>{intl.formatMessage(messages.point6)}</p>
      </li>
    </ul>

    <p>
      <strong>{intl.formatMessage(messages.subtitle7)}</strong>
    </p>
    <ul>
      <li>
        <p>{intl.formatMessage(messages.point7)}</p>
      </li>
    </ul>

    <p>
      <strong>{intl.formatMessage(messages.subtitle8)}</strong>
    </p>
    <ul>
      <li>
        <p>{intl.formatMessage(messages.point8)}</p>
      </li>
    </ul>

    <p>
      <strong>{intl.formatMessage(messages.subtitle9)}</strong>
    </p>
    <ul>
      <li>
        <p>{intl.formatMessage(messages.point9)}</p>
      </li>
    </ul>

    <p>
      <strong>{intl.formatMessage(messages.subtitle10)}</strong>
    </p>
    <ul>
      <li>
        <p>{intl.formatMessage(messages.point10)}</p>
      </li>
    </ul>

    <p>
      <strong>{intl.formatMessage(messages.subtitle11)}</strong>
    </p>

    <ul>
      <li>
        <p>
          {intl.formatMessage(messages.point11)}
          <a className="link-mail" href="mailto:panorama@aulasneo.com">panorama@aulasneo.com</a>
        </p>
      </li>
    </ul>
  </div>
);
TermsOfUse.propTypes = {
  intl: PropTypes.string.isRequired,
};

export default injectIntl(TermsOfUse);
