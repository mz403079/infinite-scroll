import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useEffect, useState } from "react";

type CrudProps = {
  query: DocumentNode;
  model: string;
  ListView: (args: any) => JSX.Element;
};

export function useList({ query, ListView, model }: CrudProps) {
  const { loading, error, data, fetchMore } = useQuery(query, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });

  const [layout, setLayout] = useState<any>();
  const [dataList, setDataList] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  function fetchMoreRecords() {
    fetchMore({
      variables: {
        offset: totalEntries,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          [model]: [...prev?.[model], ...fetchMoreResult?.[model]],
        });
      },
    });
  }

  useEffect(() => {
    setDataList(data?.[model]);
    setTotalEntries(data?.[model].length);
  }, [data]);

  return {
    props: {
      error,
      loading,
      setLayout,
      ListView,
      layout,
      dataList,
      totalEntries,
      fetchMoreRecords,
    },
    List: List,
  };
}
function List({
  layout,
  dataList,
  loading,
  totalEntries,
  ListView,
  fetchMoreRecords,
}: {
  layout: any;
  dataList: any;
  loading: boolean;
  totalEntries: number;
  ListView: (args: any) => JSX.Element;
  fetchMoreRecords: () => void;
}) {
  return (
    <div>
      {totalEntries && (
        <ListView
          data={dataList}
          layout={layout}
          loading={loading}
          totalEntries={totalEntries}
          fetchMoreRecords={fetchMoreRecords}
        />
      )}
    </div>
  );
}
