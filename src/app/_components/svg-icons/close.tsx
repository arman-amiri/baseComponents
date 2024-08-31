import { FC } from "react";

type Props = {
  style?: {};
  width?: string;
  height?: string;
  className?: string;
};

export const CloseX: FC<Props> = ({
  style,
  className,
  width = "26",
  height = "26",
}) => {
  return (
    <svg width={width} height={height} style={style} className={className}>
      <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
    </svg>
  );
};
