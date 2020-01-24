import axios from 'axios'
import config from '@common/config'
import { PartyService } from '@party/app/PartyService'
import { CharacterRepository } from '@party/infrastructure/repositories/tibiadata/CharacterRepository'
import { WorldRepository } from '@party/infrastructure/repositories/tibiadata/WorldRepository'
import { CharacterCache } from '@party/infrastructure/cache/redis/CharacterCache'

class IWantToPartyCore {
  get requester() {
    return axios.create({
      baseURL: config.TIBIADATA_URL,
    })
  }

  get partyService() {
    return new PartyService(
      new CharacterRepository(),
      new WorldRepository(),
      new CharacterCache(),
    )
  }
}

export default new IWantToPartyCore()
