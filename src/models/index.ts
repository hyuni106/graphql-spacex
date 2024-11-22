export interface Launch {
  id: string;
  mission_id: string;
  mission_name: string;
  launch_date_utc: Date;
  launch_success: boolean;
  rocket: {
    rocket_name: string;
    rocket_type: string;
  };
  launch_site: {
    site_name_long: string;
  };
  links: {
    flickr_images: string[];
    video_link: string | null;
    mission_patch: string | null;
  };
  details: string | null;
}
