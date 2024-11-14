import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-select";
import { Badge } from "lucide-react";

import { IRequest } from "../wrappers/WRequestForm";

interface IRequestItemProps extends IRequest {
}

export const RequestItem = (props: IRequestItemProps) => {
  const { id, status, date, project, location, machine } = props;
  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-md flex justify-between">
          <span>Solicitud #${id}</span>

          <Badge color={status.color} className="text-black">
            {status.name}
          </Badge>
        </CardTitle>
        <CardDescription>Creada el {date}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="text-sm p-4 pt-2">
        <div className="flex flex-col md:flex-row ">
          <span className="mr-6">
            <b>Proyecto: </b>
            {project.id}
          </span>
          <span>
            <b>Ubicación: </b>
            {location}
          </span>
        </div>

        <div className="flex flex-col md:flex-row">
          <span className="mr-6">
            <b>Clase: </b>
            {machine.machineClass.name}
          </span>
          <span>
            <b>Modelo: </b>
            {machine.model}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
