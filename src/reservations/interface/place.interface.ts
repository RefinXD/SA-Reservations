export interface Place {
  name: string;
  capacity: number;
  facilities: string[];
}

export interface UpdatePlace {
  targetName: string;
  newInfo: Place;
}
