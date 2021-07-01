import { makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';


const TrelloCard = ({card, index}) => {
    const classes = useStyle();
    return (
        <Draggable 
        draggableId={card.id} 
        index={index}
        >
            {
                (draggableProvided)=>(
                    <div ref={draggableProvided.innerRef} 
                    {...draggableProvided.dragHandleProps}
                    {...draggableProvided.draggableProps}
                    >
                        <Paper className={classes.trellocard}>
                            {card.title}
                        </Paper>
                    </div>
                )
            }
        </Draggable>
    )
}

const useStyle = makeStyles(theme => ({
    trellocard: {
        padding: theme.spacing(1,1,1,2),
        margin: theme.spacing(1)
    }
}))

export default TrelloCard;
