import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-select";

import { IRequest } from "../wrappers/WRequestForm";
import { Badge } from "@/components/ui/badge";

interface IRequestItemProps extends IRequest {
  className?: string;
}

export const RequestItem = (props: IRequestItemProps) => {
  const { id, status, date, project, machineClass, className } = props;
  return (
    <Card className={className}>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-md flex justify-between">
          <span>Solicitud #{id}</span>

          <Badge color={status.color} className="text-black">
            {status.name}
          </Badge>
        </CardTitle>
        <CardDescription className="mt-0">Creada el {date}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="text-sm p-4 pt-2">
        <div className="flex flex-col md:flex-row ">
          <span className="mr-6">
            <b>Proyecto: </b>
            {project.id}
          </span>
        </div>

        <div className="flex flex-col md:flex-row">
          <span className="mr-6">
            <b>Clase: </b>
            {machineClass.name}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
