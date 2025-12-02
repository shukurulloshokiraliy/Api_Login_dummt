import { useForm, Controller } from "react-hook-form"
import { Button, Container, Input, Paper, Text, Stack, Box } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { API_DUMMY } from '../api/API'
import useAuthStore from '../store/useAuth'
import { Navigate } from 'react-router-dom'
import { IconLogin, IconUser, IconLock } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'

const Login = () => {
  const { login, isAuth } = useAuthStore()

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: 'emilys',
      password: 'emilyspass'
    }
  })

  const { mutate: loginMut } = useMutation({
    mutationFn: async (body) => {
      const res = await API_DUMMY.post('/auth/login', body);
      return res.data;
    }
  });

  if (isAuth) return <Navigate to="/" />

  const onSubmit = (data) => {
    loginMut(data, {
      onSuccess: (res) => login(res),
      onError: (err) => {
        notifications.show({
          title: err.response?.data?.message || 'Xatolik',
          color: 'red',
        })
      }
    })
  }

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Container size="xs">
        <Paper
          radius="lg"
          p={40}
          shadow="md"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          }}
        >

          {/* HEADER */}
          <Stack spacing="xs" mb={35} align="center">
            <Box
              style={{
                width: 70,
                height: 70,
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
              }}
            >
              <IconLogin size={38} color="white" />
            </Box>

            <Text
              fw={900}
              style={{
                fontSize: '1.9rem',
                color: 'white',
                letterSpacing: '1px'
              }}
            >
              Tizimga kirish
            </Text>

            <Text size="sm" c="gray.1">
              Iltimos, ma'lumotlarni kiriting
            </Text>
          </Stack>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="lg">

              {/* USERNAME */}
              <Controller
                name="username"
                control={control}
                rules={{
                  required: 'Username majburiy',
                  minLength: { value: 5, message: 'Kamida 5 belgi' }
                }}
                render={({ field }) => (
                  <Box>
                    <Input
                      {...field}
                      placeholder="Username"
                      size="lg"
                      radius="lg"
                      leftSection={<IconUser size={20} color="#fff" />}
                      styles={{
                        input: {
                          background: 'rgba(255,255,255,0.15)',
                          border: `1.7px solid ${errors.username ? '#ff6b6b' : 'rgba(255,255,255,0.25)'}`,
                          height: '50px',
                          paddingLeft: 45,
                          color: 'white',
                          transition: '0.25s',
                          '&::placeholder': { color: 'rgba(255,255,255,0.6)' },
                          '&:focus': {
                            borderColor: '#fff',
                            boxShadow: '0 0 10px rgba(255,255,255,0.35)',
                          }
                        }
                      }}
                    />
                    {errors.username && (
                      <Text size="sm" c="red" mt={5}>{errors.username.message}</Text>
                    )}
                  </Box>
                )}
              />

              {/* PASSWORD */}
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'Password majburiy',
                  minLength: { value: 6, message: 'Kamida 6 belgi' }
                }}
                render={({ field }) => (
                  <Box>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Parol"
                      size="lg"
                      radius="lg"
                      leftSection={<IconLock size={20} color="#fff" />}
                      styles={{
                        input: {
                          background: 'rgba(255,255,255,0.15)',
                          border: `1.7px solid ${errors.password ? '#ff6b6b' : 'rgba(255,255,255,0.25)'}`,
                          height: '50px',
                          paddingLeft: 45,
                          color: 'white',
                          transition: '0.25s',
                          '&::placeholder': { color: 'rgba(255,255,255,0.6)' },
                          '&:focus': {
                            borderColor: '#fff',
                            boxShadow: '0 0 10px rgba(255,255,255,0.35)',
                          }
                        }
                      }}
                    />
                    {errors.password && (
                      <Text size="sm" c="red" mt={5}>{errors.password.message}</Text>
                    )}
                  </Box>
                )}
              />

              {/* SUBMIT */}
              <Button
                type="submit"
                fullWidth
                radius="lg"
                size="lg"
                fw={700}
                style={{
                  background: 'linear-gradient(135deg, #6dd5fa, #2980b9)',
                  height: 52,
                  fontSize: '1.1rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
                  transition: '0.25s'
                }}
                styles={{
                  root: {
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 14px 30px rgba(0,0,0,0.3)'
                    }
                  }
                }}
              >
                Kirish
              </Button>

            </Stack>
          </form>

          {/* FOOTER */}
          <Text size="sm" align="center" c="gray.0" mt="lg">
            Hisobingiz yo'qmi?{' '}
            <a
              href="/register"
              style={{
                color: '#aee1ff',
                fontWeight: '700',
                textDecoration: 'none'
              }}
            >
              Ro‘yxatdan o‘ting
            </a>
          </Text>

        </Paper>
      </Container>
    </Box>
  )
}

export default Login
