// mongoose usa schemas para trabajar porque usa el patrón active record
// un modelo que nos va a servir para las funciones de esa conexión (find, create, findOne, etc)
import { Schema, Prop, SchemaFactory, raw } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Category } from "./category.entity";

// relaciones embebidas
// es un documento dentro de otro

// está clase sera un schema
@Schema() // crea una coleccion con esos atributos
export class Product extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop({ type: String, required: true })
  image: string;

  @Prop(raw({
    name: { type: String },
    image: { type: String }
  }))
  // raw es un subObjeto
  category: Record<string, any>
  // tiene la siguiente forma el documento:
  /*
  {
    "name": "Cerveza",
    "description": "Pack de 6 cervezas marca Stella Artois de 330ml",
    "price": 120,
    "stock": 200,
    "image": "https://static.platzi.com/media/achievements/badge-nest-js-persistencia-datos-mongodb-3596c12f-5512-4236-bcbb-740e5bde8a30.png",
    {
      "name": "bebidas",
      "image": "https://static.platzi.com/media/achievements/badge-nest-js-persistencia-datos-mongodb-3596c12f-5512-4236-bcbb-740e5bde8a30.png"
    }
  }
  */
}

export const ProductSchema =  SchemaFactory.createForClass(Product)
