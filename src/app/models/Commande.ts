import { Paiement } from "./paiement"
import { User } from "./User"


export class Commande{ 
    id_commande !: number 
    date !: Date 
    user!: User
    paiement !: Paiement 
    produits !: {Produit}[]
}