import React from 'react'
import Sidebar from '../allPages/Sidebar'
import Chats from '../allPages/Chats'
import style from "./Home.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
  return (<>
      <div className={style.home}>
        <div className={style.showHome}>
              <Sidebar />
              <Chats />
        </div>
      </div>
    </>)
}

export default Home