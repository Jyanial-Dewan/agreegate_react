import Modal from "@/components/common/Modal";
import type { IClientLocationInfo } from "@/types/deviceInfo.interface";
import { convertDate } from "@/Utility/DateConverter";
import { X } from "lucide-react";
import React from "react";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedConnection: IClientLocationInfo | null;
}

const ConnectionModal = ({
  showModal,
  setShowModal,
  selectedConnection,
}: Props) => {
  return (
    <>
      {showModal && (
        <Modal>
          <div className="w-[350px]">
            <div className="flex justify-between items-center bg-[#CEDEF2] p-2">
              <h3 className="font-semibold">Connection Audit</h3>
              <X
                onClick={() => setShowModal(false)}
                className="cursor-pointer"
              />
            </div>
            <div className="w-full py-4 px-[26px]">
              <div>
                <p className="text-sm">
                  Connection Time:{" "}
                  {convertDate(selectedConnection?.connection_time)}
                </p>
                <p className="text-sm">
                  Disconnection Time:{" "}
                  {convertDate(selectedConnection?.disconnection_time)}
                </p>
              </div>
              <div>
                <p>Login Location</p>
                <iframe
                  src={`https://www.google.com/maps?q=${selectedConnection?.latitude},${selectedConnection?.longitude}&z=15&output=embed`}
                  width="300"
                  height="300"
                  style={{ border: 1 }}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ConnectionModal;
