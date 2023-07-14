import { Ingredient } from "./Ingredient"



export class Recette{ 
    id_recette !: number 
    nom !: String 
    image!: String
    description !: String 
    ingredients !: {Ingredient}[]
}