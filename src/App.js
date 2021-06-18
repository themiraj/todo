import logo from './logo.svg';
import './App.css';
import Header from './MyComponents/Header';
import {Todos} from './MyComponents/Todos';
import {Footer} from './MyComponents/Footer';
import { AddTodo } from './MyComponents/AddTodo';
import { About } from './MyComponents/About';
import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo = [];
  }else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  // Delete Function
  const onDelete = (todo) => {
    console.log("i am on delete of todo",todo );
    setTodos(todos.filter((e)=>{
      return e!==todo;
    }))
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  //Edit Todo Item
  const [editVal,seteditVal] = useState();
  const onEdit = (todo) => {
      const changeForm = {
        flag:true
      }
      seteditVal({...todo, ...changeForm});

  } 
  // Update Listing
  const OnUpdate = (sno,title,desc) => {
    let updatedV = [];
    const OnUpdateList = {
        sno:sno,
        title:title,
        desc:desc
    }
    todos.map((todo) => {
      if(todo.sno == OnUpdateList.sno){
        todo.title = OnUpdateList.title
        todo.desc = OnUpdateList.desc
        updatedV.push(todo);
      }else{
        updatedV.push(todo);
      }

    })
    setTodos(updatedV);
   
  }


  // Todo Function
  const addTodo = (title,desc) => {
    console.log("i am adding todo", title,desc);
    let sno;
    if(todos.length===0){
      sno=0;
    }else{
      sno = todos[todos.length-1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc : desc
    }
    setTodos([...todos,myTodo])
  }

  // Search Function
  const SearchHandler = (e) => {
    console.log(e.target.value ? 'true' : 'false')
  }
  // Todos state
  const [todos , setTodos ] = useState(initTodo);

  // While update or init render Function;
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
  })

  return (
    <>
      <Router>
        <Header title="MyTodoslist" searchBar={false}/>
    
        <Switch>
    
          <Route exact path="/" render={()=>{
            return(
              <>
                <AddTodo addTodo={addTodo} getValue={editVal ? editVal : ''} OnUpdate={OnUpdate}/>
                <div className="Search container pt-4">
                  <input type="text" onChange={SearchHandler} placeholder="Type Your Query"/>
                </div>
                <Todos todos={todos} onDelete={onDelete} onEdit={onEdit}/>
              </>
              )
            }}>
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
    
        </Switch>
    
    
        <Footer/>
    
      </Router>
    </>
  );
}

export default App;
