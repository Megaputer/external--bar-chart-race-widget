import { MyWidget } from 'widget/MyWidget';

export function getDSWidgets() {
  return [
    {
      viewType: 'my-widget',
      name: 'My Widget',
      create: (args: WidgetArgs) => new MyWidget(args)
    }
  ];
}
