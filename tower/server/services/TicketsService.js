import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"
import { eventsService } from "./EventsService.js"




class TicketsService {
  async deleteTicket(id, accountId) {
    const ticket = await dbContext.Ticket.findById(id)
    if (!ticket) {
      throw new Error('Back ticket id or request')
    }
    logger.log('ticket', ticket)

    // @ts-ignore
    if (accountId != ticket.accountId.toString()) {
      throw new Forbidden("You can't delete a ticket that's not yours dummy")
    }
    await ticket.deleteOne()

    const event = await eventsService.getEventById(ticket.eventId)
    logger.log('event', event)
    // @ts-ignore
    event.capacity++
    await event.save()

    return ticket

  }
  async getTicketsbyEventId(accountId, eventId) {
    const tickets = await dbContext.Ticket.find({ eventId })
      .populate('profile', 'name picture')
    return tickets
  }


  async getMyTickets(accountId) {
    const tickets = await dbContext.Ticket.find({ accountId })
      .populate('profile', 'name picture')
      .populate('event')
    return tickets
  }



  async createTicket(ticketData) {
    const event = await eventsService.getEventById(ticketData.eventId)

    if (event.isCanceled) {
      throw new Forbidden("Can't buy tickets for a event that's been canceled")
    }
    // @ts-ignore
    if (event.capacity <= 0) {
      throw new Error("Sorry there are no tickets left")
    }
    // @ts-ignore
    event.capacity--
    await event.save()

    const ticket = await dbContext.Ticket.create(ticketData)
    await ticket.populate('profile', 'name picture')

    return ticket
  }




}
export const ticketsService = new TicketsService()