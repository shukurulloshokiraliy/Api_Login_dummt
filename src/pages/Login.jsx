import { Button, Container, Input, Notification, PasswordInput, Paper, Text, Stack, Box } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { API_DUMMY } from '../api/API'
import useAuthStore from '../store/useAuth'
import { Navigate } from 'react-router-dom'
import { IconLogin, IconUser, IconLock } from '@tabler/icons-react'

const Login = () => {
    const {login, isAuth} = useAuthStore()
    const {mutate: loginMut } = useMutation({
        mutationFn: async (body) => {
            const res = await API_DUMMY.post('/auth/login', body);

            return res.data;
        }
    });

    if(isAuth) return <Navigate to="/" />

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            username: e.target[0].value,
            password: e.target[1].value,
        };

        loginMut(body, {
            onSuccess: (res) => {
                login(res);
                
            },
            onError: (err) => {
                notifications.show({
                    title: err.response.data.message || 'Xatolik',
                    color: 'red',
                })
            }
        })
    }

    return (
        <Box
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
            }}
        >
            <Container size="xs">
                <Paper
                    radius="xl"
                    p="xl"
                    shadow="xl"
                    style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    {/* Header */}
                    <Stack spacing="lg" mb="xl">
                        <Box
                            style={{
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto',
                                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                            }}
                        >
                            <IconLogin size={40} color="white" />
                        </Box>

                        <Box style={{ textAlign: 'center' }}>
                            <Text
                                size="xl"
                                fw={900}
                                style={{
                                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontSize: '2rem',
                                    marginBottom: '8px',
                                }}
                            >
                                Xush kelibsiz
                            </Text>
                            <Text size="md" color="dimmed" fw={500}>
                                Hisobingizga kiring
                            </Text>
                        </Box>
                    </Stack>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <Stack spacing="lg">
                            <Input
                                type="text"
                                name="username"
                                placeholder="Username kiriting"
                                defaultValue="emilys"
                                size="lg"
                                radius="xl"
                                leftSection={<IconUser size={20} style={{ color: '#667eea' }} />}
                                styles={{
                                    input: {
                                        border: '2px solid #e9ecef',
                                        padding: '12px 20px 12px 45px',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease',
                                        '&:focus': {
                                            borderColor: '#667eea',
                                            boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                                        },
                                    },
                                }}
                            />

                            <PasswordInput
                                placeholder="Password kiriting"
                                defaultValue="emilyspass"
                                size="lg"
                                radius="xl"
                                leftSection={<IconLock size={20} style={{ color: '#667eea' }} />}
                                styles={{
                                    input: {
                                        border: '2px solid #e9ecef',
                                        padding: '12px 20px 12px 45px',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease',
                                        '&:focus': {
                                            borderColor: '#667eea',
                                            boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                                        },
                                    },
                                }}
                            />

                            <Button
                                type="submit"
                                size="lg"
                                radius="xl"
                                fullWidth
                                fw={700}
                                style={{
                                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                    marginTop: '8px',
                                    height: '50px',
                                    fontSize: '1.1rem',
                                    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                                    transition: 'all 0.3s ease',
                                }}
                                styles={{
                                    root: {
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 12px 30px rgba(102, 126, 234, 0.5)',
                                        },
                                    },
                                }}
                            >
                                Kirish
                            </Button>
                        </Stack>
                    </form>

                    {/* Footer */}
                    <Box mt="xl" style={{ textAlign: 'center' }}>
                        <Text size="sm" color="dimmed">
                            Hisobingiz yo'qmi?{' '}
                            <Text
                                component="a"
                                href="/register"
                                fw={700}
                                style={{
                                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                }}
                            >
                                Ro'yxatdan o'ting
                            </Text>
                        </Text>
                    </Box>
                </Paper>

                {/* Decorative Elements */}
                <Box
                    style={{
                        position: 'absolute',
                        top: '10%',
                        left: '10%',
                        width: '100px',
                        height: '100px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        filter: 'blur(40px)',
                        zIndex: 0,
                    }}
                />
                <Box
                    style={{
                        position: 'absolute',
                        bottom: '20%',
                        right: '15%',
                        width: '150px',
                        height: '150px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        filter: 'blur(60px)',
                        zIndex: 0,
                    }}
                />
            </Container>
        </Box>
    )
}

export default Login