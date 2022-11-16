import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum Role {
  student = 'STUDENT',
  teacher = 'TEACHER',
}

export enum Status {
  activo = "ACTIVO",
  baja = "DE BAJA",
  egresado = "EGRESADO",
}

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  status: Status;

  @Prop({ type: Number, required: true })
  year: number;

  @Prop({ type: String, required: true })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
