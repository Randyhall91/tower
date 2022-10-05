import { Schema } from "mongoose"
import { ObjectId, SCHEMA_OPTIONS } from "../db/dbUtils"

export const EventSchema = new Schema({
  creatorId: {type: ObjectId, required: true, ref: 'Account'},
  name: {type: String, required: true, minLength: 1, maxLength: 200},
  description: {type: String, maxLength: 3000},
  coverImg: {type: String},
  location: {type: String, required: true, minLength: 1, maxLength: 300},
  capacity: {type: Number, required: true},
  startDate: {type: Date, required: true},
  isCanceled: {type: Boolean, default: false},
  type: {type: String, enum: ['convention', 'sport', 'digital', 'concert'], required: true}



}, SCHEMA_OPTIONS)

EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})