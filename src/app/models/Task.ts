import { EtatTask } from './EtatTask';

export class Task{ 
    id !: number 
    name !: String 
    startDate!: Date
    endDate !: Date 
    description !: String 
    etatTask !: EtatTask
}