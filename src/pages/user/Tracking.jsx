/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import {
  Form,
  Input,
  InputNumber,
  Table,
  Typography,
  Progress,
  DatePicker,
  notification
} from 'antd'
import PageWrapper from '../../components/PageWrapper'
import { BiCommentAdd } from 'react-icons/bi'
import dayjs from 'dayjs'
import handleApiCall from '../../api/handleApiCall'
import { FaSadCry } from 'react-icons/fa'
import { red, green, blue, yellow } from '@ant-design/colors'

// const originData = []
// for (let i = 0; i < 11; i++) {
//   originData.push({
//     key: i.toString(),
//     name: `Edward ${i}`,
//     description:
//       'Defining types for component props improves reusability of your components by validating received data',
//     target_value: 20 + 1,
//     log: 0
//   })
// }

// date format
const dateFormat = 'YYYY-MM-DD'
// today date
const todayDate = dayjs().format(dateFormat)

const Tracking = () => {
  const [form] = Form.useForm()
  // const [data, setData] = useState(originData)
  const [editingKey, setEditingKey] = useState('')
  const [date, setDate] = useState(todayDate)
  const [loading, setLoading] = useState(false)
  // table data
  const [tableData, setTableData] = useState([])
  // all habit  list
  const [allHabitList, setAllHabitList] = useState([])
  // logged habits
  const [loggedHabits, setLoggedHabits] = useState([])

  const openNotification = () => {
    notification.open({
      message: 'Something went wrong!',
      icon: <FaSadCry className='text-yellow-500' />,
      description: 'Please try again or re-log to prevent this error',
      onClick: () => {
        console.log('Notification Clicked!')
      }
    })
  }

  const isEditing = record => record.key === editingKey

  const edit = record => {
    form.setFieldsValue({
      log: '',
      ...record
    })
    setEditingKey(record.key)
  }

  const EditableCell = ({
    editing,
    dataIndex,
    // title,
    inputType,
    // record,
    // index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0
            }}
            rules={[
              {
                required: true,
                message: `Required!`
              }
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    )
  }

  const cancel = () => {
    setEditingKey('')
  }

  // edit save function
  const save = async key => {
    try {
      const row = await form.validateFields()
      const newData = [...tableData]
      const index = newData.findIndex(item => key === item.key)
      if (index > -1) {
        console.log(row, 'row')
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row
        })
        setTableData(newData)
        // call api
        handleLogHabitProgress(item.key, row.log)
        // clean table val
        setEditingKey('')
      } else {
        newData.push(row)
        setTableData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      editable: false,
      width: '10rem'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      editable: false,
      width: '14rem'
    },
    {
      title: 'Log Date',
      dataIndex: 'log_date',
      editable: false,
      width: '6rem',
      render: (_, record) => {
        const date = record?.log_date
        const logged = record?.log !== null
        return (
          <>
            {date && logged ? (
              dayjs(date).format('DD MMM YYYY')
            ) : (
              <div className='text-yellow-700 font-mono text-sm'>
                Not logged
              </div>
            )}
          </>
        )
      }
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      width: '20%',
      editable: false,
      render: (_, record) => {
        const twoColors = {
          '0%': '#108ee9',
          '100%': '#87d068'
        }
        const log = record.log
        const target = record.target_value
        const completed = log === null ? 0 : (log / target) * 100
        return (
          <Progress
            percent={completed}
            showInfo={false}
            strokeColor={twoColors}
          />
        )
      }
    },
    {
      title: 'Target Value',
      dataIndex: 'target_value',
      width: '6rem',
      editable: false
    },
    {
      title: 'Log (hrs)',
      dataIndex: 'log',
      width: '8rem',
      editable: true
    },
    {
      title: 'Add log',
      dataIndex: 'add_log',
      width: '8rem',
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8
              }}
            >
              Save
            </Typography.Link>
            <Typography.Link
              onClick={() => cancel()}
              className='!text-slate-800'
            >
              Cancel
            </Typography.Link>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            <BiCommentAdd className='text-xl text-blue-500 hover:text-blue-400 cursor-pointer' />
          </Typography.Link>
        )
      }
    }
  ]

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: record => ({
        record,
        inputType:
          col.dataIndex === 'target_value' || col.dataIndex === 'log'
            ? 'number'
            : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })

  // fetch all habits
  const fetchHabit = () => {
    handleApiCall({
      urlType: 'getUserHabit',
      variant: 'habit',
      setLoading,
      cb: (data, status) => {
        if (status === 200) {
          setAllHabitList(data.result)
        } else {
          openNotification(status)
        }
      }
    })
  }

  // fetch logged habits
  const fetchHabitProgress = date => {
    handleApiCall({
      urlType: 'getHabitProgress',
      variant: 'habit',
      setLoading,
      urlParams: `/${date}`,
      cb: (data, status) => {
        if (status === 200) {
          setLoggedHabits(data?.result)
        } else {
          openNotification()
        }
      }
    })
  }

  // log habit progress
  const handleLogHabitProgress = (habitId, log) => {
    handleApiCall({
      urlType: 'logHabitProgress',
      variant: 'habit',
      setLoading,
      urlParams: `/${habitId}`,
      data: {
        completed_value: log
      },
      cb: (data, status) => {
        if (status === 200) {
          // update table
          fetchHabitProgress(date || todayDate)
        } else {
          openNotification()
        }
      }
    })
  }

  const combinedArray = allHabitList?.map(mainItem => {
    // Find the matching item in loggedarray by user_habit_id
    const matchingLoggedItem = loggedHabits.find(
      loggedItem => loggedItem.user_habit_id === mainItem._id
    )

    // Create a new object with the desired properties
    return {
      name: mainItem.name,
      description: mainItem.description,
      log_date: matchingLoggedItem ? matchingLoggedItem.log_date : null,
      log: matchingLoggedItem ? matchingLoggedItem.completed_value : 0,
      key: mainItem._id,
      target_value: mainItem.target_value
    }
  })

  useEffect(() => {
    setTableData(combinedArray)
  }, [loggedHabits])

  useEffect(() => {
    fetchHabitProgress(todayDate)
    fetchHabit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(tableData, 'tableData')

  return (
    <PageWrapper header='TRACKING'>
      <div className='mb-4 flex gap-4'>
        <div className='text-[1rem]'>Filter by:</div>
        <DatePicker
          defaultValue={dayjs(todayDate, dateFormat)}
          format={dateFormat}
          onChange={(date, dateString) => {
            fetchHabitProgress(dateString)
            setDate(dateString)
          }}
          allowClear={false}
        />
      </div>
      {/* table */}
      <Form form={form} component={false} name='table-edit'>
        <Table
          bordered
          loading={loading}
          size='small'
          components={{
            body: {
              cell: EditableCell
            }
          }}
          dataSource={tableData.reverse()}
          columns={mergedColumns}
          rowClassName='editable-row'
          pagination={{
            onChange: cancel
          }}
        />
      </Form>
    </PageWrapper>
  )
}

export default Tracking
