/* eslint-disable no-else-return */
import React from 'react';
import propTypes from 'prop-types';
import { Typography, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CourseEdit from './CourseEdit';
import ContainerEdit from './ContainerEdit';
import ContentEdit from './ContentEdit';
import ContentView from './ContentView';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

const Editor = ({
  isCourseEditClick, isContainerEditClick, isContentEditClick, handleChange,
  fetchCourseContent, courseTitle, courseSummary, containerTitle,
  contentTitle, content, selectedCourseData, selectedCourseItem,
  fetchCourseData, adminName, selectedContainer, selectedContent, isContentClicked,
}) => {
  const renderContent = () => {
    if (isCourseEditClick) {
      return (
        <CourseEdit
          handleChange={handleChange}
          fetchCourseContent={fetchCourseContent}
          courseTitle={courseTitle}
          courseSummary={courseSummary}
          selectedCourseItem={selectedCourseItem}
          fetchCourseData={fetchCourseData}
          adminName={adminName}
        />
      );
    } else if (isContainerEditClick) {
      return (
        <ContainerEdit
          handleChange={handleChange}
          fetchCourseContent={fetchCourseContent}
          containerTitle={containerTitle}
          selectedCourseData={selectedCourseData}
          adminName={adminName}
          selectedContainer={selectedContainer}
          fetchCourseData={fetchCourseData}
        />
      );
    } else if (isContentEditClick) {
      return (
        <ContentEdit
          handleChange={handleChange}
          fetchCourseContent={fetchCourseContent}
          contentTitle={contentTitle}
          content={content}
          selectedCourseData={selectedCourseData}
          adminName={adminName}
          selectedContent={selectedContent}
        />
      );
    } else if (isContentClicked) {
      return (
        <ContentView
          selectedContent={selectedContent}
        />
      );
    }
    return null;
  };

  const classes = useStyles();

  return (
    <main className={classes.content}>
      <CssBaseline />
      <div className={classes.toolbar} />
      <Typography component="span" paragraph>
        {renderContent()}
      </Typography>
    </main>
  );
};

Editor.propTypes = {
  isCourseEditClick: propTypes.bool.isRequired,
  isContainerEditClick: propTypes.bool.isRequired,
  isContentEditClick: propTypes.bool.isRequired,
  handleChange: propTypes.func.isRequired,
  fetchCourseContent: propTypes.func.isRequired,
  courseTitle: propTypes.string.isRequired,
  courseSummary: propTypes.string.isRequired,
  containerTitle: propTypes.string.isRequired,
  contentTitle: propTypes.string.isRequired,
  content: propTypes.string.isRequired,
  selectedCourseData: propTypes.arrayOf(propTypes.object),
  selectedCourseItem: propTypes.shape({
    id: propTypes.number,
    title: propTypes.string,
  }),
  fetchCourseData: propTypes.func.isRequired,
  adminName: propTypes.string.isRequired,
  selectedContainer: propTypes.shape({
    id: propTypes.number,
    title: propTypes.string,
  }),
  isContentClicked: propTypes.bool.isRequired,
  selectedContent: propTypes.shape({
    id: propTypes.number,
  }),
};

Editor.defaultProps = {
  selectedCourseData: null,
  selectedCourseItem: null,
  selectedContainer: null,
  selectedContent: null,
};

export default Editor;
