import { useState, useRef, useEffect } from 'react';
import { Sender, Bubble, ThoughtChain } from '@ant-design/x';
import { UserOutlined } from '@ant-design/icons';
import { Flex, GetProp, GetRef, Space, Spin } from 'antd';
import { BubbleDataType } from '@ant-design/x/es/bubble/BubbleList';


// const fooAvatar: React.CSSProperties = {
//     color: '#f56a00',
//     backgroundColor: '#fde3cf',
// };

// const barAvatar: React.CSSProperties = {
//     color: '#fff',
//     backgroundColor: '#87d068',
// };

export default function Chat() {
    const [messages,
        // setMessages
    ] = useState<Array<BubbleDataType>>([
        {
            role: 'user',
            content: 'hello'
        },
        {
            role: 'ai',
            content: '<think>好的</think>Hello! How can I help you?',
        }
        // { role: 'user', text: '帮我规划去清明去北京的旅游攻略' },
        // {
        //     role: 'ai',
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
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const listRef = useRef<GetRef<typeof Bubble.List>>(null);

    const roles: GetProp<typeof Bubble.List, 'roles'> = {
        ai: {
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
            messageRender: (content) => {

                if (/<think>/g.test(content)) {
                    const contentArray = content.split(/<\/?think>/g);
                    const result = contentArray.map((item, index) => {
                        if (index % 2 === 0) {
                            return <span key={index}>{item}</span>;
                        } else {
                            return <ThoughtChain collapsible={{
                                expandedKeys: ['1'],
                                onExpand: () => { }
                            }} items={[{
                                key: '1',
                                title: '思考完毕',
                                icon: null,
                                status: 'success',
                                content: item
                            }]} />
                        }
                    });
                    return <p>{result}</p>
                }

                return <p>{content}</p>
            },
            loadingRender: () => (
                <Space>
                    <Spin size="small" />
                    Custom loading...
                </Space>
            ),
            onMouseOver: (e) => {
                const footer = e.currentTarget.querySelector<HTMLDivElement>('.ant-bubble-footer div')

                if (footer) {
                    footer.style.visibility = 'visible';
                }
            },
            onMouseOut: (e) => {
                const footer = e.currentTarget.querySelector<HTMLDivElement>('.ant-bubble-footer div')

                if (footer) {
                    footer.style.visibility = 'hidden';
                }
            },
            footer: (
                <Flex className='w-auto' gap={4} style={{ visibility: 'hidden' }} >
                    <div>
                        耗时:89.00 秒
                    </div>
                    <div>
                        花费Token: 1,643
                    </div>
                    <div>
                        2025-04-03 16:56
                    </div>
                    {/* <Button
                        size="small"
                        type="text"
                        icon={<SyncOutlined />}
                        style={{ marginInlineEnd: 'auto' }}
                    /> */}
                    {/* <Button size="small" type="text" icon={<SmileOutlined />} />
                    <Button size="small" type="text" icon={<FrownOutlined />} /> */}
                </Flex>
            ),
        },
        user: {
            placement: 'end',
            avatar: { icon: <UserOutlined />, style: { background: '#87d068' } },
        },
    };


    // const handleSend = () => {
    //     if (inputValue.trim()) {
    //         setMessages([...messages, {  text: inputValue }]);
    //         setInputValue('');
    //     }
    // };

    const onSendMessage = () => { }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex items-center justify-center min-h-3/4 bg-gray-100 p-4">
            <div className="relative w-full max-w-md h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
                {/* Chat messages area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {/* {messages.map((msg, index) => (
                        <Bubble key={index} content={msg.text} placement={isAi(msg) ? 'start' : 'end'} avatar={{ icon: <UserOutlined />, style: isAi(msg) ? fooAvatar : barAvatar }} />
                    ))}
                    <Bubble content="aaa" placement="start" avatar={{ icon: <UserOutlined />, style: fooAvatar }}>
                        <ThoughtChain />
                    </Bubble> */}
                    <Bubble.List ref={listRef} roles={roles} items={messages}></Bubble.List>
                    <div ref={messagesEndRef} />
                </div>

                {/* Input area fixed at bottom */}
                <div className="p-3 border-t border-gray-200 bg-white">
                    <div className="flex space-x-2">
                        <Sender value={inputValue} onChange={setInputValue} onSubmit={onSendMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
}
