import { Hono } from "hono";


type Message = {
    id: number
    message: string
    createdAt: Date
    isUser: boolean
}

const messages: Message[] = [
    {
      id: 1,
      message: 'This is a long test message to demonstrate the functionality of the message box component. It should be able to handle and display long messages without any issues.',
      createdAt: new Date(),
      isUser: true,
      
    },
    {
      id: 2,
      message: 'Another long test message to ensure that the message box component can handle multiple long messages. This message is also quite lengthy and should be displayed correctly.',
      createdAt: new Date(),
      isUser: false,
    },
    {
      id: 3,
      message: 'Here is a third long test message. The purpose of this message is to further test the message box component and make sure it can handle long text inputs.',
      createdAt: new Date(),
      isUser: true,
      
    },
    {
      id: 4,
      message: 'This is the fourth long test message. It is important to test with various long messages to ensure the component is robust and can handle different scenarios.',
      createdAt: new Date(),
      isUser: false,
    },
    {
      id: 5,
      message: 'Fifth long test message. This message is designed to test the message box component with a variety of long text inputs to ensure it works as expected.',
      createdAt: new Date(),
      isUser: true,
      
    },
    {
      id: 6,
      message: 'Sixth long test message. The goal is to verify that the message box component can handle long messages and display them properly without any issues.',
      createdAt: new Date(),
      isUser: false,
    },
    {
      id: 7,
      message: 'Seventh long test message. This message is another example of a long text input to test the message box component and ensure it functions correctly.',
      createdAt: new Date(),
      isUser: true,
    },
    {
      id: 8,
      message: 'Eighth long test message. Testing with multiple long messages helps to ensure that the message box component is reliable and can handle various scenarios.',
      createdAt: new Date(),
      isUser: false,
    },
    {
      id: 9,
      message: 'Ninth long test message. This message is part of the testing process to verify that the message box component can handle long text inputs without any issues.',
      createdAt: new Date(),
      isUser: true,
    },
    {
      id: 10,
      message: 'Tenth long test message. The purpose of this message is to ensure that the message box component can handle and display long messages correctly.',
      createdAt: new Date(),
      isUser: false,
    },
    {
      id: 11,
      message: 'Eighth long test message. Testing with multiple long messages helps to ensure that the message box component is reliable and can handle various scenarios.',
      createdAt: new Date(),
      isUser: false,
    },
    {
      id: 12,
      message: 'Ninth long test message. This message is part of the testing process to verify that the message box component can handle long text inputs without any issues.',
      createdAt: new Date(),
      isUser: true,
    },
    {
      id: 13,
      message: 'Tenth long test message. The purpose of this message is to ensure that the message box component can handle and display long messages correctly.',
      createdAt: new Date(),
      isUser: false,
    },
    {
        id: 14,
        message: 'Tenth long test message. The purpose of this message is to ensure that the message box component can handle and display long messages correctly.',
        createdAt: new Date(),
        isUser: true,
    }
  ]

const messagesApi = new Hono()
const messagesApiRouter = messagesApi.get('/', async (c) => {
    return c.json({
        items: messages
    })
})

export default messagesApiRouter