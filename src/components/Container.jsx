export default function Container({
  children,
  className = "",
  as: Component = "div",
  ...props
}) {
  return (
    <Component className={`site-container ${className}`} {...props}>
      {children}
    </Component>
  );
}
