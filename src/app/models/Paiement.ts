export class Paiement {
    id_paiement !: number 
    date !: Date 
    nom_carte !: String  
    num_carte !: String 
    exp_mois !: String 
    exp_annee !:String 
    cvc !: number
    montant !: number
    paymentIntent_id !: String
}
