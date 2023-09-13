import * as React from 'react';
import { ApiRequestor, Table } from 'pa-typings';
import { Bar, type BarConfig } from '@ant-design/plots';

type DataType = {
  country: string;
  population: number;
  year: number;
};

interface Props {
  requestor: ApiRequestor;
}

export const MyComponent: React.FC<Props> = ({ requestor }) => {
  const wrapperGuid = React.useRef<{ wrapperGuid: string }>({ wrapperGuid: '' });
  const [currentYear, setCurrentYear] = React.useState(0);
  const dataRef = React.useRef<DataType[]>([]);
  const graphRef = React.useRef<any>(null);

  const getData = (year: number) => {
    return dataRef.current
      .filter(row => row.year === year && row.country !== 'World')
      .slice(0, 10);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const guid = wrapperGuid.current = await requestor.wrapperGuid();
      let dsInfo = await requestor.info(guid);

      const values = await requestor.values({
        offset: 0,
        rowCount: dsInfo.rowCount,
        wrapperGuid: guid.wrapperGuid
      });

      const data: DataType[] = [];
      values.table?.forEach((row) => {
        data.push({
          country: String(row[0]),
          population: Number(row[1]),
          year: Number(row[2])
        })
      });

      if (data.length > 0) {
        dataRef.current = data;
        let startYear = currentYear;
        if (!startYear)
          startYear = data[0].year;
        setCurrentYear(startYear);
        graphRef.current.changeData(getData(data[0].year));
      }
    };
    fetchData();

  }, [requestor]);

  const renderCurrentYear = () => {
    const style: React.CSSProperties = {
      position: 'absolute',
      bottom: '20%',
      right: '10%',
      fontSize: '2em'
    };

    return <div style={style}>{currentYear}</div>
  }

  const config: BarConfig = React.useMemo(() => ({
    data: [],
    xField: 'population',
    yField: 'country',
    seriesField: 'country',
    legend: false,
    xAxis: {
      label: {
        formatter: (val) => {
          const formatter = Intl.NumberFormat('ru', { notation: 'compact' });
          return formatter.format(+val);
        }
      }
    },
    label: {
      position: 'right',
      content: ({ population }) => {
        const formatter = Intl.NumberFormat('ru', { notation: 'compact' });
        return formatter.format(population);
      },
      style: {
        fill: 'back'
      }
    },
    style: {},
    appendPadding: [0, 80, 0, 0],
    onReady: (bar) => {
      graphRef.current = bar;
    }
  }), []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {renderCurrentYear()}
      <Bar {...config} />
    </div>
  );
}
