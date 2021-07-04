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
    const newList = {
      id: newListId,
      title,
      cards: []
    };
    setData({
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList,
      }
    })
  }

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result

    if (!destination) {
      return;
    }

    if (type === "list") {
      const newListIds = data.listIds;
      newListIds.splice(source.index, 1)
      newListIds.splice(destination.index, 0, draggableId)
      return;
    }

    const sourceList = data.lists[source.droppableId];
    const destinationList = data.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter(card =>card.id === draggableId)[0];

    if(source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard)
      setData({
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList,
        }
      })
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard)
      setData({
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList
        }
      })
    }

  }

  return (
    <ContextAPI.Provider value={{ updateListTitle, addCard, addList }}>
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
                    data.listIds.map((listId, index) => {
                      const list = data.lists[listId]
                      return <TrelloList list={list} index={index} key={listId}/>
                    })
                  }
                    <AddCardorList type="list" />
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
