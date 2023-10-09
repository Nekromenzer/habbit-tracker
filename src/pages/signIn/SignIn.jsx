import { useState } from 'react'
import { Button, Form, Input } from 'antd'

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true)

  const onFinish = values => {
    console.log('Success:', values)
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const formItemStyles = {
    marginBottom: isSignIn ? '20px' : '5px'
  }

  const [form] = Form.useForm()

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='w-[35rem] rounded-lg shadow-md cursor-pointer p-4 py-8'>
        {/* header */}
        <h4 className='text-center text-3xl font-semibold text-green-500 tracking-wider capitalize pb-4 border-b-2'>
          Habit Tracker
        </h4>
        <div className='text-center text-2xl font-mono font-semibold text-slate-500 py-2'>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </div>
        <Form
          form={form}
          name={isSignIn ? 'SignIn' : 'SignUp'}
          preserve={false}
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
          autoComplete='off'
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
              { min: 6, message: 'Password must be minimum 6 characters.' },
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
                <Input placeholder='21' />
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
                <Input placeholder='169cm' />
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
                <Input placeholder='60kg' />
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
    </div>
  )
}

export default SignIn
