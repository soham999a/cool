import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface Input3DProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  icon?: string;
}

const Input3D: React.FC<Input3DProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  error,
  icon,
}) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value.trim().length > 0;

  // Animation for label and border
  const labelSpring = useSpring({
    top: focused || hasValue ? -12 : 12,
    fontSize: focused || hasValue ? 12 : 16,
    color: focused ? 'rgb(99, 102, 241)' : hasValue ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
    config: {
      tension: 300,
      friction: 20,
    },
  });

  // Animation for input container
  const containerSpring = useSpring({
    boxShadow: focused
      ? '0 0 0 2px rgba(99, 102, 241, 0.3), 0 4px 6px rgba(0, 0, 0, 0.1)'
      : error
      ? '0 0 0 2px rgba(239, 68, 68, 0.3), 0 4px 6px rgba(0, 0, 0, 0.1)'
      : '0 1px 3px rgba(0, 0, 0, 0.1)',
    borderColor: focused ? 'rgb(99, 102, 241)' : error ? 'rgb(239, 68, 68)' : 'rgb(55, 65, 81)',
    transform: focused ? 'translateY(-2px)' : 'translateY(0px)',
    filter: focused ? 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.2))' : 'none',
    config: {
      tension: 300,
      friction: 20,
    },
  });

  return (
    <div className="mb-4 relative">
      <animated.div
        style={containerSpring}
        className="relative border rounded-lg bg-gray-800 overflow-hidden transition-all duration-200"
      >
        <div className="flex items-center px-3">
          {icon && <span className="material-icons text-indigo-400 mr-2">{icon}</span>}
          <div className="relative flex-1">
            <animated.label
              htmlFor={id}
              style={labelSpring}
              className="absolute left-0 pointer-events-none font-medium px-1 bg-gray-800 z-10"
            >
              {label}
              {required && <span className="text-pink-500 ml-1">*</span>}
            </animated.label>
            <input
              id={id}
              name={name}
              type={type}
              value={value}
              onChange={onChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={focused ? placeholder : ''}
              className="w-full py-3 outline-none bg-transparent text-gray-100"
              required={required}
            />
          </div>
        </div>

        {/* Subtle glow effect when focused */}
        {focused && (
          <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
            <div className="absolute inset-0 bg-indigo-500 blur-md"></div>
          </div>
        )}
      </animated.div>

      {error && (
        <animated.p
          className="text-red-400 text-xs mt-1 ml-1 flex items-center"
          style={{ opacity: error ? 1 : 0 }}
        >
          <span className="material-icons text-xs mr-1">error</span>
          {error}
        </animated.p>
      )}
    </div>
  );
};

export default Input3D;
