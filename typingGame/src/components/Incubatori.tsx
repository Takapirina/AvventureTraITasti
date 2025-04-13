import React from "react"
//import { useSelector } from "react-redux";
import Uovo from "./Uova";
import "../style/incubatori.css"

const Incubatori : React.FC = () => {
    return (
        <div className="incubatori-container">
            <Uovo/>
            <Uovo/>
            <Uovo/>
        </div>
    )
}

export default Incubatori