import { Col, Row, Avatar } from 'antd'
import { Outlet } from 'react-router'
import {
  BsFillClipboard2Fill,
  BsFillClipboard2PlusFill,
  BsFillClipboard2HeartFill,
  BsFillCaretDownFill
} from 'react-icons/bs'
import { BiSolidUser, BiSolidExit } from 'react-icons/bi'
import {
  TbLayoutSidebarLeftExpandFilled,
  TbLayoutSidebarRightExpandFilled
} from 'react-icons/tb'
import { FaRunning } from 'react-icons/fa'

import { Menu } from 'antd'
import { useState } from 'react'

function getItem (label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  }
}
const items = [
  getItem('Habits', 'habits', <FaRunning className='!text-[1.2rem]' />),
  {
    type: 'divider'
  },
  getItem('Profile', 'profile', <BiSolidUser className='!text-[1.2rem]' />),
  {
    type: 'divider'
  },
  getItem('Jobs', 'jobs', <BsFillClipboard2Fill className='!text-[1.2rem]' />, [
    getItem(
      'Add new',
      'new-vacancy',
      <BsFillClipboard2PlusFill className='!text-[1.2rem]' />
    ),
    getItem(
      'Posted',
      'posted-vacancy',
      <BsFillClipboard2HeartFill className='!text-[1.2rem]' />
    )
  ]),
  {
    type: 'divider'
  }
  // getItem(
  //   'Analytics',
  //   'grp',
  //   null,
  //   [getItem('jobs', '13'), getItem('Option 14', '14')],
  //   'group'
  // )
]

const Layout = () => {
  const [expand, setExpand] = useState(true)
  const onClick = e => {
    console.log('click ', e)
  }
  return (
    <Row>
      <Col
        span='auto'
        className='bg-blue-100 h-screen flex flex-col'
        style={{
          width: expand ? 256 : 60
        }}
      >
        <div
          className={`${
            expand ? 'px-[24px]' : 'mx-auto'
          } py-2 h-[4rem] mb-2 flex items-center gap-4`}
        >
          <Avatar
            draggable={false}
            size='large'
            src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
          />
          {expand && (
            <span className='text-md font-semibold'>James</span>
          )}
        </div>
        <Menu
          theme='light'
          inlineCollapsed={!expand}
          expandIcon={<BsFillCaretDownFill />}
          onClick={onClick}
          style={{
            width: expand ? 256 : 60
          }}
          defaultSelectedKeys={['habits']}
          defaultOpenKeys={['jobs']}
          mode='inline'
          items={items}
          className='bg-blue-100'
        />
        <div
          className={`px-2 py-2 h-[2rem] mt-auto flex gap-4 items-center cursor-pointer duration-300 transition ease-in delay-150 rounded ${
            expand ? 'mx-[24px]' : 'mx-auto'
          } mb-2 hover:bg-red-500 hover:shadow group`}
        >
          <BiSolidExit className='text-2xl group-hover:text-white' />
          {expand && (
            <span className='text-md font-semibold group-hover:text-white'>
              Logout
            </span>
          )}
        </div>
      </Col>
      <Col className='flex flex-col justify-center'>
        <div
          className='p-2 bg-blue-100 rounded-r cursor-pointer'
          onClick={() => setExpand(!expand)}
        >
          {!expand ? (
            <TbLayoutSidebarLeftExpandFilled className='text-2xl' />
          ) : (
            <TbLayoutSidebarRightExpandFilled className='text-2xl' />
          )}
        </div>
      </Col>
      <Col flex='auto' className=''>
        <Outlet />
      </Col>
    </Row>
  )
}

export default Layout
