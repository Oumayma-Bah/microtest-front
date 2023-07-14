export class Panier{ 
    id_panier !: number 
    created_At !: Date 
    produits !: {Produit}[]
}