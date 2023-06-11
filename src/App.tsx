import React, {FC, useState} from 'react';
import './App.css';
 type TodosType={
   todo:string
   completed:boolean
 } | null

const App:FC=()=> {
    const [todos, setTodos] = useState<TodosType[]>([]);
    const [value,setValue]=useState("")
    const [SortTodo,setSortTodo]=useState("All")

    const addTodo = (newTodo: string) => {
        const newTodoItem: TodosType = {
            todo: newTodo,
            completed: false,
        };
        setTodos(prevTodos => [...prevTodos, newTodoItem]);
    };
    const setCompleted = (todo: string) => {
        setTodos(prevTodos => {
            const updatedTodos = prevTodos.map(item => {
                if (item?.todo === todo) {
                    return {
                        ...item,
                        completed: !item.completed
                    };
                }
                return item;
            });
            return updatedTodos;
        });
    };
    const removeCompletedTodos = () => {
        const updatedTodos = todos.filter(todo => !todo?.completed);
        setTodos(updatedTodos);
    };

    const onChangeValue=(e:string)=>{
        setValue(e)
    };
    const lengthFalse=():string=>{
        const data=todos.filter(el=>!el?.completed)
        return data.length.toString()
    }
    const handleKeyPress = (event:any) => {
        if(event.key === 'Enter'){
            if (value){
                addTodo(value)
                setValue("")
            }
        }
    }
  return (
      <div className="container">
          <div className="todos">
              <h1 className="todos__title">TODOS</h1>
              <div className="todos__inner_one">
                  <div className="todos__inner">
                      <div className="todos__inner">
                          <div className="todos__items">
                              <input
                                  onKeyDown={handleKeyPress}
                                  onChange={
                                  (e)=>{
                                      onChangeValue(e.target.value)
                                  }
                              } value={value} type="text" placeholder="What needs to be done?" className="todos__items__input"/>
                          </div>


                          {
                             SortTodo==="All"&& todos?.map((el)=>{
                                  return(

                                      <div
                                          onClick={()=>{
                                              setCompleted(el?.todo?el.todo:"")
                                          }}

                                          className="todos__items">
                                          <div className="todos__items__todos">
                                              <div className="round">
                                                  <input onChange={()=>{
                                                      setCompleted(el?.todo?el.todo:"")
                                                  }} data-testid="checkbox" type="checkbox" checked={el?.completed} id="checkbox"/>
                                                  <label htmlFor="checkbox"></label>
                                              </div>
                                              <div className={`todos__text ${el?.completed&&"completed"}`}>{el?.todo}</div>
                                          </div>
                                      </div>
                                  )
                              })
                          }

                          {
                              SortTodo==="Active"&&todos.map(el=>{
                                  if (!(el?.completed)){
                                      return(
                                          <div
                                              onClick={()=>{
                                                  setCompleted(el?.todo?el.todo:"")
                                              }}

                                              className="todos__items">
                                              <div className="todos__items__todos">
                                                  <div className="round">
                                                      <input onChange={()=>{
                                                          setCompleted(el?.todo?el.todo:"")
                                                      }} data-testid="checkbox" type="checkbox" checked={el?.completed} id="checkbox"/>
                                                      <label htmlFor="checkbox"></label>
                                                  </div>
                                                  <div className={`todos__text ${el?.completed&&"completed"}`}>{el?.todo}</div>
                                              </div>
                                          </div>
                                      )
                                  }
                                  return <></>
                              })
                          }

                          {
                              SortTodo==="Completed"&&todos.map((el,index)=>{
                                  if (el?.completed){
                                      return(
                                          <div
                                              key={index}
                                              onClick={()=>{
                                                  setCompleted(el?.todo?el.todo:"")
                                              }}
                                              className="todos__items">
                                              <div className="todos__items__todos">
                                                  <div className="round">
                                                      <input onChange={()=>{
                                                          setCompleted(el?.todo?el.todo:"")
                                                      }}  data-testid="checkbox" type="checkbox" checked={el?.completed} id="checkbox"/>
                                                      <label  htmlFor="checkbox"></label>
                                                  </div>
                                                  <div className={`todos__text ${el?.completed&&"completed"}`}>{el?.todo}</div>
                                              </div>
                                          </div>
                                      )
                                  }
                                  return <></>
                              })
                          }
                          {
                              todos&&<div className="todos__active__inner">
                                  <div className="todos__active__inner__item__left">
                                      {
                                         lengthFalse()
                                      } items left
                                  </div>
                                  <div className={`todos__active`}>
                                      <span onClick={()=>
                                          setSortTodo("All")
                                      } className={`todos__active__btn ${SortTodo==="All"&&"active"}`}>
                                          all
                                      </span><span
                                      onClick={()=>
                                          setSortTodo("Active")
                                      } className={`todos__active__btn ${SortTodo==="Active"&&"active"}`}
                                  >
                                          active
                                      </span>
                                      <span onClick={()=>
                                          setSortTodo("Completed")
                                      } className={`todos__active__btn ${SortTodo==="Completed"&&"active"}`}>
                                          Completed
                                      </span>
                                  </div>
                                  <div className="todos__active">
                                      <span onClick={()=>removeCompletedTodos()} className="todos__active__btn">
                                          Clear Completed
                                      </span>
                                  </div>
                              </div>
                          }
                      </div>
                  </div>

              </div>
          </div>
      </div>

  );
}

export default App;
