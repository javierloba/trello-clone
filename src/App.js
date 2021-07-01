import React, { useState } from 'react';
import './App.css';
import TrelloList from './components/TrelloList';
import { makeStyles } from '@material-ui/core';
import background_image from './image/ux-indonesia-l6e8DSnsXYU-unsplash.jpg';
import AddCardorList from './components/AddCardorList';
import mockData from './mockdata.js';
import ContextAPI from './ContextAPI';
import uuid from 'react-uuid';
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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
    const newCardId = uuid(); // Crear un id unico
    const newCard = {
      id: newCardId,
      title
    } // Crear la card nueva
    const list = data.lists[listId]
    list.cards = [...list.cards, newCard] // Añadirla al array de cards
    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: list
      }
    })

  }

  const addList = (title) => {
    const newListId = uuid();
    setData({
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: {
          id: newListId,
          title,
          cards: []
        }
      }
    })
  }

  const onDragEnd = result => {
    const {
      destination, destination : {droppableId : destdroppableId, index : destIndex }, 
      source, source: {droppableId : sourcedroppableId, index : sourceIndex}, 
      draggableId, 
      type
    } = result

    console.table([
      {
        sourcedroppableId,
        destdroppableId,
        draggableId
      }
    ])
    console.table([
      {
        type,
        sourceIndex,
        destIndex
      }
    ])

    if (!destination) {
      return;
    }

    if (type === "list") {
      const newListIds = data.listIds
      newListIds.splice(sourceIndex, 1)
      newListIds.splice(destIndex, 0, draggableId)
      return;
    }

    const sourceList = data.lists[sourcedroppableId]
    const destinationList = data.list[destdroppableId]
    const draggingCard = sourceList.cards.filter((card)=>card.id === draggableId)[0]

    if(sourcedroppableId === destdroppableId) {
      sourceList.cards.splice(sourceIndex, 1);
      destinationList.cards.splice(destIndex, 0, draggingCard)
    }


  }

  return (
    <ContextAPI.Provider value={{updateListTitle, addCard, addList}}>
      <div className={classes.root}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable 
          droppableId="12345" type="list" direction="horizontal"
          >
            {
              (droppableProvided) => (
                <div 
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
                className={classes.container} 
                >
                  {
                    data.listIds.map(listID => {
                      const list = data.lists[listID]
                      return <TrelloList list={list} key={listID}/>
                    })
                  }
                  <div>
                    <AddCardorList type="list" />
                  </div>
                  {droppableProvided.placeholder}
                </div>
              )
            }
          </Droppable>
        </DragDropContext>
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
