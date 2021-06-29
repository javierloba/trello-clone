import { InputBase, Paper, makeStyles, Button, IconButton, fade } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import ClearIcon from "@material-ui/icons/Clear";
import MoreHorizonIcon from '@material-ui/icons/MoreHoriz';
import contextAPI from '../ContextAPI';

const AddCardorListText = ({type, setOpen, listId}) => {
    const [ title, setTitle ] = useState("");
    const { addCard, addList } = useContext(contextAPI);
    const classes = useStyle();

    const handleAddCardorList = () => {
        if(type === "card") {
            addCard(title, listId)
        } else {
            addList(title)
        }
        setTitle("")
        setOpen(false)
    }
    return (
        <div>
            <Paper className={classes.card}>
                <InputBase 
                    multiline
                    value={title}
                    onBlur={()=>setOpen(false)} // Cuando clickamos fuera del input se cierra
                    onChange={e=>setTitle(e.target.value)}
                    placeholder={
                        type === "card" ? "Enter a title for this card..." :
                        "Enter list title..."
                    }
                    inputProps = {{className: classes.input}}
                />
            </Paper>
            <div className={classes.confirm}>
                <div className={classes.options}>
                    <Button className={classes.btnConfirm} onClick={handleAddCardorList}>
                        {
                            type === "card" ? "Add card" : "Add list"
                        }
                    </Button>
                    <IconButton onClick={()=> setOpen(false) }>
                        <ClearIcon />
                    </IconButton>
                </div>
                <IconButton>
                    <MoreHorizonIcon />
                </IconButton>
            </div>
        </div>
    )
}

const useStyle = makeStyles(theme => ({
    card: {
        width: "280px",
        margin: theme.spacing(0,1,1,1),
        paddingBottom: theme.spacing(4)
    },
    input: {
        margin: theme.spacing(1)
    },
    confirm: {
        display: "flex",
        margin: theme.spacing(0,1,1,1)
    },
    options: {
        flexGrow: 1
    },
    btnConfirm: {
        background: "#5aac44",
        color: "#fff",
        "&:hover": {
            backgroundColor: fade("#5aac44", .75)
        }
    }
}))

export default AddCardorListText;