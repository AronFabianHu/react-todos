import { ListItem } from "@mui/material"
import { TextField } from "@mui/material"
import { useState, useEffect } from "preact/hooks"
import Create from "@mui/icons-material/Create"
import { InputAdornment } from "@mui/material"
import { IconButton } from "@mui/material"

export default function TodoForm({ addTodo }) {
    const [text, setText] = useState("")
    const handleChange = (evt) => {
        setText(evt.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(text)
        setText("")
    }
    return (
        <ListItem >
            <form onSubmit={handleSubmit}>
                <TextField
                    id="outlined-basic"
                    label="Add Todo"
                    variant="outlined"
                    value={text}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleSubmit} aria-label="create tod" edge="end">
                                    <Create />
                                </IconButton>
                            </InputAdornment>

                        ),

                    }}

                    sx={{
                        width: '340px',
                    }}
                />
            </form>
        </ListItem>
    )
}

