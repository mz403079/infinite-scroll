import React, { ReactElement } from "react";
import { BottomScrollListener } from "react-bottom-scroll-listener";
type ListViewProps = {
  data: any;
  totalEntries: number;
  layout: number;
  fetchMoreRecords: () => void;
};

export function ListView({
  data,
  totalEntries,
  layout,
  fetchMoreRecords,
}: ListViewProps) {
  return (
    <div>
      <BottomScrollListener onBottom={fetchMoreRecords} />
      <Rows {...{ data, layout }} />
    </div>
  );
}
const Rows = ({ data, layout }: any): ReactElement => {
  return data.map((item: any, i: number) => (
    <React.Fragment key={i}>
      <div className="w-full h-40 border shadow-lg my-4 bg-gray-500">
        {layout.render({ item })}
      </div>
    </React.Fragment>
  ));
};
