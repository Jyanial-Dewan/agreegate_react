import { ArrowLeft } from "lucide-react";
// import CustomTooltip from "../common/CustomTooltip";

interface Props {
  className?: string;
}

const BackButton = ({ className }: Props) => {
  return (
    <div className={className ? `${className}` : "p-1 border"}>
      <ArrowLeft size={20} />
    </div>
  );
};

export default BackButton;
