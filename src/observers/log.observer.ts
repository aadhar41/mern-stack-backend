import {
  /* inject, Application, CoreBindings, */
  lifeCycleObserver, // The decorator
  LifeCycleObserver, // The interface
} from '@loopback/core';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('')
export class LogObserver implements LifeCycleObserver {
  /*
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
  ) {}
  */

  /**
   * This method will be invoked when the application initializes. It will be
   * called at most once for a given application instance.
   */
  async init(): Promise<void> {
    // Add your logic for init
    console.log('LogObserver: 🚀 Application is initializing...');
  }

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
    // Add your logic for start
    console.log('LogObserver: ✅ Application has started!');
  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    // Add your logic for stop
    console.log('LogObserver: 🛑 Application is stopping...');
  }
}
