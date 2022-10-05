import { Schema } from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/dbUtils.js";



export const TicketSchema = new Schema({
  eventId: { type: ObjectId, required: true, ref: 'Event' },
  accountId: { type: ObjectId, required: true, ref: 'Account' }
}, SCHEMA_OPTIONS)

// TicketSchema.virtual('account', {
//   localField: 'accountId',
//   foreignField: '_id',
//   justOne: true,
//   ref: 'Account'
// })

TicketSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

TicketSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'Event'
})