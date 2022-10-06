import { Schema } from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/dbUtils.js";


export const CommentSchema = new Schema({
  creatorId: { type: ObjectId, required: true },
  eventId: { type: ObjectId, required: true },
  body: { type: String, minLenght: 1, maxLength: 3000, required: true },
  isAttending: { type: Boolean }
}, SCHEMA_OPTIONS)

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})