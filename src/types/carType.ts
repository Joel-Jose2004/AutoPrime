export interface carType{
    id_carro:number,
    brand:string,
    image:File|null,
    model:string,
    color:string,
    engine:string,
    deposit:string,
    box:string,
    price:number,
    sold:boolean,
    negotiable:string,
    id_owner:number
}


export interface carOfer{
  id_carro:number,
  brand:string,
  model:string, 
  price:number,
  oferta:number, 
  id_users:number,
  name:string
}