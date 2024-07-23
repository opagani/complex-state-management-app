'use client'

import { TasksContext } from "@/contexts/TasksContext"
import { FILTER_ACTIONS } from "@/utils/constants"
import { useContext } from "react"


export function FilterComponent({action}) {
    const {filterBy, removeFilter} = useContext(TasksContext)

    function displayLabel() {
        if(action == FILTER_ACTIONS.filterPending) {
            return "Show only pending tasks"
        }

        if(action == FILTER_ACTIONS.showOverDue) {
            return "Show overdue tasks"
        }
    }

    function filterData(evt) {
        if(evt.target.checked){
            filterBy(action)
        } else {
            removeFilter(action)
        }
    }

    return (
        <div className="form-control mx-2">
            <label className="label cursor-pointer">
                <span className="label-text mx-2">{displayLabel()}</span> 
                <input type="checkbox" className="toggle" onChange={filterData}/>
            </label>
        </div>
    )
}