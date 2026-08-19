import React from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'

const PageContent = () => {
  return (
    <div className=' py-10 px-12 flex items-center gap-10 h-[90vh] '>
      <LeftContent />
      <RightContent />
    </div>
  )
}

export default PageContent