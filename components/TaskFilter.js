import { FILTER_ACTIONS } from "@/utils/constants";
import { FilterComponent } from "./FilterComponent";


export function TaskFilter(){

    return (
        <div className="container w-5/6 mx-auto flex flex-row place-items-center">
            <span className="text-lg">Filter: </span>
            <FilterComponent action={FILTER_ACTIONS.filterPending} />
            <FilterComponent action={FILTER_ACTIONS.showOverDue} />
        </div>
    )
}