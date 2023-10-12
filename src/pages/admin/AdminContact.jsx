import React, { useEffect, useState } from 'react'
import PageWrapper from '../../components/PageWrapper'
import { Table, notification } from 'antd'
import { FaSadCry } from 'react-icons/fa'
import handleApiCall from '../../api/handleApiCall'

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

const AdminContact = () => {
  const [tableData, setTableData] = useState(dataSource)
  const [loading, setLoading] = useState(false)

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
    }
  ]

  const handleFetchData = () => {
    handleApiCall({
      urlType: 'getUsersQuestions',
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

  useEffect(() => {
    handleFetchData()
  }, [])
  return (
    <PageWrapper header='User Contacts'>
      <Table dataSource={tableData} columns={columns} loading={loading} />
    </PageWrapper>
  )
}

export default AdminContact
