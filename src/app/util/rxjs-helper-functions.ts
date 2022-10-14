import { delay, Observable, of, ReplaySubject, Subject, tap } from "rxjs";
import { map, switchMap, take, takeUntil } from "rxjs/operators";
import { MarbleEvent } from "../components/observable-graph/observable-graph.component";

/**
 * Hot means the observable run it's internal logic and then emits to all subscribers
 * while Cold means that the logic will get ran by each subscriber as they consume
 * however, neither run without a subscriber at all, so the following commits to that behaviour eagerly like a promise would
 * this will close immediately if not subscribed, otherwise, will close only after last subscriber closes
 * @param input the observable to make hot
 * @param takeCount how many emits to take from the stream, -1 for infinite
 * @param takeUntilObs a takeUntil(Obs$) to exit stream early as well
 */
export const makeHotObs$ = <T>(input: Observable<T>, takeCount = 1, takeUntilObs?: Observable<any>): Observable<T> => {
  const destroy$ = new Subject<void>();
  const toReturn = new ReplaySubject<T>(1);
  input
    .pipe(
      takeCount > 0 ? take(takeCount) : map((res) => res),
      takeUntilObs ? takeUntil(takeUntilObs) : map((res) => res),
      takeUntil(destroy$)
    )
    .subscribe(toReturn);
  let refs = 0;
  return new Observable<T>((observer) => {
    refs++;
    const sub = toReturn.subscribe(observer);
    return () => {
      refs--;
      if (refs === 0) {
        destroy$.next();
      }
      sub.unsubscribe();
    };
  });
};

/**
 * this fn will ensure that an observable is cold, meaning it wont execute inner logic until there's subscribers,
 * basically the opposite of above
 * @param input a function that returns the observable to make cold, its a function otherwise it'll resolve immediately
 */
export const makeColdObs$ = <T>(input: () => Observable<T>): Observable<T> => of(true).pipe(switchMap(input));

export const makeStream = (i: number, runStream$: Subject<MarbleEvent>) => of(i).pipe(delay(Math.random() * 1000 + 1000), tap(() => runStream$.next(
  {
    label: `${ i }`,
    time: Date.now()
  }
)));
