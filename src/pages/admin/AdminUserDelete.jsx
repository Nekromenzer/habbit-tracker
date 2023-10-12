import { useEffect, useState } from 'react'
import PageWrapper from '../../components/PageWrapper'
import { Table, notification } from 'antd'
import { FaSadCry, FaSmile } from 'react-icons/fa'
import handleApiCall from '../../api/handleApiCall'
import { AiFillDelete } from 'react-icons/ai'

const AdminUserDelete = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street'
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street'
    }
  ]

  const [tableData, setTableData] = useState(dataSource)
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
          // update table
          setTableData(data)
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
      title: 'Question',
      dataIndex: 'question',
      key: 'question'
    },
    {
      title: 'Delete',
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
        'Try again with valid credentials or check your internet connection.',
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
