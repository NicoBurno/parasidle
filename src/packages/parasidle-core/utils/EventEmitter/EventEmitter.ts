type TListener<T> = (payload: T) => void;

type TOptionalArgument<M extends {}, K extends keyof M> = M[K] extends void ? [K] : [K, M[K]];

type TEventsListeners<T> = {
  [K in keyof T]?: TListener<T[keyof T]>[];
}

export class EventEmitter<T extends {}> {
  private events: TEventsListeners<T> = {} as TEventsListeners<T>;

  public emit = <K extends keyof T>(...args: TOptionalArgument<T, K>) => {
    const [type, payload] = args;
    const listeners = this.events[type];

    if (!listeners) {
      return;
    }

    listeners.forEach(listener => listener(payload as T[K]));
  }

  public on = <K extends keyof T>(type: K, listener: TListener<T[K]>) => {
    const { events } = this;

    if (!events[type]) {
      events[type] = [];
    }

    events[type].push(listener);

    return () => {
      events[type] = events[type]!.filter(fn => fn !== listener);
    }
  }
}
