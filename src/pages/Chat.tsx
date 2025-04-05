import { useState, useRef, useEffect } from 'react'
// import OpenAI from 'openai';
// type ChatCompletionMessageParam = OpenAI.Chat.Completions.ChatCompletionMessageParam;
import { Sender, Bubble, ThoughtChain, Prompts, PromptsProps } from '@ant-design/x'
import { CoffeeOutlined, FireOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'
import { Flex, GetProp, GetRef, Space, Spin, Typography } from 'antd'
import { BubbleDataType } from '@ant-design/x/es/bubble/BubbleList'
import markdownit from 'markdown-it'
import firstMd from '../assets/messages/first.md?raw'

const md = markdownit({
  html: true,
})

export default function Chat() {
  const [messages, setMessages] = useState<Array<BubbleDataType>>([
    {
      role: 'user',
      content: '请帮我规划一下五一取厦门旅游的行程攻略',
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
      content: '一家三口，4.29号出发，5天行程，预算5000元，推荐一些值得去的景点',
    },
    // { role: 'user', text: '帮我规划去清明去北京的旅游攻略' },
    // {
    //     role: 'assistant',
    //     contents: [{
    //         type: 'thought-chain',
    //         content: [
    //             { text: '好的，我来帮你规划一下。' },
    //             { text: '请问你打算去北京几天？' },
    //             { text: '你对哪些景点感兴趣？' },
    //             { text: '你希望的预算是多少？' },
    //         ],
    //     }],
    //     text: '<think>好的</think>Hello! How can I help you?'
    // },
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
        maxWidth: 600,
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
        maxWidth: 600,
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
    <div className='flex items-center justify-center min-h-3/4 bg-gray-100 p-4'>
      <div className='relative w-full max-w-md h-[800px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col'>
        {/* Chat messages area */}
        <div className='flex-1 overflow-y-auto p-4 space-y-2'>
          <Bubble.List ref={listRef} roles={roles} items={messages}></Bubble.List>
          <div ref={messagesEndRef} />
        </div>

        {/* Input area fixed at bottom */}
        <div className='p-3 border-t border-gray-200 bg-white'>
          <div className='flex space-x-2'>
            <Sender value={inputValue} onChange={setInputValue} onSubmit={onSendMessage} />
          </div>
        </div>
      </div>
    </div>
  )
}
