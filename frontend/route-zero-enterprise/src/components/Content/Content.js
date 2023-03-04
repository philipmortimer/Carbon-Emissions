import React from 'react'
import './Content.scss'

export const Content = (props) => {
  return (
    <div className='content'>
      {props.child}
    </div>
  )
}
