import * as React from 'react';
import { ApiRequestor, Table } from 'pa-typings';
import { Bar, type BarConfig } from '@ant-design/plots';

interface Props {
  requestor: ApiRequestor;
}

export const MyComponent: React.FC<Props> = ({ requestor }) => {
  const wrapperGuid = React.useRef<{ wrapperGuid: string }>({ wrapperGuid: '' });
  const [rowCount, setRowCount] = React.useState(0);
  const [rowColumn, setColumnCount] = React.useState(0);
  const [values, setValues] = React.useState<Table>({ rowIDs: [] });

  React.useEffect(() => {
    const fetchData = async () => {
      const guid = wrapperGuid.current = await requestor.wrapperGuid();
      let dsInfo = await requestor.info(guid);

      setColumnCount(dsInfo.columns.length);
      setRowCount(dsInfo.rowCount);

      const values = await requestor.values({
        offset: 0,
        rowCount: dsInfo.rowCount,
        wrapperGuid: guid.wrapperGuid
      });
      setValues(values);
    };
    fetchData();

  }, [requestor]);

  const data = [
    {
      year: '1951 年',
      value: 38,
    },
    {
      year: '1952 年',
      value: 52,
    },
    {
      year: '1956 年',
      value: 61,
    },
    {
      year: '1957 年',
      value: 145,
    },
    {
      year: '1958 年',
      value: 48,
    },
  ];

  const config = React.useMemo(() => ({
    data,
    xField: 'value',
    yField: 'year',
    seriesField: 'year',
    legend: false,
  }), []);

  return <div><Bar {...config} /></div>;
}
