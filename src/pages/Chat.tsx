import { useState, useRef, useEffect } from 'react'
// import OpenAI from 'openai';
// type ChatCompletionMessageParam = OpenAI.Chat.Completions.ChatCompletionMessageParam;
import { Sender, Bubble, ThoughtChain, Prompts } from '@ant-design/x'
import { CoffeeOutlined, FireOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'
import { GetProp, GetRef, Space, Spin, Typography } from 'antd'
import { BubbleDataType } from '@ant-design/x/es/bubble/BubbleList'
import SimpleBarReact from 'simplebar-react'
import markdownit from 'markdown-it'
import firstMd from '../assets/messages/first.md?raw'
import resultMd from '../assets/messages/result.md?raw'
import 'simplebar-react/dist/simplebar.min.css'

const md = markdownit({
  html: true,
})

export default function Chat() {
  const [messages, setMessages] = useState<Array<BubbleDataType>>([
    {
      role: 'user',
      content: '请帮我规划一下五一去厦门旅游的行程攻略',
    },
    {
      role: 'assistant',
      content: firstMd,
    },
    {
      role: 'suggestion',
      content: [
        {
          key: '6',
          icon: <CoffeeOutlined style={{ color: '#964B00' }} />,
          description: '行程建议1',
        },
        {
          key: '7',
          icon: <SmileOutlined style={{ color: '#FAAD14' }} />,
          description: '行程建议2',
        },
        {
          key: '8',
          icon: <FireOutlined style={{ color: '#FF4D4F' }} />,
          description: '行程建议3',
        },
      ],
    },
    {
      role: 'user',
      content: '4.29号出发，一周行程，预算5000元，推荐一些值得去的景点',
    },
    {
      role: 'thought-chain',
      content: [
        {
          title: '规划一个为期一周去厦门的旅行计划',
          status: 'success',
        },
        {
          title: "搜索 '厦门一周旅行计划'. 找到相关链接",
          status: 'success',
        },
        {
          title: '尝试打开163.com的链接',
          status: 'error',
        },
        {
          title: '尝试打开知乎的链接',
          status: 'success',
        },
        {
          title: '现在在知乎问答页面上有关于一周厦门之旅的答案',
          status: 'success',
        },
      ],
    },
    {
      role: 'assistant',
      content: resultMd,
    },
    {
      role: 'suggestion',
      content: [
        {
          key: '6',
          icon: <CoffeeOutlined style={{ color: '#964B00' }} />,
          description: '帮我预定往返机票',
        },
        {
          key: '7',
          icon: <SmileOutlined style={{ color: '#FAAD14' }} />,
          description: '帮我预定酒店',
        },
        {
          key: '8',
          icon: <FireOutlined style={{ color: '#FF4D4F' }} />,
          description: '帮我预约相关景点的门票',
        },
      ],
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const listRef = useRef<GetRef<typeof Bubble.List>>(null)

  const roles: GetProp<typeof Bubble.List, 'roles'> = {
    assistant: {
      placement: 'start',
      avatar: { icon: <UserOutlined />, style: { background: '#fde3cf' } },
      typing: { step: 5, interval: 20 },
      style: {
        marginInlineEnd: 44,
      },
      styles: {
        footer: {
          width: '100%',
        },
      },
      messageRender: content => {
        return (
          <Typography>
            <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />
          </Typography>
        )
      },
      loadingRender: () => (
        <Space>
          <Spin size='small' />
          Custom loading...
        </Space>
      ),
      onMouseOver: e => {
        const footer = e.currentTarget.querySelector<HTMLDivElement>('.ant-bubble-footer div')

        if (footer) {
          footer.style.visibility = 'visible'
        }
      },
      onMouseOut: e => {
        const footer = e.currentTarget.querySelector<HTMLDivElement>('.ant-bubble-footer div')

        if (footer) {
          footer.style.visibility = 'hidden'
        }
      },
      // footer: (
      //   <Flex className='w-auto' gap={4} style={{ visibility: 'hidden' }}>
      //     <div>耗时:89.00 秒</div>
      //     <div>花费Token: 1,643</div>
      //     <div>2025-04-03 16:56</div>
      //     {/* <Button
      //                   size="small"
      //                   type="text"
      //                   icon={<SyncOutlined />}
      //                   style={{ marginInlineEnd: 'auto' }}
      //               /> */}
      //     {/* <Button size="small" type="text" icon={<SmileOutlined />} />
      //               <Button size="small" type="text" icon={<FrownOutlined />} /> */}
      //   </Flex>
      // ),
    },
    user: {
      placement: 'end',
      style: {
        marginInlineStart: 44,
      },
      avatar: { icon: <UserOutlined />, style: { background: '#87d068' } },
    },
    suggestion: {
      placement: 'start',
      avatar: { icon: <UserOutlined />, style: { visibility: 'hidden' } },
      variant: 'borderless',
      messageRender: items => <Prompts wrap items={items as any} />,
    },
    'thought-chain': {
      avatar: { icon: <UserOutlined />, style: { background: '#fde3cf' } },
      typing: { step: 5, interval: 20 },
      style: {
        marginInlineEnd: 44,
      },
      messageRender: (content: any) => {
        return <ThoughtChain items={content} collapsible />
      },
    },
  }

  // const handleSend = () => {
  //     if (inputValue.trim()) {
  //         setMessages([...messages, {  text: inputValue }]);
  //         setInputValue('');
  //     }
  // };

  const onSendMessage = async () => {
    if (!inputValue.trim()) return

    // const userMessage = { role: 'user', content: inputValue };
    // const aiMessage = { role: 'assistant', content: '' };

    // setMessages(prev => [...prev, userMessage, aiMessage]);
    // setInputValue('');

    // try {
    //   const openai = new OpenAI({
    //     apiKey: '',
    //     dangerouslyAllowBrowser: true,
    //     baseURL: '',
    //   });

    //   const historyMessages: ChatCompletionMessageParam[] = messages.map(m => ({
    //     role: m.role === 'user' ? 'user' : 'assistant',
    //     content: String(m.content)
    //   }));

    //   const stream = await openai.chat.completions.create({
    //     model: 'gpt-3.5-turbo',
    //     messages: [
    //       ...historyMessages,
    //       { role: 'user', content: inputValue }
    //     ],
    //     stream: true,
    //   });

    //   for await (const chunk of stream) {
    //     const content = chunk.choices[0]?.delta?.content || '';
    //     setMessages(prev => {
    //       const last = prev[prev.length - 1];
    //       if (last.role === 'assistant') {
    //         const newMessages = [...prev];
    //         newMessages[newMessages.length - 1] = {
    //           ...last,
    //           content: last.content + content
    //         };
    //         return newMessages;
    //       }
    //       return prev;
    //     });
    //   }
    // } catch (error) {
    //   console.error('Error calling OpenAI:', error);
    //   setMessages(prev => {
    //     const last = prev[prev.length - 1];
    //     if (last.role === 'assistant') {
    //       const newMessages = [...prev];
    //       newMessages[newMessages.length - 1] = {
    //         ...last,
    //         content: last.content + '\nError: Failed to get response'
    //       };
    //       return newMessages;
    //     }
    //     return prev;
    //   });
    // }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className='h-full w-full flex flex-col gap-8 p-4 overflow-hidden'>
      {/* Chat messages area */}
      <div className='flex-1 overflow-hidden'>
        <SimpleBarReact className='h-full pt-8'>
          <Bubble.List ref={listRef} roles={roles} items={messages}></Bubble.List>
          <div ref={messagesEndRef} />
        </SimpleBarReact>
      </div>

      {/* Input area fixed at bottom */}
      <div>
        <div className='flex space-x-2'>
          <Sender value={inputValue} onChange={setInputValue} onSubmit={onSendMessage} />
        </div>
      </div>
    </div>
  )
}
