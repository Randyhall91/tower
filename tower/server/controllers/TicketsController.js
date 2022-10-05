import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";





export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getMyTickets)
      .post('', this.createTicket)
      .delete('/:ticketId', this.deleteTicket)
  }
  async deleteTicket(req, res, next) {
    try {
      const ticket = await ticketsService.deleteTicket(req.params.ticketId, req.userInfo.id)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }
  async createTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.createTicket(req.body)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }
  async getMyTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getMyTickets(req.body.accountId)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
}