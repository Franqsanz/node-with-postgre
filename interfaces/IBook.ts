export interface IBook {
  title: string;
  authors: string[];
  synopsis: string;
  category: string[];
  year: number;
  language: number;
  source_link: string;
  number_pages: string;
  format: string;
  slug: string;
  image: {
    url: string;
    public_id: string;
  };
}

export type IRows = {
  rows: IBook[];
  totalResults?: number;
}
