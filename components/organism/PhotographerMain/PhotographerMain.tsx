import { IPhotographerCard } from "@/types/Photographer";

interface IUser {
  about: string;
  firstname: string;
  lastname: string;
  company: string;
  city: string;
  price: number;
  phone: string;
  facebook: string;
  instagram: string;
  web: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  user?: string;
}

interface PhotographerMainProps {
  user: IUser;
}

const PhotographerMain: React.FC<PhotographerMainProps> = ({ user }) => {
  return (
    <div>
      <div>asd</div>
      <div>{`${user.firstname} ${user.lastname}`}</div>
      <div>{user.city}</div>
      <div>{user.company}</div>
      <div>{user.about}</div>
      <div>{user.facebook}</div>
      <div>{user.instagram}</div>
      <div>+373 {user.phone}</div>
      <div>{user.price}</div>
      <div>{user.createdAt}</div>
    </div>
  );
};

export default PhotographerMain;
