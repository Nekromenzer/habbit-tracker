import PageWrapper from '../../components/PageWrapper'
import { Form, Input, Button, Popconfirm } from 'antd'
import { useState } from 'react'
import { AiOutlineWarning } from 'react-icons/ai'

const Profile = () => {
  const [reason, setReason] = useState('')
  const onFinish = values => {
    console.log('Success:', values)
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const formItemStyles = {
    marginBottom: '25px'
  }

  const [form] = Form.useForm()
  return (
    <PageWrapper header='Profile'>
      <div className='flex gap-[15rem]'>
        <Form
          form={form}
          name='profile'
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
          <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true, message: 'Please enter your name' }]}
            style={formItemStyles}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Email'
            name='email'
            rules={[
              //   { required: true, message: 'Please enter your email!' },
              {
                type: 'email',
                message: 'Please enter valid E-mail!'
              }
            ]}
            style={formItemStyles}
          >
            <Input disabled />
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

          <Form.Item
            name='confirm'
            label='Confirm Password'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!'
              },
              ({ getFieldValue }) => ({
                validator (_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('The new password that you entered do not match!')
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
                required: true,
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
                required: true,
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
                required: true,
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
                required: true,
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
              className='!mt-8 w-[20rem] bg-blue-800 !ml-auto'
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className='rounded-xl p-4 py-8 bg-red-50  h-[10rem]  max-h-[20rem] w-[30rem] shadow'>
          <div className='flex gap-5 items-center'>
            <span className='text-xl'>Delete Account</span>
            <AiOutlineWarning className='text-red-500' />
          </div>
          <div className='tracking-wider text-sm py-2'>
            You cant revert this action!
          </div>
          <Popconfirm
            title='Please note reason for account delete'
            description={
              <div className='w-[30rem]'>
                <Input
                  placeholder='Description'
                  size='small'
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                />
              </div>
            }
            onConfirm={() => console.log('api call to delete account')}
            okButtonProps={{
              className: 'bg-red-500 hover:!bg-red-800',
              disabled: reason.length === 0
            }}
          >
            <Button type='primary' danger>
              Proceed to delete!
            </Button>
          </Popconfirm>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Profile
