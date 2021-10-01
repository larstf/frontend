import { App } from './app';

import { api } from './api';

const core = {
  api
}

export default App.Core(core);

export type ICore = typeof core;