import {gql, useQuery} from '@apollo/client';
import {Launch} from 'models';

const GET_ALL_LAUNCHES = gql`
  query GetAllLaunches($limit: Int!, $offset: Int!) {
    launches(limit: $limit, offset: $offset) {
      id
      mission_id
      mission_name
      launch_date_utc
      launch_success
      rocket {
        rocket_name
        rocket_type
      }
      launch_site {
        site_name_long
      }
      links {
        flickr_images
        video_link
        mission_patch
      }
      details
    }
  }
`;

export interface LaunchesPastData {
  launches: Launch[];
}

const useAllLaunches = (limit: number, offset: number) => {
  return useQuery<LaunchesPastData>(GET_ALL_LAUNCHES, {
    variables: {limit, offset},
    fetchPolicy: 'cache-and-network',
  });
};

export const LaunchesAPI = {
  useAllLaunches,
};
