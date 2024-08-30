import { useState } from 'react';
import { Paper, Text, Button, Center, Stack} from '@mantine/core';
import ColoredInputBars from "../components/customInputs/ColoredInputBars.jsx";
import {isNotEmpty, useForm} from "@mantine/form";
import {useNavigate} from "react-router-dom";
import { useAuth } from '../providers/AuthProvider.jsx';
import { Navigate } from 'react-router-dom';

/**
 * The Login page renders the user login interface, allowing admins to authenticate
 * themselves into the application.
 * 
 * @returns {JSX.Element} The Login page.
 */
function Login() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {token, tryLogin} = useAuth();
    const form = useForm({
        mode: "uncontrolled",
        
        validate: {
            user: isNotEmpty('Informe o usuário'),
            password: isNotEmpty('Informe a senha')
        }
    });

    if (token) {
        return <Navigate to='/admin' replace />
    }

    function onSubmit(values){
        values ={
            user: values.user.trim(),
            password: values.password
        }
        setLoading(true);
        setError('');
        tryLogin(values)
            .then(_ => {
                navigate('/admin')
            })
            .catch(err => {
                setLoading(false);
                if (err.response?.status !== 401){
                    console.error("Login error:", err.response.data.message);
                }
                setError(err.response.data.message);
            });
    }

    return (
        <Center h='100%'>
            <Paper
                h='350px'
                w='280px'
                bg="aprai-purple.9"
                p={{ base: 'xs', xs: 'md' }}
                radius="xl"
                >
                <Text ta="center" fz='30px' c='white'>
                    Login
                </Text> 
                <Stack p='20px' align='center' justify='center' component={'form'} onSubmit={form.onSubmit(onSubmit)}>
                    <ColoredInputBars 
                        placeholder = "Usuário"
                        {...form.getInputProps('user')}
                    />
                    <ColoredInputBars 
                        placeholder = "Senha"
                        type='password'
                        {...form.getInputProps('password')}    
                    />
                    <Button
                        mt='20px'
                        justify='center'
                        variant='white'
                        h='50px'
                        w='200px'
                        fz='20px'
                        radius='lg'
                        type='submit'
                        loading={loading}
                    >
                        Entrar
                    </Button>
                    {error && (
                        <Text c='red'>
                            {error}
                        </Text>
                    )}
                </Stack>
            </Paper>
        </Center>
  );
}

export default Login;