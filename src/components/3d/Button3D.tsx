import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface Button3DProps {
  onClick: () => void;
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button3D: React.FC<Button3DProps> = ({
  onClick,
  children,
  color = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  type = 'button',
}) => {
  const [isPressed, setIsPressed] = useState(false);

  // Color variants
  const colorVariants = {
    primary: 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white',
    secondary: 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white',
    success: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white',
    danger: 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white',
  };

  // Size variants
  const sizeVariants = {
    sm: 'text-xs py-1 px-3',
    md: 'text-sm py-2 px-4',
    lg: 'text-base py-3 px-6',
  };

  // Animation for 3D effect
  const [{ scale, y, shadow, glow }, api] = useSpring(() => ({
    scale: 1,
    y: 0,
    shadow: '0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.12)',
    glow: '0 0 0px rgba(99, 102, 241, 0)',
    config: {
      mass: 1,
      tension: 450,
      friction: 25,
    },
  }));

  const handleMouseDown = () => {
    setIsPressed(true);
    api.start({
      scale: 0.97,
      y: 1,
      shadow: '0 1px 2px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14)',
      glow: '0 0 0px rgba(99, 102, 241, 0)',
    });
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    api.start({
      scale: 1,
      y: 0,
      shadow: '0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.12)',
      glow: '0 0 0px rgba(99, 102, 241, 0)',
    });
  };

  const handleMouseEnter = () => {
    if (!isPressed) {
      api.start({
        scale: 1.03,
        shadow: '0 7px 14px rgba(0, 0, 0, 0.25), 0 3px 6px rgba(0, 0, 0, 0.18)',
        glow: '0 0 15px rgba(99, 102, 241, 0.5)',
      });
    }
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
    api.start({
      scale: 1,
      y: 0,
      shadow: '0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.12)',
      glow: '0 0 0px rgba(99, 102, 241, 0)',
    });
  };

  return (
    <animated.button
      type={type}
      onClick={onClick}
      className={`
        ${colorVariants[color]}
        ${sizeVariants[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-lg font-medium transition-colors duration-200
        flex items-center justify-center relative
        shadow-lg
      `}
      style={{
        transform: scale.to(s => `scale(${s})`),
        boxShadow: shadow,
        translateY: y,
        filter: glow,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <span className="relative z-10 flex items-center justify-center">
        {icon && <span className="material-icons mr-2 text-sm">{icon}</span>}
        {children}
      </span>

      {/* Subtle shine effect */}
      <span className="absolute inset-0 overflow-hidden rounded-lg z-0">
        <span className="absolute -inset-x-40 -inset-y-32 w-96 h-96 opacity-20 bg-gradient-to-br from-white via-white to-transparent rotate-12 transform-gpu"></span>
      </span>
    </animated.button>
  );
};

export default Button3D;
