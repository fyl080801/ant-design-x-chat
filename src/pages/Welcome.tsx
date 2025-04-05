import { useState, useRef, useEffect } from 'react';
import { Sender, Prompts, PromptsProps, Welcome } from '@ant-design/x';
import { MessageOutlined, InfoCircleOutlined, RocketOutlined, } from '@ant-design/icons';
import { BubbleDataType } from '@ant-design/x/es/bubble/BubbleList';

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
      content: 'Hello! How can I help you?',
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const items: PromptsProps['items'] = [
    {
      key: '1',
      icon: <MessageOutlined style={{ color: '#FFD700' }} />,
      label: '你可以让我设计旅行规划并一键预订',
      description: '为您提供专业的行程规划和一站式预订',
    },
    {
      key: '2',
      icon: <InfoCircleOutlined style={{ color: '#1890FF' }} />,
      label: '您可以找我分析数据',
      description: 'Help me understand the background of this topic.',
    },
    {
      key: '3',
      icon: <RocketOutlined style={{ color: '#722ED1' }} />,
      label: '您可以随时找我办事',
      description: '我是你的最佳办公助理，大事小事我都想',
    },
  ];

  const onSendMessage = () => { }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex items-center justify-center min-h-3/4 bg-gray-100 p-4">
      <div className="relative w-full max-w-md h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-2">

          <Prompts
            title={<Welcome title="我是 JoyMax" description="很高兴遇见你，我可以帮你做很多事情" />}
            items={items}
            vertical
            onItemClick={() => {
              // message.success(`You clicked a prompt: ${info.data.label}`);
            }}
          />
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
