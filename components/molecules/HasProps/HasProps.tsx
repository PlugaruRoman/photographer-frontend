interface HasPropsParams {
  condition: boolean;
}

export const HasProps: React.FC<React.PropsWithChildren<HasPropsParams>> = ({
  children,
  condition,
}) => {
  return <>{condition && children ? children : null}</>;
};
