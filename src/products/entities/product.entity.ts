// mongoose usa schemas para trabajar porque usa el patrón active record
// un modelo que nos va a servir para las funciones de esa conexión (find, create, findOne, etc)
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

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
}

export const ProductSchema =  SchemaFactory.createForClass(Product)
