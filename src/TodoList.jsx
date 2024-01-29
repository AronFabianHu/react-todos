import List from '@mui/material/List';
import { useState } from 'react'
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { useEffect } from 'preact/hooks';
import { Box, Typography } from '@mui/material';



const getInitialData = () => {
    const data = JSON.parse(localStorage.getItem("todos"))

    if (!data) return [];
    return data
}

const initialTodos = [
    { id: 1, text: "Walk the dog", completed: false },
    { id: 2, text: "Walk the cat", completed: false },
    { id: 3, text: "Walk the fish", completed: true },
    { id: 4, text: "Walk the chickens", completed: false },
]
export default function TodoList() {

    const [todos, setTodos] = useState(getInitialData)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const removeTodo = (id) => {
        setTodos(prevTodos => {
            return prevTodos.filter((item) => item.id !== id)
        })
    }

    const toggle = (id) => {
        setTodos((oldToggle) => {
            return oldToggle.map((item) => {
                if (item.id === id) {
                    return { ...item, completed: !item.completed };
                } else {
                    return item;
                }
            })
        })
    }
    const addTodo = (text) => {
        setTodos(prevTodos => {
            return [...prevTodos, { text: text, id: crypto.randomUUID(), completed: false }]
        })
    }
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            m: 3,

        }}>
            <Typography variant="h2" component="h2" sx={{ flexGrow: 1 }}>
                Todos
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: '0 auto' }}>

                {todos.map((todo) => {
                    return (
                        <TodoItem key={todo.id} todo={todo} removeTodo={() => removeTodo(todo.id)} toggle={() => toggle(todo.id)} />
                    )
                })}
                <TodoForm addTodo={addTodo} />
            </List>
        </Box>
    )
}

// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import CommentIcon from '@mui/icons-material/Comment';

// export default function CheckboxList() {
//     const [checked, setChecked] = React.useState([0]);

//     const handleToggle = (value) => () => {
//         const currentIndex = checked.indexOf(value);
//         const newChecked = [...checked];

//         if (currentIndex === -1) {
//             newChecked.push(value);
//         } else {
//             newChecked.splice(currentIndex, 1);
//         }

//         setChecked(newChecked);
//     };

//     return (
//         <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//             {[0, 1, 2, 3].map((value) => {
//                 const labelId = `checkbox-list-label-${value}`;

//                 return (
//                     <ListItem
//                         key={value}
//                         secondaryAction={
//                             <IconButton edge="end" aria-label="comments">
//                                 <CommentIcon />
//                             </IconButton>
//                         }
//                         disablePadding
//                     >
//                         <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
//                             <ListItemIcon>
//                                 <Checkbox
//                                     edge="start"
//                                     checked={checked.indexOf(value) !== -1}
//                                     tabIndex={-1}
//                                     disableRipple
//                                     inputProps={{ 'aria-labelledby': labelId }}
//                                 />
//                             </ListItemIcon>
//                             <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
//                         </ListItemButton>
//                     </ListItem>
//                 );
//             })}
//         </List>
//     );
// }