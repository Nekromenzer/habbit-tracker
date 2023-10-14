import { useState } from 'react'
import { Button, Form, Input, notification, InputNumber } from 'antd'
import handleApiCall from '../../api/handleApiCall'
import { FaSadCry } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import LoadingAnimation from '../../components/LoadingAnimation'

const loggedUserEmail = localStorage.getItem('user_email')
const adminEmail = import.meta.env.VITE_ADMIN_EMAIL

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const openNotification = code => {
    console.log(code)
    notification.open({
      message: 'Something went wrong!',
      icon: <FaSadCry className='text-yellow-500' />,
      description:
        code === 400
          ? isSignIn
            ? 'Invalid Email or password!'
            : 'User already exists.'
          : 'Please try again or re-log to prevent this error',
      onClick: () => {
        console.log('Notification Clicked!')
      }
    })
  }

  const handleCallBack = (data, status) => {
    if (status === 200) {
      localStorage.setItem('userToken', data.data.token)
      // Redirect to dashboard page
      if (adminEmail === loggedUserEmail) {
        navigate('/admin', { replace: true })
      } else {
        navigate('/')
      }
      // Reload the page after navigation
      window.location.reload()
    } else {
      openNotification(status)
    }
  }

  const onFinish = values => {
    // store email in local storage
    localStorage.setItem('user_email', values.email)

    const signUpDataObj = {
      name: values.name,
      email: values.email,
      password: values.password,
      job_type: values.job_type,
      age: values.age,
      height: values.height,
      weight: values.weight
    }
    if (isSignIn) {
      //login
      handleApiCall({
        urlType: 'login',
        variant: 'user',
        setLoading,
        data: values,
        cb: (data, status) => {
          handleCallBack(data, status)
        }
      })
    } else {
      // registering
      handleApiCall({
        urlType: 'register',
        variant: 'user',
        setLoading,
        data: signUpDataObj,
        cb: (data, status) => {
          if (status === 200) {
            setIsSignIn(true)
            notification.open({
              message: 'Account created successfully!',
              description: 'You can login now.',
              onClick: () => {
                console.log('Notification Clicked!')
              }
            })
          } else {
            openNotification(status)
          }
        }
      })
    }
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const formItemStyles = {
    marginBottom: isSignIn ? '20px' : '5px'
  }

  const [form] = Form.useForm()

  return (
    <div className='h-screen flex items-center justify-center scale-75 2xl:scale-100'>
      <LoadingAnimation
        loading={loading}
        tip={isSignIn ? 'Logging....' : 'Registering...'}
      >
        <div className='w-[35rem] rounded-xl shadow-md cursor-pointer p-4 py-8 bg-white'>
          <img
            width='100'
            height='100'
            src='https://img.icons8.com/external-flaticons-lineal-color-flat-icons/100/external-habit-lifestyles-flaticons-lineal-color-flat-icons-3.png'
            alt='external-habit-lifestyles-flaticons-lineal-color-flat-icons-3'
            className='mx-auto'
          />
          {/* header */}
          <h4 className='text-center text-xl font-semibold text-green-500 tracking-wider capitalize pb-4 border-b-2'>
            Habit Tracker
          </h4>
          <div className='text-center text-2xl font-mono font-semibold text-slate-500 py-2'>
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </div>
          <Form
            form={form}
            name={isSignIn ? 'SignIn' : 'SignUp'}
            preserve
            labelCol={{
              span: 24
            }}
            wrapperCol={{
              span: 24
            }}
            style={{
              maxWidth: 600
            }}
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='on'
          >
            {!isSignIn && (
              <Form.Item
                label='Name'
                name='name'
                rules={[
                  { required: !isSignIn, message: 'Please enter your name' }
                ]}
                style={formItemStyles}
              >
                <Input />
              </Form.Item>
            )}

            <Form.Item
              label='Email'
              name='email'
              rules={[
                { required: true, message: 'Please enter your email!' },
                {
                  type: 'email',
                  message: 'Please enter valid E-mail!'
                }
              ]}
              style={formItemStyles}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[
                { required: true, message: 'Please enter your password!' },
                { min: 5, message: 'Password must be minimum 5 characters.' },
                { max: 20, message: 'Password must be maximum 20 characters.' }
              ]}
              hasFeedback
              style={formItemStyles}
            >
              <Input.Password />
            </Form.Item>

            {!isSignIn && (
              <>
                <Form.Item
                  name='confirm'
                  label='Confirm Password'
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: !isSignIn,
                      message: 'Please confirm your password!'
                    },
                    ({ getFieldValue }) => ({
                      validator (_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(
                          new Error(
                            'The new password that you entered do not match!'
                          )
                        )
                      }
                    })
                  ]}
                  style={formItemStyles}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label='Job type'
                  name='job_type'
                  rules={[
                    {
                      required: !isSignIn,
                      message: 'Please enter your Job Type!'
                    }
                  ]}
                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)'
                  }}
                >
                  <Input placeholder='IT' />
                </Form.Item>

                <Form.Item
                  label='Age'
                  name='age'
                  rules={[
                    {
                      required: !isSignIn,
                      message: 'Please enter your Age!'
                    }
                  ]}
                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                    margin: '0 8px',
                    marginBottom: '5px'
                  }}
                >
                  <InputNumber
                    placeholder='21'
                    className='w-full'
                    suffix='years'
                  />
                </Form.Item>

                <Form.Item
                  label='Height'
                  name='height'
                  rules={[
                    {
                      required: !isSignIn,
                      message: 'Please enter your Height!'
                    }
                  ]}
                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)'
                  }}
                >
                  <InputNumber
                    placeholder='169cm'
                    className='w-full'
                    suffix='cm'
                  />
                </Form.Item>

                <Form.Item
                  label='Weight'
                  name='weight'
                  rules={[
                    {
                      required: !isSignIn,
                      message: 'Please enter your Weight!'
                    }
                  ]}
                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                    margin: '0 8px'
                  }}
                >
                  <InputNumber
                    placeholder='60kg'
                    className='w-full'
                    suffix='kg'
                  />
                </Form.Item>
              </>
            )}

            {/* submit */}
            <Form.Item
              wrapperCol={{
                span: 24
              }}
              className='!flex justify-center'
            >
              <Button
                size='middle'
                type='primary'
                htmlType='submit'
                className='!mt-6 w-[10rem] bg-blue-800 !ml-auto'
              >
                {isSignIn ? 'Sign In' : 'Sign Up'}
              </Button>
            </Form.Item>
          </Form>
          <div className='flex gap-4 mt-6 justify-center'>
            <span>
              {isSignIn
                ? "Don't you have account ?"
                : 'Already have an account'}
            </span>
            <span
              onClick={() => {
                form.resetFields()
                setIsSignIn(!isSignIn)
              }}
              className='text-blue-500 underline'
            >
              {isSignIn ? 'Register' : 'Login'}
            </span>
          </div>
        </div>
      </LoadingAnimation>
    </div>
  )
}

export default SignIn
