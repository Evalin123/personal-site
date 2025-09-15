import styles from '../assets/styles/components/Button.module.scss';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
};

export default function Button({ label, onClick, className }: ButtonProps) {
  return (
    <button className={`${styles.button} ${className || ''}`} onClick={onClick}>
      {label}
    </button>
  );
}
