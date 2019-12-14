import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import FileSystem from './FileSystem';
import Editor from './Editor/Editor';

const useStyles = makeStyles(() => ({
  classroom: {
    display: 'flex',
  },
}));

const Classroom = ({
  isAdmin, adminName, course, selectedCourse, selectedCourseItem, fetchCourseData,
}) => {
  const classes = useStyles();
  const [selectedCourseData, setSelectedCourseData] = useState(null);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);

  const [isCourseEditClick, setIsCourseEditClick] = useState(false);
  const [isContainerEditClick, setIsContainerEditClick] = useState(false);
  const [isContentEditClick, setIsContentEditClick] = useState(false);
  const [isContentClicked, setIsContentClicked] = useState(false);

  const [isContainerOrderEditClick, setIsContainerOrderEditClick] = useState(false);
  const [isContentOrderEditClick, setIsContentOrderEditClick] = useState(false);


  const [values, setValues] = useState({
    courseTitle: selectedCourseItem.title,
    courseSummary: selectedCourseItem.summary,
    containerTitle: '',
    contentTitle: '',
    content: '',
  });


  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const fetchCourseContent = () => {
    Axios.get(`/api/course?id=${selectedCourse}`)
      .then((data) => {
        setSelectedCourseData(data.data);
      });
  };

  useEffect(() => {
    fetchCourseContent();
  }, []);

  const onContainerSubmit = () => {
    Axios.post('/api/container', {
      title: values.containerTitle,
      madeBy: adminName,
      updatedBy: adminName,
      courseId: selectedCourse,
    })
      .then(() => {
        fetchCourseContent();
      });
  };

  const updateSelectedContainer = (data) => {
    setSelectedContainer(data);
  };

  const updateSelectedContent = (data) => {
    setSelectedContent(data);
  };

  const courseEditClick = () => {
    setIsCourseEditClick(true);
    setIsContainerEditClick(false);
    setIsContentEditClick(false);
    setIsContentClicked(false);
    setIsContainerOrderEditClick(false);
    setIsContentOrderEditClick(false);
  };
  const containerEditClick = (e) => {
    updateSelectedContainer(e);
    setIsContainerEditClick(true);
    setIsCourseEditClick(false);
    setIsContentEditClick(false);
    setIsContentClicked(false);
    setIsContainerOrderEditClick(false);
    setIsContentOrderEditClick(false);
  };
  const contentEditClick = (e) => {
    updateSelectedContent(e);
    setIsContentEditClick(true);
    setIsCourseEditClick(false);
    setIsContainerEditClick(false);
    setIsContentClicked(false);
    setIsContainerOrderEditClick(false);
    setIsContentOrderEditClick(false);
  };
  const contentBodyClick = (e) => {
    updateSelectedContent(e);
    setIsContentClicked(true);
    setIsContentEditClick(false);
    setIsCourseEditClick(false);
    setIsContainerEditClick(false);
    setIsContainerOrderEditClick(false);
    setIsContentOrderEditClick(false);
  };
  const containerOrderEditClick = () => {
    setIsContainerEditClick(false);
    setIsCourseEditClick(false);
    setIsContentEditClick(false);
    setIsContentClicked(false);
    setIsContainerOrderEditClick(true);
    setIsContentOrderEditClick(false);
  };
  const contentOrderEditClick = () => {
    setIsContainerEditClick(false);
    setIsCourseEditClick(false);
    setIsContentEditClick(false);
    setIsContentClicked(false);
    setIsContainerOrderEditClick(false);
    setIsContentOrderEditClick(true);
  };

  return (
    <div className={classes.classroom}>
      <FileSystem
        isAdmin={isAdmin}
        course={course}
        selectedCourse={selectedCourse}
        handleChange={handleChange}
        onContainerSubmit={onContainerSubmit}
        fetchCourseContent={fetchCourseContent}
        selectedCourseData={selectedCourseData}
        courseEditClick={courseEditClick}
        containerEditClick={containerEditClick}
        contentEditClick={contentEditClick}
        selectedCourseItem={selectedCourseItem}
        contentBodyClick={contentBodyClick}
      />
      <Editor
        handleChange={handleChange}
        isCourseEditClick={isCourseEditClick}
        isContainerEditClick={isContainerEditClick}
        isContentEditClick={isContentEditClick}
        isContainerOrderEditClick={isContainerOrderEditClick}
        containerOrderEditClick={containerOrderEditClick}
        isContentOrderEditClick={isContentOrderEditClick}
        contentOrderEditClick={contentOrderEditClick}
        fetchCourseContent={fetchCourseContent}
        courseTitle={values.courseTitle}
        courseSummary={values.courseSummary}
        containerTitle={values.containerTitle}
        contentTitle={values.contentTitle}
        content={values.content}
        selectedCourseData={selectedCourseData}
        course={course}
        selectedCourseItem={selectedCourseItem}
        fetchCourseData={fetchCourseData}
        adminName={adminName}
        selectedContainer={selectedContainer}
        selectedContent={selectedContent}
        isContentClicked={isContentClicked}
      />
    </div>
  );
};

Classroom.propTypes = {
  course: propTypes.shape({
    1: propTypes.shape({
      id: propTypes.number,
    }),
  }),
  selectedCourse: propTypes.number.isRequired,
  isAdmin: propTypes.bool.isRequired,
  adminName: propTypes.string.isRequired,
  selectedCourseItem: propTypes.shape({
    id: propTypes.number,
    title: propTypes.string,
    summary: propTypes.string,
  }),
  fetchCourseData: propTypes.func.isRequired,
};

Classroom.defaultProps = {
  selectedCourseItem: null,
  course: {},
};

export default Classroom;
