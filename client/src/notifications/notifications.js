import { NotificationManager } from 'react-notifications'

export const playerNameCopiedNotification = (name) => {
  NotificationManager.success(`${name} copied!`)
}
