export abstract class ObserverInterface {

      abstract subscribe(methodName: string, method: any);

      abstract unsubscribe(methodName: string, method: any);
}