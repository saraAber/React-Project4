import { Ingrident } from "./ingridents";
import { Instructions } from "./instruction";

export type Rec = {
    Id: number;
    Name: string;
    Img: string;
    Duration: number;
    Difficulty: number;//string?
    Description: string;
    Category: number;
    Instructions: Instructions[];  
    Ingridents: Ingrident[]; 
    UserId:number
};