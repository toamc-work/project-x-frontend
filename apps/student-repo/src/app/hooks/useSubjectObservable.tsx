import { Observable, Subject } from 'rxjs';

import { useOnMount } from './useOnMount.hook';

interface Subscribers<T> {
  next: (value: T) => void;
  error: (err: unknown) => unknown;
  complete: () => void;
}
class PubSub<T> {
  private $subject = new Subject<T>();

  private getObs(): Observable<T> {
    return this.$subject.asObservable();
  }

  subscribe({ next, error, complete }: Subscribers<T>) {
    this.getObs().subscribe({ next, error, complete });
  }

  publish(value: T) {
    this.$subject.next(value);
  }

  close() {
    this.$subject.complete();
  }

  throw(err: unknown) {
    this.$subject.error(err);
  }

  isOpen() {
    return !this.$subject.closed;
  }
}

export const useSubjectObservable = <T,>(): PubSub<T> => {
  let $observableSubject = new PubSub<T>();
  useOnMount(() => {
    // React Strict Mode runs effects twice in development.
    // Reinitializing the instance ensures no leftover state.
    $observableSubject = new PubSub<T>();
    return () => {
      $observableSubject.close();
    };
  });

  return $observableSubject;
};

export type IPubSub<T> = PubSub<T>;
