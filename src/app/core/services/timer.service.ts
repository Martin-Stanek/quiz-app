import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  timeLeft = signal(20);
  private timerId: number | null = null;

  start() {
    this.stop();
    this.timeLeft.set(20);
    this.timerId = window.setInterval(() => {
      this.timeLeft.update((t) => {
        const newTime = t - 1;
        if (newTime <= 0) this.handleTimeout();
        return newTime > 0 ? newTime : 0;
      });
    }, 1000);
  }

  private handleTimeout() {
    this.stop();
  }

  stop() {
    if (this.timerId) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  reset() {
    this.stop();
    this.start();
  }
}
