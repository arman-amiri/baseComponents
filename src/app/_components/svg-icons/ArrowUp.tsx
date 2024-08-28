import { FC } from "react";

type Props = {
  style: {};
  width?: string;
  height?: string;
  className: string;
};

export const ArrowUp: FC<Props> = ({
  style,
  className,
  width = "26",
  height = "26",
}) => {
  return (
    <svg width={width} height={height} style={style} className={className}>
      <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
    </svg>
  );
};
