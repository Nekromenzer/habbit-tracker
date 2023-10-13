import PageWrapper from '../../components/PageWrapper'
import {
  Form,
  Input,
  Button,
  Popconfirm,
  notification,
  InputNumber
} from 'antd'
import { useEffect, useState } from 'react'
import { AiOutlineWarning } from 'react-icons/ai'
import handleApiCall from '../../api/handleApiCall'
import { FaSadCry, FaSmile } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import LoadingAnimation from '../../components/LoadingAnimation'

const Profile = () => {
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const openNotification = () => {
    notification.open({
      message: 'Something went wrong!',
      icon: <FaSadCry className='text-yellow-500' />,
      description:
        'Try again with valid credentials or check your internet connection.',
      onClick: () => {
        console.log('Notification Clicked!')
      }
    })
  }

  // api call to get profile
  const handleGetUser = () => {
    handleApiCall({
      urlType: 'getProfile',
      variant: 'user',
      setLoading,
      cb: (data, status) => {
        if (status === 200) {
          // update table
          form.setFieldsValue({
            name: data.data.name,
            age: data.data.age,
            height: data.data.height,
            weight: data.data.weight,
            job_type: data.data.job_type
          })
        } else {
          openNotification()
        }
      }
    })
  }

  // api call to edit profile
  const onFinish = values => {
    const dataObj = {
      name: values.name,
      age: values.age,
      height: values.height,
      weight: values.weight,
      job_type: values.job_type
    }
    handleApiCall({
      urlType: 'editUser',
      variant: 'user',
      setLoading,
      data: dataObj,
      cb: (data, status) => {
        if (status === 200) {
          notification.open({
            message: 'Profile Updated!',
            icon: <FaSmile className='text-green-500' />,
            description: 'Profile updated successfully.'
          })
          // update profile
          handleGetUser()
        } else {
          openNotification()
        }
      }
    })
  }

  // api call to delete profile
  const handleProfileDelete = () => {
    handleApiCall({
      urlType: 'setAccountDelete',
      variant: 'user',
      setLoading,
      data: {
        description: reason
      },
      cb: (data, status) => {
        if (status === 200) {
          notification.open({
            message: 'Account Deleted!',
            icon: <MdCancel className='text-red-500' />,
            description: 'Account deleted request sent successfully to admin.'
          })
          setReason('')
          localStorage.removeItem('userToken')
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        } else {
          setReason('')
          openNotification()
        }
      }
    })
  }

  //  form submit failed dev info
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const formItemStyles = {
    marginBottom: '25px'
  }

  useEffect(() => {
    handleGetUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageWrapper header='Profile'>
      <LoadingAnimation
        loading={loading}
        tip={reason.length ? 'Deleting profile' : 'Updating profile'}
      >
        <div className='flex flex-wrap gap-[15rem]'>
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
              <InputNumber placeholder='21' suffix='years' className='w-full' />
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
              <InputNumber placeholder='169cm' suffix='cm' className='w-full' />
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
              <InputNumber placeholder='60kg' suffix='kg' className='w-full' />
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
                Update Profile
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
              onConfirm={() => handleProfileDelete()}
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
      </LoadingAnimation>
    </PageWrapper>
  )
}

export default Profile
