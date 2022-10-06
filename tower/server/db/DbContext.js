import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CommentSchema } from '../models/Comment.js';
import { EventSchema } from "../models/Event";
import { TicketSchema } from '../models/Ticket.js';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Event = mongoose.model('Event', EventSchema);
  Ticket = mongoose.model('Ticket', TicketSchema);
  Comment = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
