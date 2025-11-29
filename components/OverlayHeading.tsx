import { Spinner } from "./ui/spinner";

const OverlayHeading = () => {
  return (
    <div className="fixed h-full flex items-center justify-center bg-foreground/38 inset-0 border">
      <Spinner className="size-8 text-primary" />
    </div>
  );
};

export default OverlayHeading;
