import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { Button, TextField, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const FormTechs = () => {
    const [token] = useState(() => {
        const sessionToken = sessionStorage.getItem('token') || ""
        return JSON.parse(sessionToken)
    })
    const classes = useStyles()
    const history = useHistory()

    const schema = yup.object().shape({
        title: yup.string().required('campo obrigatório!'),
        status: yup.string().required("campo obrigatório!")
    })

    const { register, handleSubmit, errors, reset } = useForm({
        resolver:yupResolver(schema)
    })

    const handleForm = data => {
        axios.post('https://kenziehub.me/users/techs',data, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(
            response => {
                // console.log(response.data)
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
                    label = 'Tecnologia'
                    name = 'title'
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
                    label = 'Nível'
                    name = 'status'
                    size = 'small'
                    color = 'primary'
                    inputRef = {register}
                    error = {!!errors.password}
                    helperText = {errors.password?.message}
                />
            </div>
            <div className={classes.root}>
                <Button type='submit' variant='contained' color='primary' >Cadastrar</Button>
            </div>
        </form>
    )

}

export default FormTechs