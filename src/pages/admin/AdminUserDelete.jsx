import { useEffect, useState } from 'react'
import PageWrapper from '../../components/PageWrapper'
import { Table, notification } from 'antd'
import { FaSadCry, FaSmile } from 'react-icons/fa'
import handleApiCall from '../../api/handleApiCall'
import { AiFillDelete } from 'react-icons/ai'

const AdminUserDelete = () => {
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)

  const handleDeleteUserAccount = id => {
    handleApiCall({
      urlType: 'deleteUserAccount',
      variant: 'habit',
      urlParams: id,
      setLoading,
      cb: (data, status) => {
        if (status === 200) {
          notification.open({
            message: 'User Deleted!',
            icon: <FaSmile className='text-green-500' />,
            description: 'User deleted successfully.'
          })
          handleFetchData()
        } else {
          openNotification()
        }
      }
    })
  }

  const handleFetchData = () => {
    handleApiCall({
      urlType: 'getUserAccountDeleteRequests',
      variant: 'habit',
      setLoading,
      cb: (data, status) => {
        if (status === 200) {
          const modifiedData = data?.data?.map(item => ({
            ...item,
            key: item.user_id
          }))
          setTableData(modifiedData)
        } else {
          openNotification()
        }
      }
    })
  }

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
      width: '15rem'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '15rem'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Confirm Delete',
      dataIndex: '',
      key: 'delete',
      render: (_, record) => (
        <AiFillDelete
          onClick={() => handleDeleteUserAccount(record.key)}
          className='text-red-500 cursor-pointer text-[1rem]'
        />
      )
    }
  ]

  const openNotification = () => {
    notification.open({
      message: 'Something went wrong!',
      icon: <FaSadCry className='text-yellow-500' />,
      description:
        'Please try again or re-log to prevent this error',
      onClick: () => {
        console.log('Notification Clicked!')
      }
    })
  }

  useEffect(() => {
    handleFetchData()
  }, [])

  return (
    <PageWrapper header='User Account Delete Request'>
      <Table dataSource={tableData} columns={columns} loading={loading} />
    </PageWrapper>
  )
}

export default AdminUserDelete
