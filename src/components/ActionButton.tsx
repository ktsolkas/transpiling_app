interface ActionButtonProps {
  className: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ className, onClick }) => {
  return (
    <button className="button is-primary is-small" onClick={onClick}>
      <span className="icon">
        <i className={className}></i>
      </span>
    </button>
  );
};

export default ActionButton;
