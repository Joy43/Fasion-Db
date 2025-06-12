export type ICategory= {
  _id: string;
  name: string;
  description: string;
  parent: string | null;
  isActive: boolean;
  createdBy: string;
  slug: string;
  icon:string;
  createdAt: string;  
  updatedAt: string;

}
