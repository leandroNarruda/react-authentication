import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { Button, TextField, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const FormLogin = () => {
    const classes = useStyles();
    const history = useHistory()

    const schema = yup.object().shape({
        email: yup.string().email('Email inválido').required('campo obrigatório!'),
        password: yup
            .string()
            .min(8, 'mínimo de 8 caracteres')
            .matches(
                /^((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                'Senha deve conter ao menos uma letra mínuscula, uma letra maiúscula, um número e um caractere especial!'
            )
            .required("campo obrigatório!")
    })

    const { register, handleSubmit, errors, reset } = useForm({
        resolver:yupResolver(schema)
    })

    const handleForm = data => {
        // console.log(data)
        axios.post('https://kenziehub.me/sessions',data)
        .then(
            response => {
                sessionStorage.clear()
                sessionStorage.setItem('token', JSON.stringify(response.data.token))
                reset()
                history.push('/home')
            }
        )
        .catch(
            e => console.log(e)
        )
    }

    return (
        <form onSubmit = {handleSubmit(handleForm)} >
            <div>
                <TextField 
                    margin = 'normal'
                    variant = 'outlined'
                    label = 'Email'
                    name = 'email'
                    size = 'small'
                    color = 'primary'
                    inputRef = {register}
                    error = {!!errors.email}
                    helperText = {errors.email?.message}
                />
            </div>
            <div>
                <TextField 
                    margin = 'normal'
                    variant = 'outlined'
                    label = 'Senha'
                    name = 'password'
                    size = 'small'
                    color = 'primary'
                    inputRef = {register}
                    error = {!!errors.password}
                    helperText = {errors.password?.message}
                />
            </div>
            <div className={classes.root}>
                <Button type='submit' variant='contained' color='primary' >Entrar</Button>
            </div>
            <div className={classes.root}>
                <Button onClick={() => history.push('/register')} color='primary' >Cadastre-se</Button>
            </div>
        </form>
    )

}

export default FormLogin