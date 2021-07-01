import React from 'react';
import { Paper, CssBaseline, makeStyles } from '@material-ui/core';
import ListTitle from './ListTitle';
import TrelloCard from './TrelloCard';
import AddCardorList from './AddCardorList';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const TrelloList = ({list, index}) => {
    const classes = useStyle();
    return (
        <Draggable draggableId={list.id} index={index}>
            {
                (draggableProvided)=>(
                    <div 
                    ref={draggableProvided.innerRef} 
                    {...draggableProvided.draggableProps}
                    >
                        <Paper className={classes.root} {...draggableProvided.dragHandleProps}>
                            <CssBaseline />
                            <ListTitle title={list.title} listId={list.id}/>
                            <Droppable droppableId={list.id}>
                                {
                                    (droppableProvided)=>(
                                        <div 
                                        ref={droppableProvided.innerRef} 
                                        {...droppableProvided.droppableProps}
                                        >
                                            {
                                                list.cards.map((card, index) => (
                                                    <TrelloCard card={card} key={card.id} index={index}/>
                                                ))
                                            }
                                            {droppableProvided.placeholder}
                                        </div>
                                    )
                                }
                            </Droppable>
                            <AddCardorList type="card" listId={list.id} />
                        </Paper>
                    </div>
                )
            }
        </Draggable>
    )
}

const useStyle = makeStyles(theme => ({
    root: {
        width: "300px",
        background: "#ebecf0",
        margin: theme.spacing(1)
    }
}))

export default TrelloList;
