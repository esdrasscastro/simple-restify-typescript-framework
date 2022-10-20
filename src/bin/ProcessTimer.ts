import { ProccessTimerEnd } from '@interfaces/ProcessTimer'

export default class ProcessTimer {
  timer = process.hrtime()
  startDate: Date | null = null;
  endDate: Date | null = null;
  interval: [number, number] = [0, 0];
  spentTime = 0; // em segundos

  constructor () {
    this.start()
  }

  start (): Date {
    this.startDate = new Date()
    return this.startDate
  }

  stop (): ProccessTimerEnd {
    this.interval = process.hrtime(this.timer)
    this.spentTime = (this.interval[1] - this.interval[0]) / 1e9
    const nanoseconds = (this.interval[0] * 1e9) + this.interval[1]
    const milliseconds = nanoseconds / 1e6
    const seconds = nanoseconds / 1e9
    this.endDate = new Date()

    return {
      seconds,
      milliseconds,
      nanoseconds,
      date: this.endDate
    }
  }
}
