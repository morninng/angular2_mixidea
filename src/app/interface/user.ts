export interface User {
  id?: string,
  loggedIn?: boolean;
  full_name?: string;
  short_name: string;
  pict_src: string;
}


export interface User_Search {
  name1: string;
  name2?: string;
  name3?: string;
}


