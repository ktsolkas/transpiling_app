interface AddSectionButtonProps {
  onClick: () => void;
  children?: React.ReactNode
}

const AddSectionButton: React.FC<AddSectionButtonProps> = ({
  onClick,
  children,
}) => (
  <button className="button is-rounded is-primary is-small" onClick={onClick}>
    <span className="icon is-small">
      <i className="fas fa-plus"></i>
    </span>
    <span>{children}</span>
  </button>
);

export default AddSectionButton;
