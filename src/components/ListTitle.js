import MoreHorizonIcon from '@material-ui/icons/MoreHoriz';
import React, { useContext, useState } from 'react';
import { InputBase, makeStyles, Typography } from '@material-ui/core';
import contextAPI from '../ContextAPI';

const ListTitle = ({title, listId}) => {
    const classes = useStyle();
    const [open, setOpen] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const {updateListTitle} = useContext(contextAPI)

    const handleBlur = () => {
        updateListTitle(newTitle, listId)
        setOpen(false)
    }
    return (
        <div>
            {open ? (
                <InputBase 
                    value={newTitle}
                    onChange={e=>setNewTitle(e.target.value)}
                    onBlur={handleBlur}
                    autoFocus
                    fullWidth
                    inputProps={{className: classes.input}}
                />
            ) : (
                <div className={classes.title}>
                    <Typography className={classes.titleText} onClick={()=>setOpen(true)}>
                        {title}
                    </Typography>
                    <MoreHorizonIcon />
                </div>
            )}
        </div>
    )
}

const useStyle = makeStyles(theme => ({
    title: {
        display: "flex",
        margin: theme.spacing(1),
    },
    titleText: {
        flexGrow: 1,
        fontSize: "1.2rem",
        fontWeight: "bold"
    },
    input: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        margin: theme.spacing(1),
        "&:focus": {
            background: "#ddd"
        }
    }
}))

export default ListTitle;