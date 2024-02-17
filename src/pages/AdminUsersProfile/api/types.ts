import { ItemType } from 'entities/Schedule/model/types'

export interface UserResponse {
  id: string;
  login: string;
  lastname: string;
  firstname: string;
  secondname: string;
  birthday: string;
  place_of_birth: string;
  sex: string;
  citizenship: string;
  avatar_key: string;
  passport_number: string;
  passport_series: string;
  actual_living: string;
  registration_living: string;
  place_of_work: string;
  position: string;
  tg_name: string;
  vk_link: string;
  phone: string;
  illness: string;
  find_out: string;
  future_skills: string;
  about_yourself: string;
  take_part: string;
  creative_task: string;
  approve_shift: boolean;
  shiftId: string;
  roles: Role[];
  shift: ItemType;
}

interface Role {
  name: string;
}