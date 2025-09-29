import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IClientLocationInfo } from "@/types/deviceInfo.interface";
import { convertDate } from "@/Utility/DateConverter";
import { useState } from "react";
import ConnectionModal from "./ConnectionModal";

interface Props {
  locationInfos: IClientLocationInfo[];
}

const LocationInfoTable = ({ locationInfos }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedConnection, setSelectedConnection] =
    useState<IClientLocationInfo | null>(null);

  const hanldleDetailClick = (connection: IClientLocationInfo) => {
    setShowModal(true);
    setSelectedConnection(connection);
  };

  console.log(selectedConnection);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Connection Audit</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SL</TableHead>
                <TableHead>Connection Time</TableHead>
                <TableHead>Disconection Time</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locationInfos.map((info, index) => (
                <TableRow key={info.connection_id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{convertDate(info.connection_time)}</TableCell>
                  <TableCell>{convertDate(info.disconnection_time)}</TableCell>
                  <TableCell
                    onClick={() => hanldleDetailClick(info)}
                    className="text-right cursor-pointer text-blue-600"
                  >
                    View Detail
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <ConnectionModal
            setShowModal={setShowModal}
            showModal={showModal}
            selectedConnection={selectedConnection}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationInfoTable;
