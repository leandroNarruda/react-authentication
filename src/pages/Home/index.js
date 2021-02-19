import { useState, useEffect } from 'react'
import axios from 'axios'
import { Collapse, IconButton, Avatar, Card, CardHeader, CardActionArea, CardMedia, Typography, makeStyles, CardContent, CardActions, Button } from '@material-ui/core'
import { deepPurple } from '@material-ui/core/colors'
import { ExpandMore, Email, Phone, School }from '@material-ui/icons';
import clsx from 'clsx';
import OpenMenu from '../../components/OpenMenu'
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 800,
      width: 800,
      marginTop: 80,
    },
    media: {
      height: 150,
    },
    purple: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }));

const Home = ({ setIsAuth }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    const [user, setUser] = useState({})
    const [techs, setTechs] = useState([])
    const [token] = useState(() => {
        const sessionToken = sessionStorage.getItem('token') || ""
        if(!sessionToken)
        return ''
        setIsAuth(true)
        return JSON.parse(sessionToken)
    })

    useEffect(() => {
        axios
        .get('https://kenziehub.me/profile', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then( response => {
          setUser (response.data)
          setTechs(response.data.techs)
        })
        .catch(e => console.log(e))
    })


    if(!token) {
      return <Redirect to='/' />
    }


    return (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="https://source.unsplash.com/random"
              title="random"
            />
            <CardHeader
              avatar= {<Avatar className={classes.purple}>{user.name && user.name[0]}</Avatar>}
              action={<OpenMenu />}
              title={
                <Typography gutterBottom variant="h5" component="h2">
                  {user.name}
                </Typography>
              }
              subheader={<Typography variant="body2" color="textSecondary" component="p">{user.bio}</Typography>}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {techs.map((e,index) => index < techs.length - 1 ? `${e.title} | ` : e.title)}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Veja mais...
            </Button>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              >
              <ExpandMore />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
             <Typography paragraph><Email /></Typography>
              <Typography paragraph>{user.email}</Typography>
              <Typography paragraph><Phone /></Typography>
              <Typography paragraph>{user.contact}</Typography>
              <Typography paragraph><School /></Typography>
              <Typography paragraph>{user.course_module}</Typography>
            </CardContent>
          </Collapse>
        </Card>
    )
}

export default Home