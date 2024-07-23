'use client'

import { FILTER_ACTIONS } from '@/utils/constants';
import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { isAfter, parseISO } from 'date-fns';
import { AuthContext } from './AuthContext';

export const TasksContext = createContext();


/* returns a new  unique  ID that is equal to the highest ID + 1 */
function getNewTaskId(list) {
  let highestID = list.reduce((max, current) => current.id > max ? current.id : max,  0)
  return highestID + 1
}

export const TasksProvider = ({children}) => {
  const [tasks, setTasks] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const {token} = useContext(AuthContext)

  async function loadTasks() {
    let resp = await fetch('/api/tasks?userId=' + token)
    let respObj = await resp.json()
    if(respObj.tasks && respObj.tasks.length > 0)
      setTasks(respObj.tasks)
  }

  function setInitialList(list) {
    setTasks(list)
  }

  useEffect( ( ) => {
    //loadTasks()
  }, [token])

  const filterBy = useCallback( (filter) => {
    setActiveFilters([...activeFilters, filter])
  }, [activeFilters])

  const removeFilter = useCallback(  (filter) => {
    let newFilters = activeFilters.filter( f => f != filter)
    setActiveFilters(newFilters)
  }, [activeFilters]) 

  const filtered = useCallback( () => {
    let filteredTasks = tasks
    if(activeFilters.indexOf(FILTER_ACTIONS.filterPending) != -1){
        filteredTasks = filteredTasks.filter( t => !t.done)
    }

    if(activeFilters.indexOf(FILTER_ACTIONS.showOverDue) != -1){
        filteredTasks = filteredTasks.filter( t => { 
            let dueDate = parseISO(t.dueDate)
            return !t.done && isAfter(new Date(), dueDate) 

        })
    }

    return filteredTasks

  }, [tasks, activeFilters])

  /* Creates a new task and sends the information
  to the server to be persisted */
  const addTask = useCallback(async (task) => {
    console.log("current elist of tasks, ", tasks)
    task.id = getNewTaskId(tasks)
    task.done = false // default state

    let resp = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(task)
    }) 
    let respObj = await resp.json()

    if(respObj.success) {
      setTasks([...tasks, task])
    } else {
      console.log("Error while creating the task" , respObj.error)
      return false
    }

  }, [tasks])

  const markTaskAsDone = useCallback((task) => {
    let list = tasks.map( t => {
        task.done = true
        if(t.id != task.id) return t
        return task
    })
    setTasks(list)
  }, [tasks])

  const removeTask = useCallback((task) => {
    let list = tasks.filter( t => t.id != task.id)
    setTasks(list)
  }, [tasks])

  const value = {
    tasks,
    addTask,
    markTaskAsDone,
    removeTask,
    filterBy,
    removeFilter,
    filtered,
    setInitialList
  }

 return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
}
 