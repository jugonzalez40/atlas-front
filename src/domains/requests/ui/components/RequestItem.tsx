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

import Link from "next/link";

interface IRequestItemProps extends IRequest {
  className?: string;
}

export const RequestItem = (props: IRequestItemProps) => {
  const { id, status, requestDate, project, machineryClass, className } = props;
  return (
    <Card className={className}>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-md flex justify-between">
          <Link href={`/hub/requests/${id}`}>
            <span>Solicitud #{id}</span>
          </Link>

          <Badge color={status?.color} className="text-black">
            {status?.name}
          </Badge>
        </CardTitle>
        <CardDescription className="mt-0">
          Creada el {requestDate}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="text-sm p-4 pt-2">
        <div className="flex flex-col md:flex-row ">
          <span className="mr-6">
            <b>Proyecto: </b>
            {project.contractNumber}
          </span>
        </div>

        <div className="flex flex-col md:flex-row">
          <span className="mr-6">
            <b>Clase: </b>
            {machineryClass.name}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
