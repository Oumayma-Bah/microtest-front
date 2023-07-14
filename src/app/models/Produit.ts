import { Categorie } from "./Categorie";

export class Produit {
    idProduit!: number;
    imageProduit !:String;
    nomProduit!: string;
    prixActuel!: number;
    prixRreduction!: number;
    quantite!: number;
    description!: string;
    dateExpiration!: string;
    idCategorie!: number;
    categorie!:Categorie;
}