import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '@edx/frontend-platform/react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { camelCaseObject } from '@edx/frontend-platform';

const Panels = () => {
  const { authenticatedUser, config } = useContext(AppContext);
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${config.LMS_BASE_URL}/api/enrollment/v1/enrollment`;
      try {
        const { data } = await getAuthenticatedHttpClient().get(url);
        setEnrollmentData(camelCaseObject(data));
      } catch (error) {
        const httpErrorStatus = error?.response?.status;
        if (httpErrorStatus === 401) {
          setError('Unauthorized access.');
        } else if (httpErrorStatus === 403) {
          setError('Forbidden access.');
        } else {
          setError('An error occurred while fetching data.');
        }
      }
    };

    fetchData();
  }, [config.LMS_BASE_URL]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!enrollmentData) {
    return <div>Loading...</div>;
  }

  const { courseName, courseStart, courseEnd } = enrollmentData;
  console.log(enrollmentData);

  return (
    <div className="content-terms">
      <div className="homeWelcome">
        <Link to="/" className="button-back">
          Back
        </Link>
        <div>Hello {authenticatedUser.username} Your Courses are: </div>

        <ul>
          {enrollmentData && enrollmentData.length > 0 ? (
            enrollmentData.map((detail, index) => (
              <li key={index}>
                <div>Course Name: {detail.courseDetails.courseName}</div>
                <div>Course Start: {new Date(detail.courseDetails.courseStart).toLocaleDateString()}</div>
                <div>Course End: {courseEnd ? new Date(detail.courseEnd).toLocaleDateString() : 'Not specified'}</div>
              </li>
            ))
          ) : (
            <li>No course details available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Panels;
