import React from 'react';
import propTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem,
  Switch,
  ListItemText, ListItemSecondaryAction, IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Content = ({
  content, contentEditClick, selectedContent, contentBodyClick, isAdmin,
}) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [dense, setDense] = React.useState(true);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <ListItem button className={classes.nested} dense={dense} onClick={() => contentBodyClick(content)}>
      <ListItemText primary={content.title} />
      {isAdmin
        ? (
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" size="small" onClick={() => contentEditClick(content)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" size="small">
              <DeleteIcon />
            </IconButton>
            <Switch
              edge="end"
              size="small"
              onChange={handleToggle(content.id)}
              checked={checked.indexOf(content.id) !== -1}
              color="primary"
            />
          </ListItemSecondaryAction>
        )
        : null}
    </ListItem>

  );
};

Content.propTypes = {
  content: propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string,
  }),
};

Content.defaultProps = {
  content: {
    id: 0,
  },
};

export default Content;
