import React from "react";
import {render, cleanup, waitForElement} from 
"react-testing-library"
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios"
import CityService from "./sevice/cityService"

afterEach(cleanup);

it("fetches and displays data", async ()=>{
    const{} = render(<CityService/>)
    
})  