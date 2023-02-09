export interface Respuesta<T> {
  data: T[];
  success: boolean;
  //message: string[];
  message: message;
  pagination: Pagination;
}

export interface message {
  m_id: string;
}


export interface RespuestaLogin<T> {
  user: User;
  moder: Moder[];
  role: string;
  token: string;
}

export interface RespLogin {
  user: User;
  moder: Moder[];
  role: string;
  token: string;
}

export interface RespLogin {
  user: User;
  moder: Moder[];
  role: string;
  token: string;
}

export interface Moder {
  uid: number;
  tid: number;
  id: number;
  team: Team;
  user: User;
}

export interface Event {
  id: number;
  e_name: string;
  e_img: string;
  e_descr: string;
  player_event: string;
}

export interface matchEvents {
  e_id: number;
  player_id: number;
  match_id: number;
  ecount: number;
  minutes: string;
  t_id: number;
  id: number;
  player: Player;
}

// export interface Player
// {
//   id: number;
//   first_name: string;
//   last_name: string;
//   nick: string;
//   about: string;
//   position_id: number;
//  // def_img: number;
//   team_id: number;
//   //created_at: Date;
//   //updated_at: Date;
//   isSelected: boolean;
//   player_number: number;
//   image: string;
//   extension: string;
//   status: string;
//   curp: string;

//    //team: Team;
// }

export interface PlayerArray {
  players: number[];
}

// export interface MatchDay {
//   id: number;
//   m_name: string;
//   m_descr: string;
//   s_id: number;
//   is_playoff: string;
// }

export interface Position {
  p_id: number;
  p_name: string;
  ordering: number;
}
export interface Season {
  s_id: number;
  s_name: string;
  s_descr: string;
  s_rounds?: number;
  t_id?: number;
  published: string;
  s_win_point?: string;
  s_lost_point?: string;
  s_enbl_extra?: number;
  s_extra_win?: string;
  s_extra_lost?: string;
  s_draw_point?: string;
  s_groups?: number;
  s_win_away?: string;
  s_draw_away?: string;
  s_lost_away?: string;
  teams2?: Team[];
  teams?: Team[]; //lo que me devuelve el postman
  isSelected?: boolean;

  //tournament: Tournament
}

export interface Team {
  id: number;
  t_name: string;
  t_descr: string;
  t_yteam: string; // 0: No es mi equipo 1: Si es mi equipo
  def_img: number; // Imagen por default
  t_emblem?: string;
  t_city?: string;
  players?: Player[];
  isSelected: boolean;
  numberPlayers: number;
  idUrl: string;
  route: string;
  selected: boolean;
}

export interface User {
  email: string;
  password: string;
}

export interface Pagination {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface Event {
  id: number;
  e_name: string;
  e_img: string;
  e_descr: string;
  player_event: string;
}

// export interface matchEvents {
//   e_id: number;
//   player_id: number;
//   match_id: number;
//   ecount: number;
//   minutes: string;
//   t_id: number;
//   id: number;
//   player: Player;
// }

export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  nick: string;
  about: string;
  position_id: number;
  def_img: number;
  team_id: number;
  //created_at: Date;
  //updated_at: Date;
  isSelected: boolean;
  player_number: number;
  image: string;
  extension: string;
  status: string;
  curp: string;
  photos: Photo[];
  photoName: string;
  photo: Photo[];
  position: Position;
  positionName: String;
  team: Team;
  //PhotoNameTeam: String;
}

export interface PlayerxTeam {
  id: number;
  first_name: string;
  last_name: string;
  nick: string;
  about: string;
  position_id: number;
  def_img: number;
  team_id: number;
  //created_at: Date;
  //updated_at: Date;
  isSelected: boolean;
  player_number: number;
  image: string;
  extension: string;
  status: string;
  curp: string;
  photos: Photo[];
  photoName: any;
  photo: Photo[];
  position: Position;
  positionName: String;
  team: Team;
}

export interface PlayerArray {
  players: number[];
}

export interface MatchDay {
  id: number;
  m_name: string;
  m_descr: string;
  s_id: number;
  is_playoff: string;
  matches?: Match[];
}


// {
//   "id": 5,
//   "m_name": "Jornada 2",
//   "m_descr": "",
//   "s_id": "1",
//   "is_playoff": "0"
// }

export interface Match {
  id: number;
  m_id: number;
  team1_id: number;
  team2_id: number;
  score1: number;
  score2: number;
  match_descr: string;
  published: string;
  is_extra: string;
  m_played: string;
  m_date: string;
  m_time: string;
  m_location: string;
  bonus1: string;
  bonus2: string;
  refereeId: string;
  nameTeam1: String;
  nameTeam2: String;
  team1: Team;
  team2: Team;
  logoTeam1: string;
  logoTeam2: string;

}


export interface MatchEvents {

  id: number;
  e_id: string;
  player_id: string;
  match_id: string;
  ecount: string;
  minutes: string;
  t_id: string;
  //player: Player;
  match: Match;
  event: Event;
  team: Team;
  namePlayer: string;
  nameEvent:string;
  imageEvent: string;

}



export interface Position {
  p_id: number;
  p_name: string;
  ordering: number;
}

export interface SeasonxTeam {
  s_id: number;
  s_name: string;
  s_descr: string;
  s_rounds: number;
  t_id: number;
  published: string;
  s_win_point: string;
  s_lost_point: string;
  s_enbl_extra: number;
  s_extra_win: string;
  s_extra_lost: string;
  s_draw_point: string;
  s_groups: number;
  s_win_away: string;
  s_draw_away: string;
  s_lost_away: string;
  teams: number[];
  isSelected: boolean;

  //tournament: Tournament
}

export interface Team {
  id: number;
  t_name: string;
  t_descr: string;
  t_yteam: string; // 0: No es mi equipo 1: Si es mi equipo
  def_img: number; // Imagen por default
  t_emblem?: string;
  t_city?: string;
  players?: Player[];
  isSelected: boolean;
}

export interface Pagination {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface Photo {
  id: number;
  ph_name: string;
  ph_descr: string;
  ph_filename: string;
  imageStringBase64: string;
  extension: string;
}
