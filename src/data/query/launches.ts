import { gql } from "@apollo/client";

export type Launch = {
  mission_name: string;
  launch_data_local: string;
  rocket: {
    rocket_name: string;
  };
  ships: {
    home_port: string;
    image: string;
    name: string;
  }[];
  launch_site: {
    site_name_long: string;
  };
  launch_success: boolean;
};

export const EXCHANGE_RATES = gql`
  query GetLaunches($offset: Int) {
    launchesPast(limit: 10, offset: $offset) {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
      }
      ships {
        name
        home_port
        image
      }
      launch_success
    }
  }
`;
