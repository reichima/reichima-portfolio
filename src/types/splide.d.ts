declare module "@splidejs/react-splide" {
  import type { ComponentProps, FC, ReactNode } from "react";

  interface SplideProps extends ComponentProps<"div"> {
    options?: Record<string, unknown>;
    "aria-label"?: string;
    children?: ReactNode;
  }

  interface SplideSlideProps extends ComponentProps<"li"> {
    children?: ReactNode;
  }

  export const Splide: FC<SplideProps>;
  export const SplideSlide: FC<SplideSlideProps>;
}

declare module "@splidejs/react-splide/css";
