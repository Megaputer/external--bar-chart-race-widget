import * as React from 'react';
import { ApiRequestor, Table } from 'pa-typings';

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

  return <div>Data: {rowColumn} column(s), {rowCount} row(s)</div>;
}
