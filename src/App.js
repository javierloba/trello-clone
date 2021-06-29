import React from 'react';
import { useState } from 'react';
import './App.css';
import TrelloList from './components/TrelloList';
import { makeStyles } from '@material-ui/core';
import background_image from './image/ux-indonesia-l6e8DSnsXYU-unsplash.jpg';
import AddCardorList from './components/AddCardorList';
import mockData from './mockdata.js';
import ContextAPI from './ContextAPI';
import uuid from 'react-uuid';

function App() {
  const classes = useStyle();
  const [data, setData] = useState(mockData)

  const updateListTitle = (updatedTitle, listId) => {
    const list = data.lists[listId]
    list.title = updatedTitle;
    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId] : list
      }
    })
  }

  const addCard = (title, listId) => {

  }

  const addList = (title) => {}

  return (
    <ContextAPI.Provider value={{updateListTitle, addCard, addList}}>
      <div className={classes.root}>
        <div className={classes.container}>
          {
            data.listIds.map(listID => {
              const list = data.lists[listID]
              return <TrelloList list={list} key={listID}/>
            })
          }

          <div>
            <AddCardorList type="list" />
          </div>
        </div>
      </div>
    </ContextAPI.Provider>
  );
}

const useStyle = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    overflowY: "auto",
    backgroundImage: `url(${background_image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  container: {
    display: "flex"
  }
}))

export default App;
