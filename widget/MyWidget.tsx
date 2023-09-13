import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
import type { TConditionNode, ApiRequestor } from 'pa-typings';

import { MyComponent } from './MyComponent';


export class MyWidget implements ExternalDSWidget {
  private requestor: ApiRequestor | null = null;
  private root: Root | null = null;
  private condition: TConditionNode | undefined = undefined;

  constructor(private args: WidgetArgs) {}

  updateData(requestor: ApiRequestor): void {
    this.requestor = requestor;
    this.updateContainer();
  }

  onUpdateAppearance() {
    this.updateContainer();
  }

  render(parent: HTMLElement) {
    this.root = createRoot(parent);
    this.updateContainer();
  }

  private updateContainer() {
    if (this.root && this.requestor)
      this.root.render(
        <MyComponent requestor={this.requestor} />);
  }

  dispose(): void { }
}
