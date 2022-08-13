import { Url } from "url"

export interface NewsPost {
  id: number,
  title: string,
  description: Text,
  publishedDate: Date,
  url: string,
  fullUrl: string,
  titleImageUrl: string,
  categoryType: string,
  imageFile?: string
}

export interface NewsPostCreateForm {
  title: string,
  description: Text,
  publishedDate: Date,
  url: string,
  fullUrl: string,
  titleImageUrl: string,
  categoryType: string,
  imageFile: string,
}
