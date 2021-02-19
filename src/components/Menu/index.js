import { AppBar, Toolbar, MenuItem, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        position: 'absolute'
    },
})

const Menu = ({ isAuth, setIsAuth }) => {
    const classes = useStyles()
    const history = useHistory()

    const sendTo = (path) => {
        history.push(path)
    }

    const handleCloseApplication = () => {
        sessionStorage.clear()
        setIsAuth(false)
        sendTo('/')
    }

    return (
        <AppBar className={classes.root}>
            <Toolbar>
                {isAuth ? (<>   
                    <MenuItem onClick={() => sendTo('/all')}>Todos</MenuItem>
                    <MenuItem onClick={() => sendTo('/home')}>Home</MenuItem>
                    <MenuItem onClick={() => sendTo('/tech-register')}>Cadastrar</MenuItem>
                    <MenuItem onClick={handleCloseApplication}>Sair</MenuItem>
                </>) : (<>
                    <MenuItem onClick={() => sendTo('/')}>Entrar</MenuItem>
                    <MenuItem onClick={() => sendTo('/register')}>Registrar-se</MenuItem>
                </>)}
            </Toolbar>
        </AppBar>
    )
}

export default Menu