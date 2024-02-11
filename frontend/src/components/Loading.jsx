import { Spin } from 'antd'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex h-screen gap-3 items-center justify-center'>
        <Spin size="large" />
        <Spin size="large" />
        <Spin size="large" />
    </div>
  )
}

export default Loading