/* eslint-disable react/no-unescaped-entities */
import { Button, Collapse, Form, Input } from 'antd'
import PageWrapper from '../../components/PageWrapper'

const Faq = () => {
  const items = [
    {
      key: '1',
      label: 'How do I add a new habit?',
      children: (
        <div>
          To add a new habit, follow these steps:
          <ol>
            <li>Click on the "Add Habit" button.</li>
            <li>Enter the name and details of your new habit.</li>
            <li>Set a frequency or schedule for tracking the habit.</li>
            <li>Click the "Save" button to add the habit to your list.</li>
          </ol>
        </div>
      )
    },
    {
      key: '2',
      label: 'How do I track my habits?',
      children: (
        <div>
          Tracking your habits is easy:
          <ol>
            <li>Go to your habit list.</li>
            <li>Find the habit you want to track.</li>
            <li>Click the "Track" button next to the habit.</li>
            <li>Mark each day you successfully complete the habit.</li>
          </ol>
        </div>
      )
    },
    {
      key: '3',
      label: 'Can I edit or delete a habit?',
      children: (
        <div>
          Yes, you can edit or delete a habit:
          <ol>
            <li>Go to your habit list.</li>
            <li>Find the habit you want to edit or delete.</li>
            <li>
              Click the "Edit" button to make changes, or "Delete" to remove it.
            </li>
          </ol>
        </div>
      )
    },
    {
      key: '4',
      label: 'Is my habit data secure?',
      children: (
        <div>
          Yes, your habit data is securely stored. We prioritize the privacy and
          security of your information.
        </div>
      )
    },
    {
      key: '5',
      label: 'Can I set reminders for my habits?',
      children: (
        <div>
          Absolutely! You can set reminders for your habits to help you stay on
          track. Just edit the habit and set a reminder time.
        </div>
      )
    },
    {
      key: '6',
      label: 'What happens if I miss a day of habit tracking?',
      children: (
        <div>
          Don't worry, missing a day won't erase your progress. You can continue
          tracking your habit from where you left off.
        </div>
      )
    },
    {
      key: '7',
      label: 'Can I export my habit data?',
      children: (
        <div>
          Yes, you can export your habit data in various formats for your
          records or analysis.
        </div>
      )
    },
    {
      key: '8',
      label: 'Is there a mobile app available?',
      children: (
        <div>
          Yes, we have a mobile app available for both iOS and Android devices.
          You can download it from the app stores.
        </div>
      )
    },
    {
      key: '9',
      label: 'How can I get support if I have an issue?',
      children: (
        <div>
          If you encounter any issues or have questions, please reach out to our
          support team through the app or our website.
        </div>
      )
    },
    {
      key: '10',
      label: 'Can I share my progress with friends?',
      children: (
        <div>
          Yes, you can share your habit progress with friends and even challenge
          them to build healthy habits together.
        </div>
      )
    },
    {
      key: '11',
      label: 'Is there a premium version of the app?',
      children: (
        <div>
          Yes, we offer a premium version with additional features and benefits.
          You can upgrade within the app.
        </div>
      )
    },
    {
      key: '12',
      label: 'How can I change my profile settings?',
      children: (
        <div>
          To update your profile settings, go to your profile page and click on
          the "Edit Profile" button to make changes.
        </div>
      )
    },
    {
      key: '13',
      label: 'What do I do if I forget my password?',
      children: (
        <div>
          If you forget your password, you can use the "Forgot Password" option
          on the login page to reset it.
        </div>
      )
    }
  ]
  const [form] = Form.useForm()
  return (
    <PageWrapper header='Frequently asked questions'>
      <div className='mb-6'>
        <Form form={form} name='add-habit' layout='inline'>
          <Form.Item
            name='question'
            label='Ask a question'
            rules={[
              {
                required: true,
                message: 'Please type your question!'
              }
            ]}
            className='xl:min-w-[50%]'
          >
            <Input placeholder='ask question , reply will get to your email soon' />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 24
            }}
          >
            <Button
              size='middle'
              type='primary'
              htmlType='submit'
              className=' w-[10rem] bg-blue-800'
            >
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Collapse items={items} defaultActiveKey={['1']} />
    </PageWrapper>
  )
}

export default Faq
