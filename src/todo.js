import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
// import TodoList from "./todolist";


const ToDo = () => {

    const [data, setData ] = useState();
    const [ isPending, setIsPending ] = useState(false);
    

    useEffect(() => {
        let ignore = false;  
        
        if (!ignore)  handleData()  
        return () => { ignore = true; }
        },[]);
        
    const handleData = () => 
    {
        
        fetchData()
        .then(x => { 
            setData(x);
        });
    }

    const fetchData = async () => {
        const response = await fetch('http://localhost:8000/ToDo');
        const data = await response.json(); 
        console.log('yes');
        return data; 
    }


    let today = new Date(); 
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');  //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy; 

    const createNewToDo = (e) =>
    {
        e.preventDefault(); 
        console.log(e.target.value);
        let item = prompt("Add a new item?"); 
        const newItem = { item }
        setIsPending(true);
        if(item === null)
        {
            return; 
        }
        else
        {
            fetch('http://localhost:8000/ToDo', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newItem)
            })
            .then(() => {
                setIsPending(false);
            })
        } 
        handleData(); 
    }

    const handleDelete = (e) =>
    {
        fetch('http://localhost:8000/ToDo/' + e.currentTarget.value, {
            method: 'DELETE'
        })
        .then(() => 
        {
            handleData(); 
        })
    }

    const handleStrike = (e) =>     
    {
        if(e.target.style.textDecoration !== "line-through")
        {
            e.target.style.textDecoration = "line-through";
        }
        else {
            e.target.style.textDecoration = "none";
        }
        
    }

    const hideToDo = () => 
    {
        document.querySelector('.todo-container').style.top = "-100px";
        document.querySelector('.show-todo').style.top = "0px";
    }
    const showToDo = () => 
    {
        document.querySelector('.todo-container').style.top = "0";
        document.querySelector('.show-todo').style.top = "-100px";
    }


    return ( 
        <div className="total-todo-container">
            <button className="show-todo" onClick={showToDo}><FontAwesomeIcon icon={faSortDown} /></button>
            { data && 
            <div className="todo-container">
                <button className="todo-create-button" onClick={((e) => createNewToDo(e))}>+</button>
                <button className="todo-title" onClick={hideToDo}>To Do - {today}</button>
                <div>
                    {data.map(items => (
                        <div className="item-container" key={items.id}>
                            <div className="item-list">
                                <li className="item" onClick={((e) => handleStrike(e))}>{items.item}</li>
                                <button className="item-delete" value={items.id} onClick={((e) => handleDelete(e))}><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            }
        </div>
     );
}


export default ToDo;