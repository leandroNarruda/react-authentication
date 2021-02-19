import { useState, useEffect } from 'react'
import axios from 'axios'
import { Collapse, IconButton, Avatar, Card, CardHeader, CardActionArea, CardMedia, Typography, makeStyles, CardContent, CardActions, Button } from '@material-ui/core'
import { deepPurple } from '@material-ui/core/colors'
import { ExpandMore, Email, Phone, School }from '@material-ui/icons';
import clsx from 'clsx';
import OpenMenu from '../../components/OpenMenu'

const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 800,
      width: 800,
      marginTop: 70,
      marginBottom: 50,
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
    margin: {
      marginRight: 25,
    }
}));

let incremento = 1

const All = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [users, setUsers] = useState([])
  
    const handleExpand = () => {
      setExpanded(!expanded);
    };

    const handlePage = (dir) => {
      dir? incremento++ : incremento--
      axios
      .get(`https://kenziehub.me/users?perPage=15&page=${incremento}`)
      .then( response => {
        setUsers(response.data)
      })
      .catch(e => console.log(e))
    }

    useEffect(() => {
      if(users.length===0) {
        axios
        .get(`https://kenziehub.me/users?perPage=15&page=1`) 
        .then( response => {
          setUsers(response.data)
        })
        .catch(e => console.log(e))
      }
    })

    return (
        <>
        {users.map((user,index) => 
        {
        return(
        <Card className={classes.root} key={index}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image = {`https://source.unsplash.com/random/${index + incremento}`}
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
                {user.techs.map((e,index) => index < user.techs.length - 1 ? `${e.title} | ` : e.title)}
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
              onClick={handleExpand}
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
        )})}
        <div className={classes.root}>
          <Button className={classes.margin} variant='contained' color='primary' onClick={() => handlePage(false)} >Anterior</Button>
          <Button variant='contained' color='primary' onClick={() => handlePage(true)} >Próxima</Button>
        </div>
        </>
    )
}

export default All