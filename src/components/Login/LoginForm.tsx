import { Button, Checkbox, Form, Input, Modal, Typography, Select } from 'antd'
import type { FormProps } from 'antd'
import { useState, forwardRef, useImperativeHandle } from 'react'

type FieldType = {
  username?: string
  verificationCode?: string
  remember?: string
}

export interface LoginFormRef {
  show: () => void
  hide: () => void
}

const LoginForm = forwardRef<LoginFormRef>(function LoginForm(_, ref) {
  const [open, setOpen] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useImperativeHandle(ref, () => ({
    show: () => setOpen(true),
    hide: () => setOpen(false),
  }))

  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    console.log('Success:', values)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Modal open={open} closable={false} footer={null} centered>
      <Typography.Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
        手机验证码登录
      </Typography.Title>
      <Form
        name='basic'
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item name='username' rules={[{ required: true, message: '请输入手机号!' }]}>
          <Input
            placeholder='请输入手机号'
            size='large'
            addonBefore={
              <Form.Item name='prefix' noStyle initialValue='+86'>
                <Select style={{ width: 70 }}>
                  <Select.Option value='+86'>+86</Select.Option>
                  <Select.Option value='+1'>+1</Select.Option>
                  <Select.Option value='+852'>+852</Select.Option>
                </Select>
              </Form.Item>
            }
          />
        </Form.Item>

        <Form.Item name='verificationCode' rules={[{ required: true, message: '请输入验证码!' }]}>
          <Input
            placeholder='请输入验证码'
            size='large'
            allowClear
            suffix={
              <Typography.Link
                disabled={countdown > 0}
                onClick={() => {
                  setCountdown(60)
                  const timer = setInterval(() => {
                    setCountdown(prev => {
                      if (prev <= 1) clearInterval(timer)
                      return prev - 1
                    })
                  }, 1000)
                }}
              >
                {countdown > 0 ? `${countdown}秒后重获` : '获取验证码'}
              </Typography.Link>
            }
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' block>
            登录
          </Button>
        </Form.Item>

        <Form.Item<FieldType> name='remember' valuePropName='checked'>
          <Checkbox>我已阅读并同意用户协议</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default LoginForm
