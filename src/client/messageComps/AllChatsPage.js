import React from 'react'
import BarComp from './barComp';
import TextsList from './textsList';
const AllChatsPage = () => {

    const filterChats = () => {

    }
  return (
    <div>
        <BarComp filterChats={filterChats}/>
        <TextsList/>
    </div>
  )
}
export default AllChatsPage;