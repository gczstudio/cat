/**
 * @desc 借助 react-loadable 进行 code-splitting 时的loading组件
 */
import React from 'react'
import { Spin } from 'antd'

function Loading({error, timedOut, pastDelay = 10000}) {
  if (error) {
    return <div className='center'>加载出错，请稍后刷新重试!</div>;
  } else if (timedOut) {
    return <div className='center'>加载超时，请稍后刷新重试！</div>;
  } else if (pastDelay) { // 避免加载时间<0.2s时也出现loading，避免闪烁的效果
    return (<div className="spin-container">
    <Spin />
  </div>)
  } else {
    return null;
  }
}
export default Loading
