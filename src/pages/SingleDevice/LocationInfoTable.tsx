import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { IClientLocationInfo } from "@/types/deviceInfo.interface";
import { convertDate } from "@/Utility/DateConverter";
import { useState } from "react";
import ConnectionModal from "./ConnectionModal";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/common/Loader";

interface Props {
  locationInfos: IClientLocationInfo[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPageNumbers: number;
  isLoading: boolean;
}

const LocationInfoTable = ({
  locationInfos,
  currentPage,
  setCurrentPage,
  totalPageNumbers,
  isLoading,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedConnection, setSelectedConnection] =
    useState<IClientLocationInfo | null>(null);

  const hanldleDetailClick = (connection: IClientLocationInfo) => {
    setShowModal(true);
    setSelectedConnection(connection);
  };

  return (
    <div>
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
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                <div className="flex justify-center items-center py-8">
                  <Loader size="40" color="black" />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            <>
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
            </>
          )}
        </TableBody>
      </Table>

      <div className="flex w-full justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPageNumbers={totalPageNumbers}
        />
      </div>

      <ConnectionModal
        setShowModal={setShowModal}
        showModal={showModal}
        selectedConnection={selectedConnection}
      />
    </div>
  );
};

export default LocationInfoTable;
