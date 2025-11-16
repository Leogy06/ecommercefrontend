import { Spinner } from "./ui/spinner";

const OverlayHeading = () => {
  return (
    <div className="fixed h-full flex items-center justify-center bg-black/50 inset-0 border">
      <Spinner className="size-8 text-red-500" />
    </div>
  );
};

export default OverlayHeading;
