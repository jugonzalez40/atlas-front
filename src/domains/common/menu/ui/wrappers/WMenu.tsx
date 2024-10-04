import { RequestService } from "@/services/RequestService";

import { IMenuItemProps, MenuItem } from "../components/MenuItem";

import { cache } from "react";
import { AxiosResponse } from "axios";

interface IMenuStructure {
  menu: IMenuItemProps[];
}

const getMeuStructure = cache(async () => {
  const fetch = RequestService.getInstance();
  if (!fetch) return { menu: [] };
  const result = await fetch
    .get<IMenuStructure>("/menu")
    .catch(RequestService.buildError);

  if (result.status !== 200) return {} as IMenuStructure;

  const menuStructure = (result as AxiosResponse<IMenuStructure>).data;
  return menuStructure;
});

export const WMenu = async () => {
  const menuStructure = await getMeuStructure();
  return (
    <ul className="p-2">
      {menuStructure.menu.map(({ text, href, id }) => (
        <MenuItem key={id} text={text} href={href} id={id} />
      ))}
    </ul>
  );
};
