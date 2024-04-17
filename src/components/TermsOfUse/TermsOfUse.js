import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './stylesTerms.css';

function TermsOfUse() {
  const { t } = useTranslation(["terms"]);

  return (
    <div className="content-terms">
      <Link to="/" className="button-back">
        Back
      </Link>
      <h1 className="title-terms"> {t("title")}</h1>

      <p>
        <strong>{t('subtitle1')}</strong>
      </p>
      <p>{t('point1')}</p>
      <br />
      <p>
        <strong>{t('subtitle2')}</strong>
      </p>
      <ul>
        <li>
          <p>{t('point2.1')}</p>
        </li>
        <li>
          <p>{t('point2.2')} <a className="link-mail" href="mailto:panorama@aulasneo.com">panorama@aulasneo.com.</a> {t('point2.3')}</p>
        </li>
      </ul>

      <p>
        <strong>{t('subtitle3')}</strong>
      </p>
      <ul>
        <li>
          <p>{t('point3.1')}</p>
        </li>
        <li>
          <p>{t('point3.2')}</p>
        </li>
        <li>
          <p>{t('point3.3')}</p>
        </li>
      </ul>

      <p>
        <strong>{t('subtitle4')}</strong>
      </p>
      <ul>
        <li>
          <p>{t('point4.1')}</p>
        </li>
        <li>
          <p>{t('point4.2')}</p>
        </li>
        <li>
          <p>{t('point4.3')}</p>
        </li>
      </ul>

      <p>
        <strong>{t('subtitle5')}</strong>
      </p>
      <ul>
        <li>
          <p>{t('point5.1')}</p>
        </li>
        <li>
          <p>{t('point5.2')}</p>
        </li>
      </ul>

      <p>
        <strong>{t('subtitle6')}</strong>
      </p>
      <ul>
        <li>
          <p>{t('point6')}</p>
        </li>
      </ul>

      <p>
        <strong>{t('subtitle7')}</strong>
      </p>
      <ul>
        <li>
          <p>{t('point7')}</p>
        </li>
      </ul>

      <p>
        <strong>{t('subtitle8')}</strong>
      </p>
      <ul>
        <li>
          <p>{t('point8')}</p>
        </li>
      </ul>

      <p>
        <strong>{t('subtitle9')}</strong>
      </p>
      <ul>
        <li>
          <p>{t('point9')}</p>
        </li>
      </ul>

      <p>
        <strong>{t('subtitle10')}</strong>
      </p>
      <ul>
        <li>
          <p>{t('point10')}</p>
        </li>
      </ul>

      <p>
        <strong>{t('subtitle11')}</strong>
      </p>
      <ul>
        <li>
          <p>{t('point11')} <a className="link-mail" href="mailto:panorama@aulasneo.com">panorama@aulasneo.com.</a></p>
        </li>
      </ul>
    </div>
  );
}

export default TermsOfUse;
