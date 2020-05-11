import {
  ElectronInterpreterEnvironment
} from './electron-interpreter-environment';

import {
  Runtime,
  EvaluationResult,
  OpenContextRuntime,
  Completion
} from '@mongosh/browser-runtime-core';

import { ServiceProvider } from '@mongosh/service-provider-core';

import { ReplPlatform } from '@mongosh/shell-api';

export class ElectronRuntime implements Runtime {
  private openContextRuntime: OpenContextRuntime;

  constructor(serviceProvider: ServiceProvider, messageBus?: {
    emit: (eventName: string, ...args: any[]) => void;
  }) {
    this.openContextRuntime = new OpenContextRuntime(
      serviceProvider,
      new ElectronInterpreterEnvironment({}),
      ReplPlatform.Compass,
      messageBus
    );
  }

  async evaluate(code: string): Promise<EvaluationResult> {
    return await this.openContextRuntime.evaluate(code);
  }

  async getCompletions(code: string): Promise<Completion[]> {
    return await this.openContextRuntime.getCompletions(code);
  }
}
