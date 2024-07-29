"use client";

import { Toaster as Sonner } from "sonner";
import Styles from "./toaster.module.scss";

export type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="system"
      className={Styles.toaster}
      toastOptions={{
        classNames: {
          toast: Styles.toast,
          description: Styles.description,
          actionButton: Styles.actionButton,
          cancelButton: Styles.cancelButton,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
