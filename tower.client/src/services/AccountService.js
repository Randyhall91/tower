import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  async getMyEvents() {
    const res = await api.get('account/tickets')
    AppState.towerEvent = res.data
    console.log(res.data[0].event);
  }

}

export const accountService = new AccountService()
