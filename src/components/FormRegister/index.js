import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { Button, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom'


const FormRegister = () => {
    const history = useHistory()

    const schema = yup.object().shape({
        email: yup.string().email('Email inválido').required('campo obrigatório!'),
        name: yup.string().required('campo obrigatório!'),
        bio: yup.string().required('campo obrigatório!'),
        course_module: yup.string().required('campo obrigatório!'),
        contact: yup.string().required('campo obrigatório!'),
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
        axios.post('https://kenziehub.me/users',data).then(
            response => {
                reset()
                history.push('/')
            }
        ).catch(
            e => console.log(e)
        )
    }

    return (
        <form onSubmit = {handleSubmit(handleForm)}>
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
                    label = 'Nome'
                    name = 'name'
                    size = 'small'
                    color = 'primary'
                    inputRef = {register}
                    error = {!!errors.name}
                    helperText = {errors.name?.message}
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
            <div>
                <TextField 
                    margin = 'normal'
                    variant = 'outlined'
                    label = 'Bio'
                    name = 'bio'
                    size = 'small'
                    color = 'primary'
                    inputRef = {register}
                    error = {!!errors.bio}
                    helperText = {errors.bio?.message}
                />
            </div>
            <div>
                <TextField 
                    margin = 'normal'
                    variant = 'outlined'
                    label = 'Contato'
                    name = 'contact'
                    size = 'small'
                    color = 'primary'
                    inputRef = {register}
                    error = {!!errors.contact}
                    helperText = {errors.contact?.message}
                />
            </div>
            <div>
                <TextField 
                    margin = 'normal'
                    variant = 'outlined'
                    label = 'Módulo do curso'
                    name = 'course_module'
                    size = 'small'
                    color = 'primary'
                    inputRef = {register}
                    error = {!!errors.course_module}
                    helperText = {errors.course_module?.message}
                />
            </div>
            <div>
                <Button type='submit' variant='contained' color='primary' > Enviar</Button>
            </div>
        </form>
    )
}

export default FormRegister