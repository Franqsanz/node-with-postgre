export interface IBook {
  title: string;
  authors: string[];
  synopsis: string;
  category: string[];
  year: number;
  language: number;
  sourceLink: string;
  numberPages: string;
  format: string;
  pathUrl: string;
  image: {
    url: string;
    public_id: string;
  };
}

export type IRows = {
  rows: IBook[];
  totalResults?: number;
}
