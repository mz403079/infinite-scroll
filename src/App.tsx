import { useEffect } from "react";
import { ListView } from "./components/List/index";
import { useList } from "./components/List/index";
import { EXCHANGE_RATES, Launch } from "./data/query/index";
function App() {
  const { props, List } = useList({
    query: EXCHANGE_RATES,
    model: "launchesPast",
    ListView: ListView,
  });

  const { setLayout, loading, totalEntries } = props;
  const layout = {
    render: ({ item }: { item: Launch }) => {
      return (
        <div>
          <div className="text-white text-3xl">
            Mission name: {item.mission_name}
          </div>

          <div className="text-white text-xl">
            Launch site: {item.launch_site.site_name_long}
          </div>
          <div className="text-white ">
            Mission status:{" "}
            {item.launch_success ? (
              <span className="text-green-500 font-semibold">Success</span>
            ) : (
              <span className="text-red-500 font-semibold">Fail</span>
            )}
          </div>
        </div>
      );
    },
  };
  useEffect(() => {
    setLayout(layout);
  }, [setLayout]);

  return (
    <div className="flex justify-center">
      {loading ? (
        "Loading..."
      ) : (
        <span className="text-white text-xl fixed top-10 left-5">
          {" "}
          TotalCount: {totalEntries}
        </span>
      )}
      <div className="container flex justify-center w-6/12">
        <List {...props} />{" "}
      </div>
    </div>
  );
}

export default App;
