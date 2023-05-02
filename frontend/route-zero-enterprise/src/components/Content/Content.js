import React from 'react'
import './Content.scss'

/** @function Content 
 * @desc Padding for centred content on the website
 * 
 * @param {JSX.Element} props - Any JSX Element at all  
 * @returns {JSX.Element} Child nested inside a content div
 */

export const Content = (props) => {
  return (
    <div className='content'>
      {props.child}
    </div>
  )
}
