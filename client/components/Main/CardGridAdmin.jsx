import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import {
  Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Typography, Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const CardGridAdmin = ({ course, onViewClick }) => {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {course.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                      {card.summary}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to="/classroom">
                      <Button size="small" color="primary" onClick={() => onViewClick(card.id)}>
                        View
                      </Button>
                    </Link>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </div>
  );
};

CardGridAdmin.propTypes = {
  course: propTypes.arrayOf(propTypes.object),
  onViewClick: propTypes.func.isRequired,
};

CardGridAdmin.defaultProps = {
  course: [],
};

export default CardGridAdmin;